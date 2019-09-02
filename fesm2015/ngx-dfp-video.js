import { Injectable, EventEmitter, Directive, Inject, PLATFORM_ID, ElementRef, Renderer2, Input, Output, NgModule } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { loadImaSdk } from '@alugha/ima';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    DfpIDGeneratorService.prototype.generatedIDs;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { DfpVideoDirective, DfpVideoModule, DfpIDGeneratorService as ɵa };
//# sourceMappingURL=ngx-dfp-video.js.map
