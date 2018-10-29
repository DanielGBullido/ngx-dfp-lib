(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@alugha/ima')) :
    typeof define === 'function' && define.amd ? define('ngx-dfp/video', ['exports', '@angular/core', '@angular/common', '@alugha/ima'], factory) :
    (factory((global['ngx-dfp'] = global['ngx-dfp'] || {}, global['ngx-dfp'].video = {}),global.ng.core,global.ng.common,global.ima));
}(this, (function (exports,core,common,ima) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DfpIDGeneratorService = (function () {
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DfpVideoDirective = (function () {
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
                    ima.loadImaSdk().then(function () { return _this.setUpIMA(); });
                    // simple control
                    this.adActions.subscribe(function (act) {
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
                    });
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
                this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function (event) { return _this.onAdsManagerLoaded(event); }, false);
                this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (event) { return _this.onAdError(event); }, false);
                // An event listener to tell the SDK that our content video
                // is completed so the SDK can play any post-roll ads.
                this.contentPlayer.onended = function () {
                    _this.contentEnded();
                };
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
                adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, function () { return _this.onContentPauseRequested(); }, false, this);
                adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, function () { return _this.onContentResumeRequested(); }, false, this);
                // Handle errors.
                adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (event) { return _this.onAdError(event); }, false, this);
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
                events.forEach(function (event) {
                    return adsManager.addEventListener(event, function (adEvent) { return _this.onAdEvent(adEvent); }, false);
                });
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
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.resumeAfterAd = /**
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DfpVideoModule = (function () {
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.DfpVideoDirective = DfpVideoDirective;
    exports.DfpVideoModule = DfpVideoModule;
    exports.ɵa = DfpIDGeneratorService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRmcC12aWRlby51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1kZnAvdmlkZW8vc2VydmljZS9kZnAtaWQtZ2VuZXJhdG9yLnNlcnZpY2UudHMiLCJuZzovL25neC1kZnAvdmlkZW8vZGlyZWN0aXZlL2RmcC12aWRlby5kaXJlY3RpdmUudHMiLCJuZzovL25neC1kZnAvdmlkZW8vZGZwLXZpZGVvLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZnBJREdlbmVyYXRvclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgZ2VuZXJhdGVkSURzID0ge307XG5cbiAgZ2VuZXJhdGVJRCh0eXBlID0gJ2RmcC1hZCcpIHtcbiAgICBsZXQgaWQgPSBudWxsO1xuXG4gICAgZG8ge1xuICAgICAgY29uc3QgbnVtYmVyID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnNsaWNlKDIpO1xuICAgICAgaWQgPSB0eXBlICsgJy0nICsgbnVtYmVyO1xuICAgIH0gd2hpbGUgKGlkIGluIHRoaXMuZ2VuZXJhdGVkSURzKTtcblxuICAgIHRoaXMuZ2VuZXJhdGVkSURzW2lkXSA9IHRydWU7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICBkZnBJREdlbmVyYXRvcihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuaWQgJiYgIShlbGVtZW50LmlkIGluIHRoaXMuZ2VuZXJhdGVkSURzKSkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuaWQ7XG4gICAgfVxuXG4gICAgY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlSUQoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgIGlmIChlbGVtZW50KSB7IGVsZW1lbnQuaWQgPSBpZDsgfVxuXG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgaXNUYWtlbihpZCkge1xuICAgIHJldHVybiBpZCBpbiB0aGlzLmdlbmVyYXRlZElEcztcbiAgfVxuXG4gIGlzVW5pcXVlKGlkKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzVGFrZW4oaWQpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5qZWN0LCBQTEFURk9STV9JRCwgRWxlbWVudFJlZiwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBsb2FkSW1hU2RrIH0gZnJvbSAnQGFsdWdoYS9pbWEnO1xuXG5pbXBvcnQgeyBEZnBJREdlbmVyYXRvclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC1pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2RmcC12aWRlbydcbn0pXG5leHBvcnQgY2xhc3MgRGZwVmlkZW9EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHdpZHRoOiBudW1iZXI7XG4gIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGFkVGFnOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFkQWN0aW9uczogRXZlbnRFbWl0dGVyPCdwbGF5JyB8ICdwYXVzZScgfCAncmVzdW1lJz47XG5cbiAgQE91dHB1dCgpIGFkRXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29udGVudFBsYXllcjogSFRNTFZpZGVvRWxlbWVudDtcbiAgYWRDb250YWluZXI6IEhUTUxFbGVtZW50O1xuXG4gIHByaXZhdGUgY29udGVudENvbXBsZXRlQ2FsbGVkOiBib29sZWFuO1xuICBwcml2YXRlIGFkRGlzcGxheUNvbnRhaW5lcjogZ29vZ2xlLmltYS5BZERpc3BsYXlDb250YWluZXI7XG4gIHByaXZhdGUgYWRzTG9hZGVyOiBnb29nbGUuaW1hLkFkc0xvYWRlcjtcbiAgcHJpdmF0ZSBhZHNNYW5hZ2VyOiBnb29nbGUuaW1hLkFkc01hbmFnZXI7XG4gIHByaXZhdGUgYWRzRG9uZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBkZnBJREdlbmVyYXRvcjogRGZwSURHZW5lcmF0b3JTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcblxuICAgICAgY29uc3QgZWwgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgdGhpcy5kZnBJREdlbmVyYXRvci5kZnBJREdlbmVyYXRvcihlbCk7XG5cbiAgICAgIHRoaXMuY29udGVudFBsYXllciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmNvbnRlbnRQbGF5ZXIsICd3aWR0aCcsIHRoaXMud2lkdGgudG9TdHJpbmcoKSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmNvbnRlbnRQbGF5ZXIsICdoZWlnaHQnLCB0aGlzLmhlaWdodC50b1N0cmluZygpKTtcblxuICAgICAgdGhpcy5hZENvbnRhaW5lciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5hZC1jb250YWluZXInKTtcbiAgICAgIGlmICghdGhpcy5hZENvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmFkQ29udGFpbmVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmFkQ29udGFpbmVyLCAnYWQtY29udGFpbmVyJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZWwsIHRoaXMuYWRDb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICAvLyBpbWEgc2V0dXBcbiAgICAgIGxvYWRJbWFTZGsoKS50aGVuKCgpID0+IHRoaXMuc2V0VXBJTUEoKSk7XG5cbiAgICAgIC8vIHNpbXBsZSBjb250cm9sXG4gICAgICB0aGlzLmFkQWN0aW9ucy5zdWJzY3JpYmUoYWN0ID0+IHtcbiAgICAgICAgc3dpdGNoIChhY3QpIHtcbiAgICAgICAgICBjYXNlICdwbGF5JzpcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncGF1c2UnOlxuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncmVzdW1lJzpcbiAgICAgICAgICAgIHRoaXMucmVzdW1lKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcGxheSgpIHtcbiAgICBpZiAoIXRoaXMuYWRzRG9uZSkge1xuICAgICAgdGhpcy5pbml0aWFsVXNlckFjdGlvbigpO1xuICAgICAgdGhpcy5sb2FkQWRzKCk7XG4gICAgICB0aGlzLmFkc0RvbmUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIGlmICh0aGlzLmFkc01hbmFnZXIpIHtcbiAgICAgIHRoaXMuYWRzTWFuYWdlci5wYXVzZSgpO1xuICAgIH1cbiAgfVxuXG4gIHJlc3VtZSgpIHtcbiAgICBpZiAodGhpcy5hZHNNYW5hZ2VyKSB7XG4gICAgICB0aGlzLmFkc01hbmFnZXIucmVzdW1lKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0VXBJTUEoKSB7XG4gICAgLy8gQ3JlYXRlIHRoZSBhZCBkaXNwbGF5IGNvbnRhaW5lci5cbiAgICB0aGlzLmFkRGlzcGxheUNvbnRhaW5lciA9IG5ldyBnb29nbGUuaW1hLkFkRGlzcGxheUNvbnRhaW5lcih0aGlzLmFkQ29udGFpbmVyLCB0aGlzLmNvbnRlbnRQbGF5ZXIpO1xuICAgIC8vIENyZWF0ZSBhZHMgbG9hZGVyLlxuICAgIHRoaXMuYWRzTG9hZGVyID0gbmV3IGdvb2dsZS5pbWEuQWRzTG9hZGVyKHRoaXMuYWREaXNwbGF5Q29udGFpbmVyKTtcbiAgICAvLyBMaXN0ZW4gYW5kIHJlc3BvbmQgdG8gYWRzIGxvYWRlZCBhbmQgZXJyb3IgZXZlbnRzLlxuICAgIHRoaXMuYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBnb29nbGUuaW1hLkFkc01hbmFnZXJMb2FkZWRFdmVudC5UeXBlLkFEU19NQU5BR0VSX0xPQURFRCxcbiAgICAgIGV2ZW50ID0+IHRoaXMub25BZHNNYW5hZ2VyTG9hZGVkKGV2ZW50KSxcbiAgICAgIGZhbHNlKTtcbiAgICB0aGlzLmFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUixcbiAgICAgIGV2ZW50ID0+IHRoaXMub25BZEVycm9yKGV2ZW50KSxcbiAgICAgIGZhbHNlKTtcblxuICAgIC8vIEFuIGV2ZW50IGxpc3RlbmVyIHRvIHRlbGwgdGhlIFNESyB0aGF0IG91ciBjb250ZW50IHZpZGVvXG4gICAgLy8gaXMgY29tcGxldGVkIHNvIHRoZSBTREsgY2FuIHBsYXkgYW55IHBvc3Qtcm9sbCBhZHMuXG4gICAgdGhpcy5jb250ZW50UGxheWVyLm9uZW5kZWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmNvbnRlbnRFbmRlZCgpO1xuICAgIH07XG4gIH1cblxuICBpbml0aWFsVXNlckFjdGlvbigpIHtcbiAgICB0aGlzLmFkRGlzcGxheUNvbnRhaW5lci5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5jb250ZW50UGxheWVyLmxvYWQoKTtcbiAgfVxuXG4gIHJlcXVlc3RBZHMoYWRUYWdVcmwpIHtcbiAgICBjb25zdCBhZHNSZXF1ZXN0ID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVxdWVzdCgpO1xuICAgIGFkc1JlcXVlc3QuYWRUYWdVcmwgPSBhZFRhZ1VybDtcbiAgICBhZHNSZXF1ZXN0LmxpbmVhckFkU2xvdFdpZHRoID0gdGhpcy53aWR0aDtcbiAgICBhZHNSZXF1ZXN0LmxpbmVhckFkU2xvdEhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgIGFkc1JlcXVlc3Qubm9uTGluZWFyQWRTbG90V2lkdGggPSB0aGlzLndpZHRoO1xuICAgIGFkc1JlcXVlc3Qubm9uTGluZWFyQWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgdGhpcy5hZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTtcbiAgfVxuXG4gIGNvbnRlbnRFbmRlZCgpIHtcbiAgICB0aGlzLmNvbnRlbnRDb21wbGV0ZUNhbGxlZCA9IHRydWU7XG4gICAgdGhpcy5hZHNMb2FkZXIuY29udGVudENvbXBsZXRlKCk7XG4gIH1cblxuICBvbkFkc01hbmFnZXJMb2FkZWQoYWRzTWFuYWdlckxvYWRlZEV2ZW50KSB7XG4gICAgY29uc3QgYWRzUmVuZGVyaW5nU2V0dGluZ3MgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZW5kZXJpbmdTZXR0aW5ncygpO1xuICAgIGFkc1JlbmRlcmluZ1NldHRpbmdzLnJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUgPSB0cnVlO1xuICAgIHRoaXMuYWRzTWFuYWdlciA9IGFkc01hbmFnZXJMb2FkZWRFdmVudC5nZXRBZHNNYW5hZ2VyKFxuICAgICAgdGhpcy5jb250ZW50UGxheWVyLCBhZHNSZW5kZXJpbmdTZXR0aW5ncyk7XG4gICAgdGhpcy5zdGFydEFkc01hbmFnZXIodGhpcy5hZHNNYW5hZ2VyKTtcbiAgfVxuXG4gIHN0YXJ0QWRzTWFuYWdlcihhZHNNYW5hZ2VyKSB7XG4gICAgLy8gQXR0YWNoIHRoZSBwYXVzZS9yZXN1bWUgZXZlbnRzLlxuICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUEFVU0VfUkVRVUVTVEVELFxuICAgICAgKCkgPT4gdGhpcy5vbkNvbnRlbnRQYXVzZVJlcXVlc3RlZCgpLFxuICAgICAgZmFsc2UsXG4gICAgICB0aGlzKTtcbiAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1JFU1VNRV9SRVFVRVNURUQsXG4gICAgICAoKSA9PiB0aGlzLm9uQ29udGVudFJlc3VtZVJlcXVlc3RlZCgpLFxuICAgICAgZmFsc2UsXG4gICAgICB0aGlzKTtcbiAgICAvLyBIYW5kbGUgZXJyb3JzLlxuICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1IsXG4gICAgICBldmVudCA9PiB0aGlzLm9uQWRFcnJvcihldmVudCksXG4gICAgICBmYWxzZSxcbiAgICAgIHRoaXMpO1xuICAgIGNvbnN0IGV2ZW50cyA9IFtnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BTExfQURTX0NPTVBMRVRFRCxcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DTElDSyxcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT01QTEVURSxcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5GSVJTVF9RVUFSVElMRSxcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQsXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTUlEUE9JTlQsXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuUEFVU0VELFxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNUQVJURUQsXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuVEhJUkRfUVVBUlRJTEVdO1xuICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+XG4gICAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGFkRXZlbnQgPT4gdGhpcy5vbkFkRXZlbnQoYWRFdmVudCksIGZhbHNlKVxuICAgICk7XG5cbiAgICBhZHNNYW5hZ2VyLmluaXQoXG4gICAgICB0aGlzLndpZHRoLFxuICAgICAgdGhpcy5oZWlnaHQsXG4gICAgICBnb29nbGUuaW1hLlZpZXdNb2RlLk5PUk1BTCk7XG5cbiAgICBhZHNNYW5hZ2VyLnN0YXJ0KCk7XG4gIH1cblxuICBvbkNvbnRlbnRQYXVzZVJlcXVlc3RlZCgpIHtcbiAgICB0aGlzLnBhdXNlRm9yQWQoKTtcbiAgfVxuXG4gIG9uQ29udGVudFJlc3VtZVJlcXVlc3RlZCgpIHtcbiAgICAvLyBXaXRob3V0IHRoaXMgY2hlY2sgdGhlIHZpZGVvIHN0YXJ0cyBvdmVyIGZyb20gdGhlIGJlZ2lubmluZyBvbiBhXG4gICAgLy8gcG9zdC1yb2xsJ3MgQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEXG4gICAgaWYgKCF0aGlzLmNvbnRlbnRDb21wbGV0ZUNhbGxlZCkge1xuICAgICAgdGhpcy5yZXN1bWVBZnRlckFkKCk7XG4gICAgfVxuICB9XG5cbiAgb25BZEV2ZW50KGFkRXZlbnQpIHtcbiAgICBpZiAoYWRFdmVudC50eXBlID09PSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQpIHtcbiAgICAgIGNvbnN0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgaWYgKCFhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgIHRoaXMub25Db250ZW50UmVzdW1lUmVxdWVzdGVkKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuYWRFdmVudHMuZW1pdChhZEV2ZW50KTtcbiAgfVxuXG4gIG9uQWRFcnJvcihhZEVycm9yRXZlbnQpIHtcbiAgICBpZiAodGhpcy5hZHNNYW5hZ2VyKSB7XG4gICAgICB0aGlzLmFkc01hbmFnZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLnJlc3VtZUFmdGVyQWQoKTtcbiAgICB0aGlzLmFkRXZlbnRzLmVtaXQoYWRFcnJvckV2ZW50KTtcbiAgfVxuXG4gIC8vIGFwcGxpY2F0aW9uIGZ1bmN0aW9uc1xuXG4gIHJlc3VtZUFmdGVyQWQoKSB7XG4gICAgdGhpcy5jb250ZW50UGxheWVyLnBsYXkoKTtcbiAgfVxuXG4gIHBhdXNlRm9yQWQoKSB7XG4gICAgdGhpcy5jb250ZW50UGxheWVyLnBhdXNlKCk7XG4gIH1cblxuICBsb2FkQWRzKCkge1xuICAgIHRoaXMucmVxdWVzdEFkcyh0aGlzLmFkVGFnKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEZnBJREdlbmVyYXRvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IERmcFZpZGVvRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLXZpZGVvLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERmcFZpZGVvRGlyZWN0aXZlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZnBWaWRlb0RpcmVjdGl2ZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZnBJREdlbmVyYXRvclNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZnBWaWRlb01vZHVsZSB7XG5cbn1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiRXZlbnRFbWl0dGVyIiwiaXNQbGF0Zm9ybUJyb3dzZXIiLCJsb2FkSW1hU2RrIiwiRGlyZWN0aXZlIiwiSW5qZWN0IiwiUExBVEZPUk1fSUQiLCJFbGVtZW50UmVmIiwiUmVuZGVyZXIyIiwiSW5wdXQiLCJPdXRwdXQiLCJOZ01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztnQ0FLeUIsRUFBRTs7Ozs7O1FBRXpCLDBDQUFVOzs7O1lBQVYsVUFBVyxJQUFlO2dCQUFmLHFCQUFBO29CQUFBLGVBQWU7OztnQkFDeEIs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