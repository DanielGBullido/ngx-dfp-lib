/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            loadImaSdk().then((/**
             * @return {?}
             */
            function () { return _this.setUpIMA(); }));
            // simple control
            this.adActions.subscribe((/**
             * @param {?} act
             * @return {?}
             */
            function (act) {
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
        this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onAdsManagerLoaded(event); }), false);
        this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onAdError(event); }), false);
        // An event listener to tell the SDK that our content video
        // is completed so the SDK can play any post-roll ads.
        this.contentPlayer.onended = (/**
         * @return {?}
         */
        function () {
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
        adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, (/**
         * @return {?}
         */
        function () { return _this.onContentPauseRequested(); }), false, this);
        adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, (/**
         * @return {?}
         */
        function () { return _this.onContentResumeRequested(); }), false, this);
        // Handle errors.
        adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onAdError(event); }), false, this);
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
        events.forEach((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return adsManager.addEventListener(event, (/**
             * @param {?} adEvent
             * @return {?}
             */
            function (adEvent) { return _this.onAdEvent(adEvent); }), false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXZpZGVvLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvdmlkZW8vIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLXZpZGVvLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0gsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV6QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RTtJQXNCRSwyQkFDK0IsVUFBa0IsRUFDdkMsVUFBc0IsRUFDdEIsUUFBbUIsRUFDbkIsY0FBcUM7UUFIaEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsbUJBQWMsR0FBZCxjQUFjLENBQXVCO1FBZnJDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBU3JDLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFPcEIsQ0FBQzs7OztJQUVMLG9DQUFROzs7SUFBUjtRQUFBLGlCQW9DQztRQW5DQyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTs7Z0JBRWhDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWE7WUFFeEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsWUFB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Q0wsS0FBSzsyQkFFTCxNQUFNOztJQWlOVCx3QkFBQztDQUFBLEFBNU5ELElBNE5DO1NBek5ZLGlCQUFpQjs7O0lBRTVCLGtDQUF1Qjs7SUFDdkIsbUNBQXdCOztJQUV4QixrQ0FBdUI7O0lBQ3ZCLHNDQUE4RDs7SUFFOUQscUNBQTZDOztJQUU3QywwQ0FBZ0M7O0lBQ2hDLHdDQUF5Qjs7Ozs7SUFFekIsa0RBQXVDOzs7OztJQUN2QywrQ0FBMEQ7Ozs7O0lBQzFELHNDQUF3Qzs7Ozs7SUFDeEMsdUNBQTBDOzs7OztJQUMxQyxvQ0FBd0I7Ozs7O0lBR3RCLHVDQUErQzs7Ozs7SUFDL0MsdUNBQThCOzs7OztJQUM5QixxQ0FBMkI7Ozs7O0lBQzNCLDJDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5qZWN0LCBQTEFURk9STV9JRCwgRWxlbWVudFJlZiwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBsb2FkSW1hU2RrIH0gZnJvbSAnQGFsdWdoYS9pbWEnO1xuXG5pbXBvcnQgeyBEZnBJREdlbmVyYXRvclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC1pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2RmcC12aWRlbydcbn0pXG5leHBvcnQgY2xhc3MgRGZwVmlkZW9EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHdpZHRoOiBudW1iZXI7XG4gIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGFkVGFnOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFkQWN0aW9uczogRXZlbnRFbWl0dGVyPCdwbGF5JyB8ICdwYXVzZScgfCAncmVzdW1lJz47XG5cbiAgQE91dHB1dCgpIGFkRXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29udGVudFBsYXllcjogSFRNTFZpZGVvRWxlbWVudDtcbiAgYWRDb250YWluZXI6IEhUTUxFbGVtZW50O1xuXG4gIHByaXZhdGUgY29udGVudENvbXBsZXRlQ2FsbGVkOiBib29sZWFuO1xuICBwcml2YXRlIGFkRGlzcGxheUNvbnRhaW5lcjogZ29vZ2xlLmltYS5BZERpc3BsYXlDb250YWluZXI7XG4gIHByaXZhdGUgYWRzTG9hZGVyOiBnb29nbGUuaW1hLkFkc0xvYWRlcjtcbiAgcHJpdmF0ZSBhZHNNYW5hZ2VyOiBnb29nbGUuaW1hLkFkc01hbmFnZXI7XG4gIHByaXZhdGUgYWRzRG9uZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBkZnBJREdlbmVyYXRvcjogRGZwSURHZW5lcmF0b3JTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcblxuICAgICAgY29uc3QgZWwgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgdGhpcy5kZnBJREdlbmVyYXRvci5kZnBJREdlbmVyYXRvcihlbCk7XG5cbiAgICAgIHRoaXMuY29udGVudFBsYXllciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmNvbnRlbnRQbGF5ZXIsICd3aWR0aCcsIHRoaXMud2lkdGgudG9TdHJpbmcoKSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmNvbnRlbnRQbGF5ZXIsICdoZWlnaHQnLCB0aGlzLmhlaWdodC50b1N0cmluZygpKTtcblxuICAgICAgdGhpcy5hZENvbnRhaW5lciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5hZC1jb250YWluZXInKTtcbiAgICAgIGlmICghdGhpcy5hZENvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmFkQ29udGFpbmVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmFkQ29udGFpbmVyLCAnYWQtY29udGFpbmVyJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZWwsIHRoaXMuYWRDb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICAvLyBpbWEgc2V0dXBcbiAgICAgIGxvYWRJbWFTZGsoKS50aGVuKCgpID0+IHRoaXMuc2V0VXBJTUEoKSk7XG5cbiAgICAgIC8vIHNpbXBsZSBjb250cm9sXG4gICAgICB0aGlzLmFkQWN0aW9ucy5zdWJzY3JpYmUoYWN0ID0+IHtcbiAgICAgICAgc3dpdGNoIChhY3QpIHtcbiAgICAgICAgICBjYXNlICdwbGF5JzpcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncGF1c2UnOlxuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncmVzdW1lJzpcbiAgICAgICAgICAgIHRoaXMucmVzdW1lKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcGxheSgpIHtcbiAgICBpZiAoIXRoaXMuYWRzRG9uZSkge1xuICAgICAgdGhpcy5pbml0aWFsVXNlckFjdGlvbigpO1xuICAgICAgdGhpcy5sb2FkQWRzKCk7XG4gICAgICB0aGlzLmFkc0RvbmUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIGlmICh0aGlzLmFkc01hbmFnZXIpIHtcbiAgICAgIHRoaXMuYWRzTWFuYWdlci5wYXVzZSgpO1xuICAgIH1cbiAgfVxuXG4gIHJlc3VtZSgpIHtcbiAgICBpZiAodGhpcy5hZHNNYW5hZ2VyKSB7XG4gICAgICB0aGlzLmFkc01hbmFnZXIucmVzdW1lKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0VXBJTUEoKSB7XG4gICAgLy8gQ3JlYXRlIHRoZSBhZCBkaXNwbGF5IGNvbnRhaW5lci5cbiAgICB0aGlzLmFkRGlzcGxheUNvbnRhaW5lciA9IG5ldyBnb29nbGUuaW1hLkFkRGlzcGxheUNvbnRhaW5lcih0aGlzLmFkQ29udGFpbmVyLCB0aGlzLmNvbnRlbnRQbGF5ZXIpO1xuICAgIC8vIENyZWF0ZSBhZHMgbG9hZGVyLlxuICAgIHRoaXMuYWRzTG9hZGVyID0gbmV3IGdvb2dsZS5pbWEuQWRzTG9hZGVyKHRoaXMuYWREaXNwbGF5Q29udGFpbmVyKTtcbiAgICAvLyBMaXN0ZW4gYW5kIHJlc3BvbmQgdG8gYWRzIGxvYWRlZCBhbmQgZXJyb3IgZXZlbnRzLlxuICAgIHRoaXMuYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBnb29nbGUuaW1hLkFkc01hbmFnZXJMb2FkZWRFdmVudC5UeXBlLkFEU19NQU5BR0VSX0xPQURFRCxcbiAgICAgIGV2ZW50ID0+IHRoaXMub25BZHNNYW5hZ2VyTG9hZGVkKGV2ZW50KSxcbiAgICAgIGZhbHNlKTtcbiAgICB0aGlzLmFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUixcbiAgICAgIGV2ZW50ID0+IHRoaXMub25BZEVycm9yKGV2ZW50KSxcbiAgICAgIGZhbHNlKTtcblxuICAgIC8vIEFuIGV2ZW50IGxpc3RlbmVyIHRvIHRlbGwgdGhlIFNESyB0aGF0IG91ciBjb250ZW50IHZpZGVvXG4gICAgLy8gaXMgY29tcGxldGVkIHNvIHRoZSBTREsgY2FuIHBsYXkgYW55IHBvc3Qtcm9sbCBhZHMuXG4gICAgdGhpcy5jb250ZW50UGxheWVyLm9uZW5kZWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmNvbnRlbnRFbmRlZCgpO1xuICAgIH07XG4gIH1cblxuICBpbml0aWFsVXNlckFjdGlvbigpIHtcbiAgICB0aGlzLmFkRGlzcGxheUNvbnRhaW5lci5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5jb250ZW50UGxheWVyLmxvYWQoKTtcbiAgfVxuXG4gIHJlcXVlc3RBZHMoYWRUYWdVcmwpIHtcbiAgICBjb25zdCBhZHNSZXF1ZXN0ID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVxdWVzdCgpO1xuICAgIGFkc1JlcXVlc3QuYWRUYWdVcmwgPSBhZFRhZ1VybDtcbiAgICBhZHNSZXF1ZXN0LmxpbmVhckFkU2xvdFdpZHRoID0gdGhpcy53aWR0aDtcbiAgICBhZHNSZXF1ZXN0LmxpbmVhckFkU2xvdEhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgIGFkc1JlcXVlc3Qubm9uTGluZWFyQWRTbG90V2lkdGggPSB0aGlzLndpZHRoO1xuICAgIGFkc1JlcXVlc3Qubm9uTGluZWFyQWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgdGhpcy5hZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTtcbiAgfVxuXG4gIGNvbnRlbnRFbmRlZCgpIHtcbiAgICB0aGlzLmNvbnRlbnRDb21wbGV0ZUNhbGxlZCA9IHRydWU7XG4gICAgdGhpcy5hZHNMb2FkZXIuY29udGVudENvbXBsZXRlKCk7XG4gIH1cblxuICBvbkFkc01hbmFnZXJMb2FkZWQoYWRzTWFuYWdlckxvYWRlZEV2ZW50KSB7XG4gICAgY29uc3QgYWRzUmVuZGVyaW5nU2V0dGluZ3MgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZW5kZXJpbmdTZXR0aW5ncygpO1xuICAgIGFkc1JlbmRlcmluZ1NldHRpbmdzLnJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUgPSB0cnVlO1xuICAgIHRoaXMuYWRzTWFuYWdlciA9IGFkc01hbmFnZXJMb2FkZWRFdmVudC5nZXRBZHNNYW5hZ2VyKFxuICAgICAgdGhpcy5jb250ZW50UGxheWVyLCBhZHNSZW5kZXJpbmdTZXR0aW5ncyk7XG4gICAgdGhpcy5zdGFydEFkc01hbmFnZXIodGhpcy5hZHNNYW5hZ2VyKTtcbiAgfVxuXG4gIHN0YXJ0QWRzTWFuYWdlcihhZHNNYW5hZ2VyKSB7XG4gICAgLy8gQXR0YWNoIHRoZSBwYXVzZS9yZXN1bWUgZXZlbnRzLlxuICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUEFVU0VfUkVRVUVTVEVELFxuICAgICAgKCkgPT4gdGhpcy5vbkNvbnRlbnRQYXVzZVJlcXVlc3RlZCgpLFxuICAgICAgZmFsc2UsXG4gICAgICB0aGlzKTtcbiAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1JFU1VNRV9SRVFVRVNURUQsXG4gICAgICAoKSA9PiB0aGlzLm9uQ29udGVudFJlc3VtZVJlcXVlc3RlZCgpLFxuICAgICAgZmFsc2UsXG4gICAgICB0aGlzKTtcbiAgICAvLyBIYW5kbGUgZXJyb3JzLlxuICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1IsXG4gICAgICBldmVudCA9PiB0aGlzLm9uQWRFcnJvcihldmVudCksXG4gICAgICBmYWxzZSxcbiAgICAgIHRoaXMpO1xuICAgIGNvbnN0IGV2ZW50cyA9IFtnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BTExfQURTX0NPTVBMRVRFRCxcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DTElDSyxcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT01QTEVURSxcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5GSVJTVF9RVUFSVElMRSxcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQsXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTUlEUE9JTlQsXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuUEFVU0VELFxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNUQVJURUQsXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuVEhJUkRfUVVBUlRJTEVdO1xuICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+XG4gICAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGFkRXZlbnQgPT4gdGhpcy5vbkFkRXZlbnQoYWRFdmVudCksIGZhbHNlKVxuICAgICk7XG5cbiAgICBhZHNNYW5hZ2VyLmluaXQoXG4gICAgICB0aGlzLndpZHRoLFxuICAgICAgdGhpcy5oZWlnaHQsXG4gICAgICBnb29nbGUuaW1hLlZpZXdNb2RlLk5PUk1BTCk7XG5cbiAgICBhZHNNYW5hZ2VyLnN0YXJ0KCk7XG4gIH1cblxuICBvbkNvbnRlbnRQYXVzZVJlcXVlc3RlZCgpIHtcbiAgICB0aGlzLnBhdXNlRm9yQWQoKTtcbiAgfVxuXG4gIG9uQ29udGVudFJlc3VtZVJlcXVlc3RlZCgpIHtcbiAgICAvLyBXaXRob3V0IHRoaXMgY2hlY2sgdGhlIHZpZGVvIHN0YXJ0cyBvdmVyIGZyb20gdGhlIGJlZ2lubmluZyBvbiBhXG4gICAgLy8gcG9zdC1yb2xsJ3MgQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEXG4gICAgaWYgKCF0aGlzLmNvbnRlbnRDb21wbGV0ZUNhbGxlZCkge1xuICAgICAgdGhpcy5yZXN1bWVBZnRlckFkKCk7XG4gICAgfVxuICB9XG5cbiAgb25BZEV2ZW50KGFkRXZlbnQpIHtcbiAgICBpZiAoYWRFdmVudC50eXBlID09PSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQpIHtcbiAgICAgIGNvbnN0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgaWYgKCFhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgIHRoaXMub25Db250ZW50UmVzdW1lUmVxdWVzdGVkKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuYWRFdmVudHMuZW1pdChhZEV2ZW50KTtcbiAgfVxuXG4gIG9uQWRFcnJvcihhZEVycm9yRXZlbnQpIHtcbiAgICBpZiAodGhpcy5hZHNNYW5hZ2VyKSB7XG4gICAgICB0aGlzLmFkc01hbmFnZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLnJlc3VtZUFmdGVyQWQoKTtcbiAgICB0aGlzLmFkRXZlbnRzLmVtaXQoYWRFcnJvckV2ZW50KTtcbiAgfVxuXG4gIC8vIGFwcGxpY2F0aW9uIGZ1bmN0aW9uc1xuXG4gIHJlc3VtZUFmdGVyQWQoKSB7XG4gICAgdGhpcy5jb250ZW50UGxheWVyLnBsYXkoKTtcbiAgfVxuXG4gIHBhdXNlRm9yQWQoKSB7XG4gICAgdGhpcy5jb250ZW50UGxheWVyLnBhdXNlKCk7XG4gIH1cblxuICBsb2FkQWRzKCkge1xuICAgIHRoaXMucmVxdWVzdEFkcyh0aGlzLmFkVGFnKTtcbiAgfVxuXG59XG4iXX0=