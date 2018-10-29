/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            this.dfpRefresh.refreshEvent.subscribe(function (slot) {
                if (slot === _this.slot) {
                    _this.afterRefresh.emit({ type: 'refresh', slot: slot });
                }
            });
            if (router) {
                this.onSameNavigation = router.events.pipe(filter(function (event) { return event instanceof NavigationEnd; }))
                    .subscribe(function (event) {
                    if (_this.slot && !_this.refresh && _this.config.onSameNavigation === 'refresh') {
                        _this.refreshContent.call(_this);
                    }
                });
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
            this.dfp.defineTask(function () {
                _this.defineSlot();
            });
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
     * @param {?} slot
     * @return {?}
     */
    DfpAdDirective.prototype.setResponsiveMapping = /**
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
        ad.responsiveMapping.forEach(function (mapping) {
            sizeMapping.addSize(mapping.viewportSize, mapping.adSizes);
        });
        slot.defineSizeMapping(sizeMapping.build());
    };
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.defineSlot = /**
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
        this.slot.renderEnded = function (googleSlotEvent) {
            _this.afterRefresh.emit({ type: 'renderEnded', slot: _this.slot, data: googleSlotEvent });
        };
        this.setResponsiveMapping(this.slot);
        ad.targetings.forEach(function (targeting) {
            _this.slot.setTargeting(targeting.key, targeting.values);
        });
        ad.exclusions.forEach(function (exclusion) {
            _this.slot.setCategoryExclusion(exclusion);
        });
        ad.scripts.forEach(function (script) { script(_this.slot); });
        if (this.config.enableVideoAds) {
            this.slot.addService(googletag.companionAds());
        }
        this.slot.addService(googletag.pubads());
        this.refreshContent();
    };
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.refreshContent = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.dfpRefresh.slotRefresh(this.slot, this.refresh, true).then(function (slot) {
            _this.afterRefresh.emit({ type: 'init', slot: slot });
        });
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
    /** @type {?} */
    DfpAdDirective.prototype.sizes;
    /** @type {?} */
    DfpAdDirective.prototype.responsiveMapping;
    /** @type {?} */
    DfpAdDirective.prototype.targetings;
    /** @type {?} */
    DfpAdDirective.prototype.exclusions;
    /** @type {?} */
    DfpAdDirective.prototype.scripts;
    /** @type {?} */
    DfpAdDirective.prototype.slot;
    /** @type {?} */
    DfpAdDirective.prototype.onSameNavigation;
    /** @type {?} */
    DfpAdDirective.prototype.platformId;
    /** @type {?} */
    DfpAdDirective.prototype.elementRef;
    /** @type {?} */
    DfpAdDirective.prototype.dfp;
    /** @type {?} */
    DfpAdDirective.prototype.dfpIDGenerator;
    /** @type {?} */
    DfpAdDirective.prototype.dfpRefresh;
    /** @type {?} */
    DfpAdDirective.prototype.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWFkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLWFkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxVQUFVLEVBQ3JCLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUNPLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUNoRSxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR3hELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsVUFBVSxHQUFHLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLHFCQUFxQixHQUFHLE1BQU0scUNBQXFDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFbkUsT0FBTyxFQUFFLGtCQUFrQixFQUFjLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNyRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJeEQsSUFBQTs7OzBCQXBCQTtJQXdCQyxDQUFBO0FBSkQsMkJBSUM7Ozs7Ozs7Ozs7SUErQkMsd0JBQytCLFVBQWtCLEVBQ3ZDLFlBQ0EsS0FDQSxnQkFDQSxZQUNvQixNQUFpQixFQUNqQyxNQUFjO1FBUDVCLGlCQXdCQztRQXZCOEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxlQUFVLEdBQVYsVUFBVTtRQUNWLFFBQUcsR0FBSCxHQUFHO1FBQ0gsbUJBQWMsR0FBZCxjQUFjO1FBQ2QsZUFBVSxHQUFWLFVBQVU7UUFDVSxXQUFNLEdBQU4sTUFBTSxDQUFXOytCQXpCWCxJQUFJLENB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TSxTQUFDLFVBQVU7Z0JBdkRiLE1BQU0sdUJBd0RWLFFBQVE7Ozt5QkEvQlYsS0FBSzsyQkFDTCxLQUFLO2lDQUNMLEtBQUs7a0NBQ0wsS0FBSzswQkFDTCxLQUFLO2tDQUNMLEtBQUs7a0NBQ0wsS0FBSzsrQkFFTCxNQUFNOzt5QkF2Q1Q7O1NBNkJhLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXG4gIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcixcbiAgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIEluamVjdCwgUExBVEZPUk1fSUQsIE9wdGlvbmFsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IERmcFNlcnZpY2UsIH0gZnJvbSAnLi4vc2VydmljZS9kZnAuc2VydmljZSc7XG5pbXBvcnQgeyBEZnBJREdlbmVyYXRvclNlcnZpY2UsIH0gZnJvbSAnLi4vc2VydmljZS9kZnAtaWQtZ2VuZXJhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGZwUmVmcmVzaFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBERlBJbmNvbXBsZXRlRXJyb3IsIEdvb2dsZVNsb3QsIERmcENvbmZpZyB9IGZyb20gJy4uL2NsYXNzJztcbmltcG9ydCB7IERGUF9DT05GSUcgfSBmcm9tICcuLi9zZXJ2aWNlL2luamVjdGlvbl90b2tlbic7XG5cbmRlY2xhcmUgdmFyIGdvb2dsZXRhZztcblxuZXhwb3J0IGNsYXNzIERmcFJlZnJlc2hFdmVudCB7XG4gIHR5cGU6IHN0cmluZztcbiAgc2xvdDogYW55O1xuICBkYXRhPzogYW55O1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkZnAtYWQnXG59KVxuZXhwb3J0IGNsYXNzIERmcEFkRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGFkVW5pdDogc3RyaW5nO1xuICBASW5wdXQoKSBjbGlja1VybDogc3RyaW5nO1xuICBASW5wdXQoKSBmb3JjZVNhZmVGcmFtZTogYm9vbGVhbjtcbiAgQElucHV0KCkgc2FmZUZyYW1lQ29uZmlnOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHJlZnJlc2g6IHN0cmluZztcbiAgQElucHV0KCkgcGVyc29uYWxpemVkQWRzOiBib29sZWFuID0gdGhpcy5jb25maWcucGVyc29uYWxpemVkQWRzO1xuICBASW5wdXQoKSBjb2xsYXBzZUlmRW1wdHk6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGFmdGVyUmVmcmVzaDogRXZlbnRFbWl0dGVyPERmcFJlZnJlc2hFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBzaXplcyA9IFtdO1xuXG4gIHByaXZhdGUgcmVzcG9uc2l2ZU1hcHBpbmcgPSBbXTtcblxuICBwcml2YXRlIHRhcmdldGluZ3MgPSBbXTtcblxuICBwcml2YXRlIGV4Y2x1c2lvbnMgPSBbXTtcblxuICBwcml2YXRlIHNjcmlwdHMgPSBbXTtcblxuICBwcml2YXRlIHNsb3Q6IEdvb2dsZVNsb3Q7XG5cbiAgcHJpdmF0ZSBvblNhbWVOYXZpZ2F0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgZGZwOiBEZnBTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGZwSURHZW5lcmF0b3I6IERmcElER2VuZXJhdG9yU2VydmljZSxcbiAgICBwcml2YXRlIGRmcFJlZnJlc2g6IERmcFJlZnJlc2hTZXJ2aWNlLFxuICAgIEBJbmplY3QoREZQX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcbiAgICBAT3B0aW9uYWwoKSByb3V0ZXI6IFJvdXRlclxuICApIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5kZnBSZWZyZXNoLnJlZnJlc2hFdmVudC5zdWJzY3JpYmUoc2xvdCA9PiB7XG4gICAgICAgIGlmIChzbG90ID09PSB0aGlzLnNsb3QpIHtcbiAgICAgICAgICB0aGlzLmFmdGVyUmVmcmVzaC5lbWl0KHsgdHlwZTogJ3JlZnJlc2gnLCBzbG90OiBzbG90IH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChyb3V0ZXIpIHtcbiAgICAgICAgdGhpcy5vblNhbWVOYXZpZ2F0aW9uID0gcm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBOYXZpZ2F0aW9uRW5kKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zbG90ICYmICF0aGlzLnJlZnJlc2ggJiYgdGhpcy5jb25maWcub25TYW1lTmF2aWdhdGlvbiA9PT0gJ3JlZnJlc2gnKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5kZnBJREdlbmVyYXRvci5kZnBJREdlbmVyYXRvcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmRmcC5kZWZpbmVUYXNrKCgpID0+IHtcbiAgICAgICAgdGhpcy5kZWZpbmVTbG90KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zbG90KSB7XG4gICAgICBnb29nbGV0YWcuZGVzdHJveVNsb3RzKFt0aGlzLnNsb3RdKTtcbiAgICB9XG4gICAgaWYgKHRoaXMub25TYW1lTmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5vblNhbWVOYXZpZ2F0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRSZXNwb25zaXZlTWFwcGluZyhzbG90KSB7XG4gICAgY29uc3QgYWQgPSB0aGlzLmdldFN0YXRlKCk7XG5cbiAgICBpZiAoYWQucmVzcG9uc2l2ZU1hcHBpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2l6ZU1hcHBpbmcgPSBnb29nbGV0YWcuc2l6ZU1hcHBpbmcoKTtcblxuICAgIGFkLnJlc3BvbnNpdmVNYXBwaW5nLmZvckVhY2gobWFwcGluZyA9PiB7XG4gICAgICBzaXplTWFwcGluZy5hZGRTaXplKG1hcHBpbmcudmlld3BvcnRTaXplLCBtYXBwaW5nLmFkU2l6ZXMpO1xuICAgIH0pO1xuXG4gICAgc2xvdC5kZWZpbmVTaXplTWFwcGluZyhzaXplTWFwcGluZy5idWlsZCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVmaW5lU2xvdCgpIHtcbiAgICBjb25zdCBhZCA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMuc2xvdCA9IGdvb2dsZXRhZy5kZWZpbmVTbG90KGFkLmFkVW5pdCwgYWQuc2l6ZXMsIGVsZW1lbnQuaWQpO1xuXG4gICAgaWYgKHRoaXMuZm9yY2VTYWZlRnJhbWUgIT09IHVuZGVmaW5lZCAmJiBhZC5mb3JjZVNhZmVGcmFtZSA9PT0gIXRoaXMuY29uZmlnLmZvcmNlU2FmZUZyYW1lKSB7XG4gICAgICB0aGlzLnNsb3Quc2V0Rm9yY2VTYWZlRnJhbWUoYWQuZm9yY2VTYWZlRnJhbWUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBlcnNvbmFsaXplZEFkcyA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuc2xvdC5zZXQoJ3JlcXVlc3ROb25QZXJzb25hbGl6ZWRBZHMnLCAxKTtcbiAgICAgIGdvb2dsZXRhZy5wdWJhZHMoKS5zZXRSZXF1ZXN0Tm9uUGVyc29uYWxpemVkQWRzKDEpO1xuICAgIH1cblxuICAgIGlmIChhZC5jbGlja1VybCkge1xuICAgICAgdGhpcy5zbG90LnNldENsaWNrVXJsKGFkLmNsaWNrVXJsKTtcbiAgICB9XG5cbiAgICBpZiAoYWQuY29sbGFwc2VJZkVtcHR5KSB7XG4gICAgICB0aGlzLnNsb3Quc2V0Q29sbGFwc2VFbXB0eURpdih0cnVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoYWQuc2FmZUZyYW1lQ29uZmlnKSB7XG4gICAgICB0aGlzLnNsb3Quc2V0U2FmZUZyYW1lQ29uZmlnKFxuICAgICAgICAoSlNPTi5wYXJzZShhZC5zYWZlRnJhbWVDb25maWcpKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLnNsb3QucmVuZGVyRW5kZWQgPSAoZ29vZ2xlU2xvdEV2ZW50OiBJQXJndW1lbnRzKSA9PiB7XG4gICAgICB0aGlzLmFmdGVyUmVmcmVzaC5lbWl0KHsgdHlwZTogJ3JlbmRlckVuZGVkJywgc2xvdDogdGhpcy5zbG90LCBkYXRhOiBnb29nbGVTbG90RXZlbnQgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuc2V0UmVzcG9uc2l2ZU1hcHBpbmcodGhpcy5zbG90KTtcblxuICAgIGFkLnRhcmdldGluZ3MuZm9yRWFjaCh0YXJnZXRpbmcgPT4ge1xuICAgICAgdGhpcy5zbG90LnNldFRhcmdldGluZyh0YXJnZXRpbmcua2V5LCB0YXJnZXRpbmcudmFsdWVzKTtcbiAgICB9KTtcblxuICAgIGFkLmV4Y2x1c2lvbnMuZm9yRWFjaChleGNsdXNpb24gPT4ge1xuICAgICAgdGhpcy5zbG90LnNldENhdGVnb3J5RXhjbHVzaW9uKGV4Y2x1c2lvbik7XG4gICAgfSk7XG5cbiAgICBhZC5zY3JpcHRzLmZvckVhY2goc2NyaXB0ID0+IHsgc2NyaXB0KHRoaXMuc2xvdCk7IH0pO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLmVuYWJsZVZpZGVvQWRzKSB7XG4gICAgICB0aGlzLnNsb3QuYWRkU2VydmljZShnb29nbGV0YWcuY29tcGFuaW9uQWRzKCkpO1xuICAgIH1cblxuICAgIHRoaXMuc2xvdC5hZGRTZXJ2aWNlKGdvb2dsZXRhZy5wdWJhZHMoKSk7XG5cbiAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hDb250ZW50KCkge1xuICAgIHRoaXMuZGZwUmVmcmVzaC5zbG90UmVmcmVzaCh0aGlzLnNsb3QsIHRoaXMucmVmcmVzaCwgdHJ1ZSkudGhlbihzbG90ID0+IHtcbiAgICAgIHRoaXMuYWZ0ZXJSZWZyZXNoLmVtaXQoeyB0eXBlOiAnaW5pdCcsIHNsb3Q6IHNsb3QgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1ZhbGlkKCkge1xuICAgIGlmICh0aGlzLnNpemVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLWFkJywgJ2RmcC1zaXplJyk7XG4gICAgfVxuICAgIGlmICghdGhpcy5hZFVuaXQpIHtcbiAgICAgIHRocm93IG5ldyBERlBJbmNvbXBsZXRlRXJyb3IoJ2RmcC1hZCcsICdhZC11bml0JywgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLmRmcFJlZnJlc2guaGlkZGVuQ2hlY2sodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgZ2V0U3RhdGUoKSB7XG4gICAgdGhpcy5jaGVja1ZhbGlkKCk7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgICAgc2l6ZXM6IHRoaXMuc2l6ZXMsXG4gICAgICByZXNwb25zaXZlTWFwcGluZzogdGhpcy5yZXNwb25zaXZlTWFwcGluZyxcbiAgICAgIHRhcmdldGluZ3M6IHRoaXMudGFyZ2V0aW5ncyxcbiAgICAgIGV4Y2x1c2lvbnM6IHRoaXMuZXhjbHVzaW9ucyxcbiAgICAgIGFkVW5pdDogdGhpcy5hZFVuaXQsXG4gICAgICBmb3JjZVNhZmVGcmFtZTogdGhpcy5mb3JjZVNhZmVGcmFtZSA9PT0gdHJ1ZSxcbiAgICAgIHNhZmVGcmFtZUNvbmZpZzogdGhpcy5zYWZlRnJhbWVDb25maWcsXG4gICAgICBjbGlja1VybDogdGhpcy5jbGlja1VybCxcbiAgICAgIHJlZnJlc2g6IHRoaXMucmVmcmVzaCxcbiAgICAgIHBlcnNvbmFsaXplZEFkczogdGhpcy5wZXJzb25hbGl6ZWRBZHMgPT09IHRoaXMuY29uZmlnLnBlcnNvbmFsaXplZEFkcyxcbiAgICAgIHNjcmlwdHM6IHRoaXMuc2NyaXB0cyxcbiAgICAgIGNvbGxhcHNlSWZFbXB0eTogdGhpcy5jb2xsYXBzZUlmRW1wdHkgPT09IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFNpemUoc2l6ZSkge1xuICAgIHRoaXMuc2l6ZXMucHVzaChzaXplKTtcbiAgfVxuXG4gIGFkZFJlc3BvbnNpdmVNYXBwaW5nKG1hcHBpbmcpIHtcbiAgICB0aGlzLnJlc3BvbnNpdmVNYXBwaW5nLnB1c2gobWFwcGluZyk7XG4gIH1cblxuICBhZGRUYXJnZXRpbmcodGFyZ2V0aW5nKSB7XG4gICAgdGhpcy50YXJnZXRpbmdzLnB1c2godGFyZ2V0aW5nKTtcbiAgfVxuXG4gIGFkZEV4Y2x1c2lvbihleGNsdXNpb24pIHtcbiAgICB0aGlzLmV4Y2x1c2lvbnMucHVzaChleGNsdXNpb24pO1xuICB9XG5cbiAgYWRkU2NyaXB0KHNjcmlwdCkge1xuICAgIHRoaXMuc2NyaXB0cy5wdXNoKHNjcmlwdCk7XG4gIH1cblxufVxuIl19