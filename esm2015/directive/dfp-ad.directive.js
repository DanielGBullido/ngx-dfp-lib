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
export class DfpRefreshEvent {
}
if (false) {
    /** @type {?} */
    DfpRefreshEvent.prototype.type;
    /** @type {?} */
    DfpRefreshEvent.prototype.slot;
    /** @type {?} */
    DfpRefreshEvent.prototype.data;
}
export class DfpAdDirective {
    /**
     * @param {?} platformId
     * @param {?} elementRef
     * @param {?} dfp
     * @param {?} dfpIDGenerator
     * @param {?} dfpRefresh
     * @param {?} config
     * @param {?} router
     */
    constructor(platformId, elementRef, dfp, dfpIDGenerator, dfpRefresh, config, router) {
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
            slot => {
                if (slot === this.slot) {
                    this.afterRefresh.emit({ type: 'refresh', slot: slot });
                }
            }));
            if (router) {
                this.onSameNavigation = router.events.pipe(filter((/**
                 * @param {?} event
                 * @return {?}
                 */
                event => event instanceof NavigationEnd)))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => {
                    if (this.slot && !this.refresh && this.config.onSameNavigation === 'refresh') {
                        this.refreshContent.call(this);
                    }
                }));
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.dfpIDGenerator.dfpIDGenerator(this.elementRef.nativeElement);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.dfp.defineTask((/**
             * @return {?}
             */
            () => {
                this.defineSlot();
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.slot) {
            googletag.destroySlots([this.slot]);
        }
        if (this.onSameNavigation) {
            this.onSameNavigation.unsubscribe();
        }
    }
    /**
     * @private
     * @param {?} slot
     * @return {?}
     */
    setResponsiveMapping(slot) {
        /** @type {?} */
        const ad = this.getState();
        if (ad.responsiveMapping.length === 0) {
            return;
        }
        /** @type {?} */
        const sizeMapping = googletag.sizeMapping();
        ad.responsiveMapping.forEach((/**
         * @param {?} mapping
         * @return {?}
         */
        mapping => {
            sizeMapping.addSize(mapping.viewportSize, mapping.adSizes);
        }));
        slot.defineSizeMapping(sizeMapping.build());
    }
    /**
     * @private
     * @return {?}
     */
    defineSlot() {
        /** @type {?} */
        const ad = this.getState();
        /** @type {?} */
        const element = this.elementRef.nativeElement;
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
        (event) => {
            if (event.slot === this.slot) {
                this.afterRefresh.emit({ type: 'renderEnded', slot: this.slot, data: event });
            }
        }));
        this.setResponsiveMapping(this.slot);
        ad.targetings.forEach((/**
         * @param {?} targeting
         * @return {?}
         */
        targeting => {
            this.slot.setTargeting(targeting.key, targeting.values);
        }));
        ad.exclusions.forEach((/**
         * @param {?} exclusion
         * @return {?}
         */
        exclusion => {
            this.slot.setCategoryExclusion(exclusion);
        }));
        ad.scripts.forEach((/**
         * @param {?} script
         * @return {?}
         */
        script => { script(this.slot); }));
        if (this.config.enableVideoAds) {
            this.slot.addService(googletag.companionAds());
        }
        this.slot.addService(googletag.pubads());
        this.refreshContent();
    }
    /**
     * @private
     * @return {?}
     */
    refreshContent() {
        this.dfpRefresh.slotRefresh(this.slot, this.refresh, true).then((/**
         * @param {?} slot
         * @return {?}
         */
        slot => {
            this.afterRefresh.emit({ type: 'init', slot: slot });
        }));
    }
    /**
     * @return {?}
     */
    checkValid() {
        if (this.sizes.length === 0) {
            throw new DFPIncompleteError('dfp-ad', 'dfp-size');
        }
        if (!this.adUnit) {
            throw new DFPIncompleteError('dfp-ad', 'ad-unit', true);
        }
    }
    /**
     * @return {?}
     */
    get isHidden() {
        return this.dfpRefresh.hiddenCheck(this.elementRef.nativeElement);
    }
    /**
     * @return {?}
     */
    getState() {
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
    }
    /**
     * @param {?} size
     * @return {?}
     */
    addSize(size) {
        this.sizes.push(size);
    }
    /**
     * @param {?} mapping
     * @return {?}
     */
    addResponsiveMapping(mapping) {
        this.responsiveMapping.push(mapping);
    }
    /**
     * @param {?} targeting
     * @return {?}
     */
    addTargeting(targeting) {
        this.targetings.push(targeting);
    }
    /**
     * @param {?} exclusion
     * @return {?}
     */
    addExclusion(exclusion) {
        this.exclusions.push(exclusion);
    }
    /**
     * @param {?} script
     * @return {?}
     */
    addScript(script) {
        this.scripts.push(script);
    }
}
DfpAdDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-ad'
            },] }
];
/** @nocollapse */
DfpAdDirective.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ElementRef },
    { type: DfpService },
    { type: DfpIDGeneratorService },
    { type: DfpRefreshService },
    { type: DfpConfig, decorators: [{ type: Inject, args: [DFP_CONFIG,] }] },
    { type: Router, decorators: [{ type: Optional }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWFkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLWFkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxVQUFVLEVBQ3JCLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUNPLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUNoRSxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR3hELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsVUFBVSxHQUFHLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLHFCQUFxQixHQUFHLE1BQU0scUNBQXFDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFbkUsT0FBTyxFQUFFLGtCQUFrQixFQUFjLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNyRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJeEQsTUFBTSxPQUFPLGVBQWU7Q0FJM0I7OztJQUhDLCtCQUFhOztJQUNiLCtCQUFVOztJQUNWLCtCQUFXOztBQU1iLE1BQU0sT0FBTyxjQUFjOzs7Ozs7Ozs7O0lBMEJ6QixZQUMrQixVQUFrQixFQUN2QyxVQUFzQixFQUN0QixHQUFlLEVBQ2YsY0FBcUMsRUFDckMsVUFBNkIsRUFDVCxNQUFpQixFQUNqQyxNQUFjO1FBTkcsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZixtQkFBYyxHQUFkLGNB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Q0wsS0FBSzs2QkFDTCxLQUFLOzhCQUNMLEtBQUs7c0JBQ0wsS0FBSzs4QkFDTCxLQUFLOzhCQUNMLEtBQUs7MkJBRUwsTUFBTTs7OztJQVJQLGdDQUF3Qjs7SUFDeEIsa0NBQTBCOztJQUMxQix3Q0FBaUM7O0lBQ2pDLHlDQUFpQzs7SUFDakMsaUNBQXlCOztJQUN6Qix5Q0FBZ0U7O0lBQ2hFLHlDQUFrQzs7SUFFbEMsc0NBQTJFOzs7OztJQUUzRSwrQkFBbUI7Ozs7O0lBRW5CLDJDQUErQjs7Ozs7SUFFL0Isb0NBQXdCOzs7OztJQUV4QixvQ0FBd0I7Ozs7O0lBRXhCLGlDQUFxQjs7Ozs7SUFFckIsOEJBQXlCOzs7OztJQUV6QiwwQ0FBdUM7Ozs7O0lBR3JDLG9DQUErQzs7Ozs7SUFDL0Msb0NBQThCOzs7OztJQUM5Qiw2QkFBdUI7Ozs7O0lBQ3ZCLHdDQUE2Qzs7Ozs7SUFDN0Msb0NBQXFDOzs7OztJQUNyQyxnQ0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXG4gIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcixcbiAgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIEluamVjdCwgUExBVEZPUk1fSUQsIE9wdGlvbmFsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IERmcFNlcnZpY2UsIH0gZnJvbSAnLi4vc2VydmljZS9kZnAuc2VydmljZSc7XG5pbXBvcnQgeyBEZnBJREdlbmVyYXRvclNlcnZpY2UsIH0gZnJvbSAnLi4vc2VydmljZS9kZnAtaWQtZ2VuZXJhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGZwUmVmcmVzaFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBERlBJbmNvbXBsZXRlRXJyb3IsIEdvb2dsZVNsb3QsIERmcENvbmZpZyB9IGZyb20gJy4uL2NsYXNzJztcbmltcG9ydCB7IERGUF9DT05GSUcgfSBmcm9tICcuLi9zZXJ2aWNlL2luamVjdGlvbl90b2tlbic7XG5cbmRlY2xhcmUgdmFyIGdvb2dsZXRhZztcblxuZXhwb3J0IGNsYXNzIERmcFJlZnJlc2hFdmVudCB7XG4gIHR5cGU6IHN0cmluZztcbiAgc2xvdDogYW55O1xuICBkYXRhPzogYW55O1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkZnAtYWQnXG59KVxuZXhwb3J0IGNsYXNzIERmcEFkRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGFkVW5pdDogc3RyaW5nO1xuICBASW5wdXQoKSBjbGlja1VybDogc3RyaW5nO1xuICBASW5wdXQoKSBmb3JjZVNhZmVGcmFtZTogYm9vbGVhbjtcbiAgQElucHV0KCkgc2FmZUZyYW1lQ29uZmlnOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHJlZnJlc2g6IHN0cmluZztcbiAgQElucHV0KCkgcGVyc29uYWxpemVkQWRzOiBib29sZWFuID0gdGhpcy5jb25maWcucGVyc29uYWxpemVkQWRzO1xuICBASW5wdXQoKSBjb2xsYXBzZUlmRW1wdHk6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGFmdGVyUmVmcmVzaDogRXZlbnRFbWl0dGVyPERmcFJlZnJlc2hFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBzaXplcyA9IFtdO1xuXG4gIHByaXZhdGUgcmVzcG9uc2l2ZU1hcHBpbmcgPSBbXTtcblxuICBwcml2YXRlIHRhcmdldGluZ3MgPSBbXTtcblxuICBwcml2YXRlIGV4Y2x1c2lvbnMgPSBbXTtcblxuICBwcml2YXRlIHNjcmlwdHMgPSBbXTtcblxuICBwcml2YXRlIHNsb3Q6IEdvb2dsZVNsb3Q7XG5cbiAgcHJpdmF0ZSBvblNhbWVOYXZpZ2F0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgZGZwOiBEZnBTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGZwSURHZW5lcmF0b3I6IERmcElER2VuZXJhdG9yU2VydmljZSxcbiAgICBwcml2YXRlIGRmcFJlZnJlc2g6IERmcFJlZnJlc2hTZXJ2aWNlLFxuICAgIEBJbmplY3QoREZQX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcbiAgICBAT3B0aW9uYWwoKSByb3V0ZXI6IFJvdXRlclxuICApIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5kZnBSZWZyZXNoLnJlZnJlc2hFdmVudC5zdWJzY3JpYmUoc2xvdCA9PiB7XG4gICAgICAgIGlmIChzbG90ID09PSB0aGlzLnNsb3QpIHtcbiAgICAgICAgICB0aGlzLmFmdGVyUmVmcmVzaC5lbWl0KHsgdHlwZTogJ3JlZnJlc2gnLCBzbG90OiBzbG90IH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChyb3V0ZXIpIHtcbiAgICAgICAgdGhpcy5vblNhbWVOYXZpZ2F0aW9uID0gcm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBOYXZpZ2F0aW9uRW5kKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zbG90ICYmICF0aGlzLnJlZnJlc2ggJiYgdGhpcy5jb25maWcub25TYW1lTmF2aWdhdGlvbiA9PT0gJ3JlZnJlc2gnKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5kZnBJREdlbmVyYXRvci5kZnBJREdlbmVyYXRvcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmRmcC5kZWZpbmVUYXNrKCgpID0+IHtcbiAgICAgICAgdGhpcy5kZWZpbmVTbG90KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zbG90KSB7XG4gICAgICBnb29nbGV0YWcuZGVzdHJveVNsb3RzKFt0aGlzLnNsb3RdKTtcbiAgICB9XG4gICAgaWYgKHRoaXMub25TYW1lTmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5vblNhbWVOYXZpZ2F0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRSZXNwb25zaXZlTWFwcGluZyhzbG90KSB7XG4gICAgY29uc3QgYWQgPSB0aGlzLmdldFN0YXRlKCk7XG5cbiAgICBpZiAoYWQucmVzcG9uc2l2ZU1hcHBpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2l6ZU1hcHBpbmcgPSBnb29nbGV0YWcuc2l6ZU1hcHBpbmcoKTtcblxuICAgIGFkLnJlc3BvbnNpdmVNYXBwaW5nLmZvckVhY2gobWFwcGluZyA9PiB7XG4gICAgICBzaXplTWFwcGluZy5hZGRTaXplKG1hcHBpbmcudmlld3BvcnRTaXplLCBtYXBwaW5nLmFkU2l6ZXMpO1xuICAgIH0pO1xuXG4gICAgc2xvdC5kZWZpbmVTaXplTWFwcGluZyhzaXplTWFwcGluZy5idWlsZCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVmaW5lU2xvdCgpIHtcbiAgICBjb25zdCBhZCA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMuc2xvdCA9IGdvb2dsZXRhZy5kZWZpbmVTbG90KGFkLmFkVW5pdCwgYWQuc2l6ZXMsIGVsZW1lbnQuaWQpO1xuXG4gICAgaWYgKHRoaXMuZm9yY2VTYWZlRnJhbWUgIT09IHVuZGVmaW5lZCAmJiBhZC5mb3JjZVNhZmVGcmFtZSA9PT0gIXRoaXMuY29uZmlnLmZvcmNlU2FmZUZyYW1lKSB7XG4gICAgICB0aGlzLnNsb3Quc2V0Rm9yY2VTYWZlRnJhbWUoYWQuZm9yY2VTYWZlRnJhbWUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBlcnNvbmFsaXplZEFkcyA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuc2xvdC5zZXQoJ3JlcXVlc3ROb25QZXJzb25hbGl6ZWRBZHMnLCAxKTtcbiAgICAgIGdvb2dsZXRhZy5wdWJhZHMoKS5zZXRSZXF1ZXN0Tm9uUGVyc29uYWxpemVkQWRzKDEpO1xuICAgIH1cblxuICAgIGlmIChhZC5jbGlja1VybCkge1xuICAgICAgdGhpcy5zbG90LnNldENsaWNrVXJsKGFkLmNsaWNrVXJsKTtcbiAgICB9XG5cbiAgICBpZiAoYWQuY29sbGFwc2VJZkVtcHR5KSB7XG4gICAgICB0aGlzLnNsb3Quc2V0Q29sbGFwc2VFbXB0eURpdih0cnVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoYWQuc2FmZUZyYW1lQ29uZmlnKSB7XG4gICAgICB0aGlzLnNsb3Quc2V0U2FmZUZyYW1lQ29uZmlnKFxuICAgICAgICAoSlNPTi5wYXJzZShhZC5zYWZlRnJhbWVDb25maWcpKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBnb29nbGV0YWcucHViYWRzKCkuYWRkRXZlbnRMaXN0ZW5lcignc2xvdFJlbmRlckVuZGVkJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQuc2xvdCA9PT0gdGhpcy5zbG90KSB7XG4gICAgICAgIHRoaXMuYWZ0ZXJSZWZyZXNoLmVtaXQoeyB0eXBlOiAncmVuZGVyRW5kZWQnLCBzbG90OiB0aGlzLnNsb3QsIGRhdGE6IGV2ZW50IH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5zZXRSZXNwb25zaXZlTWFwcGluZyh0aGlzLnNsb3QpO1xuXG4gICAgYWQudGFyZ2V0aW5ncy5mb3JFYWNoKHRhcmdldGluZyA9PiB7XG4gICAgICB0aGlzLnNsb3Quc2V0VGFyZ2V0aW5nKHRhcmdldGluZy5rZXksIHRhcmdldGluZy52YWx1ZXMpO1xuICAgIH0pO1xuXG4gICAgYWQuZXhjbHVzaW9ucy5mb3JFYWNoKGV4Y2x1c2lvbiA9PiB7XG4gICAgICB0aGlzLnNsb3Quc2V0Q2F0ZWdvcnlFeGNsdXNpb24oZXhjbHVzaW9uKTtcbiAgICB9KTtcblxuICAgIGFkLnNjcmlwdHMuZm9yRWFjaChzY3JpcHQgPT4geyBzY3JpcHQodGhpcy5zbG90KTsgfSk7XG5cbiAgICBpZiAodGhpcy5jb25maWcuZW5hYmxlVmlkZW9BZHMpIHtcbiAgICAgIHRoaXMuc2xvdC5hZGRTZXJ2aWNlKGdvb2dsZXRhZy5jb21wYW5pb25BZHMoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5zbG90LmFkZFNlcnZpY2UoZ29vZ2xldGFnLnB1YmFkcygpKTtcblxuICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaENvbnRlbnQoKSB7XG4gICAgdGhpcy5kZnBSZWZyZXNoLnNsb3RSZWZyZXNoKHRoaXMuc2xvdCwgdGhpcy5yZWZyZXNoLCB0cnVlKS50aGVuKHNsb3QgPT4ge1xuICAgICAgdGhpcy5hZnRlclJlZnJlc2guZW1pdCh7IHR5cGU6ICdpbml0Jywgc2xvdDogc2xvdCB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrVmFsaWQoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgREZQSW5jb21wbGV0ZUVycm9yKCdkZnAtYWQnLCAnZGZwLXNpemUnKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmFkVW5pdCkge1xuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLWFkJywgJ2FkLXVuaXQnLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuZGZwUmVmcmVzaC5oaWRkZW5DaGVjayh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBnZXRTdGF0ZSgpIHtcbiAgICB0aGlzLmNoZWNrVmFsaWQoKTtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICBzaXplczogdGhpcy5zaXplcyxcbiAgICAgIHJlc3BvbnNpdmVNYXBwaW5nOiB0aGlzLnJlc3BvbnNpdmVNYXBwaW5nLFxuICAgICAgdGFyZ2V0aW5nczogdGhpcy50YXJnZXRpbmdzLFxuICAgICAgZXhjbHVzaW9uczogdGhpcy5leGNsdXNpb25zLFxuICAgICAgYWRVbml0OiB0aGlzLmFkVW5pdCxcbiAgICAgIGZvcmNlU2FmZUZyYW1lOiB0aGlzLmZvcmNlU2FmZUZyYW1lID09PSB0cnVlLFxuICAgICAgc2FmZUZyYW1lQ29uZmlnOiB0aGlzLnNhZmVGcmFtZUNvbmZpZyxcbiAgICAgIGNsaWNrVXJsOiB0aGlzLmNsaWNrVXJsLFxuICAgICAgcmVmcmVzaDogdGhpcy5yZWZyZXNoLFxuICAgICAgcGVyc29uYWxpemVkQWRzOiB0aGlzLnBlcnNvbmFsaXplZEFkcyA9PT0gdGhpcy5jb25maWcucGVyc29uYWxpemVkQWRzLFxuICAgICAgc2NyaXB0czogdGhpcy5zY3JpcHRzLFxuICAgICAgY29sbGFwc2VJZkVtcHR5OiB0aGlzLmNvbGxhcHNlSWZFbXB0eSA9PT0gdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgYWRkU2l6ZShzaXplKSB7XG4gICAgdGhpcy5zaXplcy5wdXNoKHNpemUpO1xuICB9XG5cbiAgYWRkUmVzcG9uc2l2ZU1hcHBpbmcobWFwcGluZykge1xuICAgIHRoaXMucmVzcG9uc2l2ZU1hcHBpbmcucHVzaChtYXBwaW5nKTtcbiAgfVxuXG4gIGFkZFRhcmdldGluZyh0YXJnZXRpbmcpIHtcbiAgICB0aGlzLnRhcmdldGluZ3MucHVzaCh0YXJnZXRpbmcpO1xuICB9XG5cbiAgYWRkRXhjbHVzaW9uKGV4Y2x1c2lvbikge1xuICAgIHRoaXMuZXhjbHVzaW9ucy5wdXNoKGV4Y2x1c2lvbik7XG4gIH1cblxuICBhZGRTY3JpcHQoc2NyaXB0KSB7XG4gICAgdGhpcy5zY3JpcHRzLnB1c2goc2NyaXB0KTtcbiAgfVxuXG59XG4iXX0=