/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Inject, PLATFORM_ID, ElementRef, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { loadImaSdk } from '@alugha/ima';
import { DfpIDGeneratorService } from '../service/dfp-id-generator.service';
export class DfpVideoDirective {
    /**
     * @param {?} platformId
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} dfpIDGenerator
     */
    constructor(platformId, elementRef, renderer, dfpIDGenerator) {
        this.platformId = platformId;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.dfpIDGenerator = dfpIDGenerator;
        this.adEvents = new EventEmitter();
        this.adsDone = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            const el = this.elementRef.nativeElement;
            this.dfpIDGenerator.dfpIDGenerator(el);
            this.contentPlayer = el.querySelector('video');
            this.renderer.setAttribute(this.contentPlayer, 'width', this.width.toString());
            this.renderer.setAttribute(this.contentPlayer, 'height', this.height.toString());
            this.adContainer = el.querySelector('.ad-container');
            if (!this.adContainer) {
                this.adContainer = this.renderer.createElement('div');
                this.renderer.addClass(this.adContainer, 'ad-container');
                this.renderer.appendChild(el, this.adContainer);
            }
            // ima setup
            loadImaSdk().then((/**
             * @return {?}
             */
            () => this.setUpIMA()));
            // simple control
            this.adActions.subscribe((/**
             * @param {?} act
             * @return {?}
             */
            act => {
                switch (act) {
                    case 'play':
                        this.play();
                        break;
                    case 'pause':
                        this.pause();
                        break;
                    case 'resume':
                        this.resume();
                        break;
                }
            }));
        }
    }
    /**
     * @return {?}
     */
    play() {
        if (!this.adsDone) {
            this.initialUserAction();
            this.loadAds();
            this.adsDone = true;
        }
    }
    /**
     * @return {?}
     */
    pause() {
        if (this.adsManager) {
            this.adsManager.pause();
        }
    }
    /**
     * @return {?}
     */
    resume() {
        if (this.adsManager) {
            this.adsManager.resume();
        }
    }
    /**
     * @return {?}
     */
    setUpIMA() {
        // Create the ad display container.
        this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainer, this.contentPlayer);
        // Create ads loader.
        this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
        // Listen and respond to ads loaded and error events.
        this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, (/**
         * @param {?} event
         * @return {?}
         */
        event => this.onAdsManagerLoaded(event)), false);
        this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (/**
         * @param {?} event
         * @return {?}
         */
        event => this.onAdError(event)), false);
        // An event listener to tell the SDK that our content video
        // is completed so the SDK can play any post-roll ads.
        this.contentPlayer.onended = (/**
         * @return {?}
         */
        () => {
            this.contentEnded();
        });
    }
    /**
     * @return {?}
     */
    initialUserAction() {
        this.adDisplayContainer.initialize();
        this.contentPlayer.load();
    }
    /**
     * @param {?} adTagUrl
     * @return {?}
     */
    requestAds(adTagUrl) {
        /** @type {?} */
        const adsRequest = new google.ima.AdsRequest();
        adsRequest.adTagUrl = adTagUrl;
        adsRequest.linearAdSlotWidth = this.width;
        adsRequest.linearAdSlotHeight = this.height;
        adsRequest.nonLinearAdSlotWidth = this.width;
        adsRequest.nonLinearAdSlotHeight = this.height;
        this.adsLoader.requestAds(adsRequest);
    }
    /**
     * @return {?}
     */
    contentEnded() {
        this.contentCompleteCalled = true;
        this.adsLoader.contentComplete();
    }
    /**
     * @param {?} adsManagerLoadedEvent
     * @return {?}
     */
    onAdsManagerLoaded(adsManagerLoadedEvent) {
        /** @type {?} */
        const adsRenderingSettings = new google.ima.AdsRenderingSettings();
        adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
        this.adsManager = adsManagerLoadedEvent.getAdsManager(this.contentPlayer, adsRenderingSettings);
        this.startAdsManager(this.adsManager);
    }
    /**
     * @param {?} adsManager
     * @return {?}
     */
    startAdsManager(adsManager) {
        // Attach the pause/resume events.
        adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, (/**
         * @return {?}
         */
        () => this.onContentPauseRequested()), false, this);
        adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, (/**
         * @return {?}
         */
        () => this.onContentResumeRequested()), false, this);
        // Handle errors.
        adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (/**
         * @param {?} event
         * @return {?}
         */
        event => this.onAdError(event)), false, this);
        /** @type {?} */
        const events = [google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
            google.ima.AdEvent.Type.CLICK,
            google.ima.AdEvent.Type.COMPLETE,
            google.ima.AdEvent.Type.FIRST_QUARTILE,
            google.ima.AdEvent.Type.LOADED,
            google.ima.AdEvent.Type.MIDPOINT,
            google.ima.AdEvent.Type.PAUSED,
            google.ima.AdEvent.Type.STARTED,
            google.ima.AdEvent.Type.THIRD_QUARTILE];
        events.forEach((/**
         * @param {?} event
         * @return {?}
         */
        event => adsManager.addEventListener(event, (/**
         * @param {?} adEvent
         * @return {?}
         */
        adEvent => this.onAdEvent(adEvent)), false)));
        adsManager.init(this.width, this.height, google.ima.ViewMode.NORMAL);
        adsManager.start();
    }
    /**
     * @return {?}
     */
    onContentPauseRequested() {
        this.pauseForAd();
    }
    /**
     * @return {?}
     */
    onContentResumeRequested() {
        // Without this check the video starts over from the beginning on a
        // post-roll's CONTENT_RESUME_REQUESTED
        if (!this.contentCompleteCalled) {
            this.resumeAfterAd();
        }
    }
    /**
     * @param {?} adEvent
     * @return {?}
     */
    onAdEvent(adEvent) {
        if (adEvent.type === google.ima.AdEvent.Type.LOADED) {
            /** @type {?} */
            const ad = adEvent.getAd();
            if (!ad.isLinear()) {
                this.onContentResumeRequested();
            }
        }
        this.adEvents.emit(adEvent);
    }
    /**
     * @param {?} adErrorEvent
     * @return {?}
     */
    onAdError(adErrorEvent) {
        if (this.adsManager) {
            this.adsManager.destroy();
        }
        this.resumeAfterAd();
        this.adEvents.emit(adErrorEvent);
    }
    // application functions
    /**
     * @return {?}
     */
    resumeAfterAd() {
        this.contentPlayer.play();
    }
    /**
     * @return {?}
     */
    pauseForAd() {
        this.contentPlayer.pause();
    }
    /**
     * @return {?}
     */
    loadAds() {
        this.requestAds(this.adTag);
    }
}
DfpVideoDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-video'
            },] }
];
/** @nocollapse */
DfpVideoDirective.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ElementRef },
    { type: Renderer2 },
    { type: DfpIDGeneratorService }
];
DfpVideoDirective.propDecorators = {
    width: [{ type: Input }],
    height: [{ type: Input }],
    adTag: [{ type: Input }],
    adActions: [{ type: Input }],
    adEvents: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    DfpVideoDirective.prototype.width;
    /** @type {?} */
    DfpVideoDirective.prototype.height;
    /** @type {?} */
    DfpVideoDirective.prototype.adTag;
    /** @type {?} */
    DfpVideoDirective.prototype.adActions;
    /** @type {?} */
    DfpVideoDirective.prototype.adEvents;
    /** @type {?} */
    DfpVideoDirective.prototype.contentPlayer;
    /** @type {?} */
    DfpVideoDirective.prototype.adContainer;
    /**
     * @type {?}
     * @private
     */
    DfpVideoDirective.prototype.contentCompleteCalled;
    /**
     * @type {?}
     * @private
     */
    DfpVideoDirective.prototype.adDisplayContainer;
    /**
     * @type {?}
     * @private
     */
    DfpVideoDirective.prototype.adsLoader;
    /**
     * @type {?}
     * @private
     */
    DfpVideoDirective.prototype.adsManager;
    /**
     * @type {?}
     * @private
     */
    DfpVideoDirective.prototype.adsDone;
    /**
     * @type {?}
     * @private
     */
    DfpVideoDirective.prototype.platformId;
    /**
     * @type {?}
     * @private
     */
    DfpVideoDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    DfpVideoDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    DfpVideoDirective.prototype.dfpIDGenerator;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXZpZGVvLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvdmlkZW8vIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLXZpZGVvLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0gsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV6QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUs1RSxNQUFNLE9BQU8saUJBQWlCOzs7Ozs7O0lBbUI1QixZQUMrQixVQUFrQixFQUN2QyxVQUFzQixFQUN0QixRQUFtQixFQUNuQixjQUFxQztRQUhoQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ3ZDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7UUFmckMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFTckMsWUFBTyxHQUFHLEtBQUssQ0FBQztJQU9wQixDQUFDOzs7O0lBRUwsUUFBUTtRQUNOLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFOztrQkFFaEMsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYTtZQUV4QyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUV2QyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQy9FLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUVqRixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDakQ7WUFFRCxZQUFZO1lBQ1osVUFBVSxFQUFFLENBQUMsSUFBSTs7O1lBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFDLENBQUM7WUFFekMsaUJBQWlCO1lBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUzs7OztZQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUM3QixRQUFRLEdBQUcsRUFBRTtvQkFDWCxLQUFLLE1BQU07d0JBQ1QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUNaLE1BQU07b0JBQ1IsS0FBSyxPQUFPO3dCQUNWLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDYixNQUFNO29CQUNSLEtBQUssUUFBUTt3QkFDWCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQ2QsTUFBTTtpQkFDVDtZQUNILENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7O0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQzs7OztJQUVELEtBQUs7UUFDSCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7Ozs7SUFFRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xHLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbkUscURBQXFEO1FBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGtCQUFrQjs7OztRQUN4RCxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsR0FDdkMsS0FBSyxDQUFDLENBQUM7UUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUM3QixNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUTs7OztRQUNyQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQzlCLEtBQUssQ0FBQyxDQUFDO1FBRVQsMkRBQTJEO1FBQzNELHNEQUFzRDtRQUN0RCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU87OztRQUFHLEdBQUcsRUFBRTtZQUNoQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFBLENBQUM7SUFDSixDQUFDOzs7O0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsUUFBUTs7Y0FDWCxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtRQUM5QyxVQUFVLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUMvQixVQUFVLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMxQyxVQUFVLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM1QyxVQUFVLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUM3QyxVQUFVLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzs7OztJQUVELGtCQUFrQixDQUFDLHFCQUFxQjs7Y0FDaEMsb0JBQW9CLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFO1FBQ2xFLG9CQUFvQixDQUFDLDJDQUEyQyxHQUFHLElBQUksQ0FBQztRQUN4RSxJQUFJLENBQUMsVUFBVSxHQUFHLHFCQUFxQixDQUFDLGFBQWEsQ0FDbkQsSUFBSSxDQUFDLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7O0lBRUQsZUFBZSxDQUFDLFVBQVU7UUFDeEIsa0NBQWtDO1FBQ2xDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FDekIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1Qjs7O1FBQy9DLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxHQUNwQyxLQUFLLEVBQ0wsSUFBSSxDQUFDLENBQUM7UUFDUixVQUFVLENBQUMsZ0JBQWdCLENBQ3pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx3QkFBd0I7OztRQUNoRCxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsR0FDckMsS0FBSyxFQUNMLElBQUksQ0FBQyxDQUFDO1FBQ1IsaUJBQWlCO1FBQ2pCLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FDekIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVE7Ozs7UUFDckMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUM5QixLQUFLLEVBQ0wsSUFBSSxDQUFDLENBQUM7O2NBQ0YsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQjtZQUN6RCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSztZQUM3QixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUNoQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYztZQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUM5QixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUNoQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUM5QixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTztZQUMvQixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxPQUFPOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUUsQ0FDckIsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7Ozs7UUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUUsS0FBSyxDQUFDLEVBQzlFLENBQUM7UUFFRixVQUFVLENBQUMsSUFBSSxDQUNiLElBQUksQ0FBQyxLQUFLLEVBQ1YsSUFBSSxDQUFDLE1BQU0sRUFDWCxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU5QixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7OztJQUVELHVCQUF1QjtRQUNyQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7OztJQUVELHdCQUF3QjtRQUN0QixtRUFBbUU7UUFDbkUsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsT0FBTztRQUNmLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFOztrQkFDN0MsRUFBRSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDMUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7YUFDakM7U0FDRjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLFlBQVk7UUFDcEIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFJRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7O0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7WUExTkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2FBQ3RCOzs7O1lBcUI0QyxNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVztZQTlCa0IsVUFBVTtZQUF1QyxTQUFTO1lBSzFGLHFCQUFxQjs7O29CQU8zQixLQUFLO3FCQUNMLEtBQUs7b0JBRUwsS0FBSzt3QkFDTCxLQUFLO3VCQUVMLE1BQU07Ozs7SUFOUCxrQ0FBdUI7O0lBQ3ZCLG1DQUF3Qjs7SUFFeEIsa0NBQXVCOztJQUN2QixzQ0FBOEQ7O0lBRTlELHFDQUE2Qzs7SUFFN0MsMENBQWdDOztJQUNoQyx3Q0FBeUI7Ozs7O0lBRXpCLGtEQUF1Qzs7Ozs7SUFDdkMsK0NBQTBEOzs7OztJQUMxRCxzQ0FBd0M7Ozs7O0lBQ3hDLHVDQUEwQzs7Ozs7SUFDMUMsb0NBQXdCOzs7OztJQUd0Qix1Q0FBK0M7Ozs7O0lBQy9DLHVDQUE4Qjs7Ozs7SUFDOUIscUNBQTJCOzs7OztJQUMzQiwyQ0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdCwgUExBVEZPUk1fSUQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgbG9hZEltYVNkayB9IGZyb20gJ0BhbHVnaGEvaW1hJztcblxuaW1wb3J0IHsgRGZwSURHZW5lcmF0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9kZnAtaWQtZ2VuZXJhdG9yLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkZnAtdmlkZW8nXG59KVxuZXhwb3J0IGNsYXNzIERmcFZpZGVvRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcblxuICBASW5wdXQoKSBhZFRhZzogc3RyaW5nO1xuICBASW5wdXQoKSBhZEFjdGlvbnM6IEV2ZW50RW1pdHRlcjwncGxheScgfCAncGF1c2UnIHwgJ3Jlc3VtZSc+O1xuXG4gIEBPdXRwdXQoKSBhZEV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnRlbnRQbGF5ZXI6IEhUTUxWaWRlb0VsZW1lbnQ7XG4gIGFkQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcblxuICBwcml2YXRlIGNvbnRlbnRDb21wbGV0ZUNhbGxlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBhZERpc3BsYXlDb250YWluZXI6IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyO1xuICBwcml2YXRlIGFkc0xvYWRlcjogZ29vZ2xlLmltYS5BZHNMb2FkZXI7XG4gIHByaXZhdGUgYWRzTWFuYWdlcjogZ29vZ2xlLmltYS5BZHNNYW5hZ2VyO1xuICBwcml2YXRlIGFkc0RvbmUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZGZwSURHZW5lcmF0b3I6IERmcElER2VuZXJhdG9yU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG5cbiAgICAgIGNvbnN0IGVsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIHRoaXMuZGZwSURHZW5lcmF0b3IuZGZwSURHZW5lcmF0b3IoZWwpO1xuXG4gICAgICB0aGlzLmNvbnRlbnRQbGF5ZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5jb250ZW50UGxheWVyLCAnd2lkdGgnLCB0aGlzLndpZHRoLnRvU3RyaW5nKCkpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5jb250ZW50UGxheWVyLCAnaGVpZ2h0JywgdGhpcy5oZWlnaHQudG9TdHJpbmcoKSk7XG5cbiAgICAgIHRoaXMuYWRDb250YWluZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCcuYWQtY29udGFpbmVyJyk7XG4gICAgICBpZiAoIXRoaXMuYWRDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5hZENvbnRhaW5lciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5hZENvbnRhaW5lciwgJ2FkLWNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGVsLCB0aGlzLmFkQ29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgLy8gaW1hIHNldHVwXG4gICAgICBsb2FkSW1hU2RrKCkudGhlbigoKSA9PiB0aGlzLnNldFVwSU1BKCkpO1xuXG4gICAgICAvLyBzaW1wbGUgY29udHJvbFxuICAgICAgdGhpcy5hZEFjdGlvbnMuc3Vic2NyaWJlKGFjdCA9PiB7XG4gICAgICAgIHN3aXRjaCAoYWN0KSB7XG4gICAgICAgICAgY2FzZSAncGxheSc6XG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3BhdXNlJzpcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3Jlc3VtZSc6XG4gICAgICAgICAgICB0aGlzLnJlc3VtZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgaWYgKCF0aGlzLmFkc0RvbmUpIHtcbiAgICAgIHRoaXMuaW5pdGlhbFVzZXJBY3Rpb24oKTtcbiAgICAgIHRoaXMubG9hZEFkcygpO1xuICAgICAgdGhpcy5hZHNEb25lID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICBpZiAodGhpcy5hZHNNYW5hZ2VyKSB7XG4gICAgICB0aGlzLmFkc01hbmFnZXIucGF1c2UoKTtcbiAgICB9XG4gIH1cblxuICByZXN1bWUoKSB7XG4gICAgaWYgKHRoaXMuYWRzTWFuYWdlcikge1xuICAgICAgdGhpcy5hZHNNYW5hZ2VyLnJlc3VtZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldFVwSU1BKCkge1xuICAgIC8vIENyZWF0ZSB0aGUgYWQgZGlzcGxheSBjb250YWluZXIuXG4gICAgdGhpcy5hZERpc3BsYXlDb250YWluZXIgPSBuZXcgZ29vZ2xlLmltYS5BZERpc3BsYXlDb250YWluZXIodGhpcy5hZENvbnRhaW5lciwgdGhpcy5jb250ZW50UGxheWVyKTtcbiAgICAvLyBDcmVhdGUgYWRzIGxvYWRlci5cbiAgICB0aGlzLmFkc0xvYWRlciA9IG5ldyBnb29nbGUuaW1hLkFkc0xvYWRlcih0aGlzLmFkRGlzcGxheUNvbnRhaW5lcik7XG4gICAgLy8gTGlzdGVuIGFuZCByZXNwb25kIHRvIGFkcyBsb2FkZWQgYW5kIGVycm9yIGV2ZW50cy5cbiAgICB0aGlzLmFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgZ29vZ2xlLmltYS5BZHNNYW5hZ2VyTG9hZGVkRXZlbnQuVHlwZS5BRFNfTUFOQUdFUl9MT0FERUQsXG4gICAgICBldmVudCA9PiB0aGlzLm9uQWRzTWFuYWdlckxvYWRlZChldmVudCksXG4gICAgICBmYWxzZSk7XG4gICAgdGhpcy5hZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1IsXG4gICAgICBldmVudCA9PiB0aGlzLm9uQWRFcnJvcihldmVudCksXG4gICAgICBmYWxzZSk7XG5cbiAgICAvLyBBbiBldmVudCBsaXN0ZW5lciB0byB0ZWxsIHRoZSBTREsgdGhhdCBvdXIgY29udGVudCB2aWRlb1xuICAgIC8vIGlzIGNvbXBsZXRlZCBzbyB0aGUgU0RLIGNhbiBwbGF5IGFueSBwb3N0LXJvbGwgYWRzLlxuICAgIHRoaXMuY29udGVudFBsYXllci5vbmVuZGVkID0gKCkgPT4ge1xuICAgICAgdGhpcy5jb250ZW50RW5kZWQoKTtcbiAgICB9O1xuICB9XG5cbiAgaW5pdGlhbFVzZXJBY3Rpb24oKSB7XG4gICAgdGhpcy5hZERpc3BsYXlDb250YWluZXIuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMuY29udGVudFBsYXllci5sb2FkKCk7XG4gIH1cblxuICByZXF1ZXN0QWRzKGFkVGFnVXJsKSB7XG4gICAgY29uc3QgYWRzUmVxdWVzdCA9IG5ldyBnb29nbGUuaW1hLkFkc1JlcXVlc3QoKTtcbiAgICBhZHNSZXF1ZXN0LmFkVGFnVXJsID0gYWRUYWdVcmw7XG4gICAgYWRzUmVxdWVzdC5saW5lYXJBZFNsb3RXaWR0aCA9IHRoaXMud2lkdGg7XG4gICAgYWRzUmVxdWVzdC5saW5lYXJBZFNsb3RIZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICBhZHNSZXF1ZXN0Lm5vbkxpbmVhckFkU2xvdFdpZHRoID0gdGhpcy53aWR0aDtcbiAgICBhZHNSZXF1ZXN0Lm5vbkxpbmVhckFkU2xvdEhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMuYWRzTG9hZGVyLnJlcXVlc3RBZHMoYWRzUmVxdWVzdCk7XG4gIH1cblxuICBjb250ZW50RW5kZWQoKSB7XG4gICAgdGhpcy5jb250ZW50Q29tcGxldGVDYWxsZWQgPSB0cnVlO1xuICAgIHRoaXMuYWRzTG9hZGVyLmNvbnRlbnRDb21wbGV0ZSgpO1xuICB9XG5cbiAgb25BZHNNYW5hZ2VyTG9hZGVkKGFkc01hbmFnZXJMb2FkZWRFdmVudCkge1xuICAgIGNvbnN0IGFkc1JlbmRlcmluZ1NldHRpbmdzID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVuZGVyaW5nU2V0dGluZ3MoKTtcbiAgICBhZHNSZW5kZXJpbmdTZXR0aW5ncy5yZXN0b3JlQ3VzdG9tUGxheWJhY2tTdGF0ZU9uQWRCcmVha0NvbXBsZXRlID0gdHJ1ZTtcbiAgICB0aGlzLmFkc01hbmFnZXIgPSBhZHNNYW5hZ2VyTG9hZGVkRXZlbnQuZ2V0QWRzTWFuYWdlcihcbiAgICAgIHRoaXMuY29udGVudFBsYXllciwgYWRzUmVuZGVyaW5nU2V0dGluZ3MpO1xuICAgIHRoaXMuc3RhcnRBZHNNYW5hZ2VyKHRoaXMuYWRzTWFuYWdlcik7XG4gIH1cblxuICBzdGFydEFkc01hbmFnZXIoYWRzTWFuYWdlcikge1xuICAgIC8vIEF0dGFjaCB0aGUgcGF1c2UvcmVzdW1lIGV2ZW50cy5cbiAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1BBVVNFX1JFUVVFU1RFRCxcbiAgICAgICgpID0+IHRoaXMub25Db250ZW50UGF1c2VSZXF1ZXN0ZWQoKSxcbiAgICAgIGZhbHNlLFxuICAgICAgdGhpcyk7XG4gICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVELFxuICAgICAgKCkgPT4gdGhpcy5vbkNvbnRlbnRSZXN1bWVSZXF1ZXN0ZWQoKSxcbiAgICAgIGZhbHNlLFxuICAgICAgdGhpcyk7XG4gICAgLy8gSGFuZGxlIGVycm9ycy5cbiAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SLFxuICAgICAgZXZlbnQgPT4gdGhpcy5vbkFkRXJyb3IoZXZlbnQpLFxuICAgICAgZmFsc2UsXG4gICAgICB0aGlzKTtcbiAgICBjb25zdCBldmVudHMgPSBbZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQUxMX0FEU19DT01QTEVURUQsXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ0xJQ0ssXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09NUExFVEUsXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuRklSU1RfUVVBUlRJTEUsXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVELFxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLk1JRFBPSU5ULFxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlBBVVNFRCxcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TVEFSVEVELFxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlRISVJEX1FVQVJUSUxFXTtcbiAgICBldmVudHMuZm9yRWFjaChldmVudCA9PlxuICAgICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBhZEV2ZW50ID0+IHRoaXMub25BZEV2ZW50KGFkRXZlbnQpLCBmYWxzZSlcbiAgICApO1xuXG4gICAgYWRzTWFuYWdlci5pbml0KFxuICAgICAgdGhpcy53aWR0aCxcbiAgICAgIHRoaXMuaGVpZ2h0LFxuICAgICAgZ29vZ2xlLmltYS5WaWV3TW9kZS5OT1JNQUwpO1xuXG4gICAgYWRzTWFuYWdlci5zdGFydCgpO1xuICB9XG5cbiAgb25Db250ZW50UGF1c2VSZXF1ZXN0ZWQoKSB7XG4gICAgdGhpcy5wYXVzZUZvckFkKCk7XG4gIH1cblxuICBvbkNvbnRlbnRSZXN1bWVSZXF1ZXN0ZWQoKSB7XG4gICAgLy8gV2l0aG91dCB0aGlzIGNoZWNrIHRoZSB2aWRlbyBzdGFydHMgb3ZlciBmcm9tIHRoZSBiZWdpbm5pbmcgb24gYVxuICAgIC8vIHBvc3Qtcm9sbCdzIENPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRFxuICAgIGlmICghdGhpcy5jb250ZW50Q29tcGxldGVDYWxsZWQpIHtcbiAgICAgIHRoaXMucmVzdW1lQWZ0ZXJBZCgpO1xuICAgIH1cbiAgfVxuXG4gIG9uQWRFdmVudChhZEV2ZW50KSB7XG4gICAgaWYgKGFkRXZlbnQudHlwZSA9PT0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVEKSB7XG4gICAgICBjb25zdCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgIGlmICghYWQuaXNMaW5lYXIoKSkge1xuICAgICAgICB0aGlzLm9uQ29udGVudFJlc3VtZVJlcXVlc3RlZCgpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmFkRXZlbnRzLmVtaXQoYWRFdmVudCk7XG4gIH1cblxuICBvbkFkRXJyb3IoYWRFcnJvckV2ZW50KSB7XG4gICAgaWYgKHRoaXMuYWRzTWFuYWdlcikge1xuICAgICAgdGhpcy5hZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5yZXN1bWVBZnRlckFkKCk7XG4gICAgdGhpcy5hZEV2ZW50cy5lbWl0KGFkRXJyb3JFdmVudCk7XG4gIH1cblxuICAvLyBhcHBsaWNhdGlvbiBmdW5jdGlvbnNcblxuICByZXN1bWVBZnRlckFkKCkge1xuICAgIHRoaXMuY29udGVudFBsYXllci5wbGF5KCk7XG4gIH1cblxuICBwYXVzZUZvckFkKCkge1xuICAgIHRoaXMuY29udGVudFBsYXllci5wYXVzZSgpO1xuICB9XG5cbiAgbG9hZEFkcygpIHtcbiAgICB0aGlzLnJlcXVlc3RBZHModGhpcy5hZFRhZyk7XG4gIH1cblxufVxuIl19