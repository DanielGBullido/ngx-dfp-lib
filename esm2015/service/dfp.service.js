/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Optional, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DFP_CONFIG } from './injection_token';
import { DfpConfig } from '../class';
import { IdleService } from './idle.service';
import { ScriptInjectorService } from './script-injector.service';
/** @type {?} */
export const GPT_LIBRARY_URL = '//www.googletagservices.com/tag/js/gpt.js';
class DFPConfigurationError extends Error {
}
export class DfpService {
    /**
     * @param {?} platformId
     * @param {?} idleLoad
     * @param {?} config
     * @param {?} scriptInjector
     */
    constructor(platformId, idleLoad, config, scriptInjector) {
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
            const win = window;
            /** @type {?} */
            const googletag = win.googletag || {};
            this.dfpConfig();
            googletag.cmd = googletag.cmd || [];
            googletag.cmd.push((/**
             * @return {?}
             */
            () => {
                this.setup();
            }));
            win.googletag = googletag;
            if (this.loadGPT) {
                /** @type {?} */
                const loadScript = (/**
                 * @return {?}
                 */
                () => {
                    this.scriptInjector.scriptInjector(GPT_LIBRARY_URL).then((/**
                     * @param {?} script
                     * @return {?}
                     */
                    (script) => {
                        this.loaded = true;
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
    dfpConfig() {
        for (const key in this.config) {
            if (this.hasOwnProperty(key)) {
                this[key] = this.config[key];
            }
        }
    }
    /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    addSafeFrameConfig(pubads) {
        if (!this.safeFrameConfig) {
            return false;
        }
        if (typeof this.safeFrameConfig !== 'object') {
            throw new DFPConfigurationError('FrameConfig must be an object');
        }
        pubads.setSafeFrameConfig(this.safeFrameConfig);
    }
    /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    addTargeting(pubads) {
        if (!this.globalTargeting) {
            return false;
        }
        if (typeof this.globalTargeting !== 'object') {
            throw new DFPConfigurationError('Targeting must be an object');
        }
        for (const key in this.globalTargeting) {
            if (this.globalTargeting.hasOwnProperty(key)) {
                pubads.setTargeting(key, this.globalTargeting[key]);
            }
        }
    }
    /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    addLocation(pubads) {
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
    }
    /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    addPPID(pubads) {
        if (!this.ppid) {
            return false;
        }
        if (typeof this.ppid !== 'string') {
            throw new DFPConfigurationError('PPID must be a string');
        }
        pubads.setPublisherProvidedId(this.ppid);
    }
    /**
     * @private
     * @return {?}
     */
    setup() {
        /** @type {?} */
        const win = window;
        /** @type {?} */
        const googletag = win.googletag;
        /** @type {?} */
        const pubads = googletag.pubads();
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
    }
    /**
     * @return {?}
     */
    hasLoaded() {
        return this.loaded;
    }
    /**
     * @param {?} task
     * @return {?}
     */
    defineTask(task) {
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            const win = window;
            /** @type {?} */
            const googletag = win.googletag;
            googletag.cmd.push(task);
        }
    }
}
DfpService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DfpService.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: IdleService, decorators: [{ type: Optional }] },
    { type: DfpConfig, decorators: [{ type: Inject, args: [DFP_CONFIG,] }] },
    { type: ScriptInjectorService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsic2VydmljZS9kZnAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBRWxFLE1BQU0sT0FBTyxlQUFlLEdBQUcsMkNBQTJDO0FBRTFFLE1BQU0scUJBQXNCLFNBQVEsS0FBSztDQUFJO0FBRzdDLE1BQU0sT0FBTyxVQUFVOzs7Ozs7O0lBd0JyQixZQUMrQixVQUFrQixFQUNuQyxRQUFxQixFQUNMLE1BQWlCLEVBQ3JDLGNBQXFDO1FBSGhCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFFbkIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNyQyxtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7UUExQnZDLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRXZCLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBRXZCLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBRXZCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFbEIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUVoQixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBRVosb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFFdkIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFdkIsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFFdkIsWUFBTyxHQUFH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RS9CLDZCQUF1Qjs7Ozs7SUFFdkIsNEJBQXVCOzs7OztJQUdyQixnQ0FBK0M7Ozs7O0lBRS9DLDRCQUE2Qzs7Ozs7SUFDN0Msb0NBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgREZQX0NPTkZJRyB9IGZyb20gJy4vaW5qZWN0aW9uX3Rva2VuJztcbmltcG9ydCB7IERmcENvbmZpZyB9IGZyb20gJy4uL2NsYXNzJztcbmltcG9ydCB7IElkbGVTZXJ2aWNlIH0gZnJvbSAnLi9pZGxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBHUFRfTElCUkFSWV9VUkwgPSAnLy93d3cuZ29vZ2xldGFnc2VydmljZXMuY29tL3RhZy9qcy9ncHQuanMnO1xuXG5jbGFzcyBERlBDb25maWd1cmF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7IH1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERmcFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgZW5hYmxlVmlkZW9BZHMgPSBmYWxzZTtcblxuICBwcml2YXRlIHBlcnNvbmFsaXplZEFkcyA9IHRydWU7XG5cbiAgcHJpdmF0ZSBjb2xsYXBzZUlmRW1wdHkgPSB0cnVlO1xuXG4gIHByaXZhdGUgY2VudGVyaW5nID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBsb2NhdGlvbiA9IG51bGw7XG5cbiAgcHJpdmF0ZSBwcGlkID0gbnVsbDtcblxuICBwcml2YXRlIGdsb2JhbFRhcmdldGluZyA9IG51bGw7XG5cbiAgcHJpdmF0ZSBmb3JjZVNhZmVGcmFtZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc2FmZUZyYW1lQ29uZmlnID0gbnVsbDtcblxuICBwcml2YXRlIGxvYWRHUFQgPSB0cnVlO1xuXG4gIHByaXZhdGUgbG9hZGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQE9wdGlvbmFsKCkgaWRsZUxvYWQ6IElkbGVTZXJ2aWNlLFxuICAgIEBJbmplY3QoREZQX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcbiAgICBwcml2YXRlIHNjcmlwdEluamVjdG9yOiBTY3JpcHRJbmplY3RvclNlcnZpY2VcbiAgKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93LFxuICAgICAgICBnb29nbGV0YWcgPSB3aW4uZ29vZ2xldGFnIHx8IHt9O1xuXG4gICAgICB0aGlzLmRmcENvbmZpZygpO1xuXG4gICAgICBnb29nbGV0YWcuY21kID0gZ29vZ2xldGFnLmNtZCB8fCBbXTtcbiAgICAgIGdvb2dsZXRhZy5jbWQucHVzaCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0dXAoKTtcbiAgICAgIH0pO1xuICAgICAgd2luLmdvb2dsZXRhZyA9IGdvb2dsZXRhZztcblxuICAgICAgaWYgKHRoaXMubG9hZEdQVCkge1xuICAgICAgICBjb25zdCBsb2FkU2NyaXB0ID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2NyaXB0SW5qZWN0b3Iuc2NyaXB0SW5qZWN0b3IoR1BUX0xJQlJBUllfVVJMKS50aGVuKChzY3JpcHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGlkbGVMb2FkKSB7XG4gICAgICAgICAgaWRsZUxvYWQucmVxdWVzdChsb2FkU2NyaXB0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2FkU2NyaXB0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRmcENvbmZpZygpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbmZpZykge1xuICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB0aGlzW2tleV0gPSB0aGlzLmNvbmZpZ1trZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkU2FmZUZyYW1lQ29uZmlnKHB1YmFkcykge1xuICAgIGlmICghdGhpcy5zYWZlRnJhbWVDb25maWcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNhZmVGcmFtZUNvbmZpZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ0ZyYW1lQ29uZmlnIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gICAgfVxuICAgIHB1YmFkcy5zZXRTYWZlRnJhbWVDb25maWcodGhpcy5zYWZlRnJhbWVDb25maWcpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRUYXJnZXRpbmcocHViYWRzKSB7XG4gICAgaWYgKCF0aGlzLmdsb2JhbFRhcmdldGluZykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAodHlwZW9mIHRoaXMuZ2xvYmFsVGFyZ2V0aW5nICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgbmV3IERGUENvbmZpZ3VyYXRpb25FcnJvcignVGFyZ2V0aW5nIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5nbG9iYWxUYXJnZXRpbmcpIHtcbiAgICAgIGlmICh0aGlzLmdsb2JhbFRhcmdldGluZy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHB1YmFkcy5zZXRUYXJnZXRpbmcoa2V5LCB0aGlzLmdsb2JhbFRhcmdldGluZ1trZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZExvY2F0aW9uKHB1YmFkcykge1xuICAgIGlmICghdGhpcy5sb2NhdGlvbikgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy5sb2NhdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHB1YmFkcy5zZXRMb2NhdGlvbih0aGlzLmxvY2F0aW9uKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5sb2NhdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ0xvY2F0aW9uIG11c3QgYmUgYW4gJyArXG4gICAgICAgICdhcnJheSBvciBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICBwdWJhZHMuc2V0TG9jYXRpb24uYXBwbHkocHViYWRzLCB0aGlzLmxvY2F0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkUFBJRChwdWJhZHMpIHtcbiAgICBpZiAoIXRoaXMucHBpZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAodHlwZW9mIHRoaXMucHBpZCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ1BQSUQgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cblxuICAgIHB1YmFkcy5zZXRQdWJsaXNoZXJQcm92aWRlZElkKHRoaXMucHBpZCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwKCkge1xuICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93LFxuICAgICAgZ29vZ2xldGFnID0gd2luLmdvb2dsZXRhZyxcbiAgICAgIHB1YmFkcyA9IGdvb2dsZXRhZy5wdWJhZHMoKTtcblxuICAgIGlmICh0aGlzLmVuYWJsZVZpZGVvQWRzKSB7XG4gICAgICBwdWJhZHMuZW5hYmxlVmlkZW9BZHMoKTtcbiAgICB9XG5cbiAgICAvLyBwZXJzb25hbGl6ZWRBZHMgaXMgZGVmYXVsdFxuICAgIGlmICh0aGlzLnBlcnNvbmFsaXplZEFkcyA9PT0gZmFsc2UpIHtcbiAgICAgIHB1YmFkcy5zZXRSZXF1ZXN0Tm9uUGVyc29uYWxpemVkQWRzKDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbGxhcHNlSWZFbXB0eSkge1xuICAgICAgcHViYWRzLmNvbGxhcHNlRW1wdHlEaXZzKCk7XG4gICAgfVxuXG4gICAgLy8gV2UgYWx3YXlzIHJlZnJlc2ggb3Vyc2VsdmVzXG4gICAgcHViYWRzLmRpc2FibGVJbml0aWFsTG9hZCgpO1xuXG4gICAgcHViYWRzLnNldEZvcmNlU2FmZUZyYW1lKHRoaXMuZm9yY2VTYWZlRnJhbWUpO1xuICAgIHB1YmFkcy5zZXRDZW50ZXJpbmcodGhpcy5jZW50ZXJpbmcpO1xuXG4gICAgdGhpcy5hZGRMb2NhdGlvbihwdWJhZHMpO1xuICAgIHRoaXMuYWRkUFBJRChwdWJhZHMpO1xuICAgIHRoaXMuYWRkVGFyZ2V0aW5nKHB1YmFkcyk7XG4gICAgdGhpcy5hZGRTYWZlRnJhbWVDb25maWcocHViYWRzKTtcblxuICAgIC8vIHB1YmFkcy5lbmFibGVTeW5jUmVuZGVyaW5nKCk7XG4gICAgcHViYWRzLmVuYWJsZUFzeW5jUmVuZGVyaW5nKCk7XG5cbiAgICBpZiAodGhpcy5jb25maWcuc2luZ2xlUmVxdWVzdE1vZGUgIT09IHRydWUpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5lbmFibGVWaWRlb0Fkcykge1xuICAgICAgICBwdWJhZHMuZW5hYmxlVmlkZW9BZHMoKTtcbiAgICAgIH1cbiAgICAgIGdvb2dsZXRhZy5lbmFibGVTZXJ2aWNlcygpO1xuICAgIH1cblxuICB9XG5cbiAgaGFzTG9hZGVkKCkge1xuICAgIHJldHVybiB0aGlzLmxvYWRlZDtcbiAgfVxuXG4gIGRlZmluZVRhc2sodGFzaykge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICBjb25zdCB3aW46IGFueSA9IHdpbmRvdyxcbiAgICAgICAgZ29vZ2xldGFnID0gd2luLmdvb2dsZXRhZztcbiAgICAgIGdvb2dsZXRhZy5jbWQucHVzaCh0YXNrKTtcbiAgICB9XG4gIH1cblxufVxuIl19