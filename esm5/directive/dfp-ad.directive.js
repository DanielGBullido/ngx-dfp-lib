/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Output, EventEmitter, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DfpService, } from '../service/dfp.service';
import { DfpIDGeneratorService, } from '../service/dfp-id-generator.service';
import { DfpRefreshService } from '../service/dfp-refresh.service';
import { DFPIncompleteError, DfpConfig } from '../class';
import { DFP_CONFIG } from '../service/injection_token';
var DfpRefreshEvent = /** @class */ (function () {
    function DfpRefreshEvent() {
    }
    return DfpRefreshEvent;
}());
export { DfpRefreshEvent };
if (false) {
    /** @type {?} */
    DfpRefreshEvent.prototype.type;
    /** @type {?} */
    DfpRefreshEvent.prototype.slot;
    /** @type {?} */
    DfpRefreshEvent.prototype.data;
}
var DfpAdDirective = /** @class */ (function () {
    function DfpAdDirective(platformId, elementRef, dfp, dfpIDGenerator, dfpRefresh, config, router) {
        var _this = this;
        this.platformId = platformId;
        this.elementRef = elementRef;
        this.dfp = dfp;
        this.dfpIDGenerator = dfpIDGenerator;
        this.dfpRefresh = dfpRefresh;
        this.config = config;
        this.personalizedAds = this.config.personalizedAds;
        this.afterRefresh = new EventEmitter();
        this.sizes = [];
        this.responsiveMapping = [];
        this.targetings = [];
        this.exclusions = [];
        this.scripts = [];
        if (isPlatformBrowser(this.platformId)) {
            this.dfpRefresh.refreshEvent.subscribe((/**
             * @param {?} slot
             * @return {?}
             */
            function (slot) {
                if (slot === _this.slot) {
                    _this.afterRefresh.emit({ type: 'refresh', slot: slot });
                }
            }));
            if (router) {
                this.onSameNavigation = router.events.pipe(filter((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return event instanceof NavigationEnd; })))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (_this.slot && !_this.refresh && _this.config.onSameNavigation === 'refresh') {
                        _this.refreshContent.call(_this);
                    }
                }));
            }
        }
    }
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            this.dfpIDGenerator.dfpIDGenerator(this.elementRef.nativeElement);
        }
    };
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (isPlatformBrowser(this.platformId)) {
            this.dfp.defineTask((/**
             * @return {?}
             */
            function () {
                _this.defineSlot();
            }));
        }
    };
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.slot) {
            googletag.destroySlots([this.slot]);
        }
        if (this.onSameNavigation) {
            this.onSameNavigation.unsubscribe();
        }
    };
    /**
     * @private
     * @param {?} slot
     * @return {?}
     */
    DfpAdDirective.prototype.setResponsiveMapping = /**
     * @private
     * @param {?} slot
     * @return {?}
     */
    function (slot) {
        /** @type {?} */
        var ad = this.getState();
        if (ad.responsiveMapping.length === 0) {
            return;
        }
        /** @type {?} */
        var sizeMapping = googletag.sizeMapping();
        ad.responsiveMapping.forEach((/**
         * @param {?} mapping
         * @return {?}
         */
        function (mapping) {
            sizeMapping.addSize(mapping.viewportSize, mapping.adSizes);
        }));
        slot.defineSizeMapping(sizeMapping.build());
    };
    /**
     * @private
     * @return {?}
     */
    DfpAdDirective.prototype.defineSlot = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var ad = this.getState();
        /** @type {?} */
        var element = this.elementRef.nativeElement;
        this.slot = googletag.defineSlot(ad.adUnit, ad.sizes, element.id);
        if (this.forceSafeFrame !== undefined && ad.forceSafeFrame === !this.config.forceSafeFrame) {
            this.slot.setForceSafeFrame(ad.forceSafeFrame);
        }
        if (this.personalizedAds === false) {
            this.slot.set('requestNonPersonalizedAds', 1);
            googletag.pubads().setRequestNonPersonalizedAds(1);
        }
        if (ad.clickUrl) {
            this.slot.setClickUrl(ad.clickUrl);
        }
        if (ad.collapseIfEmpty) {
            this.slot.setCollapseEmptyDiv(true, true);
        }
        if (ad.safeFrameConfig) {
            this.slot.setSafeFrameConfig((JSON.parse(ad.safeFrameConfig)));
        }
        googletag.pubads().addEventListener('slotRenderEnded', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.slot === _this.slot) {
                _this.afterRefresh.emit({ type: 'renderEnded', slot: _this.slot, data: event });
            }
        }));
        this.setResponsiveMapping(this.slot);
        ad.targetings.forEach((/**
         * @param {?} targeting
         * @return {?}
         */
        function (targeting) {
            _this.slot.setTargeting(targeting.key, targeting.values);
        }));
        ad.exclusions.forEach((/**
         * @param {?} exclusion
         * @return {?}
         */
        function (exclusion) {
            _this.slot.setCategoryExclusion(exclusion);
        }));
        ad.scripts.forEach((/**
         * @param {?} script
         * @return {?}
         */
        function (script) { script(_this.slot); }));
        if (this.config.enableVideoAds) {
            this.slot.addService(googletag.companionAds());
        }
        this.slot.addService(googletag.pubads());
        this.refreshContent();
    };
    /**
     * @private
     * @return {?}
     */
    DfpAdDirective.prototype.refreshContent = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.dfpRefresh.slotRefresh(this.slot, this.refresh, true).then((/**
         * @param {?} slot
         * @return {?}
         */
        function (slot) {
            _this.afterRefresh.emit({ type: 'init', slot: slot });
        }));
    };
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.checkValid = /**
     * @return {?}
     */
    function () {
        if (this.sizes.length === 0) {
            throw new DFPIncompleteError('dfp-ad', 'dfp-size');
        }
        if (!this.adUnit) {
            throw new DFPIncompleteError('dfp-ad', 'ad-unit', true);
        }
    };
    Object.defineProperty(DfpAdDirective.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dfpRefresh.hiddenCheck(this.elementRef.nativeElement);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.getState = /**
     * @return {?}
     */
    function () {
        this.checkValid();
        return Object.freeze({
            sizes: this.sizes,
            responsiveMapping: this.responsiveMapping,
            targetings: this.targetings,
            exclusions: this.exclusions,
            adUnit: this.adUnit,
            forceSafeFrame: this.forceSafeFrame === true,
            safeFrameConfig: this.safeFrameConfig,
            clickUrl: this.clickUrl,
            refresh: this.refresh,
            personalizedAds: this.personalizedAds === this.config.personalizedAds,
            scripts: this.scripts,
            collapseIfEmpty: this.collapseIfEmpty === true
        });
    };
    /**
     * @param {?} size
     * @return {?}
     */
    DfpAdDirective.prototype.addSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this.sizes.push(size);
    };
    /**
     * @param {?} mapping
     * @return {?}
     */
    DfpAdDirective.prototype.addResponsiveMapping = /**
     * @param {?} mapping
     * @return {?}
     */
    function (mapping) {
        this.responsiveMapping.push(mapping);
    };
    /**
     * @param {?} targeting
     * @return {?}
     */
    DfpAdDirective.prototype.addTargeting = /**
     * @param {?} targeting
     * @return {?}
     */
    function (targeting) {
        this.targetings.push(targeting);
    };
    /**
     * @param {?} exclusion
     * @return {?}
     */
    DfpAdDirective.prototype.addExclusion = /**
     * @param {?} exclusion
     * @return {?}
     */
    function (exclusion) {
        this.exclusions.push(exclusion);
    };
    /**
     * @param {?} script
     * @return {?}
     */
    DfpAdDirective.prototype.addScript = /**
     * @param {?} script
     * @return {?}
     */
    function (script) {
        this.scripts.push(script);
    };
    DfpAdDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-ad'
                },] }
    ];
    /** @nocollapse */
    DfpAdDirective.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ElementRef },
        { type: DfpService },
        { type: DfpIDGeneratorService },
        { type: DfpRefreshService },
        { type: DfpConfig, decorators: [{ type: Inject, args: [DFP_CONFIG,] }] },
        { type: Router, decorators: [{ type: Optional }] }
    ]; };
    DfpAdDirective.propDecorators = {
        adUnit: [{ type: Input }],
        clickUrl: [{ type: Input }],
        forceSafeFrame: [{ type: Input }],
        safeFrameConfig: [{ type: Input }],
        refresh: [{ type: Input }],
        personalizedAds: [{ type: Input }],
        collapseIfEmpty: [{ type: Input }],
        afterRefresh: [{ type: Output }]
    };
    return DfpAdDirective;
}());
export { DfpAdDirective };
if (false) {
    /** @type {?} */
    DfpAdDirective.prototype.adUnit;
    /** @type {?} */
    DfpAdDirective.prototype.clickUrl;
    /** @type {?} */
    DfpAdDirective.prototype.forceSafeFrame;
    /** @type {?} */
    DfpAdDirective.prototype.safeFrameConfig;
    /** @type {?} */
    DfpAdDirective.prototype.refresh;
    /** @type {?} */
    DfpAdDirective.prototype.personalizedAds;
    /** @type {?} */
    DfpAdDirective.prototype.collapseIfEmpty;
    /** @type {?} */
    DfpAdDirective.prototype.afterRefresh;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.sizes;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.responsiveMapping;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.targetings;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.exclusions;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.scripts;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.slot;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.onSameNavigation;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.platformId;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.dfp;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.dfpIDGenerator;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.dfpRefresh;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWFkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLWFkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxVQUFVLEVBQ3JCLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUNPLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUNoRSxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR3hELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsVUFBVSxHQUFHLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLHFCQUFxQixHQUFHLE1BQU0scUNBQXFDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFbkUsT0FBTyxFQUFFLGtCQUFrQixFQUFjLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNyRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJeEQ7SUFBQTtJQUlBLENBQUM7SUFBRCxzQkFBQztBQUFELENBQUMsQUFKRCxJQUlDOzs7O0lBSEMsK0JBQWE7O0lBQ2IsK0JBQVU7O0lBQ1YsK0JBQVc7O0FBR2I7SUE2QkUsd0JBQytCLFVBQWtCLEVBQ3ZDLFVBQXNCLEVBQ3RCLEdBQWUsRUFDZixjQUFxQyxFQUNyQyxVQUE2QixFQUNULE1BQWlCLEVBQ2pDLE1BQWM7UUFQNUIsaUJBd0JDO1FBdkI4QixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ3ZDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsUUFBRyxHQUFILEdBQUcsQ0FBWTtR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QyxNQUFNLFNBQUMsV0FBVztnQkF2RFYsVUFBVTtnQkFVZCxVQUFVO2dCQUNWLHFCQUFxQjtnQkFDckIsaUJBQWlCO2dCQUVlLFNBQVMsdUJBOEM3QyxNQUFNLFNBQUMsVUFBVTtnQkF2RGIsTUFBTSx1QkF3RFYsUUFBUTs7O3lCQS9CVixLQUFLOzJCQUNMLEtBQUs7aUNBQ0wsS0FBSztrQ0FDTCxLQUFLOzBCQUNMLEtBQUs7a0NBQ0wsS0FBSztrQ0FDTCxLQUFLOytCQUVMLE1BQU07O0lBa01ULHFCQUFDO0NBQUEsQUEvTUQsSUErTUM7U0E1TVksY0FBYzs7O0lBRXpCLGdDQUF3Qjs7SUFDeEIsa0NBQTBCOztJQUMxQix3Q0FBaUM7O0lBQ2pDLHlDQUFpQzs7SUFDakMsaUNBQXlCOztJQUN6Qix5Q0FBZ0U7O0lBQ2hFLHlDQUFrQzs7SUFFbEMsc0NBQTJFOzs7OztJQUUzRSwrQkFBbUI7Ozs7O0lBRW5CLDJDQUErQjs7Ozs7SUFFL0Isb0NBQXdCOzs7OztJQUV4QixvQ0FBd0I7Ozs7O0lBRXhCLGlDQUFxQjs7Ozs7SUFFckIsOEJBQXlCOzs7OztJQUV6QiwwQ0FBdUM7Ozs7O0lBR3JDLG9DQUErQzs7Ozs7SUFDL0Msb0NBQThCOzs7OztJQUM5Qiw2QkFBdUI7Ozs7O0lBQ3ZCLHdDQUE2Qzs7Ozs7SUFDN0Msb0NBQXFDOzs7OztJQUNyQyxnQ0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXG4gIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcixcbiAgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIEluamVjdCwgUExBVEZPUk1fSUQsIE9wdGlvbmFsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IERmcFNlcnZpY2UsIH0gZnJvbSAnLi4vc2VydmljZS9kZnAuc2VydmljZSc7XG5pbXBvcnQgeyBEZnBJREdlbmVyYXRvclNlcnZpY2UsIH0gZnJvbSAnLi4vc2VydmljZS9kZnAtaWQtZ2VuZXJhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGZwUmVmcmVzaFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBERlBJbmNvbXBsZXRlRXJyb3IsIEdvb2dsZVNsb3QsIERmcENvbmZpZyB9IGZyb20gJy4uL2NsYXNzJztcbmltcG9ydCB7IERGUF9DT05GSUcgfSBmcm9tICcuLi9zZXJ2aWNlL2luamVjdGlvbl90b2tlbic7XG5cbmRlY2xhcmUgdmFyIGdvb2dsZXRhZztcblxuZXhwb3J0IGNsYXNzIERmcFJlZnJlc2hFdmVudCB7XG4gIHR5cGU6IHN0cmluZztcbiAgc2xvdDogYW55O1xuICBkYXRhPzogYW55O1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkZnAtYWQnXG59KVxuZXhwb3J0IGNsYXNzIERmcEFkRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGFkVW5pdDogc3RyaW5nO1xuICBASW5wdXQoKSBjbGlja1VybDogc3RyaW5nO1xuICBASW5wdXQoKSBmb3JjZVNhZmVGcmFtZTogYm9vbGVhbjtcbiAgQElucHV0KCkgc2FmZUZyYW1lQ29uZmlnOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHJlZnJlc2g6IHN0cmluZztcbiAgQElucHV0KCkgcGVyc29uYWxpemVkQWRzOiBib29sZWFuID0gdGhpcy5jb25maWcucGVyc29uYWxpemVkQWRzO1xuICBASW5wdXQoKSBjb2xsYXBzZUlmRW1wdHk6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGFmdGVyUmVmcmVzaDogRXZlbnRFbWl0dGVyPERmcFJlZnJlc2hFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBzaXplcyA9IFtdO1xuXG4gIHByaXZhdGUgcmVzcG9uc2l2ZU1hcHBpbmcgPSBbXTtcblxuICBwcml2YXRlIHRhcmdldGluZ3MgPSBbXTtcblxuICBwcml2YXRlIGV4Y2x1c2lvbnMgPSBbXTtcblxuICBwcml2YXRlIHNjcmlwdHMgPSBbXTtcblxuICBwcml2YXRlIHNsb3Q6IEdvb2dsZVNsb3Q7XG5cbiAgcHJpdmF0ZSBvblNhbWVOYXZpZ2F0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgZGZwOiBEZnBTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGZwSURHZW5lcmF0b3I6IERmcElER2VuZXJhdG9yU2VydmljZSxcbiAgICBwcml2YXRlIGRmcFJlZnJlc2g6IERmcFJlZnJlc2hTZXJ2aWNlLFxuICAgIEBJbmplY3QoREZQX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcbiAgICBAT3B0aW9uYWwoKSByb3V0ZXI6IFJvdXRlclxuICApIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5kZnBSZWZyZXNoLnJlZnJlc2hFdmVudC5zdWJzY3JpYmUoc2xvdCA9PiB7XG4gICAgICAgIGlmIChzbG90ID09PSB0aGlzLnNsb3QpIHtcbiAgICAgICAgICB0aGlzLmFmdGVyUmVmcmVzaC5lbWl0KHsgdHlwZTogJ3JlZnJlc2gnLCBzbG90OiBzbG90IH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChyb3V0ZXIpIHtcbiAgICAgICAgdGhpcy5vblNhbWVOYXZpZ2F0aW9uID0gcm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBOYXZpZ2F0aW9uRW5kKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zbG90ICYmICF0aGlzLnJlZnJlc2ggJiYgdGhpcy5jb25maWcub25TYW1lTmF2aWdhdGlvbiA9PT0gJ3JlZnJlc2gnKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5kZnBJREdlbmVyYXRvci5kZnBJREdlbmVyYXRvcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmRmcC5kZWZpbmVUYXNrKCgpID0+IHtcbiAgICAgICAgdGhpcy5kZWZpbmVTbG90KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zbG90KSB7XG4gICAgICBnb29nbGV0YWcuZGVzdHJveVNsb3RzKFt0aGlzLnNsb3RdKTtcbiAgICB9XG4gICAgaWYgKHRoaXMub25TYW1lTmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5vblNhbWVOYXZpZ2F0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRSZXNwb25zaXZlTWFwcGluZyhzbG90KSB7XG4gICAgY29uc3QgYWQgPSB0aGlzLmdldFN0YXRlKCk7XG5cbiAgICBpZiAoYWQucmVzcG9uc2l2ZU1hcHBpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2l6ZU1hcHBpbmcgPSBnb29nbGV0YWcuc2l6ZU1hcHBpbmcoKTtcblxuICAgIGFkLnJlc3BvbnNpdmVNYXBwaW5nLmZvckVhY2gobWFwcGluZyA9PiB7XG4gICAgICBzaXplTWFwcGluZy5hZGRTaXplKG1hcHBpbmcudmlld3BvcnRTaXplLCBtYXBwaW5nLmFkU2l6ZXMpO1xuICAgIH0pO1xuXG4gICAgc2xvdC5kZWZpbmVTaXplTWFwcGluZyhzaXplTWFwcGluZy5idWlsZCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVmaW5lU2xvdCgpIHtcbiAgICBjb25zdCBhZCA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMuc2xvdCA9IGdvb2dsZXRhZy5kZWZpbmVTbG90KGFkLmFkVW5pdCwgYWQuc2l6ZXMsIGVsZW1lbnQuaWQpO1xuXG4gICAgaWYgKHRoaXMuZm9yY2VTYWZlRnJhbWUgIT09IHVuZGVmaW5lZCAmJiBhZC5mb3JjZVNhZmVGcmFtZSA9PT0gIXRoaXMuY29uZmlnLmZvcmNlU2FmZUZyYW1lKSB7XG4gICAgICB0aGlzLnNsb3Quc2V0Rm9yY2VTYWZlRnJhbWUoYWQuZm9yY2VTYWZlRnJhbWUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBlcnNvbmFsaXplZEFkcyA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuc2xvdC5zZXQoJ3JlcXVlc3ROb25QZXJzb25hbGl6ZWRBZHMnLCAxKTtcbiAgICAgIGdvb2dsZXRhZy5wdWJhZHMoKS5zZXRSZXF1ZXN0Tm9uUGVyc29uYWxpemVkQWRzKDEpO1xuICAgIH1cblxuICAgIGlmIChhZC5jbGlja1VybCkge1xuICAgICAgdGhpcy5zbG90LnNldENsaWNrVXJsKGFkLmNsaWNrVXJsKTtcbiAgICB9XG5cbiAgICBpZiAoYWQuY29sbGFwc2VJZkVtcHR5KSB7XG4gICAgICB0aGlzLnNsb3Quc2V0Q29sbGFwc2VFbXB0eURpdih0cnVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoYWQuc2FmZUZyYW1lQ29uZmlnKSB7XG4gICAgICB0aGlzLnNsb3Quc2V0U2FmZUZyYW1lQ29uZmlnKFxuICAgICAgICAoSlNPTi5wYXJzZShhZC5zYWZlRnJhbWVDb25maWcpKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBnb29nbGV0YWcucHViYWRzKCkuYWRkRXZlbnRMaXN0ZW5lcignc2xvdFJlbmRlckVuZGVkJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQuc2xvdCA9PT0gdGhpcy5zbG90KSB7XG4gICAgICAgIHRoaXMuYWZ0ZXJSZWZyZXNoLmVtaXQoeyB0eXBlOiAncmVuZGVyRW5kZWQnLCBzbG90OiB0aGlzLnNsb3QsIGRhdGE6IGV2ZW50IH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5zZXRSZXNwb25zaXZlTWFwcGluZyh0aGlzLnNsb3QpO1xuXG4gICAgYWQudGFyZ2V0aW5ncy5mb3JFYWNoKHRhcmdldGluZyA9PiB7XG4gICAgICB0aGlzLnNsb3Quc2V0VGFyZ2V0aW5nKHRhcmdldGluZy5rZXksIHRhcmdldGluZy52YWx1ZXMpO1xuICAgIH0pO1xuXG4gICAgYWQuZXhjbHVzaW9ucy5mb3JFYWNoKGV4Y2x1c2lvbiA9PiB7XG4gICAgICB0aGlzLnNsb3Quc2V0Q2F0ZWdvcnlFeGNsdXNpb24oZXhjbHVzaW9uKTtcbiAgICB9KTtcblxuICAgIGFkLnNjcmlwdHMuZm9yRWFjaChzY3JpcHQgPT4geyBzY3JpcHQodGhpcy5zbG90KTsgfSk7XG5cbiAgICBpZiAodGhpcy5jb25maWcuZW5hYmxlVmlkZW9BZHMpIHtcbiAgICAgIHRoaXMuc2xvdC5hZGRTZXJ2aWNlKGdvb2dsZXRhZy5jb21wYW5pb25BZHMoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5zbG90LmFkZFNlcnZpY2UoZ29vZ2xldGFnLnB1YmFkcygpKTtcblxuICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaENvbnRlbnQoKSB7XG4gICAgdGhpcy5kZnBSZWZyZXNoLnNsb3RSZWZyZXNoKHRoaXMuc2xvdCwgdGhpcy5yZWZyZXNoLCB0cnVlKS50aGVuKHNsb3QgPT4ge1xuICAgICAgdGhpcy5hZnRlclJlZnJlc2guZW1pdCh7IHR5cGU6ICdpbml0Jywgc2xvdDogc2xvdCB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrVmFsaWQoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgREZQSW5jb21wbGV0ZUVycm9yKCdkZnAtYWQnLCAnZGZwLXNpemUnKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmFkVW5pdCkge1xuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLWFkJywgJ2FkLXVuaXQnLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuZGZwUmVmcmVzaC5oaWRkZW5DaGVjayh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBnZXRTdGF0ZSgpIHtcbiAgICB0aGlzLmNoZWNrVmFsaWQoKTtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICBzaXplczogdGhpcy5zaXplcyxcbiAgICAgIHJlc3BvbnNpdmVNYXBwaW5nOiB0aGlzLnJlc3BvbnNpdmVNYXBwaW5nLFxuICAgICAgdGFyZ2V0aW5nczogdGhpcy50YXJnZXRpbmdzLFxuICAgICAgZXhjbHVzaW9uczogdGhpcy5leGNsdXNpb25zLFxuICAgICAgYWRVbml0OiB0aGlzLmFkVW5pdCxcbiAgICAgIGZvcmNlU2FmZUZyYW1lOiB0aGlzLmZvcmNlU2FmZUZyYW1lID09PSB0cnVlLFxuICAgICAgc2FmZUZyYW1lQ29uZmlnOiB0aGlzLnNhZmVGcmFtZUNvbmZpZyxcbiAgICAgIGNsaWNrVXJsOiB0aGlzLmNsaWNrVXJsLFxuICAgICAgcmVmcmVzaDogdGhpcy5yZWZyZXNoLFxuICAgICAgcGVyc29uYWxpemVkQWRzOiB0aGlzLnBlcnNvbmFsaXplZEFkcyA9PT0gdGhpcy5jb25maWcucGVyc29uYWxpemVkQWRzLFxuICAgICAgc2NyaXB0czogdGhpcy5zY3JpcHRzLFxuICAgICAgY29sbGFwc2VJZkVtcHR5OiB0aGlzLmNvbGxhcHNlSWZFbXB0eSA9PT0gdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgYWRkU2l6ZShzaXplKSB7XG4gICAgdGhpcy5zaXplcy5wdXNoKHNpemUpO1xuICB9XG5cbiAgYWRkUmVzcG9uc2l2ZU1hcHBpbmcobWFwcGluZykge1xuICAgIHRoaXMucmVzcG9uc2l2ZU1hcHBpbmcucHVzaChtYXBwaW5nKTtcbiAgfVxuXG4gIGFkZFRhcmdldGluZyh0YXJnZXRpbmcpIHtcbiAgICB0aGlzLnRhcmdldGluZ3MucHVzaCh0YXJnZXRpbmcpO1xuICB9XG5cbiAgYWRkRXhjbHVzaW9uKGV4Y2x1c2lvbikge1xuICAgIHRoaXMuZXhjbHVzaW9ucy5wdXNoKGV4Y2x1c2lvbik7XG4gIH1cblxuICBhZGRTY3JpcHQoc2NyaXB0KSB7XG4gICAgdGhpcy5zY3JpcHRzLnB1c2goc2NyaXB0KTtcbiAgfVxuXG59XG4iXX0=