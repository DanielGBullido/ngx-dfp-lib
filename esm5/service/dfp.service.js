/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DFP_CONFIG } from './injection_token';
import { DfpConfig } from '../class';
import { IdleService } from './idle.service';
import { ScriptInjectorService } from './script-injector.service';
/** @type {?} */
export var GPT_LIBRARY_URL = '//www.googletagservices.com/tag/js/gpt.js';
var DFPConfigurationError = /** @class */ (function (_super) {
    tslib_1.__extends(DFPConfigurationError, _super);
    function DFPConfigurationError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DFPConfigurationError;
}(Error));
var DfpService = /** @class */ (function () {
    function DfpService(platformId, idleLoad, config, scriptInjector) {
        var _this = this;
        this.platformId = platformId;
        this.config = config;
        this.scriptInjector = scriptInjector;
        this.enableVideoAds = false;
        this.personalizedAds = true;
        this.collapseIfEmpty = true;
        this.centering = false;
        this.location = null;
        this.ppid = null;
        this.globalTargeting = null;
        this.forceSafeFrame = false;
        this.safeFrameConfig = null;
        this.loadGPT = true;
        this.loaded = false;
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            var win = window;
            /** @type {?} */
            var googletag = win.googletag || {};
            this.dfpConfig();
            googletag.cmd = googletag.cmd || [];
            googletag.cmd.push((/**
             * @return {?}
             */
            function () {
                _this.setup();
            }));
            win.googletag = googletag;
            if (this.loadGPT) {
                /** @type {?} */
                var loadScript = (/**
                 * @return {?}
                 */
                function () {
                    _this.scriptInjector.scriptInjector(GPT_LIBRARY_URL).then((/**
                     * @param {?} script
                     * @return {?}
                     */
                    function (script) {
                        _this.loaded = true;
                    }));
                });
                if (idleLoad) {
                    idleLoad.request(loadScript);
                }
                else {
                    loadScript();
                }
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    DfpService.prototype.dfpConfig = /**
     * @private
     * @return {?}
     */
    function () {
        for (var key in this.config) {
            if (this.hasOwnProperty(key)) {
                this[key] = this.config[key];
            }
        }
    };
    /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    DfpService.prototype.addSafeFrameConfig = /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    function (pubads) {
        if (!this.safeFrameConfig) {
            return false;
        }
        if (typeof this.safeFrameConfig !== 'object') {
            throw new DFPConfigurationError('FrameConfig must be an object');
        }
        pubads.setSafeFrameConfig(this.safeFrameConfig);
    };
    /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    DfpService.prototype.addTargeting = /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    function (pubads) {
        if (!this.globalTargeting) {
            return false;
        }
        if (typeof this.globalTargeting !== 'object') {
            throw new DFPConfigurationError('Targeting must be an object');
        }
        for (var key in this.globalTargeting) {
            if (this.globalTargeting.hasOwnProperty(key)) {
                pubads.setTargeting(key, this.globalTargeting[key]);
            }
        }
    };
    /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    DfpService.prototype.addLocation = /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    function (pubads) {
        if (!this.location) {
            return false;
        }
        if (typeof this.location === 'string') {
            pubads.setLocation(this.location);
            return;
        }
        if (!Array.isArray(this.location)) {
            throw new DFPConfigurationError('Location must be an ' +
                'array or string');
        }
        pubads.setLocation.apply(pubads, this.location);
    };
    /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    DfpService.prototype.addPPID = /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    function (pubads) {
        if (!this.ppid) {
            return false;
        }
        if (typeof this.ppid !== 'string') {
            throw new DFPConfigurationError('PPID must be a string');
        }
        pubads.setPublisherProvidedId(this.ppid);
    };
    /**
     * @private
     * @return {?}
     */
    DfpService.prototype.setup = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var win = window;
        /** @type {?} */
        var googletag = win.googletag;
        /** @type {?} */
        var pubads = googletag.pubads();
        if (this.enableVideoAds) {
            pubads.enableVideoAds();
        }
        // personalizedAds is default
        if (this.personalizedAds === false) {
            pubads.setRequestNonPersonalizedAds(1);
        }
        if (this.collapseIfEmpty) {
            pubads.collapseEmptyDivs();
        }
        // We always refresh ourselves
        pubads.disableInitialLoad();
        pubads.setForceSafeFrame(this.forceSafeFrame);
        pubads.setCentering(this.centering);
        this.addLocation(pubads);
        this.addPPID(pubads);
        this.addTargeting(pubads);
        this.addSafeFrameConfig(pubads);
        // pubads.enableSyncRendering();
        pubads.enableAsyncRendering();
        if (this.config.singleRequestMode !== true) {
            if (this.config.enableVideoAds) {
                pubads.enableVideoAds();
            }
            googletag.enableServices();
        }
    };
    /**
     * @return {?}
     */
    DfpService.prototype.hasLoaded = /**
     * @return {?}
     */
    function () {
        return this.loaded;
    };
    /**
     * @param {?} task
     * @return {?}
     */
    DfpService.prototype.defineTask = /**
     * @param {?} task
     * @return {?}
     */
    function (task) {
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            var win = window;
            /** @type {?} */
            var googletag = win.googletag;
            googletag.cmd.push(task);
        }
    };
    DfpService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DfpService.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: IdleService, decorators: [{ type: Optional }] },
        { type: DfpConfig, decorators: [{ type: Inject, args: [DFP_CONFIG,] }] },
        { type: ScriptInjectorService }
    ]; };
    return DfpService;
}());
export { DfpService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.enableVideoAds;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.personalizedAds;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.collapseIfEmpty;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.centering;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.location;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.ppid;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.globalTargeting;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.forceSafeFrame;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.safeFrameConfig;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.loadGPT;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.loaded;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.platformId;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.config;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.scriptInjector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsic2VydmljZS9kZnAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQUVsRSxNQUFNLEtBQU8sZUFBZSxHQUFHLDJDQUEyQztBQUUxRTtJQUFvQyxpREFBSztJQUF6Qzs7SUFBNEMsQ0FBQztJQUFELDRCQUFDO0FBQUQsQ0FBQyxBQUE3QyxDQUFvQyxLQUFLLEdBQUk7QUFFN0M7SUF5QkUsb0JBQytCLFVBQWtCLEVBQ25DLFFBQXFCLEVBQ0wsTUFBaUIsRUFDckMsY0FBcUM7UUFKL0MsaUJBK0JDO1FBOUI4QixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBRW5CLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDckMsbUJBQWMsR0FBZCxjQUFjLENBQXVCO1FBMUJ2QyxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUV2QixvQkFBZSxHQUFHLElBQUksQ0FBQztRQUV2QixvQkFBZSxHQUFHLElBQUksQ0FBQztRQUV2QixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFFaEIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUVaLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBRXZCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FB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QUUvQixxQ0FBK0I7Ozs7O0lBRS9CLHFDQUErQjs7Ozs7SUFFL0IsK0JBQTBCOzs7OztJQUUxQiw4QkFBd0I7Ozs7O0lBRXhCLDBCQUFvQjs7Ozs7SUFFcEIscUNBQStCOzs7OztJQUUvQixvQ0FBK0I7Ozs7O0lBRS9CLHFDQUErQjs7Ozs7SUFFL0IsNkJBQXVCOzs7OztJQUV2Qiw0QkFBdUI7Ozs7O0lBR3JCLGdDQUErQzs7Ozs7SUFFL0MsNEJBQTZDOzs7OztJQUM3QyxvQ0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCwgUExBVEZPUk1fSUQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBERlBfQ09ORklHIH0gZnJvbSAnLi9pbmplY3Rpb25fdG9rZW4nO1xuaW1wb3J0IHsgRGZwQ29uZmlnIH0gZnJvbSAnLi4vY2xhc3MnO1xuaW1wb3J0IHsgSWRsZVNlcnZpY2UgfSBmcm9tICcuL2lkbGUuc2VydmljZSc7XG5pbXBvcnQgeyBTY3JpcHRJbmplY3RvclNlcnZpY2UgfSBmcm9tICcuL3NjcmlwdC1pbmplY3Rvci5zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IEdQVF9MSUJSQVJZX1VSTCA9ICcvL3d3dy5nb29nbGV0YWdzZXJ2aWNlcy5jb20vdGFnL2pzL2dwdC5qcyc7XG5cbmNsYXNzIERGUENvbmZpZ3VyYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHsgfVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGZwU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBlbmFibGVWaWRlb0FkcyA9IGZhbHNlO1xuXG4gIHByaXZhdGUgcGVyc29uYWxpemVkQWRzID0gdHJ1ZTtcblxuICBwcml2YXRlIGNvbGxhcHNlSWZFbXB0eSA9IHRydWU7XG5cbiAgcHJpdmF0ZSBjZW50ZXJpbmcgPSBmYWxzZTtcblxuICBwcml2YXRlIGxvY2F0aW9uID0gbnVsbDtcblxuICBwcml2YXRlIHBwaWQgPSBudWxsO1xuXG4gIHByaXZhdGUgZ2xvYmFsVGFyZ2V0aW5nID0gbnVsbDtcblxuICBwcml2YXRlIGZvcmNlU2FmZUZyYW1lID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBzYWZlRnJhbWVDb25maWcgPSBudWxsO1xuXG4gIHByaXZhdGUgbG9hZEdQVCA9IHRydWU7XG5cbiAgcHJpdmF0ZSBsb2FkZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBAT3B0aW9uYWwoKSBpZGxlTG9hZDogSWRsZVNlcnZpY2UsXG4gICAgQEluamVjdChERlBfQ09ORklHKSBwcml2YXRlIGNvbmZpZzogRGZwQ29uZmlnLFxuICAgIHByaXZhdGUgc2NyaXB0SW5qZWN0b3I6IFNjcmlwdEluamVjdG9yU2VydmljZVxuICApIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgY29uc3Qgd2luOiBhbnkgPSB3aW5kb3csXG4gICAgICAgIGdvb2dsZXRhZyA9IHdpbi5nb29nbGV0YWcgfHwge307XG5cbiAgICAgIHRoaXMuZGZwQ29uZmlnKCk7XG5cbiAgICAgIGdvb2dsZXRhZy5jbWQgPSBnb29nbGV0YWcuY21kIHx8IFtdO1xuICAgICAgZ29vZ2xldGFnLmNtZC5wdXNoKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXR1cCgpO1xuICAgICAgfSk7XG4gICAgICB3aW4uZ29vZ2xldGFnID0gZ29vZ2xldGFnO1xuXG4gICAgICBpZiAodGhpcy5sb2FkR1BUKSB7XG4gICAgICAgIGNvbnN0IGxvYWRTY3JpcHQgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zY3JpcHRJbmplY3Rvci5zY3JpcHRJbmplY3RvcihHUFRfTElCUkFSWV9VUkwpLnRoZW4oKHNjcmlwdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoaWRsZUxvYWQpIHtcbiAgICAgICAgICBpZGxlTG9hZC5yZXF1ZXN0KGxvYWRTY3JpcHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvYWRTY3JpcHQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGZwQ29uZmlnKCkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuY29uZmlnKSB7XG4gICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHRoaXNba2V5XSA9IHRoaXMuY29uZmlnW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRTYWZlRnJhbWVDb25maWcocHViYWRzKSB7XG4gICAgaWYgKCF0aGlzLnNhZmVGcmFtZUNvbmZpZykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAodHlwZW9mIHRoaXMuc2FmZUZyYW1lQ29uZmlnICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgbmV3IERGUENvbmZpZ3VyYXRpb25FcnJvcignRnJhbWVDb25maWcgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgICB9XG4gICAgcHViYWRzLnNldFNhZmVGcmFtZUNvbmZpZyh0aGlzLnNhZmVGcmFtZUNvbmZpZyk7XG4gIH1cblxuICBwcml2YXRlIGFkZFRhcmdldGluZyhwdWJhZHMpIHtcbiAgICBpZiAoIXRoaXMuZ2xvYmFsVGFyZ2V0aW5nKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5nbG9iYWxUYXJnZXRpbmcgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgREZQQ29uZmlndXJhdGlvbkVycm9yKCdUYXJnZXRpbmcgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmdsb2JhbFRhcmdldGluZykge1xuICAgICAgaWYgKHRoaXMuZ2xvYmFsVGFyZ2V0aW5nLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgcHViYWRzLnNldFRhcmdldGluZyhrZXksIHRoaXMuZ2xvYmFsVGFyZ2V0aW5nW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkTG9jYXRpb24ocHViYWRzKSB7XG4gICAgaWYgKCF0aGlzLmxvY2F0aW9uKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxvY2F0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgcHViYWRzLnNldExvY2F0aW9uKHRoaXMubG9jYXRpb24pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLmxvY2F0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IERGUENvbmZpZ3VyYXRpb25FcnJvcignTG9jYXRpb24gbXVzdCBiZSBhbiAnICtcbiAgICAgICAgJ2FycmF5IG9yIHN0cmluZycpO1xuICAgIH1cblxuICAgIHB1YmFkcy5zZXRMb2NhdGlvbi5hcHBseShwdWJhZHMsIHRoaXMubG9jYXRpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRQUElEKHB1YmFkcykge1xuICAgIGlmICghdGhpcy5wcGlkKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5wcGlkICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IERGUENvbmZpZ3VyYXRpb25FcnJvcignUFBJRCBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgcHViYWRzLnNldFB1Ymxpc2hlclByb3ZpZGVkSWQodGhpcy5wcGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXAoKSB7XG4gICAgY29uc3Qgd2luOiBhbnkgPSB3aW5kb3csXG4gICAgICBnb29nbGV0YWcgPSB3aW4uZ29vZ2xldGFnLFxuICAgICAgcHViYWRzID0gZ29vZ2xldGFnLnB1YmFkcygpO1xuXG4gICAgaWYgKHRoaXMuZW5hYmxlVmlkZW9BZHMpIHtcbiAgICAgIHB1YmFkcy5lbmFibGVWaWRlb0FkcygpO1xuICAgIH1cblxuICAgIC8vIHBlcnNvbmFsaXplZEFkcyBpcyBkZWZhdWx0XG4gICAgaWYgKHRoaXMucGVyc29uYWxpemVkQWRzID09PSBmYWxzZSkge1xuICAgICAgcHViYWRzLnNldFJlcXVlc3ROb25QZXJzb25hbGl6ZWRBZHMoMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29sbGFwc2VJZkVtcHR5KSB7XG4gICAgICBwdWJhZHMuY29sbGFwc2VFbXB0eURpdnMoKTtcbiAgICB9XG5cbiAgICAvLyBXZSBhbHdheXMgcmVmcmVzaCBvdXJzZWx2ZXNcbiAgICBwdWJhZHMuZGlzYWJsZUluaXRpYWxMb2FkKCk7XG5cbiAgICBwdWJhZHMuc2V0Rm9yY2VTYWZlRnJhbWUodGhpcy5mb3JjZVNhZmVGcmFtZSk7XG4gICAgcHViYWRzLnNldENlbnRlcmluZyh0aGlzLmNlbnRlcmluZyk7XG5cbiAgICB0aGlzLmFkZExvY2F0aW9uKHB1YmFkcyk7XG4gICAgdGhpcy5hZGRQUElEKHB1YmFkcyk7XG4gICAgdGhpcy5hZGRUYXJnZXRpbmcocHViYWRzKTtcbiAgICB0aGlzLmFkZFNhZmVGcmFtZUNvbmZpZyhwdWJhZHMpO1xuXG4gICAgLy8gcHViYWRzLmVuYWJsZVN5bmNSZW5kZXJpbmcoKTtcbiAgICBwdWJhZHMuZW5hYmxlQXN5bmNSZW5kZXJpbmcoKTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5zaW5nbGVSZXF1ZXN0TW9kZSAhPT0gdHJ1ZSkge1xuICAgICAgaWYgKHRoaXMuY29uZmlnLmVuYWJsZVZpZGVvQWRzKSB7XG4gICAgICAgIHB1YmFkcy5lbmFibGVWaWRlb0FkcygpO1xuICAgICAgfVxuICAgICAgZ29vZ2xldGFnLmVuYWJsZVNlcnZpY2VzKCk7XG4gICAgfVxuXG4gIH1cblxuICBoYXNMb2FkZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9hZGVkO1xuICB9XG5cbiAgZGVmaW5lVGFzayh0YXNrKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93LFxuICAgICAgICBnb29nbGV0YWcgPSB3aW4uZ29vZ2xldGFnO1xuICAgICAgZ29vZ2xldGFnLmNtZC5wdXNoKHRhc2spO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=