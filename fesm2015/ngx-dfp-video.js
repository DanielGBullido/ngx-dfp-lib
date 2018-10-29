import { Injectable, Directive, Inject, PLATFORM_ID, ElementRef, Input, Output, EventEmitter, Renderer2, NgModule } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { loadImaSdk } from '@alugha/ima';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpIDGeneratorService {
    constructor() {
        this.generatedIDs = {};
    }
    /**
     * @param {?=} type
     * @return {?}
     */
    generateID(type = 'dfp-ad') {
        /** @type {?} */
        let id = null;
        do {
            /** @type {?} */
            const number = Math.random().toString().slice(2);
            id = type + '-' + number;
        } while (id in this.generatedIDs);
        this.generatedIDs[id] = true;
        return id;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    dfpIDGenerator(element) {
        if (element && element.id && !(element.id in this.generatedIDs)) {
            return element.id;
        }
        /** @type {?} */
        const id = this.generateID(element.tagName.toLowerCase());
        if (element) {
            element.id = id;
        }
        return id;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    isTaken(id) {
        return id in this.generatedIDs;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    isUnique(id) {
        return !this.isTaken(id);
    }
}
DfpIDGeneratorService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpVideoDirective {
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
            loadImaSdk().then(() => this.setUpIMA());
            // simple control
            this.adActions.subscribe(act => {
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
            });
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
        this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, event => this.onAdsManagerLoaded(event), false);
        this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, event => this.onAdError(event), false);
        // An event listener to tell the SDK that our content video
        // is completed so the SDK can play any post-roll ads.
        this.contentPlayer.onended = () => {
            this.contentEnded();
        };
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
        adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, () => this.onContentPauseRequested(), false, this);
        adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, () => this.onContentResumeRequested(), false, this);
        // Handle errors.
        adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, event => this.onAdError(event), false, this);
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
        events.forEach(event => adsManager.addEventListener(event, adEvent => this.onAdEvent(adEvent), false));
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpVideoModule {
}
DfpVideoModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DfpVideoDirective
                ],
                exports: [
                    DfpVideoDirective
                ],
                providers: [
                    DfpIDGeneratorService
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { DfpVideoDirective, DfpVideoModule, DfpIDGeneratorService as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRmcC12aWRlby5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWRmcC92aWRlby9zZXJ2aWNlL2RmcC1pZC1nZW5lcmF0b3Iuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC92aWRlby9kaXJlY3RpdmUvZGZwLXZpZGVvLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC92aWRlby9kZnAtdmlkZW8ubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERmcElER2VuZXJhdG9yU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZWRJRHMgPSB7fTtcblxuICBnZW5lcmF0ZUlEKHR5cGUgPSAnZGZwLWFkJykge1xuICAgIGxldCBpZCA9IG51bGw7XG5cbiAgICBkbyB7XG4gICAgICBjb25zdCBudW1iZXIgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc2xpY2UoMik7XG4gICAgICBpZCA9IHR5cGUgKyAnLScgKyBudW1iZXI7XG4gICAgfSB3aGlsZSAoaWQgaW4gdGhpcy5nZW5lcmF0ZWRJRHMpO1xuXG4gICAgdGhpcy5nZW5lcmF0ZWRJRHNbaWRdID0gdHJ1ZTtcblxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIGRmcElER2VuZXJhdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5pZCAmJiAhKGVsZW1lbnQuaWQgaW4gdGhpcy5nZW5lcmF0ZWRJRHMpKSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5pZDtcbiAgICB9XG5cbiAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVJRChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgaWYgKGVsZW1lbnQpIHsgZWxlbWVudC5pZCA9IGlkOyB9XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICBpc1Rha2VuKGlkKSB7XG4gICAgcmV0dXJuIGlkIGluIHRoaXMuZ2VuZXJhdGVkSURzO1xuICB9XG5cbiAgaXNVbmlxdWUoaWQpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNUYWtlbihpZCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3QsIFBMQVRGT1JNX0lELCBFbGVtZW50UmVmLCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IGxvYWRJbWFTZGsgfSBmcm9tICdAYWx1Z2hhL2ltYSc7XG5cbmltcG9ydCB7IERmcElER2VuZXJhdG9yU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGZwLXZpZGVvJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBWaWRlb0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgaGVpZ2h0OiBudW1iZXI7XG5cbiAgQElucHV0KCkgYWRUYWc6IHN0cmluZztcbiAgQElucHV0KCkgYWRBY3Rpb25zOiBFdmVudEVtaXR0ZXI8J3BsYXknIHwgJ3BhdXNlJyB8ICdyZXN1bWUnPjtcblxuICBAT3V0cHV0KCkgYWRFdmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb250ZW50UGxheWVyOiBIVE1MVmlkZW9FbGVtZW50O1xuICBhZENvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG5cbiAgcHJpdmF0ZSBjb250ZW50Q29tcGxldGVDYWxsZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgYWREaXNwbGF5Q29udGFpbmVyOiBnb29nbGUuaW1hLkFkRGlzcGxheUNvbnRhaW5lcjtcbiAgcHJpdmF0ZSBhZHNMb2FkZXI6IGdvb2dsZS5pbWEuQWRzTG9hZGVyO1xuICBwcml2YXRlIGFkc01hbmFnZXI6IGdvb2dsZS5pbWEuQWRzTWFuYWdlcjtcbiAgcHJpdmF0ZSBhZHNEb25lID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGRmcElER2VuZXJhdG9yOiBEZnBJREdlbmVyYXRvclNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuXG4gICAgICBjb25zdCBlbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICB0aGlzLmRmcElER2VuZXJhdG9yLmRmcElER2VuZXJhdG9yKGVsKTtcblxuICAgICAgdGhpcy5jb250ZW50UGxheWVyID0gZWwucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuY29udGVudFBsYXllciwgJ3dpZHRoJywgdGhpcy53aWR0aC50b1N0cmluZygpKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuY29udGVudFBsYXllciwgJ2hlaWdodCcsIHRoaXMuaGVpZ2h0LnRvU3RyaW5nKCkpO1xuXG4gICAgICB0aGlzLmFkQ29udGFpbmVyID0gZWwucXVlcnlTZWxlY3RvcignLmFkLWNvbnRhaW5lcicpO1xuICAgICAgaWYgKCF0aGlzLmFkQ29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuYWRDb250YWluZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuYWRDb250YWluZXIsICdhZC1jb250YWluZXInKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChlbCwgdGhpcy5hZENvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgIC8vIGltYSBzZXR1cFxuICAgICAgbG9hZEltYVNkaygpLnRoZW4oKCkgPT4gdGhpcy5zZXRVcElNQSgpKTtcblxuICAgICAgLy8gc2ltcGxlIGNvbnRyb2xcbiAgICAgIHRoaXMuYWRBY3Rpb25zLnN1YnNjcmliZShhY3QgPT4ge1xuICAgICAgICBzd2l0Y2ggKGFjdCkge1xuICAgICAgICAgIGNhc2UgJ3BsYXknOlxuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdwYXVzZSc6XG4gICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdyZXN1bWUnOlxuICAgICAgICAgICAgdGhpcy5yZXN1bWUoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwbGF5KCkge1xuICAgIGlmICghdGhpcy5hZHNEb25lKSB7XG4gICAgICB0aGlzLmluaXRpYWxVc2VyQWN0aW9uKCk7XG4gICAgICB0aGlzLmxvYWRBZHMoKTtcbiAgICAgIHRoaXMuYWRzRG9uZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgaWYgKHRoaXMuYWRzTWFuYWdlcikge1xuICAgICAgdGhpcy5hZHNNYW5hZ2VyLnBhdXNlKCk7XG4gICAgfVxuICB9XG5cbiAgcmVzdW1lKCkge1xuICAgIGlmICh0aGlzLmFkc01hbmFnZXIpIHtcbiAgICAgIHRoaXMuYWRzTWFuYWdlci5yZXN1bWUoKTtcbiAgICB9XG4gIH1cblxuICBzZXRVcElNQSgpIHtcbiAgICAvLyBDcmVhdGUgdGhlIGFkIGRpc3BsYXkgY29udGFpbmVyLlxuICAgIHRoaXMuYWREaXNwbGF5Q29udGFpbmVyID0gbmV3IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyKHRoaXMuYWRDb250YWluZXIsIHRoaXMuY29udGVudFBsYXllcik7XG4gICAgLy8gQ3JlYXRlIGFkcyBsb2FkZXIuXG4gICAgdGhpcy5hZHNMb2FkZXIgPSBuZXcgZ29vZ2xlLmltYS5BZHNMb2FkZXIodGhpcy5hZERpc3BsYXlDb250YWluZXIpO1xuICAgIC8vIExpc3RlbiBhbmQgcmVzcG9uZCB0byBhZHMgbG9hZGVkIGFuZCBlcnJvciBldmVudHMuXG4gICAgdGhpcy5hZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIGdvb2dsZS5pbWEuQWRzTWFuYWdlckxvYWRlZEV2ZW50LlR5cGUuQURTX01BTkFHRVJfTE9BREVELFxuICAgICAgZXZlbnQgPT4gdGhpcy5vbkFkc01hbmFnZXJMb2FkZWQoZXZlbnQpLFxuICAgICAgZmFsc2UpO1xuICAgIHRoaXMuYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SLFxuICAgICAgZXZlbnQgPT4gdGhpcy5vbkFkRXJyb3IoZXZlbnQpLFxuICAgICAgZmFsc2UpO1xuXG4gICAgLy8gQW4gZXZlbnQgbGlzdGVuZXIgdG8gdGVsbCB0aGUgU0RLIHRoYXQgb3VyIGNvbnRlbnQgdmlkZW9cbiAgICAvLyBpcyBjb21wbGV0ZWQgc28gdGhlIFNESyBjYW4gcGxheSBhbnkgcG9zdC1yb2xsIGFkcy5cbiAgICB0aGlzLmNvbnRlbnRQbGF5ZXIub25lbmRlZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuY29udGVudEVuZGVkKCk7XG4gICAgfTtcbiAgfVxuXG4gIGluaXRpYWxVc2VyQWN0aW9uKCkge1xuICAgIHRoaXMuYWREaXNwbGF5Q29udGFpbmVyLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLmNvbnRlbnRQbGF5ZXIubG9hZCgpO1xuICB9XG5cbiAgcmVxdWVzdEFkcyhhZFRhZ1VybCkge1xuICAgIGNvbnN0IGFkc1JlcXVlc3QgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZXF1ZXN0KCk7XG4gICAgYWRzUmVxdWVzdC5hZFRhZ1VybCA9IGFkVGFnVXJsO1xuICAgIGFkc1JlcXVlc3QubGluZWFyQWRTbG90V2lkdGggPSB0aGlzLndpZHRoO1xuICAgIGFkc1JlcXVlc3QubGluZWFyQWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgYWRzUmVxdWVzdC5ub25MaW5lYXJBZFNsb3RXaWR0aCA9IHRoaXMud2lkdGg7XG4gICAgYWRzUmVxdWVzdC5ub25MaW5lYXJBZFNsb3RIZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICB0aGlzLmFkc0xvYWRlci5yZXF1ZXN0QWRzKGFkc1JlcXVlc3QpO1xuICB9XG5cbiAgY29udGVudEVuZGVkKCkge1xuICAgIHRoaXMuY29udGVudENvbXBsZXRlQ2FsbGVkID0gdHJ1ZTtcbiAgICB0aGlzLmFkc0xvYWRlci5jb250ZW50Q29tcGxldGUoKTtcbiAgfVxuXG4gIG9uQWRzTWFuYWdlckxvYWRlZChhZHNNYW5hZ2VyTG9hZGVkRXZlbnQpIHtcbiAgICBjb25zdCBhZHNSZW5kZXJpbmdTZXR0aW5ncyA9IG5ldyBnb29nbGUuaW1hLkFkc1JlbmRlcmluZ1NldHRpbmdzKCk7XG4gICAgYWRzUmVuZGVyaW5nU2V0dGluZ3MucmVzdG9yZUN1c3RvbVBsYXliYWNrU3RhdGVPbkFkQnJlYWtDb21wbGV0ZSA9IHRydWU7XG4gICAgdGhpcy5hZHNNYW5hZ2VyID0gYWRzTWFuYWdlckxvYWRlZEV2ZW50LmdldEFkc01hbmFnZXIoXG4gICAgICB0aGlzLmNvbnRlbnRQbGF5ZXIsIGFkc1JlbmRlcmluZ1NldHRpbmdzKTtcbiAgICB0aGlzLnN0YXJ0QWRzTWFuYWdlcih0aGlzLmFkc01hbmFnZXIpO1xuICB9XG5cbiAgc3RhcnRBZHNNYW5hZ2VyKGFkc01hbmFnZXIpIHtcbiAgICAvLyBBdHRhY2ggdGhlIHBhdXNlL3Jlc3VtZSBldmVudHMuXG4gICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQsXG4gICAgICAoKSA9PiB0aGlzLm9uQ29udGVudFBhdXNlUmVxdWVzdGVkKCksXG4gICAgICBmYWxzZSxcbiAgICAgIHRoaXMpO1xuICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRCxcbiAgICAgICgpID0+IHRoaXMub25Db250ZW50UmVzdW1lUmVxdWVzdGVkKCksXG4gICAgICBmYWxzZSxcbiAgICAgIHRoaXMpO1xuICAgIC8vIEhhbmRsZSBlcnJvcnMuXG4gICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUixcbiAgICAgIGV2ZW50ID0+IHRoaXMub25BZEVycm9yKGV2ZW50KSxcbiAgICAgIGZhbHNlLFxuICAgICAgdGhpcyk7XG4gICAgY29uc3QgZXZlbnRzID0gW2dvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkFMTF9BRFNfQ09NUExFVEVELFxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNMSUNLLFxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTVBMRVRFLFxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkZJUlNUX1FVQVJUSUxFLFxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkxPQURFRCxcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5NSURQT0lOVCxcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5QQVVTRUQsXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU1RBUlRFRCxcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5USElSRF9RVUFSVElMRV07XG4gICAgZXZlbnRzLmZvckVhY2goZXZlbnQgPT5cbiAgICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgYWRFdmVudCA9PiB0aGlzLm9uQWRFdmVudChhZEV2ZW50KSwgZmFsc2UpXG4gICAgKTtcblxuICAgIGFkc01hbmFnZXIuaW5pdChcbiAgICAgIHRoaXMud2lkdGgsXG4gICAgICB0aGlzLmhlaWdodCxcbiAgICAgIGdvb2dsZS5pbWEuVmlld01vZGUuTk9STUFMKTtcblxuICAgIGFkc01hbmFnZXIuc3RhcnQoKTtcbiAgfVxuXG4gIG9uQ29udGVudFBhdXNlUmVxdWVzdGVkKCkge1xuICAgIHRoaXMucGF1c2VGb3JBZCgpO1xuICB9XG5cbiAgb25Db250ZW50UmVzdW1lUmVxdWVzdGVkKCkge1xuICAgIC8vIFdpdGhvdXQgdGhpcyBjaGVjayB0aGUgdmlkZW8gc3RhcnRzIG92ZXIgZnJvbSB0aGUgYmVnaW5uaW5nIG9uIGFcbiAgICAvLyBwb3N0LXJvbGwncyBDT05URU5UX1JFU1VNRV9SRVFVRVNURURcbiAgICBpZiAoIXRoaXMuY29udGVudENvbXBsZXRlQ2FsbGVkKSB7XG4gICAgICB0aGlzLnJlc3VtZUFmdGVyQWQoKTtcbiAgICB9XG4gIH1cblxuICBvbkFkRXZlbnQoYWRFdmVudCkge1xuICAgIGlmIChhZEV2ZW50LnR5cGUgPT09IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkxPQURFRCkge1xuICAgICAgY29uc3QgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICBpZiAoIWFkLmlzTGluZWFyKCkpIHtcbiAgICAgICAgdGhpcy5vbkNvbnRlbnRSZXN1bWVSZXF1ZXN0ZWQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5hZEV2ZW50cy5lbWl0KGFkRXZlbnQpO1xuICB9XG5cbiAgb25BZEVycm9yKGFkRXJyb3JFdmVudCkge1xuICAgIGlmICh0aGlzLmFkc01hbmFnZXIpIHtcbiAgICAgIHRoaXMuYWRzTWFuYWdlci5kZXN0cm95KCk7XG4gICAgfVxuICAgIHRoaXMucmVzdW1lQWZ0ZXJBZCgpO1xuICAgIHRoaXMuYWRFdmVudHMuZW1pdChhZEVycm9yRXZlbnQpO1xuICB9XG5cbiAgLy8gYXBwbGljYXRpb24gZnVuY3Rpb25zXG5cbiAgcmVzdW1lQWZ0ZXJBZCgpIHtcbiAgICB0aGlzLmNvbnRlbnRQbGF5ZXIucGxheSgpO1xuICB9XG5cbiAgcGF1c2VGb3JBZCgpIHtcbiAgICB0aGlzLmNvbnRlbnRQbGF5ZXIucGF1c2UoKTtcbiAgfVxuXG4gIGxvYWRBZHMoKSB7XG4gICAgdGhpcy5yZXF1ZXN0QWRzKHRoaXMuYWRUYWcpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERmcElER2VuZXJhdG9yU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9kZnAtaWQtZ2VuZXJhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGZwVmlkZW9EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtdmlkZW8uZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGZwVmlkZW9EaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERmcFZpZGVvRGlyZWN0aXZlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERmcElER2VuZXJhdG9yU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERmcFZpZGVvTW9kdWxlIHtcblxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7OzRCQUt5QixFQUFFOzs7Ozs7SUFFekIsVUFBVSxDQUFDLElBQUksR0FBRyxRQUFROztRQUN4QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFZCxHQUFHOztZQUNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsRUFBRSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO1NBQzFCLFFBQVEs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