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
            this.dfpRefresh.refreshEvent.subscribe(slot => {
                if (slot === this.slot) {
                    this.afterRefresh.emit({ type: 'refresh', slot: slot });
                }
            });
            if (router) {
                this.onSameNavigation = router.events.pipe(filter(event => event instanceof NavigationEnd))
                    .subscribe((event) => {
                    if (this.slot && !this.refresh && this.config.onSameNavigation === 'refresh') {
                        this.refreshContent.call(this);
                    }
                });
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
            this.dfp.defineTask(() => {
                this.defineSlot();
            });
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
        ad.responsiveMapping.forEach(mapping => {
            sizeMapping.addSize(mapping.viewportSize, mapping.adSizes);
        });
        slot.defineSizeMapping(sizeMapping.build());
    }
    /**
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
        this.slot.renderEnded = (googleSlotEvent) => {
            this.afterRefresh.emit({ type: 'renderEnded', slot: this.slot, data: googleSlotEvent });
        };
        this.setResponsiveMapping(this.slot);
        ad.targetings.forEach(targeting => {
            this.slot.setTargeting(targeting.key, targeting.values);
        });
        ad.exclusions.forEach(exclusion => {
            this.slot.setCategoryExclusion(exclusion);
        });
        ad.scripts.forEach(script => { script(this.slot); });
        if (this.config.enableVideoAds) {
            this.slot.addService(googletag.companionAds());
        }
        this.slot.addService(googletag.pubads());
        this.refreshContent();
    }
    /**
     * @return {?}
     */
    refreshContent() {
        this.dfpRefresh.slotRefresh(this.slot, this.refresh, true).then(slot => {
            this.afterRefresh.emit({ type: 'init', slot: slot });
        });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWFkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLWFkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxVQUFVLEVBQ3JCLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUNPLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUNoRSxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR3hELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsVUFBVSxHQUFHLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLHFCQUFxQixHQUFHLE1BQU0scUNBQXFDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFbkUsT0FBTyxFQUFFLGtCQUFrQixFQUFjLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNyRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJeEQsTUFBTTtDQUlMOzs7Ozs7Ozs7QUFLRCxNQUFNOzs7Ozs7Ozs7O0lBMEJKLFlBQytCLFVBQWtCLEVBQ3ZDLFlBQ0EsS0FDQSxnQkFDQSxZQUNvQixNQUFpQixFQUNqQyxNQUFjO1FBTkcsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxlQUFVLEdBQVYsVUFBVTtRQUNWLFFBQUcsR0FBSCxHQUFHO1FBQ0gsbUJBQWMsR0FBZCxjQUFjO1FBQ2QsZUFBVSxHQUFWLFVBQVU7UUFDVSxXQUFNLEdBQU4sTUFBTSxDQUFXOytCQXpCWCxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWU7NEJBR1As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Q0wsS0FBSzsyQkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLFxuICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsXG4gIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBJbmplY3QsIFBMQVRGT1JNX0lELCBPcHRpb25hbFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBEZnBTZXJ2aWNlLCB9IGZyb20gJy4uL3NlcnZpY2UvZGZwLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGZwSURHZW5lcmF0b3JTZXJ2aWNlLCB9IGZyb20gJy4uL3NlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IERmcFJlZnJlc2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9kZnAtcmVmcmVzaC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgREZQSW5jb21wbGV0ZUVycm9yLCBHb29nbGVTbG90LCBEZnBDb25maWcgfSBmcm9tICcuLi9jbGFzcyc7XG5pbXBvcnQgeyBERlBfQ09ORklHIH0gZnJvbSAnLi4vc2VydmljZS9pbmplY3Rpb25fdG9rZW4nO1xuXG5kZWNsYXJlIHZhciBnb29nbGV0YWc7XG5cbmV4cG9ydCBjbGFzcyBEZnBSZWZyZXNoRXZlbnQge1xuICB0eXBlOiBzdHJpbmc7XG4gIHNsb3Q6IGFueTtcbiAgZGF0YT86IGFueTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGZwLWFkJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBBZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBhZFVuaXQ6IHN0cmluZztcbiAgQElucHV0KCkgY2xpY2tVcmw6IHN0cmluZztcbiAgQElucHV0KCkgZm9yY2VTYWZlRnJhbWU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNhZmVGcmFtZUNvbmZpZzogc3RyaW5nO1xuICBASW5wdXQoKSByZWZyZXNoOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBlcnNvbmFsaXplZEFkczogYm9vbGVhbiA9IHRoaXMuY29uZmlnLnBlcnNvbmFsaXplZEFkcztcbiAgQElucHV0KCkgY29sbGFwc2VJZkVtcHR5OiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKSBhZnRlclJlZnJlc2g6IEV2ZW50RW1pdHRlcjxEZnBSZWZyZXNoRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgc2l6ZXMgPSBbXTtcblxuICBwcml2YXRlIHJlc3BvbnNpdmVNYXBwaW5nID0gW107XG5cbiAgcHJpdmF0ZSB0YXJnZXRpbmdzID0gW107XG5cbiAgcHJpdmF0ZSBleGNsdXNpb25zID0gW107XG5cbiAgcHJpdmF0ZSBzY3JpcHRzID0gW107XG5cbiAgcHJpdmF0ZSBzbG90OiBHb29nbGVTbG90O1xuXG4gIHByaXZhdGUgb25TYW1lTmF2aWdhdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGRmcDogRGZwU2VydmljZSxcbiAgICBwcml2YXRlIGRmcElER2VuZXJhdG9yOiBEZnBJREdlbmVyYXRvclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkZnBSZWZyZXNoOiBEZnBSZWZyZXNoU2VydmljZSxcbiAgICBASW5qZWN0KERGUF9DT05GSUcpIHByaXZhdGUgY29uZmlnOiBEZnBDb25maWcsXG4gICAgQE9wdGlvbmFsKCkgcm91dGVyOiBSb3V0ZXJcbiAgKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuZGZwUmVmcmVzaC5yZWZyZXNoRXZlbnQuc3Vic2NyaWJlKHNsb3QgPT4ge1xuICAgICAgICBpZiAoc2xvdCA9PT0gdGhpcy5zbG90KSB7XG4gICAgICAgICAgdGhpcy5hZnRlclJlZnJlc2guZW1pdCh7IHR5cGU6ICdyZWZyZXNoJywgc2xvdDogc2xvdCB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAocm91dGVyKSB7XG4gICAgICAgIHRoaXMub25TYW1lTmF2aWdhdGlvbiA9IHJvdXRlci5ldmVudHMucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKChldmVudDogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2xvdCAmJiAhdGhpcy5yZWZyZXNoICYmIHRoaXMuY29uZmlnLm9uU2FtZU5hdmlnYXRpb24gPT09ICdyZWZyZXNoJykge1xuICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50LmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuZGZwSURHZW5lcmF0b3IuZGZwSURHZW5lcmF0b3IodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5kZnAuZGVmaW5lVGFzaygoKSA9PiB7XG4gICAgICAgIHRoaXMuZGVmaW5lU2xvdCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc2xvdCkge1xuICAgICAgZ29vZ2xldGFnLmRlc3Ryb3lTbG90cyhbdGhpcy5zbG90XSk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9uU2FtZU5hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMub25TYW1lTmF2aWdhdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0UmVzcG9uc2l2ZU1hcHBpbmcoc2xvdCkge1xuICAgIGNvbnN0IGFkID0gdGhpcy5nZXRTdGF0ZSgpO1xuXG4gICAgaWYgKGFkLnJlc3BvbnNpdmVNYXBwaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNpemVNYXBwaW5nID0gZ29vZ2xldGFnLnNpemVNYXBwaW5nKCk7XG5cbiAgICBhZC5yZXNwb25zaXZlTWFwcGluZy5mb3JFYWNoKG1hcHBpbmcgPT4ge1xuICAgICAgc2l6ZU1hcHBpbmcuYWRkU2l6ZShtYXBwaW5nLnZpZXdwb3J0U2l6ZSwgbWFwcGluZy5hZFNpemVzKTtcbiAgICB9KTtcblxuICAgIHNsb3QuZGVmaW5lU2l6ZU1hcHBpbmcoc2l6ZU1hcHBpbmcuYnVpbGQoKSk7XG4gIH1cblxuICBwcml2YXRlIGRlZmluZVNsb3QoKSB7XG4gICAgY29uc3QgYWQgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICBlbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICB0aGlzLnNsb3QgPSBnb29nbGV0YWcuZGVmaW5lU2xvdChhZC5hZFVuaXQsIGFkLnNpemVzLCBlbGVtZW50LmlkKTtcblxuICAgIGlmICh0aGlzLmZvcmNlU2FmZUZyYW1lICE9PSB1bmRlZmluZWQgJiYgYWQuZm9yY2VTYWZlRnJhbWUgPT09ICF0aGlzLmNvbmZpZy5mb3JjZVNhZmVGcmFtZSkge1xuICAgICAgdGhpcy5zbG90LnNldEZvcmNlU2FmZUZyYW1lKGFkLmZvcmNlU2FmZUZyYW1lKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wZXJzb25hbGl6ZWRBZHMgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnNsb3Quc2V0KCdyZXF1ZXN0Tm9uUGVyc29uYWxpemVkQWRzJywgMSk7XG4gICAgICBnb29nbGV0YWcucHViYWRzKCkuc2V0UmVxdWVzdE5vblBlcnNvbmFsaXplZEFkcygxKTtcbiAgICB9XG5cbiAgICBpZiAoYWQuY2xpY2tVcmwpIHtcbiAgICAgIHRoaXMuc2xvdC5zZXRDbGlja1VybChhZC5jbGlja1VybCk7XG4gICAgfVxuXG4gICAgaWYgKGFkLmNvbGxhcHNlSWZFbXB0eSkge1xuICAgICAgdGhpcy5zbG90LnNldENvbGxhcHNlRW1wdHlEaXYodHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaWYgKGFkLnNhZmVGcmFtZUNvbmZpZykge1xuICAgICAgdGhpcy5zbG90LnNldFNhZmVGcmFtZUNvbmZpZyhcbiAgICAgICAgKEpTT04ucGFyc2UoYWQuc2FmZUZyYW1lQ29uZmlnKSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5zbG90LnJlbmRlckVuZGVkID0gKGdvb2dsZVNsb3RFdmVudDogSUFyZ3VtZW50cykgPT4ge1xuICAgICAgdGhpcy5hZnRlclJlZnJlc2guZW1pdCh7IHR5cGU6ICdyZW5kZXJFbmRlZCcsIHNsb3Q6IHRoaXMuc2xvdCwgZGF0YTogZ29vZ2xlU2xvdEV2ZW50IH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnNldFJlc3BvbnNpdmVNYXBwaW5nKHRoaXMuc2xvdCk7XG5cbiAgICBhZC50YXJnZXRpbmdzLmZvckVhY2godGFyZ2V0aW5nID0+IHtcbiAgICAgIHRoaXMuc2xvdC5zZXRUYXJnZXRpbmcodGFyZ2V0aW5nLmtleSwgdGFyZ2V0aW5nLnZhbHVlcyk7XG4gICAgfSk7XG5cbiAgICBhZC5leGNsdXNpb25zLmZvckVhY2goZXhjbHVzaW9uID0+IHtcbiAgICAgIHRoaXMuc2xvdC5zZXRDYXRlZ29yeUV4Y2x1c2lvbihleGNsdXNpb24pO1xuICAgIH0pO1xuXG4gICAgYWQuc2NyaXB0cy5mb3JFYWNoKHNjcmlwdCA9PiB7IHNjcmlwdCh0aGlzLnNsb3QpOyB9KTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5lbmFibGVWaWRlb0Fkcykge1xuICAgICAgdGhpcy5zbG90LmFkZFNlcnZpY2UoZ29vZ2xldGFnLmNvbXBhbmlvbkFkcygpKTtcbiAgICB9XG5cbiAgICB0aGlzLnNsb3QuYWRkU2VydmljZShnb29nbGV0YWcucHViYWRzKCkpO1xuXG4gICAgdGhpcy5yZWZyZXNoQ29udGVudCgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoQ29udGVudCgpIHtcbiAgICB0aGlzLmRmcFJlZnJlc2guc2xvdFJlZnJlc2godGhpcy5zbG90LCB0aGlzLnJlZnJlc2gsIHRydWUpLnRoZW4oc2xvdCA9PiB7XG4gICAgICB0aGlzLmFmdGVyUmVmcmVzaC5lbWl0KHsgdHlwZTogJ2luaXQnLCBzbG90OiBzbG90IH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tWYWxpZCgpIHtcbiAgICBpZiAodGhpcy5zaXplcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBERlBJbmNvbXBsZXRlRXJyb3IoJ2RmcC1hZCcsICdkZnAtc2l6ZScpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuYWRVbml0KSB7XG4gICAgICB0aHJvdyBuZXcgREZQSW5jb21wbGV0ZUVycm9yKCdkZnAtYWQnLCAnYWQtdW5pdCcsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpc0hpZGRlbigpIHtcbiAgICByZXR1cm4gdGhpcy5kZnBSZWZyZXNoLmhpZGRlbkNoZWNrKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIGdldFN0YXRlKCkge1xuICAgIHRoaXMuY2hlY2tWYWxpZCgpO1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcbiAgICAgIHNpemVzOiB0aGlzLnNpemVzLFxuICAgICAgcmVzcG9uc2l2ZU1hcHBpbmc6IHRoaXMucmVzcG9uc2l2ZU1hcHBpbmcsXG4gICAgICB0YXJnZXRpbmdzOiB0aGlzLnRhcmdldGluZ3MsXG4gICAgICBleGNsdXNpb25zOiB0aGlzLmV4Y2x1c2lvbnMsXG4gICAgICBhZFVuaXQ6IHRoaXMuYWRVbml0LFxuICAgICAgZm9yY2VTYWZlRnJhbWU6IHRoaXMuZm9yY2VTYWZlRnJhbWUgPT09IHRydWUsXG4gICAgICBzYWZlRnJhbWVDb25maWc6IHRoaXMuc2FmZUZyYW1lQ29uZmlnLFxuICAgICAgY2xpY2tVcmw6IHRoaXMuY2xpY2tVcmwsXG4gICAgICByZWZyZXNoOiB0aGlzLnJlZnJlc2gsXG4gICAgICBwZXJzb25hbGl6ZWRBZHM6IHRoaXMucGVyc29uYWxpemVkQWRzID09PSB0aGlzLmNvbmZpZy5wZXJzb25hbGl6ZWRBZHMsXG4gICAgICBzY3JpcHRzOiB0aGlzLnNjcmlwdHMsXG4gICAgICBjb2xsYXBzZUlmRW1wdHk6IHRoaXMuY29sbGFwc2VJZkVtcHR5ID09PSB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBhZGRTaXplKHNpemUpIHtcbiAgICB0aGlzLnNpemVzLnB1c2goc2l6ZSk7XG4gIH1cblxuICBhZGRSZXNwb25zaXZlTWFwcGluZyhtYXBwaW5nKSB7XG4gICAgdGhpcy5yZXNwb25zaXZlTWFwcGluZy5wdXNoKG1hcHBpbmcpO1xuICB9XG5cbiAgYWRkVGFyZ2V0aW5nKHRhcmdldGluZykge1xuICAgIHRoaXMudGFyZ2V0aW5ncy5wdXNoKHRhcmdldGluZyk7XG4gIH1cblxuICBhZGRFeGNsdXNpb24oZXhjbHVzaW9uKSB7XG4gICAgdGhpcy5leGNsdXNpb25zLnB1c2goZXhjbHVzaW9uKTtcbiAgfVxuXG4gIGFkZFNjcmlwdChzY3JpcHQpIHtcbiAgICB0aGlzLnNjcmlwdHMucHVzaChzY3JpcHQpO1xuICB9XG5cbn1cbiJdfQ==