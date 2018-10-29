/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Inject, PLATFORM_ID, ElementRef, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { loadImaSdk } from '@alugha/ima';
import { DfpIDGeneratorService } from '../service/dfp-id-generator.service';
var DfpVideoDirective = /** @class */ (function () {
    function DfpVideoDirective(platformId, elementRef, renderer, dfpIDGenerator) {
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
    DfpVideoDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (isPlatformBrowser(this.platformId)) {
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
            loadImaSdk().then(function () { return _this.setUpIMA(); });
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
        { type: Directive, args: [{
                    selector: 'dfp-video'
                },] }
    ];
    /** @nocollapse */
    DfpVideoDirective.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ElementRef },
        { type: Renderer2 },
        { type: DfpIDGeneratorService }
    ]; };
    DfpVideoDirective.propDecorators = {
        width: [{ type: Input }],
        height: [{ type: Input }],
        adTag: [{ type: Input }],
        adActions: [{ type: Input }],
        adEvents: [{ type: Output }]
    };
    return DfpVideoDirective;
}());
export { DfpVideoDirective };
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
    /** @type {?} */
    DfpVideoDirective.prototype.contentCompleteCalled;
    /** @type {?} */
    DfpVideoDirective.prototype.adDisplayContainer;
    /** @type {?} */
    DfpVideoDirective.prototype.adsLoader;
    /** @type {?} */
    DfpVideoDirective.prototype.adsManager;
    /** @type {?} */
    DfpVideoDirective.prototype.adsDone;
    /** @type {?} */
    DfpVideoDirective.prototype.platformId;
    /** @type {?} */
    DfpVideoDirective.prototype.elementRef;
    /** @type {?} */
    DfpVideoDirective.prototype.renderer;
    /** @type {?} */
    DfpVideoDirective.prototype.dfpIDGenerator;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXZpZGVvLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvdmlkZW8vIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLXZpZGVvLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0gsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV6QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7SUF3QjFFLDJCQUMrQixVQUFrQixFQUN2QyxZQUNBLFVBQ0E7UUFIcUIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxlQUFVLEdBQVYsVUFBVTtRQUNWLGFBQVEsR0FBUixRQUFRO1FBQ1IsbUJBQWMsR0FBZCxjQUFjO3dCQWZILElBQUksWUFBWSxFQUFPO3VCQVMxQixLQUFLO0tBT2xCOzs7O0lBRUwsb0NBQVE7OztJQUFSO1FBQUEsaUJBb0NDO1FBbkNDLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBRXZDLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBRXpDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMs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aXJlY3RpdmUsIEluamVjdCwgUExBVEZPUk1fSUQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgbG9hZEltYVNkayB9IGZyb20gJ0BhbHVnaGEvaW1hJztcblxuaW1wb3J0IHsgRGZwSURHZW5lcmF0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9kZnAtaWQtZ2VuZXJhdG9yLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkZnAtdmlkZW8nXG59KVxuZXhwb3J0IGNsYXNzIERmcFZpZGVvRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcblxuICBASW5wdXQoKSBhZFRhZzogc3RyaW5nO1xuICBASW5wdXQoKSBhZEFjdGlvbnM6IEV2ZW50RW1pdHRlcjwncGxheScgfCAncGF1c2UnIHwgJ3Jlc3VtZSc+O1xuXG4gIEBPdXRwdXQoKSBhZEV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnRlbnRQbGF5ZXI6IEhUTUxWaWRlb0VsZW1lbnQ7XG4gIGFkQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcblxuICBwcml2YXRlIGNvbnRlbnRDb21wbGV0ZUNhbGxlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBhZERpc3BsYXlDb250YWluZXI6IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyO1xuICBwcml2YXRlIGFkc0xvYWRlcjogZ29vZ2xlLmltYS5BZHNMb2FkZXI7XG4gIHByaXZhdGUgYWRzTWFuYWdlcjogZ29vZ2xlLmltYS5BZHNNYW5hZ2VyO1xuICBwcml2YXRlIGFkc0RvbmUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZGZwSURHZW5lcmF0b3I6IERmcElER2VuZXJhdG9yU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG5cbiAgICAgIGNvbnN0IGVsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIHRoaXMuZGZwSURHZW5lcmF0b3IuZGZwSURHZW5lcmF0b3IoZWwpO1xuXG4gICAgICB0aGlzLmNvbnRlbnRQbGF5ZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5jb250ZW50UGxheWVyLCAnd2lkdGgnLCB0aGlzLndpZHRoLnRvU3RyaW5nKCkpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5jb250ZW50UGxheWVyLCAnaGVpZ2h0JywgdGhpcy5oZWlnaHQudG9TdHJpbmcoKSk7XG5cbiAgICAgIHRoaXMuYWRDb250YWluZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCcuYWQtY29udGFpbmVyJyk7XG4gICAgICBpZiAoIXRoaXMuYWRDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5hZENvbnRhaW5lciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5hZENvbnRhaW5lciwgJ2FkLWNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGVsLCB0aGlzLmFkQ29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgLy8gaW1hIHNldHVwXG4gICAgICBsb2FkSW1hU2RrKCkudGhlbigoKSA9PiB0aGlzLnNldFVwSU1BKCkpO1xuXG4gICAgICAvLyBzaW1wbGUgY29udHJvbFxuICAgICAgdGhpcy5hZEFjdGlvbnMuc3Vic2NyaWJlKGFjdCA9PiB7XG4gICAgICAgIHN3aXRjaCAoYWN0KSB7XG4gICAgICAgICAgY2FzZSAncGxheSc6XG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3BhdXNlJzpcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3Jlc3VtZSc6XG4gICAgICAgICAgICB0aGlzLnJlc3VtZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgaWYgKCF0aGlzLmFkc0RvbmUpIHtcbiAgICAgIHRoaXMuaW5pdGlhbFVzZXJBY3Rpb24oKTtcbiAgICAgIHRoaXMubG9hZEFkcygpO1xuICAgICAgdGhpcy5hZHNEb25lID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICBpZiAodGhpcy5hZHNNYW5hZ2VyKSB7XG4gICAgICB0aGlzLmFkc01hbmFnZXIucGF1c2UoKTtcbiAgICB9XG4gIH1cblxuICByZXN1bWUoKSB7XG4gICAgaWYgKHRoaXMuYWRzTWFuYWdlcikge1xuICAgICAgdGhpcy5hZHNNYW5hZ2VyLnJlc3VtZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldFVwSU1BKCkge1xuICAgIC8vIENyZWF0ZSB0aGUgYWQgZGlzcGxheSBjb250YWluZXIuXG4gICAgdGhpcy5hZERpc3BsYXlDb250YWluZXIgPSBuZXcgZ29vZ2xlLmltYS5BZERpc3BsYXlDb250YWluZXIodGhpcy5hZENvbnRhaW5lciwgdGhpcy5jb250ZW50UGxheWVyKTtcbiAgICAvLyBDcmVhdGUgYWRzIGxvYWRlci5cbiAgICB0aGlzLmFkc0xvYWRlciA9IG5ldyBnb29nbGUuaW1hLkFkc0xvYWRlcih0aGlzLmFkRGlzcGxheUNvbnRhaW5lcik7XG4gICAgLy8gTGlzdGVuIGFuZCByZXNwb25kIHRvIGFkcyBsb2FkZWQgYW5kIGVycm9yIGV2ZW50cy5cbiAgICB0aGlzLmFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgZ29vZ2xlLmltYS5BZHNNYW5hZ2VyTG9hZGVkRXZlbnQuVHlwZS5BRFNfTUFOQUdFUl9MT0FERUQsXG4gICAgICBldmVudCA9PiB0aGlzLm9uQWRzTWFuYWdlckxvYWRlZChldmVudCksXG4gICAgICBmYWxzZSk7XG4gICAgdGhpcy5hZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1IsXG4gICAgICBldmVudCA9PiB0aGlzLm9uQWRFcnJvcihldmVudCksXG4gICAgICBmYWxzZSk7XG5cbiAgICAvLyBBbiBldmVudCBsaXN0ZW5lciB0byB0ZWxsIHRoZSBTREsgdGhhdCBvdXIgY29udGVudCB2aWRlb1xuICAgIC8vIGlzIGNvbXBsZXRlZCBzbyB0aGUgU0RLIGNhbiBwbGF5IGFueSBwb3N0LXJvbGwgYWRzLlxuICAgIHRoaXMuY29udGVudFBsYXllci5vbmVuZGVkID0gKCkgPT4ge1xuICAgICAgdGhpcy5jb250ZW50RW5kZWQoKTtcbiAgICB9O1xuICB9XG5cbiAgaW5pdGlhbFVzZXJBY3Rpb24oKSB7XG4gICAgdGhpcy5hZERpc3BsYXlDb250YWluZXIuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMuY29udGVudFBsYXllci5sb2FkKCk7XG4gIH1cblxuICByZXF1ZXN0QWRzKGFkVGFnVXJsKSB7XG4gICAgY29uc3QgYWRzUmVxdWVzdCA9IG5ldyBnb29nbGUuaW1hLkFkc1JlcXVlc3QoKTtcbiAgICBhZHNSZXF1ZXN0LmFkVGFnVXJsID0gYWRUYWdVcmw7XG4gICAgYWRzUmVxdWVzdC5saW5lYXJBZFNsb3RXaWR0aCA9IHRoaXMud2lkdGg7XG4gICAgYWRzUmVxdWVzdC5saW5lYXJBZFNsb3RIZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICBhZHNSZXF1ZXN0Lm5vbkxpbmVhckFkU2xvdFdpZHRoID0gdGhpcy53aWR0aDtcbiAgICBhZHNSZXF1ZXN0Lm5vbkxpbmVhckFkU2xvdEhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMuYWRzTG9hZGVyLnJlcXVlc3RBZHMoYWRzUmVxdWVzdCk7XG4gIH1cblxuICBjb250ZW50RW5kZWQoKSB7XG4gICAgdGhpcy5jb250ZW50Q29tcGxldGVDYWxsZWQgPSB0cnVlO1xuICAgIHRoaXMuYWRzTG9hZGVyLmNvbnRlbnRDb21wbGV0ZSgpO1xuICB9XG5cbiAgb25BZHNNYW5hZ2VyTG9hZGVkKGFkc01hbmFnZXJMb2FkZWRFdmVudCkge1xuICAgIGNvbnN0IGFkc1JlbmRlcmluZ1NldHRpbmdzID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVuZGVyaW5nU2V0dGluZ3MoKTtcbiAgICBhZHNSZW5kZXJpbmdTZXR0aW5ncy5yZXN0b3JlQ3VzdG9tUGxheWJhY2tTdGF0ZU9uQWRCcmVha0NvbXBsZXRlID0gdHJ1ZTtcbiAgICB0aGlzLmFkc01hbmFnZXIgPSBhZHNNYW5hZ2VyTG9hZGVkRXZlbnQuZ2V0QWRzTWFuYWdlcihcbiAgICAgIHRoaXMuY29udGVudFBsYXllciwgYWRzUmVuZGVyaW5nU2V0dGluZ3MpO1xuICAgIHRoaXMuc3RhcnRBZHNNYW5hZ2VyKHRoaXMuYWRzTWFuYWdlcik7XG4gIH1cblxuICBzdGFydEFkc01hbmFnZXIoYWRzTWFuYWdlcikge1xuICAgIC8vIEF0dGFjaCB0aGUgcGF1c2UvcmVzdW1lIGV2ZW50cy5cbiAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1BBVVNFX1JFUVVFU1RFRCxcbiAgICAgICgpID0+IHRoaXMub25Db250ZW50UGF1c2VSZXF1ZXN0ZWQoKSxcbiAgICAgIGZhbHNlLFxuICAgICAgdGhpcyk7XG4gICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVELFxuICAgICAgKCkgPT4gdGhpcy5vbkNvbnRlbnRSZXN1bWVSZXF1ZXN0ZWQoKSxcbiAgICAgIGZhbHNlLFxuICAgICAgdGhpcyk7XG4gICAgLy8gSGFuZGxlIGVycm9ycy5cbiAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SLFxuICAgICAgZXZlbnQgPT4gdGhpcy5vbkFkRXJyb3IoZXZlbnQpLFxuICAgICAgZmFsc2UsXG4gICAgICB0aGlzKTtcbiAgICBjb25zdCBldmVudHMgPSBbZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQUxMX0FEU19DT01QTEVURUQsXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ0xJQ0ssXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09NUExFVEUsXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuRklSU1RfUVVBUlRJTEUsXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVELFxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLk1JRFBPSU5ULFxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlBBVVNFRCxcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TVEFSVEVELFxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlRISVJEX1FVQVJUSUxFXTtcbiAgICBldmVudHMuZm9yRWFjaChldmVudCA9PlxuICAgICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBhZEV2ZW50ID0+IHRoaXMub25BZEV2ZW50KGFkRXZlbnQpLCBmYWxzZSlcbiAgICApO1xuXG4gICAgYWRzTWFuYWdlci5pbml0KFxuICAgICAgdGhpcy53aWR0aCxcbiAgICAgIHRoaXMuaGVpZ2h0LFxuICAgICAgZ29vZ2xlLmltYS5WaWV3TW9kZS5OT1JNQUwpO1xuXG4gICAgYWRzTWFuYWdlci5zdGFydCgpO1xuICB9XG5cbiAgb25Db250ZW50UGF1c2VSZXF1ZXN0ZWQoKSB7XG4gICAgdGhpcy5wYXVzZUZvckFkKCk7XG4gIH1cblxuICBvbkNvbnRlbnRSZXN1bWVSZXF1ZXN0ZWQoKSB7XG4gICAgLy8gV2l0aG91dCB0aGlzIGNoZWNrIHRoZSB2aWRlbyBzdGFydHMgb3ZlciBmcm9tIHRoZSBiZWdpbm5pbmcgb24gYVxuICAgIC8vIHBvc3Qtcm9sbCdzIENPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRFxuICAgIGlmICghdGhpcy5jb250ZW50Q29tcGxldGVDYWxsZWQpIHtcbiAgICAgIHRoaXMucmVzdW1lQWZ0ZXJBZCgpO1xuICAgIH1cbiAgfVxuXG4gIG9uQWRFdmVudChhZEV2ZW50KSB7XG4gICAgaWYgKGFkRXZlbnQudHlwZSA9PT0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVEKSB7XG4gICAgICBjb25zdCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgIGlmICghYWQuaXNMaW5lYXIoKSkge1xuICAgICAgICB0aGlzLm9uQ29udGVudFJlc3VtZVJlcXVlc3RlZCgpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmFkRXZlbnRzLmVtaXQoYWRFdmVudCk7XG4gIH1cblxuICBvbkFkRXJyb3IoYWRFcnJvckV2ZW50KSB7XG4gICAgaWYgKHRoaXMuYWRzTWFuYWdlcikge1xuICAgICAgdGhpcy5hZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5yZXN1bWVBZnRlckFkKCk7XG4gICAgdGhpcy5hZEV2ZW50cy5lbWl0KGFkRXJyb3JFdmVudCk7XG4gIH1cblxuICAvLyBhcHBsaWNhdGlvbiBmdW5jdGlvbnNcblxuICByZXN1bWVBZnRlckFkKCkge1xuICAgIHRoaXMuY29udGVudFBsYXllci5wbGF5KCk7XG4gIH1cblxuICBwYXVzZUZvckFkKCkge1xuICAgIHRoaXMuY29udGVudFBsYXllci5wYXVzZSgpO1xuICB9XG5cbiAgbG9hZEFkcygpIHtcbiAgICB0aGlzLnJlcXVlc3RBZHModGhpcy5hZFRhZyk7XG4gIH1cblxufVxuIl19