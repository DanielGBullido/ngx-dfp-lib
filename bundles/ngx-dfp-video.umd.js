(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@alugha/ima'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ngx-dfp/video', ['exports', '@angular/common', '@alugha/ima', '@angular/core'], factory) :
    (factory((global['ngx-dfp'] = global['ngx-dfp'] || {}, global['ngx-dfp'].video = {}),global.ng.common,global.ima,global.ng.core));
}(this, (function (exports,common,ima,core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DfpIDGeneratorService = /** @class */ (function () {
        function DfpIDGeneratorService() {
            this.generatedIDs = {};
        }
        /**
         * @param {?=} type
         * @return {?}
         */
        DfpIDGeneratorService.prototype.generateID = /**
         * @param {?=} type
         * @return {?}
         */
            function (type) {
                if (type === void 0) {
                    type = 'dfp-ad';
                }
                /** @type {?} */
                var id = null;
                do {
                    /** @type {?} */
                    var number = Math.random().toString().slice(2);
                    id = type + '-' + number;
                } while (id in this.generatedIDs);
                this.generatedIDs[id] = true;
                return id;
            };
        /**
         * @param {?} element
         * @return {?}
         */
        DfpIDGeneratorService.prototype.dfpIDGenerator = /**
         * @param {?} element
         * @return {?}
         */
            function (element) {
                if (element && element.id && !(element.id in this.generatedIDs)) {
                    return element.id;
                }
                /** @type {?} */
                var id = this.generateID(element.tagName.toLowerCase());
                if (element) {
                    element.id = id;
                }
                return id;
            };
        /**
         * @param {?} id
         * @return {?}
         */
        DfpIDGeneratorService.prototype.isTaken = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                return id in this.generatedIDs;
            };
        /**
         * @param {?} id
         * @return {?}
         */
        DfpIDGeneratorService.prototype.isUnique = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                return !this.isTaken(id);
            };
        DfpIDGeneratorService.decorators = [
            { type: core.Injectable }
        ];
        return DfpIDGeneratorService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DfpVideoDirective = /** @class */ (function () {
        function DfpVideoDirective(platformId, elementRef, renderer, dfpIDGenerator) {
            this.platformId = platformId;
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.dfpIDGenerator = dfpIDGenerator;
            this.adEvents = new core.EventEmitter();
            this.adsDone = false;
        }
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (common.isPlatformBrowser(this.platformId)) {
                    /** @type {?} */
                    var el = this.elementRef.nativeElement;
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
                    ima.loadImaSdk().then(( /**
                     * @return {?}
                     */function () { return _this.setUpIMA(); }));
                    // simple control
                    this.adActions.subscribe(( /**
                     * @param {?} act
                     * @return {?}
                     */function (act) {
                        switch (act) {
                            case 'play':
                                _this.play();
                                break;
                            case 'pause':
                                _this.pause();
                                break;
                            case 'resume':
                                _this.resume();
                                break;
                        }
                    }));
                }
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.play = /**
         * @return {?}
         */
            function () {
                if (!this.adsDone) {
                    this.initialUserAction();
                    this.loadAds();
                    this.adsDone = true;
                }
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.pause = /**
         * @return {?}
         */
            function () {
                if (this.adsManager) {
                    this.adsManager.pause();
                }
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.resume = /**
         * @return {?}
         */
            function () {
                if (this.adsManager) {
                    this.adsManager.resume();
                }
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.setUpIMA = /**
         * @return {?}
         */
            function () {
                var _this = this;
                // Create the ad display container.
                this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainer, this.contentPlayer);
                // Create ads loader.
                this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
                // Listen and respond to ads loaded and error events.
                this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, ( /**
                 * @param {?} event
                 * @return {?}
                 */function (event) { return _this.onAdsManagerLoaded(event); }), false);
                this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, ( /**
                 * @param {?} event
                 * @return {?}
                 */function (event) { return _this.onAdError(event); }), false);
                // An event listener to tell the SDK that our content video
                // is completed so the SDK can play any post-roll ads.
                this.contentPlayer.onended = ( /**
                 * @return {?}
                 */function () {
                    _this.contentEnded();
                });
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.initialUserAction = /**
         * @return {?}
         */
            function () {
                this.adDisplayContainer.initialize();
                this.contentPlayer.load();
            };
        /**
         * @param {?} adTagUrl
         * @return {?}
         */
        DfpVideoDirective.prototype.requestAds = /**
         * @param {?} adTagUrl
         * @return {?}
         */
            function (adTagUrl) {
                /** @type {?} */
                var adsRequest = new google.ima.AdsRequest();
                adsRequest.adTagUrl = adTagUrl;
                adsRequest.linearAdSlotWidth = this.width;
                adsRequest.linearAdSlotHeight = this.height;
                adsRequest.nonLinearAdSlotWidth = this.width;
                adsRequest.nonLinearAdSlotHeight = this.height;
                this.adsLoader.requestAds(adsRequest);
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.contentEnded = /**
         * @return {?}
         */
            function () {
                this.contentCompleteCalled = true;
                this.adsLoader.contentComplete();
            };
        /**
         * @param {?} adsManagerLoadedEvent
         * @return {?}
         */
        DfpVideoDirective.prototype.onAdsManagerLoaded = /**
         * @param {?} adsManagerLoadedEvent
         * @return {?}
         */
            function (adsManagerLoadedEvent) {
                /** @type {?} */
                var adsRenderingSettings = new google.ima.AdsRenderingSettings();
                adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
                this.adsManager = adsManagerLoadedEvent.getAdsManager(this.contentPlayer, adsRenderingSettings);
                this.startAdsManager(this.adsManager);
            };
        /**
         * @param {?} adsManager
         * @return {?}
         */
        DfpVideoDirective.prototype.startAdsManager = /**
         * @param {?} adsManager
         * @return {?}
         */
            function (adsManager) {
                var _this = this;
                // Attach the pause/resume events.
                adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, ( /**
                 * @return {?}
                 */function () { return _this.onContentPauseRequested(); }), false, this);
                adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, ( /**
                 * @return {?}
                 */function () { return _this.onContentResumeRequested(); }), false, this);
                // Handle errors.
                adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, ( /**
                 * @param {?} event
                 * @return {?}
                 */function (event) { return _this.onAdError(event); }), false, this);
                /** @type {?} */
                var events = [google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
                    google.ima.AdEvent.Type.CLICK,
                    google.ima.AdEvent.Type.COMPLETE,
                    google.ima.AdEvent.Type.FIRST_QUARTILE,
                    google.ima.AdEvent.Type.LOADED,
                    google.ima.AdEvent.Type.MIDPOINT,
                    google.ima.AdEvent.Type.PAUSED,
                    google.ima.AdEvent.Type.STARTED,
                    google.ima.AdEvent.Type.THIRD_QUARTILE];
                events.forEach(( /**
                 * @param {?} event
                 * @return {?}
                 */function (event) {
                    return adsManager.addEventListener(event, ( /**
                     * @param {?} adEvent
                     * @return {?}
                     */function (adEvent) { return _this.onAdEvent(adEvent); }), false);
                }));
                adsManager.init(this.width, this.height, google.ima.ViewMode.NORMAL);
                adsManager.start();
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.onContentPauseRequested = /**
         * @return {?}
         */
            function () {
                this.pauseForAd();
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.onContentResumeRequested = /**
         * @return {?}
         */
            function () {
                // Without this check the video starts over from the beginning on a
                // post-roll's CONTENT_RESUME_REQUESTED
                if (!this.contentCompleteCalled) {
                    this.resumeAfterAd();
                }
            };
        /**
         * @param {?} adEvent
         * @return {?}
         */
        DfpVideoDirective.prototype.onAdEvent = /**
         * @param {?} adEvent
         * @return {?}
         */
            function (adEvent) {
                if (adEvent.type === google.ima.AdEvent.Type.LOADED) {
                    /** @type {?} */
                    var ad = adEvent.getAd();
                    if (!ad.isLinear()) {
                        this.onContentResumeRequested();
                    }
                }
                this.adEvents.emit(adEvent);
            };
        /**
         * @param {?} adErrorEvent
         * @return {?}
         */
        DfpVideoDirective.prototype.onAdError = /**
         * @param {?} adErrorEvent
         * @return {?}
         */
            function (adErrorEvent) {
                if (this.adsManager) {
                    this.adsManager.destroy();
                }
                this.resumeAfterAd();
                this.adEvents.emit(adErrorEvent);
            };
        // application functions
        // application functions
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.resumeAfterAd =
            // application functions
            /**
             * @return {?}
             */
            function () {
                this.contentPlayer.play();
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.pauseForAd = /**
         * @return {?}
         */
            function () {
                this.contentPlayer.pause();
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.loadAds = /**
         * @return {?}
         */
            function () {
                this.requestAds(this.adTag);
            };
        DfpVideoDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'dfp-video'
                    },] }
        ];
        /** @nocollapse */
        DfpVideoDirective.ctorParameters = function () {
            return [
                { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
                { type: core.ElementRef },
                { type: core.Renderer2 },
                { type: DfpIDGeneratorService }
            ];
        };
        DfpVideoDirective.propDecorators = {
            width: [{ type: core.Input }],
            height: [{ type: core.Input }],
            adTag: [{ type: core.Input }],
            adActions: [{ type: core.Input }],
            adEvents: [{ type: core.Output }]
        };
        return DfpVideoDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DfpVideoModule = /** @class */ (function () {
        function DfpVideoModule() {
        }
        DfpVideoModule.decorators = [
            { type: core.NgModule, args: [{
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
        return DfpVideoModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.DfpVideoDirective = DfpVideoDirective;
    exports.DfpVideoModule = DfpVideoModule;
    exports.ɵa = DfpIDGeneratorService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngx-dfp-video.umd.js.map