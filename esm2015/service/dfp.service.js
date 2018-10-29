/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            googletag.cmd.push(() => {
                this.setup();
            });
            win.googletag = googletag;
            if (this.loadGPT) {
                /** @type {?} */
                const loadScript = () => {
                    this.scriptInjector.scriptInjector(GPT_LIBRARY_URL).then((script) => {
                        this.loaded = true;
                    });
                };
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
    /** @type {?} */
    DfpService.prototype.enableVideoAds;
    /** @type {?} */
    DfpService.prototype.personalizedAds;
    /** @type {?} */
    DfpService.prototype.collapseIfEmpty;
    /** @type {?} */
    DfpService.prototype.centering;
    /** @type {?} */
    DfpService.prototype.location;
    /** @type {?} */
    DfpService.prototype.ppid;
    /** @type {?} */
    DfpService.prototype.globalTargeting;
    /** @type {?} */
    DfpService.prototype.forceSafeFrame;
    /** @type {?} */
    DfpService.prototype.safeFrameConfig;
    /** @type {?} */
    DfpService.prototype.loadGPT;
    /** @type {?} */
    DfpService.prototype.loaded;
    /** @type {?} */
    DfpService.prototype.platformId;
    /** @type {?} */
    DfpService.prototype.config;
    /** @type {?} */
    DfpService.prototype.scriptInjector;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsic2VydmljZS9kZnAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBRWxFLGFBQWEsZUFBZSxHQUFHLDJDQUEyQyxDQUFDO0FBRTNFLDJCQUE0QixTQUFRLEtBQUs7Q0FBSTtBQUc3QyxNQUFNOzs7Ozs7O0lBd0JKLFlBQytCLFVBQWtCLEVBQ25DLFFBQXFCLEVBQ0wsTUFBaUIsRUFDckM7UUFIcUIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUVuQixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ3JDLG1CQUFjLEdBQWQsY0FBYzs4QkExQkMsS0FBSzsrQkFFSixJQUFJOytCQUVKLElBQUk7eUJBRVYsS0FBSzt3QkFFTixJQUFJO29CQUVSLElBQUk7K0JBRU8sSUFBSTs4QkFFTCxLQUFLOytCQUVKLElBQUk7dUJBRVosSUFBSTtzQkFFTCxLQUFLO1FBUXBCLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ3ZDLE1BQU0sR0FBRyxHQUFRLE1BQU0sQ0FDVzs7WUFEbEMsTUFDRSxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7WUFFbEMsSUFB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LFdBQVcsdUJBa0NmLFFBQVE7WUFuQ0osU0FBUyx1QkFvQ2IsTUFBTSxTQUFDLFVBQVU7WUFsQ2IscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgREZQX0NPTkZJRyB9IGZyb20gJy4vaW5qZWN0aW9uX3Rva2VuJztcbmltcG9ydCB7IERmcENvbmZpZyB9IGZyb20gJy4uL2NsYXNzJztcbmltcG9ydCB7IElkbGVTZXJ2aWNlIH0gZnJvbSAnLi9pZGxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBHUFRfTElCUkFSWV9VUkwgPSAnLy93d3cuZ29vZ2xldGFnc2VydmljZXMuY29tL3RhZy9qcy9ncHQuanMnO1xuXG5jbGFzcyBERlBDb25maWd1cmF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7IH1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERmcFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgZW5hYmxlVmlkZW9BZHMgPSBmYWxzZTtcblxuICBwcml2YXRlIHBlcnNvbmFsaXplZEFkcyA9IHRydWU7XG5cbiAgcHJpdmF0ZSBjb2xsYXBzZUlmRW1wdHkgPSB0cnVlO1xuXG4gIHByaXZhdGUgY2VudGVyaW5nID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBsb2NhdGlvbiA9IG51bGw7XG5cbiAgcHJpdmF0ZSBwcGlkID0gbnVsbDtcblxuICBwcml2YXRlIGdsb2JhbFRhcmdldGluZyA9IG51bGw7XG5cbiAgcHJpdmF0ZSBmb3JjZVNhZmVGcmFtZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc2FmZUZyYW1lQ29uZmlnID0gbnVsbDtcblxuICBwcml2YXRlIGxvYWRHUFQgPSB0cnVlO1xuXG4gIHByaXZhdGUgbG9hZGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQE9wdGlvbmFsKCkgaWRsZUxvYWQ6IElkbGVTZXJ2aWNlLFxuICAgIEBJbmplY3QoREZQX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcbiAgICBwcml2YXRlIHNjcmlwdEluamVjdG9yOiBTY3JpcHRJbmplY3RvclNlcnZpY2VcbiAgKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93LFxuICAgICAgICBnb29nbGV0YWcgPSB3aW4uZ29vZ2xldGFnIHx8IHt9O1xuXG4gICAgICB0aGlzLmRmcENvbmZpZygpO1xuXG4gICAgICBnb29nbGV0YWcuY21kID0gZ29vZ2xldGFnLmNtZCB8fCBbXTtcbiAgICAgIGdvb2dsZXRhZy5jbWQucHVzaCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0dXAoKTtcbiAgICAgIH0pO1xuICAgICAgd2luLmdvb2dsZXRhZyA9IGdvb2dsZXRhZztcblxuICAgICAgaWYgKHRoaXMubG9hZEdQVCkge1xuICAgICAgICBjb25zdCBsb2FkU2NyaXB0ID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2NyaXB0SW5qZWN0b3Iuc2NyaXB0SW5qZWN0b3IoR1BUX0xJQlJBUllfVVJMKS50aGVuKChzY3JpcHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGlkbGVMb2FkKSB7XG4gICAgICAgICAgaWRsZUxvYWQucmVxdWVzdChsb2FkU2NyaXB0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2FkU2NyaXB0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRmcENvbmZpZygpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbmZpZykge1xuICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB0aGlzW2tleV0gPSB0aGlzLmNvbmZpZ1trZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkU2FmZUZyYW1lQ29uZmlnKHB1YmFkcykge1xuICAgIGlmICghdGhpcy5zYWZlRnJhbWVDb25maWcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNhZmVGcmFtZUNvbmZpZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ0ZyYW1lQ29uZmlnIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gICAgfVxuICAgIHB1YmFkcy5zZXRTYWZlRnJhbWVDb25maWcodGhpcy5zYWZlRnJhbWVDb25maWcpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRUYXJnZXRpbmcocHViYWRzKSB7XG4gICAgaWYgKCF0aGlzLmdsb2JhbFRhcmdldGluZykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAodHlwZW9mIHRoaXMuZ2xvYmFsVGFyZ2V0aW5nICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgbmV3IERGUENvbmZpZ3VyYXRpb25FcnJvcignVGFyZ2V0aW5nIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5nbG9iYWxUYXJnZXRpbmcpIHtcbiAgICAgIGlmICh0aGlzLmdsb2JhbFRhcmdldGluZy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHB1YmFkcy5zZXRUYXJnZXRpbmcoa2V5LCB0aGlzLmdsb2JhbFRhcmdldGluZ1trZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZExvY2F0aW9uKHB1YmFkcykge1xuICAgIGlmICghdGhpcy5sb2NhdGlvbikgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy5sb2NhdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHB1YmFkcy5zZXRMb2NhdGlvbih0aGlzLmxvY2F0aW9uKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5sb2NhdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ0xvY2F0aW9uIG11c3QgYmUgYW4gJyArXG4gICAgICAgICdhcnJheSBvciBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICBwdWJhZHMuc2V0TG9jYXRpb24uYXBwbHkocHViYWRzLCB0aGlzLmxvY2F0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkUFBJRChwdWJhZHMpIHtcbiAgICBpZiAoIXRoaXMucHBpZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAodHlwZW9mIHRoaXMucHBpZCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ1BQSUQgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cblxuICAgIHB1YmFkcy5zZXRQdWJsaXNoZXJQcm92aWRlZElkKHRoaXMucHBpZCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwKCkge1xuICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93LFxuICAgICAgZ29vZ2xldGFnID0gd2luLmdvb2dsZXRhZyxcbiAgICAgIHB1YmFkcyA9IGdvb2dsZXRhZy5wdWJhZHMoKTtcblxuICAgIGlmICh0aGlzLmVuYWJsZVZpZGVvQWRzKSB7XG4gICAgICBwdWJhZHMuZW5hYmxlVmlkZW9BZHMoKTtcbiAgICB9XG5cbiAgICAvLyBwZXJzb25hbGl6ZWRBZHMgaXMgZGVmYXVsdFxuICAgIGlmICh0aGlzLnBlcnNvbmFsaXplZEFkcyA9PT0gZmFsc2UpIHtcbiAgICAgIHB1YmFkcy5zZXRSZXF1ZXN0Tm9uUGVyc29uYWxpemVkQWRzKDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbGxhcHNlSWZFbXB0eSkge1xuICAgICAgcHViYWRzLmNvbGxhcHNlRW1wdHlEaXZzKCk7XG4gICAgfVxuXG4gICAgLy8gV2UgYWx3YXlzIHJlZnJlc2ggb3Vyc2VsdmVzXG4gICAgcHViYWRzLmRpc2FibGVJbml0aWFsTG9hZCgpO1xuXG4gICAgcHViYWRzLnNldEZvcmNlU2FmZUZyYW1lKHRoaXMuZm9yY2VTYWZlRnJhbWUpO1xuICAgIHB1YmFkcy5zZXRDZW50ZXJpbmcodGhpcy5jZW50ZXJpbmcpO1xuXG4gICAgdGhpcy5hZGRMb2NhdGlvbihwdWJhZHMpO1xuICAgIHRoaXMuYWRkUFBJRChwdWJhZHMpO1xuICAgIHRoaXMuYWRkVGFyZ2V0aW5nKHB1YmFkcyk7XG4gICAgdGhpcy5hZGRTYWZlRnJhbWVDb25maWcocHViYWRzKTtcblxuICAgIC8vIHB1YmFkcy5lbmFibGVTeW5jUmVuZGVyaW5nKCk7XG4gICAgcHViYWRzLmVuYWJsZUFzeW5jUmVuZGVyaW5nKCk7XG5cbiAgICBpZiAodGhpcy5jb25maWcuc2luZ2xlUmVxdWVzdE1vZGUgIT09IHRydWUpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5lbmFibGVWaWRlb0Fkcykge1xuICAgICAgICBwdWJhZHMuZW5hYmxlVmlkZW9BZHMoKTtcbiAgICAgIH1cbiAgICAgIGdvb2dsZXRhZy5lbmFibGVTZXJ2aWNlcygpO1xuICAgIH1cblxuICB9XG5cbiAgaGFzTG9hZGVkKCkge1xuICAgIHJldHVybiB0aGlzLmxvYWRlZDtcbiAgfVxuXG4gIGRlZmluZVRhc2sodGFzaykge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICBjb25zdCB3aW46IGFueSA9IHdpbmRvdyxcbiAgICAgICAgZ29vZ2xldGFnID0gd2luLmdvb2dsZXRhZztcbiAgICAgIGdvb2dsZXRhZy5jbWQucHVzaCh0YXNrKTtcbiAgICB9XG4gIH1cblxufVxuIl19