import { InjectionToken, Injectable, NgZone, Inject, PLATFORM_ID, Optional, EventEmitter, Injector, Directive, ElementRef, Input, Output, forwardRef, HostListener, NgModule } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { timer, from } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const DFP_CONFIG = new InjectionToken('dfpConfig');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class IdleService {
    /**
     * @param {?} platformId
     * @param {?} zone
     */
    constructor(platformId, zone) {
        /** @type {?} */
        const win = isPlatformBrowser(platformId) ? window : {};
        if (win.requestIdleCallback) {
            this.requestIdleCallback = (fun) => {
                return win.requestIdleCallback(fun);
            };
        }
        else {
            this.requestIdleCallback = (fun) => {
                return zone.runOutsideAngular(() => win.setTimeout(fun, 50));
            };
        }
    }
    /**
     * @param {?} fun
     * @return {?}
     */
    request(fun) {
        this.requestIdleCallback(fun);
    }
}
IdleService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
IdleService.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class HttpErrorService {
    constructor() {
        this.isErrorCode = function (code) {
            if (typeof code === 'number') {
                return !(code >= 200 && code < 300);
            }
            return code[0] !== '2';
        };
    }
    /**
     * @param {?} response
     * @param {?} message
     * @return {?}
     */
    httpError(response, message) {
        console.log(`Error (${response.status}) ${message ? message : ''}`);
    }
}
HttpErrorService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DFPDurationError extends Error {
    /**
     * @param {?} interval
     */
    constructor(interval) {
        super(`Invalid interval: '${interval}'ls`);
    }
}
class ParseDurationService {
    /**
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    convertToMilliseconds(time, unit) {
        console.assert(/^(m?s|min|h)$/g.test(unit));
        if (unit === 'ms') {
            return time;
        }
        if (unit === 's') {
            return time * 1000;
        }
        if (unit === 'min') {
            return time * 60 * 1000;
        }
        return time * 60 * 60 * 1000;
    }
    /**
     * @param {?} match
     * @return {?}
     */
    convert(match) {
        /** @type {?} */
        const time = parseFloat(match[1]);
        if (match.length === 2) {
            return time;
        }
        return this.convertToMilliseconds(time, match[2]);
    }
    /**
     * @param {?} interval
     * @return {?}
     */
    parseDuration(interval) {
        if (interval === undefined || interval === null) {
            throw new DFPDurationError(interval);
        }
        if (typeof interval === 'number') {
            return interval;
        }
        if (typeof interval !== 'string') {
            throw new TypeError(`'${interval}' must be of number or string type`);
        }
        /** @type {?} */
        const match = interval.match(/((?:\d+)?.?\d+)(m?s|min|h)?/);
        if (!match) {
            throw new DFPDurationError(interval);
        }
        return this.convert(match);
    }
}
ParseDurationService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ScriptInjectorService {
    /**
     * @param {?} httpError
     */
    constructor(httpError) {
        this.httpError = httpError;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    completeURL(url) {
        /** @type {?} */
        const ssl = document.location.protocol === 'https:';
        return (ssl ? 'https:' : 'http:') + url;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    createScript(url) {
        /** @type {?} */
        const script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.src = this.completeURL(url);
        return script;
    }
    /**
     * @param {?} script
     * @param {?} url
     * @return {?}
     */
    promiseScript(script, url) {
        /** @type {?} */
        const promise = new Promise((resolve, reject) => {
            script.onload = () => {
                resolve(script);
            };
            script.onerror = () => {
                reject({
                    path: url,
                    loaded: false
                });
            };
        });
        promise.catch(response => {
            this.httpError.httpError({ status: 400 }, `loading script "${url}"`);
        });
        return promise;
    }
    /**
     * @param {?} script
     * @return {?}
     */
    injectScript(script) {
        /** @type {?} */
        const head = document.head || document.querySelector('head');
        head.appendChild(script);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    scriptInjector(url) {
        /** @type {?} */
        const script = this.createScript(url);
        this.injectScript(script);
        return this.promiseScript(script, url);
    }
}
ScriptInjectorService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ScriptInjectorService.ctorParameters = () => [
    { type: HttpErrorService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DFPIncompleteError extends Error {
    /**
     * @param {?} directiveName
     * @param {?} missingName
     * @param {?=} isAttribute
     */
    constructor(directiveName, missingName, isAttribute) {
        super(`Incomplete definition of '${directiveName}': ` +
            `Missing ${isAttribute ? 'attribute' : 'child directive'} ` +
            `'${missingName}'.`);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpConfig {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const GPT_LIBRARY_URL = '//www.googletagservices.com/tag/js/gpt.js';
class DFPConfigurationError extends Error {
}
class DfpService {
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
class DFPRefreshError extends Error {
}
class DfpRefreshService {
    /**
     * @param {?} config
     * @param {?} inject
     * @param {?} parseDuration
     */
    constructor(config, inject, parseDuration) {
        this.config = config;
        this.inject = inject;
        this.parseDuration = parseDuration;
        this.refreshEvent = new EventEmitter();
        this.refreshSlots = [];
        this.intervals = {};
    }
    /**
     * @param {?} slot
     * @param {?=} refreshInterval
     * @param {?=} initRefresh
     * @return {?}
     */
    slotRefresh(slot, refreshInterval, initRefresh = false) {
        /** @type {?} */
        const deferred = from([slot]).toPromise();
        /** @type {?} */
        const task = { slot: slot, deferred: deferred };
        deferred.then(() => {
            if (this.hasSlotInterval(slot)) {
                this.cancelInterval(slot);
            }
            if (refreshInterval) {
                this.addSlotInterval(task, refreshInterval);
            }
        });
        if (this.config.singleRequestMode === true && initRefresh) {
            // Use a timer to handle refresh of a single request mode
            this.refreshSlots.push(slot);
            if (this.singleRequest && !this.singleRequest.closed) {
                this.singleRequest.unsubscribe();
            }
            this.singleRequest = timer(100).subscribe(() => {
                /** @type {?} */
                const pubads = googletag.pubads();
                pubads.enableSingleRequest();
                googletag.enableServices();
                this.refreshSlots.forEach(s => {
                    googletag.display(s.getSlotElementId());
                });
                pubads.refresh(this.refreshSlots);
                this.refreshSlots = [];
            });
        }
        else {
            googletag.display(slot.getSlotElementId());
            this.refresh([task]);
        }
        return deferred;
    }
    /**
     * @param {?} slot
     * @return {?}
     */
    cancelInterval(slot) {
        if (!this.hasSlotInterval(slot)) {
            throw new DFPRefreshError('No interval for given slot');
        }
        /** @type {?} */
        const interval = this.intervals[this.slotIntervalKey(slot)];
        interval.unsubscribe();
        delete this.intervals[slot];
        return this;
    }
    /**
     * @param {?} slot
     * @return {?}
     */
    hasSlotInterval(slot) {
        return this.slotIntervalKey(slot) in this.intervals;
    }
    /**
     * @param {?=} tasks
     * @return {?}
     */
    refresh(tasks) {
        if (tasks === undefined) {
            googletag.cmd.push(() => {
                googletag.pubads().refresh();
            });
            return;
        }
        if (tasks.length === 0) {
            return false;
        }
        googletag.cmd.push(() => {
            googletag.pubads().refresh(tasks.map(task => task.slot));
            tasks.forEach(task => {
                Promise.resolve(task.slot);
            });
        });
    }
    /**
     * @param {?} task
     * @param {?} interval
     * @return {?}
     */
    addSlotInterval(task, interval) {
        /** @type {?} */
        const parsedInterval = this.parseDuration.parseDuration(interval);
        this.validateInterval(parsedInterval, interval);
        /** @type {?} */
        const refresh = timer(parsedInterval, parsedInterval).subscribe(() => {
            /** @type {?} */
            const doc = this.inject.get(DOCUMENT);
            if (!this.hiddenCheck(doc.getElementById(task.slot.getSlotElementId()))) {
                this.refresh([task]);
                this.refreshEvent.emit(task.slot);
            }
        });
        this.intervals[this.slotIntervalKey(task.slot)] = refresh;
        return refresh;
    }
    /**
     * @param {?} slot
     * @return {?}
     */
    slotIntervalKey(slot) {
        return slot.getSlotId().getDomId();
    }
    /**
     * @param {?} milliseconds
     * @param {?} beforeParsing
     * @return {?}
     */
    validateInterval(milliseconds, beforeParsing) {
        if (milliseconds < 1000) {
            console.warn('Careful: ${beforeParsing} is quite a low interval!');
        }
    }
    /**
     * @param {?} element
     * @return {?}
     */
    hiddenCheck(element) {
        if (typeof (window) !== 'undefined' && element != null) {
            /** @type {?} */
            const css = window.getComputedStyle(element);
            if (css.display === 'none') {
                return true;
            }
            else if (element.parentElement) {
                return this.hiddenCheck(element.parentElement);
            }
        }
        return false;
    }
}
DfpRefreshService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DfpRefreshService.ctorParameters = () => [
    { type: DfpConfig, decorators: [{ type: Optional }, { type: Inject, args: [DFP_CONFIG,] }] },
    { type: Injector },
    { type: ParseDurationService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpAdDirective {
    /**
     * @param {?} platformId
     * @param {?} elementRef
     * @param {?} dfp
     * @param {?} dfpIDGenerator
     * @param {?} dfpRefresh
     * @param {?} config
     * @param {?} router
     */
    constructor(platformId, elementRef, dfp, dfpIDGenerator, dfpRefresh, config, router) {
        this.platformId = platformId;
        this.elementRef = elementRef;
        this.dfp = dfp;
        this.dfpIDGenerator = dfpIDGenerator;
        this.dfpRefresh = dfpRefresh;
        this.config = config;
        this.personalizedAds = this.config.personalizedAds;
        this.afterRefresh = new EventEmitter();
        this.sizes = [];
        this.responsiveMapping = [];
        this.targetings = [];
        this.exclusions = [];
        this.scripts = [];
        if (isPlatformBrowser(this.platformId)) {
            this.dfpRefresh.refreshEvent.subscribe(slot => {
                if (slot === this.slot) {
                    this.afterRefresh.emit({ type: 'refresh', slot: slot });
                }
            });
            if (router) {
                this.onSameNavigation = router.events.pipe(filter(event => event instanceof NavigationEnd))
                    .subscribe((event) => {
                    if (this.slot && !this.refresh && this.config.onSameNavigation === 'refresh') {
                        this.refreshContent.call(this);
                    }
                });
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.dfpIDGenerator.dfpIDGenerator(this.elementRef.nativeElement);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.dfp.defineTask(() => {
                this.defineSlot();
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.slot) {
            googletag.destroySlots([this.slot]);
        }
        if (this.onSameNavigation) {
            this.onSameNavigation.unsubscribe();
        }
    }
    /**
     * @param {?} slot
     * @return {?}
     */
    setResponsiveMapping(slot) {
        /** @type {?} */
        const ad = this.getState();
        if (ad.responsiveMapping.length === 0) {
            return;
        }
        /** @type {?} */
        const sizeMapping = googletag.sizeMapping();
        ad.responsiveMapping.forEach(mapping => {
            sizeMapping.addSize(mapping.viewportSize, mapping.adSizes);
        });
        slot.defineSizeMapping(sizeMapping.build());
    }
    /**
     * @return {?}
     */
    defineSlot() {
        /** @type {?} */
        const ad = this.getState();
        /** @type {?} */
        const element = this.elementRef.nativeElement;
        this.slot = googletag.defineSlot(ad.adUnit, ad.sizes, element.id);
        if (this.forceSafeFrame !== undefined && ad.forceSafeFrame === !this.config.forceSafeFrame) {
            this.slot.setForceSafeFrame(ad.forceSafeFrame);
        }
        if (this.personalizedAds === false) {
            this.slot.set('requestNonPersonalizedAds', 1);
            googletag.pubads().setRequestNonPersonalizedAds(1);
        }
        if (ad.clickUrl) {
            this.slot.setClickUrl(ad.clickUrl);
        }
        if (ad.collapseIfEmpty) {
            this.slot.setCollapseEmptyDiv(true, true);
        }
        if (ad.safeFrameConfig) {
            this.slot.setSafeFrameConfig((JSON.parse(ad.safeFrameConfig)));
        }
        this.slot.renderEnded = (googleSlotEvent) => {
            this.afterRefresh.emit({ type: 'renderEnded', slot: this.slot, data: googleSlotEvent });
        };
        this.setResponsiveMapping(this.slot);
        ad.targetings.forEach(targeting => {
            this.slot.setTargeting(targeting.key, targeting.values);
        });
        ad.exclusions.forEach(exclusion => {
            this.slot.setCategoryExclusion(exclusion);
        });
        ad.scripts.forEach(script => { script(this.slot); });
        if (this.config.enableVideoAds) {
            this.slot.addService(googletag.companionAds());
        }
        this.slot.addService(googletag.pubads());
        this.refreshContent();
    }
    /**
     * @return {?}
     */
    refreshContent() {
        this.dfpRefresh.slotRefresh(this.slot, this.refresh, true).then(slot => {
            this.afterRefresh.emit({ type: 'init', slot: slot });
        });
    }
    /**
     * @return {?}
     */
    checkValid() {
        if (this.sizes.length === 0) {
            throw new DFPIncompleteError('dfp-ad', 'dfp-size');
        }
        if (!this.adUnit) {
            throw new DFPIncompleteError('dfp-ad', 'ad-unit', true);
        }
    }
    /**
     * @return {?}
     */
    get isHidden() {
        return this.dfpRefresh.hiddenCheck(this.elementRef.nativeElement);
    }
    /**
     * @return {?}
     */
    getState() {
        this.checkValid();
        return Object.freeze({
            sizes: this.sizes,
            responsiveMapping: this.responsiveMapping,
            targetings: this.targetings,
            exclusions: this.exclusions,
            adUnit: this.adUnit,
            forceSafeFrame: this.forceSafeFrame === true,
            safeFrameConfig: this.safeFrameConfig,
            clickUrl: this.clickUrl,
            refresh: this.refresh,
            personalizedAds: this.personalizedAds === this.config.personalizedAds,
            scripts: this.scripts,
            collapseIfEmpty: this.collapseIfEmpty === true
        });
    }
    /**
     * @param {?} size
     * @return {?}
     */
    addSize(size) {
        this.sizes.push(size);
    }
    /**
     * @param {?} mapping
     * @return {?}
     */
    addResponsiveMapping(mapping) {
        this.responsiveMapping.push(mapping);
    }
    /**
     * @param {?} targeting
     * @return {?}
     */
    addTargeting(targeting) {
        this.targetings.push(targeting);
    }
    /**
     * @param {?} exclusion
     * @return {?}
     */
    addExclusion(exclusion) {
        this.exclusions.push(exclusion);
    }
    /**
     * @param {?} script
     * @return {?}
     */
    addScript(script) {
        this.scripts.push(script);
    }
}
DfpAdDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-ad'
            },] }
];
/** @nocollapse */
DfpAdDirective.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ElementRef },
    { type: DfpService },
    { type: DfpIDGeneratorService },
    { type: DfpRefreshService },
    { type: DfpConfig, decorators: [{ type: Inject, args: [DFP_CONFIG,] }] },
    { type: Router, decorators: [{ type: Optional }] }
];
DfpAdDirective.propDecorators = {
    adUnit: [{ type: Input }],
    clickUrl: [{ type: Input }],
    forceSafeFrame: [{ type: Input }],
    safeFrameConfig: [{ type: Input }],
    refresh: [{ type: Input }],
    personalizedAds: [{ type: Input }],
    collapseIfEmpty: [{ type: Input }],
    afterRefresh: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpAdResponsiveDirective {
    /**
     * @param {?} elementRef
     * @param {?} ad
     * @param {?} dfpRefresh
     */
    constructor(elementRef, ad, dfpRefresh) {
        this.elementRef = elementRef;
        this.ad = ad;
        this.dfpRefresh = dfpRefresh;
        this.ad.afterRefresh.subscribe(event => {
            this.slot = event.slot;
        });
    }
    /**
     * @return {?}
     */
    normalizeIframe() {
        if (this.ad.isHidden) {
            return false;
        }
        this.iframe = this.iframe || this.getIframe();
        if (!this.iframe) {
            return false;
        }
        this.iframeWidth = this.iframeWidth || +this.iframe.width;
        /** @type {?} */
        const winWidth = window.innerWidth;
        /** @type {?} */
        let state = this.ad.getState();
        /** @type {?} */
        let width = 0;
        state.sizes.forEach(size => {
            if (size[0] < winWidth) {
                width = Math.max(width, size[0]);
            }
        });
        if (state.sizes.length > 1 && width !== this.iframeWidth) {
            state = this.ad.getState();
            this.iframeWidth = width;
            this.iframe.setAttribute('width', width + '');
            this.dfpRefresh.slotRefresh(this.slot, state.refresh).then(slot => {
                this.ad.afterRefresh.emit({ type: 'resize', slot: slot });
                this.iframe = this.getIframe();
            });
        }
    }
    /**
     * @return {?}
     */
    getIframe() {
        /** @type {?} */
        const ad = this.elementRef.nativeElement;
        /** @type {?} */
        const iframe = ad.querySelector('iframe');
        if (iframe && +iframe.width > 0) {
            return iframe;
        }
    }
}
DfpAdResponsiveDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-ad[responsive]'
            },] }
];
/** @nocollapse */
DfpAdResponsiveDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpAdDirective),] }] },
    { type: DfpRefreshService }
];
DfpAdResponsiveDirective.propDecorators = {
    normalizeIframe: [{ type: HostListener, args: ['window:resize',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpResponsiveDirective {
    /**
     * @param {?} ad
     */
    constructor(ad) {
        this.ad = ad;
        this.viewport = [0, 0];
        this.adSizes = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.ad.addResponsiveMapping(this.getState());
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set viewWidth(val) {
        if (val > 0) {
            this.viewport[0] = val;
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set viewHeight(val) {
        if (val > 0) {
            this.viewport[1] = val;
        }
    }
    /**
     * @param {?} size
     * @return {?}
     */
    addSize(size) {
        this.adSizes.push(size);
    }
    /**
     * @return {?}
     */
    getState() {
        return Object.freeze({
            viewportSize: this.viewport,
            adSizes: this.adSizes
        });
    }
}
DfpResponsiveDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-responsive'
            },] }
];
/** @nocollapse */
DfpResponsiveDirective.ctorParameters = () => [
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpAdDirective),] }] }
];
DfpResponsiveDirective.propDecorators = {
    viewport: [{ type: Input }],
    adSizes: [{ type: Input }],
    viewWidth: [{ type: Input }],
    viewHeight: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpSizeDirective {
    /**
     * @param {?} elementRef
     * @param {?} ad
     * @param {?} resp
     */
    constructor(elementRef, ad, resp) {
        this.elementRef = elementRef;
        this.ad = ad;
        this.resp = resp;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const target = this.resp || this.ad;
        /** @type {?} */
        const innerText = this.elementRef.nativeElement.innerText;
        if (this.width && this.height) {
            target.addSize([this.width, this.height]);
        }
        else if (innerText.trim() !== '') {
            target.addSize(innerText);
        }
    }
}
DfpSizeDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-size'
            },] }
];
/** @nocollapse */
DfpSizeDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpAdDirective),] }] },
    { type: DfpResponsiveDirective, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(() => DfpResponsiveDirective),] }] }
];
DfpSizeDirective.propDecorators = {
    width: [{ type: Input }],
    height: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpTargetingDirective {
    /**
     * @param {?} ad
     */
    constructor(ad) {
        this.ad = ad;
        this.values = [];
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set value(val) {
        if (val instanceof Array) {
            val.forEach(v => this.addValue(v));
        }
        else {
            this.addValue(val);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        /** @type {?} */
        const targeting = this.getState();
        this.ad.addTargeting(targeting);
    }
    /**
     * @return {?}
     */
    checkValid() {
        if (this.key === undefined) {
            throw new DFPIncompleteError('dfp-targeting', 'key', true);
        }
        if (this.values.length === 0) {
            throw new DFPIncompleteError('dfp-targeting', 'value', true);
        }
    }
    /**
     * @return {?}
     */
    getState() {
        this.checkValid();
        return Object.freeze({
            key: this.key,
            values: this.values
        });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    addValue(value) {
        if (value && !this.values.find(item => item === value)) {
            this.values.push(value);
        }
    }
}
DfpTargetingDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-targeting'
            },] }
];
/** @nocollapse */
DfpTargetingDirective.ctorParameters = () => [
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpAdDirective),] }] }
];
DfpTargetingDirective.propDecorators = {
    key: [{ type: Input }],
    value: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpExclusionDirective {
    /**
     * @param {?} elementRef
     * @param {?} ad
     */
    constructor(elementRef, ad) {
        this.elementRef = elementRef;
        this.ad = ad;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.ad.addExclusion(this.elementRef.nativeElement.innerText);
    }
}
DfpExclusionDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-exclusion'
            },] }
];
/** @nocollapse */
DfpExclusionDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpAdDirective),] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpValueDirective {
    /**
     * @param {?} elementRef
     * @param {?} targeting
     */
    constructor(elementRef, targeting) {
        this.elementRef = elementRef;
        this.targeting = targeting;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.targeting.addValue(this.elementRef.nativeElement.innerText);
    }
}
DfpValueDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-value'
            },] }
];
/** @nocollapse */
DfpValueDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DfpTargetingDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpTargetingDirective),] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpAudiencePixelDirective {
    /**
     * @param {?} platformId
     * @param {?} elementRef
     */
    constructor(platformId, elementRef) {
        this.platformId = platformId;
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            const axel = Math.random();
            /** @type {?} */
            const random = axel * 10000000000000;
            /** @type {?} */
            let adUnit = '';
            if (this.adUnit) {
                adUnit = `dc_iu=${this.adUnit}`;
            }
            /** @type {?} */
            let ppid = '';
            if (this.ppid) {
                ppid = `ppid=${this.ppid}`;
            }
            /** @type {?} */
            const pixel = document.createElement('img');
            pixel.src = 'https://pubads.g.doubleclick.net/activity;ord=';
            pixel.src += `${random};dc_seg=${this.segmentId};${adUnit}${ppid}`;
            pixel.width = 1;
            pixel.height = 1;
            pixel.border = '0';
            pixel.style.visibility = 'hidden';
            this.elementRef.nativeElement.append(pixel);
        }
    }
}
DfpAudiencePixelDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-audience-pixel'
            },] }
];
/** @nocollapse */
DfpAudiencePixelDirective.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ElementRef }
];
DfpAudiencePixelDirective.propDecorators = {
    adUnit: [{ type: Input }],
    segmentId: [{ type: Input }],
    ppid: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const DIRECTIVES = [
    DfpAdDirective,
    DfpSizeDirective,
    DfpResponsiveDirective,
    DfpAdResponsiveDirective,
    DfpTargetingDirective, DfpExclusionDirective, DfpValueDirective,
    DfpAudiencePixelDirective
];
/** @type {?} */
const SERVICES = [
    HttpErrorService,
    ParseDurationService,
    ScriptInjectorService,
    DfpService, DfpIDGeneratorService, DfpRefreshService
];
class DfpModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: DfpModule,
            providers: [
                ...(config && config.idleLoad === true ? [IdleService] : []),
                { provide: DFP_CONFIG, useValue: config || {} }
            ]
        };
    }
}
DfpModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    ...DIRECTIVES
                ],
                providers: [
                    ...SERVICES
                ],
                exports: [
                    ...DIRECTIVES
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

export { DfpModule, DFP_CONFIG, IdleService, HttpErrorService, ParseDurationService, ScriptInjectorService, DfpService, DfpIDGeneratorService, DfpRefreshService, DfpAdDirective, DfpAdResponsiveDirective, DfpResponsiveDirective, DfpSizeDirective, DfpTargetingDirective, DfpExclusionDirective, DfpValueDirective, DfpAudiencePixelDirective, DfpConfig as ɵe, DfpAdResponsiveDirective as ɵm, DfpAdDirective as ɵa, DfpAudiencePixelDirective as ɵq, DfpExclusionDirective as ɵo, DfpResponsiveDirective as ɵl, DfpSizeDirective as ɵk, DfpTargetingDirective as ɵn, DfpValueDirective as ɵp, DfpIDGeneratorService as ɵh, DfpRefreshService as ɵi, DfpService as ɵc, HttpErrorService as ɵg, IdleService as ɵd, DFP_CONFIG as ɵb, ParseDurationService as ɵj, ScriptInjectorService as ɵf };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRmcC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL2luamVjdGlvbl90b2tlbi50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL2lkbGUuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL2h0dHAtZXJyb3Iuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UudHMiLCJuZzovL25neC1kZnAvc2VydmljZS9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9jbGFzcy9kZnAtZXJyb3JzLmNsYXNzLnRzIiwibmc6Ly9uZ3gtZGZwL2NsYXNzL2RmcC1jb25maWcuY2xhc3MudHMiLCJuZzovL25neC1kZnAvc2VydmljZS9kZnAuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL2RmcC1pZC1nZW5lcmF0b3Iuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UudHMiLCJuZzovL25neC1kZnAvZGlyZWN0aXZlL2RmcC1hZC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1kZnAvZGlyZWN0aXZlL2RmcC1hZC1yZXNwb25zaXZlLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kaXJlY3RpdmUvZGZwLXJlc3BvbnNpdmUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtZGZwL2RpcmVjdGl2ZS9kZnAtc2l6ZS5kaXJlY3RpdmUudHMiLCJuZzovL25neC1kZnAvZGlyZWN0aXZlL2RmcC10YXJnZXRpbmcuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtZGZwL2RpcmVjdGl2ZS9kZnAtZXhjbHVzaW9uLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kaXJlY3RpdmUvZGZwLXZhbHVlLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kaXJlY3RpdmUvZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kZnAubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERmcENvbmZpZyAgfSBmcm9tICcuLi9jbGFzcyc7XG5cbmV4cG9ydCBjb25zdCBERlBfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPERmcENvbmZpZz4oJ2RmcENvbmZpZycpO1xuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lLCBJbmplY3QsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJZGxlU2VydmljZSB7XG5cbiAgcHJpdmF0ZSByZXF1ZXN0SWRsZUNhbGxiYWNrOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHpvbmU6IE5nWm9uZVxuICApIHtcbiAgICBjb25zdCB3aW46IGFueSA9IGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpID8gd2luZG93IDoge307XG4gICAgaWYgKHdpbi5yZXF1ZXN0SWRsZUNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnJlcXVlc3RJZGxlQ2FsbGJhY2sgPSAoZnVuKSA9PiB7XG4gICAgICAgIHJldHVybiB3aW4ucmVxdWVzdElkbGVDYWxsYmFjayhmdW4pO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXF1ZXN0SWRsZUNhbGxiYWNrID0gKGZ1bikgPT4ge1xuICAgICAgICByZXR1cm4gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB3aW4uc2V0VGltZW91dChmdW4sIDUwKSk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJlcXVlc3QoZnVuKSB7XG4gICAgdGhpcy5yZXF1ZXN0SWRsZUNhbGxiYWNrKGZ1bik7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cEVycm9yU2VydmljZSB7XG5cbiAgaHR0cEVycm9yKHJlc3BvbnNlLCBtZXNzYWdlKSB7XG4gICAgY29uc29sZS5sb2coYEVycm9yICgke3Jlc3BvbnNlLnN0YXR1c30pICR7bWVzc2FnZSA/IG1lc3NhZ2UgOiAnJ31gKTtcbiAgfVxuXG4gIGlzRXJyb3JDb2RlID0gZnVuY3Rpb24gKGNvZGUpIHtcbiAgICBpZiAodHlwZW9mIGNvZGUgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gIShjb2RlID49IDIwMCAmJiBjb2RlIDwgMzAwKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvZGVbMF0gIT09ICcyJztcbiAgfTtcblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jbGFzcyBERlBEdXJhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihpbnRlcnZhbCkge1xuICAgIHN1cGVyKGBJbnZhbGlkIGludGVydmFsOiAnJHtpbnRlcnZhbH0nbHNgKTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFyc2VEdXJhdGlvblNlcnZpY2Uge1xuXG4gIGNvbnZlcnRUb01pbGxpc2Vjb25kcyh0aW1lLCB1bml0KSB7XG4gICAgY29uc29sZS5hc3NlcnQoL14obT9zfG1pbnxoKSQvZy50ZXN0KHVuaXQpKTtcblxuICAgIGlmICh1bml0ID09PSAnbXMnKSB7IHJldHVybiB0aW1lOyB9XG4gICAgaWYgKHVuaXQgPT09ICdzJykgeyByZXR1cm4gdGltZSAqIDEwMDA7IH1cbiAgICBpZiAodW5pdCA9PT0gJ21pbicpIHsgcmV0dXJuIHRpbWUgKiA2MCAqIDEwMDA7IH1cblxuICAgIHJldHVybiB0aW1lICogNjAgKiA2MCAqIDEwMDA7XG4gIH1cblxuICBjb252ZXJ0KG1hdGNoKSB7XG4gICAgY29uc3QgdGltZSA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuXG4gICAgaWYgKG1hdGNoLmxlbmd0aCA9PT0gMikgeyByZXR1cm4gdGltZTsgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udmVydFRvTWlsbGlzZWNvbmRzKHRpbWUsIG1hdGNoWzJdKTtcbiAgfVxuXG4gIHBhcnNlRHVyYXRpb24oaW50ZXJ2YWwpIHtcblxuICAgIGlmIChpbnRlcnZhbCA9PT0gdW5kZWZpbmVkIHx8IGludGVydmFsID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgREZQRHVyYXRpb25FcnJvcihpbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBpbnRlcnZhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBpbnRlcnZhbDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGludGVydmFsICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJyR7aW50ZXJ2YWx9JyBtdXN0IGJlIG9mIG51bWJlciBvciBzdHJpbmcgdHlwZWApO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGNoID0gaW50ZXJ2YWwubWF0Y2goLygoPzpcXGQrKT8uP1xcZCspKG0/c3xtaW58aCk/Lyk7XG5cbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICB0aHJvdyBuZXcgREZQRHVyYXRpb25FcnJvcihpbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udmVydChtYXRjaCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBIdHRwRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi9odHRwLWVycm9yLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBFcnJvcjogSHR0cEVycm9yU2VydmljZSkgeyB9XG5cbiAgcHJpdmF0ZSBjb21wbGV0ZVVSTCh1cmwpIHtcbiAgICBjb25zdCBzc2wgPSBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XG4gICAgcmV0dXJuIChzc2wgPyAnaHR0cHM6JyA6ICdodHRwOicpICsgdXJsO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVTY3JpcHQodXJsKSB7XG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgc2NyaXB0LnNyYyA9IHRoaXMuY29tcGxldGVVUkwodXJsKTtcblxuICAgIHJldHVybiBzY3JpcHQ7XG4gIH1cblxuICBwcml2YXRlIHByb21pc2VTY3JpcHQoc2NyaXB0LCB1cmwpIHtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZShzY3JpcHQpO1xuICAgICAgfTtcbiAgICAgIHNjcmlwdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICByZWplY3Qoe1xuICAgICAgICAgIHBhdGg6IHVybCxcbiAgICAgICAgICBsb2FkZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHByb21pc2UuY2F0Y2gocmVzcG9uc2UgPT4ge1xuICAgICAgdGhpcy5odHRwRXJyb3IuaHR0cEVycm9yKHsgc3RhdHVzOiA0MDAgfSwgYGxvYWRpbmcgc2NyaXB0IFwiJHt1cmx9XCJgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgaW5qZWN0U2NyaXB0KHNjcmlwdCkge1xuICAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKTtcbiAgICBoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gIH1cblxuICBzY3JpcHRJbmplY3Rvcih1cmwpIHtcbiAgICBjb25zdCBzY3JpcHQgPSB0aGlzLmNyZWF0ZVNjcmlwdCh1cmwpO1xuICAgIHRoaXMuaW5qZWN0U2NyaXB0KHNjcmlwdCk7XG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZVNjcmlwdChzY3JpcHQsIHVybCk7XG4gIH1cblxufVxuIiwiXG5cbmV4cG9ydCBjbGFzcyBERlBJbmNvbXBsZXRlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoZGlyZWN0aXZlTmFtZSwgbWlzc2luZ05hbWUsIGlzQXR0cmlidXRlPykge1xuICAgICAgICBzdXBlcihgSW5jb21wbGV0ZSBkZWZpbml0aW9uIG9mICcke2RpcmVjdGl2ZU5hbWV9JzogYCArXG4gICAgICAgICAgICBgTWlzc2luZyAke2lzQXR0cmlidXRlID8gJ2F0dHJpYnV0ZScgOiAnY2hpbGQgZGlyZWN0aXZlJ30gYCArXG4gICAgICAgICAgICBgJyR7bWlzc2luZ05hbWV9Jy5gKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBERlBUeXBlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoZGlyZWN0aXZlTmFtZSwgYXR0cmlidXRlTmFtZSwgd3JvbmdWYWx1ZSwgZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgYFdyb25nIHR5cGUgZm9yIGF0dHJpYnV0ZSAnJHthdHRyaWJ1dGVOYW1lfScgb24gYCArXG4gICAgICAgICAgICBgZGlyZWN0aXZlICcke2RpcmVjdGl2ZU5hbWV9JzogRXhwZWN0ZWQgJHtleHBlY3RlZFR5cGV9YCArXG4gICAgICAgICAgICBgLCBnb3QgJHt0eXBlb2Ygd3JvbmdWYWx1ZX1gXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgREZQTWlzc2luZ1BhcmVudEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGRpcmVjdGl2ZU5hbWUsIC4uLnBhcmVudHMpIHtcbiAgICAgICAgY29uc29sZS5hc3NlcnQocGFyZW50cyAmJiBwYXJlbnRzLmxlbmd0aCA+IDApO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJlbnRzWzBdKSkge1xuICAgICAgICAgICAgcGFyZW50cyA9IHBhcmVudHNbMF07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFyZW50TWVzc2FnZTtcbiAgICAgICAgaWYgKHBhcmVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgcGFyZW50cyA9IHBhcmVudHMubWFwKHAgPT4gYCcke3B9J2ApO1xuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSA9ICcsIHdoaWNoIG11c3QgYmUgJztcbiAgICAgICAgICAgIHBhcmVudE1lc3NhZ2UgKz0gcGFyZW50cy5zbGljZSgwLCAtMSkuam9pbignLCAnKTtcbiAgICAgICAgICAgIHBhcmVudE1lc3NhZ2UgKz0gYCBvciAke3BhcmVudHNbcGFyZW50cy5sZW5ndGggLSAxXX1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSA9IGAgJyR7cGFyZW50c1swXX0nYDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgYEludmFsaWQgdXNlIG9mICcke2RpcmVjdGl2ZU5hbWV9JyBkaXJlY3RpdmUuIGAgK1xuICAgICAgICAgICAgYE1pc3NpbmcgcGFyZW50IGRpcmVjdGl2ZSR7cGFyZW50TWVzc2FnZX0uYFxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBEZnBUYXJnZXRpbmcge1xuICBba2V5OiBzdHJpbmddOiBBcnJheTxzdHJpbmc+O1xufVxuXG5leHBvcnQgY2xhc3MgRGZwQ29uZmlnIHtcbiAgaWRsZUxvYWQ/OiBib29sZWFuO1xuICBvblNhbWVOYXZpZ2F0aW9uPzogJ3JlZnJlc2gnIHwgJ2lnbm9yZSc7XG4gIHNpbmdsZVJlcXVlc3RNb2RlPzogYm9vbGVhbjtcbiAgZW5hYmxlVmlkZW9BZHM/OiBib29sZWFuO1xuICBwZXJzb25hbGl6ZWRBZHM/OiBib29sZWFuO1xuICBjb2xsYXBzZUlmRW1wdHk/OiBib29sZWFuO1xuICBjZW50ZXJpbmc/OiBib29sZWFuO1xuICBsb2NhdGlvbj86IHN0cmluZyB8IEFycmF5PHN0cmluZz47XG4gIHBwaWQ/OiBzdHJpbmc7XG4gIGdsb2JhbFRhcmdldGluZz86IERmcFRhcmdldGluZztcbiAgZm9yY2VTYWZlRnJhbWU/OiBib29sZWFuO1xuICBzYWZlRnJhbWVDb25maWc/OiBvYmplY3Q7XG4gIGxvYWRHUFQ/OiBib29sZWFuO1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgREZQX0NPTkZJRyB9IGZyb20gJy4vaW5qZWN0aW9uX3Rva2VuJztcbmltcG9ydCB7IERmcENvbmZpZyB9IGZyb20gJy4uL2NsYXNzJztcbmltcG9ydCB7IElkbGVTZXJ2aWNlIH0gZnJvbSAnLi9pZGxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBHUFRfTElCUkFSWV9VUkwgPSAnLy93d3cuZ29vZ2xldGFnc2VydmljZXMuY29tL3RhZy9qcy9ncHQuanMnO1xuXG5jbGFzcyBERlBDb25maWd1cmF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7IH1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERmcFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgZW5hYmxlVmlkZW9BZHMgPSBmYWxzZTtcblxuICBwcml2YXRlIHBlcnNvbmFsaXplZEFkcyA9IHRydWU7XG5cbiAgcHJpdmF0ZSBjb2xsYXBzZUlmRW1wdHkgPSB0cnVlO1xuXG4gIHByaXZhdGUgY2VudGVyaW5nID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBsb2NhdGlvbiA9IG51bGw7XG5cbiAgcHJpdmF0ZSBwcGlkID0gbnVsbDtcblxuICBwcml2YXRlIGdsb2JhbFRhcmdldGluZyA9IG51bGw7XG5cbiAgcHJpdmF0ZSBmb3JjZVNhZmVGcmFtZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc2FmZUZyYW1lQ29uZmlnID0gbnVsbDtcblxuICBwcml2YXRlIGxvYWRHUFQgPSB0cnVlO1xuXG4gIHByaXZhdGUgbG9hZGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQE9wdGlvbmFsKCkgaWRsZUxvYWQ6IElkbGVTZXJ2aWNlLFxuICAgIEBJbmplY3QoREZQX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcbiAgICBwcml2YXRlIHNjcmlwdEluamVjdG9yOiBTY3JpcHRJbmplY3RvclNlcnZpY2VcbiAgKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93LFxuICAgICAgICBnb29nbGV0YWcgPSB3aW4uZ29vZ2xldGFnIHx8IHt9O1xuXG4gICAgICB0aGlzLmRmcENvbmZpZygpO1xuXG4gICAgICBnb29nbGV0YWcuY21kID0gZ29vZ2xldGFnLmNtZCB8fCBbXTtcbiAgICAgIGdvb2dsZXRhZy5jbWQucHVzaCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0dXAoKTtcbiAgICAgIH0pO1xuICAgICAgd2luLmdvb2dsZXRhZyA9IGdvb2dsZXRhZztcblxuICAgICAgaWYgKHRoaXMubG9hZEdQVCkge1xuICAgICAgICBjb25zdCBsb2FkU2NyaXB0ID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2NyaXB0SW5qZWN0b3Iuc2NyaXB0SW5qZWN0b3IoR1BUX0xJQlJBUllfVVJMKS50aGVuKChzY3JpcHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGlkbGVMb2FkKSB7XG4gICAgICAgICAgaWRsZUxvYWQucmVxdWVzdChsb2FkU2NyaXB0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2FkU2NyaXB0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRmcENvbmZpZygpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbmZpZykge1xuICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB0aGlzW2tleV0gPSB0aGlzLmNvbmZpZ1trZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkU2FmZUZyYW1lQ29uZmlnKHB1YmFkcykge1xuICAgIGlmICghdGhpcy5zYWZlRnJhbWVDb25maWcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNhZmVGcmFtZUNvbmZpZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ0ZyYW1lQ29uZmlnIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gICAgfVxuICAgIHB1YmFkcy5zZXRTYWZlRnJhbWVDb25maWcodGhpcy5zYWZlRnJhbWVDb25maWcpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRUYXJnZXRpbmcocHViYWRzKSB7XG4gICAgaWYgKCF0aGlzLmdsb2JhbFRhcmdldGluZykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAodHlwZW9mIHRoaXMuZ2xvYmFsVGFyZ2V0aW5nICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgbmV3IERGUENvbmZpZ3VyYXRpb25FcnJvcignVGFyZ2V0aW5nIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5nbG9iYWxUYXJnZXRpbmcpIHtcbiAgICAgIGlmICh0aGlzLmdsb2JhbFRhcmdldGluZy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHB1YmFkcy5zZXRUYXJnZXRpbmcoa2V5LCB0aGlzLmdsb2JhbFRhcmdldGluZ1trZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZExvY2F0aW9uKHB1YmFkcykge1xuICAgIGlmICghdGhpcy5sb2NhdGlvbikgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy5sb2NhdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHB1YmFkcy5zZXRMb2NhdGlvbih0aGlzLmxvY2F0aW9uKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5sb2NhdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ0xvY2F0aW9uIG11c3QgYmUgYW4gJyArXG4gICAgICAgICdhcnJheSBvciBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICBwdWJhZHMuc2V0TG9jYXRpb24uYXBwbHkocHViYWRzLCB0aGlzLmxvY2F0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkUFBJRChwdWJhZHMpIHtcbiAgICBpZiAoIXRoaXMucHBpZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAodHlwZW9mIHRoaXMucHBpZCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ1BQSUQgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cblxuICAgIHB1YmFkcy5zZXRQdWJsaXNoZXJQcm92aWRlZElkKHRoaXMucHBpZCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwKCkge1xuICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93LFxuICAgICAgZ29vZ2xldGFnID0gd2luLmdvb2dsZXRhZyxcbiAgICAgIHB1YmFkcyA9IGdvb2dsZXRhZy5wdWJhZHMoKTtcblxuICAgIGlmICh0aGlzLmVuYWJsZVZpZGVvQWRzKSB7XG4gICAgICBwdWJhZHMuZW5hYmxlVmlkZW9BZHMoKTtcbiAgICB9XG5cbiAgICAvLyBwZXJzb25hbGl6ZWRBZHMgaXMgZGVmYXVsdFxuICAgIGlmICh0aGlzLnBlcnNvbmFsaXplZEFkcyA9PT0gZmFsc2UpIHtcbiAgICAgIHB1YmFkcy5zZXRSZXF1ZXN0Tm9uUGVyc29uYWxpemVkQWRzKDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbGxhcHNlSWZFbXB0eSkge1xuICAgICAgcHViYWRzLmNvbGxhcHNlRW1wdHlEaXZzKCk7XG4gICAgfVxuXG4gICAgLy8gV2UgYWx3YXlzIHJlZnJlc2ggb3Vyc2VsdmVzXG4gICAgcHViYWRzLmRpc2FibGVJbml0aWFsTG9hZCgpO1xuXG4gICAgcHViYWRzLnNldEZvcmNlU2FmZUZyYW1lKHRoaXMuZm9yY2VTYWZlRnJhbWUpO1xuICAgIHB1YmFkcy5zZXRDZW50ZXJpbmcodGhpcy5jZW50ZXJpbmcpO1xuXG4gICAgdGhpcy5hZGRMb2NhdGlvbihwdWJhZHMpO1xuICAgIHRoaXMuYWRkUFBJRChwdWJhZHMpO1xuICAgIHRoaXMuYWRkVGFyZ2V0aW5nKHB1YmFkcyk7XG4gICAgdGhpcy5hZGRTYWZlRnJhbWVDb25maWcocHViYWRzKTtcblxuICAgIC8vIHB1YmFkcy5lbmFibGVTeW5jUmVuZGVyaW5nKCk7XG4gICAgcHViYWRzLmVuYWJsZUFzeW5jUmVuZGVyaW5nKCk7XG5cbiAgICBpZiAodGhpcy5jb25maWcuc2luZ2xlUmVxdWVzdE1vZGUgIT09IHRydWUpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5lbmFibGVWaWRlb0Fkcykge1xuICAgICAgICBwdWJhZHMuZW5hYmxlVmlkZW9BZHMoKTtcbiAgICAgIH1cbiAgICAgIGdvb2dsZXRhZy5lbmFibGVTZXJ2aWNlcygpO1xuICAgIH1cblxuICB9XG5cbiAgaGFzTG9hZGVkKCkge1xuICAgIHJldHVybiB0aGlzLmxvYWRlZDtcbiAgfVxuXG4gIGRlZmluZVRhc2sodGFzaykge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICBjb25zdCB3aW46IGFueSA9IHdpbmRvdyxcbiAgICAgICAgZ29vZ2xldGFnID0gd2luLmdvb2dsZXRhZztcbiAgICAgIGdvb2dsZXRhZy5jbWQucHVzaCh0YXNrKTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGZwSURHZW5lcmF0b3JTZXJ2aWNlIHtcblxuICBwcml2YXRlIGdlbmVyYXRlZElEcyA9IHt9O1xuXG4gIGdlbmVyYXRlSUQodHlwZSA9ICdkZnAtYWQnKSB7XG4gICAgbGV0IGlkID0gbnVsbDtcblxuICAgIGRvIHtcbiAgICAgIGNvbnN0IG51bWJlciA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zbGljZSgyKTtcbiAgICAgIGlkID0gdHlwZSArICctJyArIG51bWJlcjtcbiAgICB9IHdoaWxlIChpZCBpbiB0aGlzLmdlbmVyYXRlZElEcyk7XG5cbiAgICB0aGlzLmdlbmVyYXRlZElEc1tpZF0gPSB0cnVlO1xuXG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgZGZwSURHZW5lcmF0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50LmlkICYmICEoZWxlbWVudC5pZCBpbiB0aGlzLmdlbmVyYXRlZElEcykpIHtcbiAgICAgIHJldHVybiBlbGVtZW50LmlkO1xuICAgIH1cblxuICAgIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZUlEKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICBpZiAoZWxlbWVudCkgeyBlbGVtZW50LmlkID0gaWQ7IH1cblxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIGlzVGFrZW4oaWQpIHtcbiAgICByZXR1cm4gaWQgaW4gdGhpcy5nZW5lcmF0ZWRJRHM7XG4gIH1cblxuICBpc1VuaXF1ZShpZCkge1xuICAgIHJldHVybiAhdGhpcy5pc1Rha2VuKGlkKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIsIE9wdGlvbmFsLCBJbmplY3RvciwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgdGltZXIsIGZyb20gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRGZwQ29uZmlnIH0gZnJvbSAnLi4vY2xhc3MnO1xuaW1wb3J0IHsgREZQX0NPTkZJRyB9IGZyb20gJy4vaW5qZWN0aW9uX3Rva2VuJztcbmltcG9ydCB7IFBhcnNlRHVyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wYXJzZS1kdXJhdGlvbi5zZXJ2aWNlJztcblxuY2xhc3MgREZQUmVmcmVzaEVycm9yIGV4dGVuZHMgRXJyb3IgeyB9XG5cbmRlY2xhcmUgdmFyIGdvb2dsZXRhZztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERmcFJlZnJlc2hTZXJ2aWNlIHtcblxuICByZWZyZXNoRXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwcml2YXRlIHJlZnJlc2hTbG90cyA9IFtdO1xuICBwcml2YXRlIHNpbmdsZVJlcXVlc3Q6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBpbnRlcnZhbHMgPSB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERGUF9DT05GSUcpXG4gICAgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcbiAgICBwcml2YXRlIGluamVjdDogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBwYXJzZUR1cmF0aW9uOiBQYXJzZUR1cmF0aW9uU2VydmljZVxuICApIHsgfVxuXG4gIHNsb3RSZWZyZXNoKHNsb3QsIHJlZnJlc2hJbnRlcnZhbD8sIGluaXRSZWZyZXNoID0gZmFsc2UpIHtcbiAgICBjb25zdCBkZWZlcnJlZDogUHJvbWlzZTxhbnk+ID0gZnJvbShbc2xvdF0pLnRvUHJvbWlzZSgpLFxuICAgICAgdGFzayA9IHsgc2xvdDogc2xvdCwgZGVmZXJyZWQ6IGRlZmVycmVkIH07XG5cbiAgICBkZWZlcnJlZC50aGVuKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmhhc1Nsb3RJbnRlcnZhbChzbG90KSkge1xuICAgICAgICB0aGlzLmNhbmNlbEludGVydmFsKHNsb3QpO1xuICAgICAgfVxuICAgICAgaWYgKHJlZnJlc2hJbnRlcnZhbCkge1xuICAgICAgICB0aGlzLmFkZFNsb3RJbnRlcnZhbCh0YXNrLCByZWZyZXNoSW50ZXJ2YWwpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLnNpbmdsZVJlcXVlc3RNb2RlID09PSB0cnVlICYmIGluaXRSZWZyZXNoKSB7XG4gICAgICAvLyBVc2UgYSB0aW1lciB0byBoYW5kbGUgcmVmcmVzaCBvZiBhIHNpbmdsZSByZXF1ZXN0IG1vZGVcbiAgICAgIHRoaXMucmVmcmVzaFNsb3RzLnB1c2goc2xvdCk7XG4gICAgICBpZiAodGhpcy5zaW5nbGVSZXF1ZXN0ICYmICF0aGlzLnNpbmdsZVJlcXVlc3QuY2xvc2VkKSB7XG4gICAgICAgIHRoaXMuc2luZ2xlUmVxdWVzdC51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5zaW5nbGVSZXF1ZXN0ID0gdGltZXIoMTAwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBjb25zdCBwdWJhZHMgPSBnb29nbGV0YWcucHViYWRzKCk7XG4gICAgICAgIHB1YmFkcy5lbmFibGVTaW5nbGVSZXF1ZXN0KCk7XG4gICAgICAgIGdvb2dsZXRhZy5lbmFibGVTZXJ2aWNlcygpO1xuICAgICAgICB0aGlzLnJlZnJlc2hTbG90cy5mb3JFYWNoKHMgPT4ge1xuICAgICAgICAgIGdvb2dsZXRhZy5kaXNwbGF5KHMuZ2V0U2xvdEVsZW1lbnRJZCgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHB1YmFkcy5yZWZyZXNoKHRoaXMucmVmcmVzaFNsb3RzKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoU2xvdHMgPSBbXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBnb29nbGV0YWcuZGlzcGxheShzbG90LmdldFNsb3RFbGVtZW50SWQoKSk7XG4gICAgICB0aGlzLnJlZnJlc2goW3Rhc2tdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmZXJyZWQ7XG4gIH1cblxuICBjYW5jZWxJbnRlcnZhbChzbG90KSB7XG4gICAgaWYgKCF0aGlzLmhhc1Nsb3RJbnRlcnZhbChzbG90KSkge1xuICAgICAgdGhyb3cgbmV3IERGUFJlZnJlc2hFcnJvcignTm8gaW50ZXJ2YWwgZm9yIGdpdmVuIHNsb3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnRlcnZhbDogU3Vic2NyaXB0aW9uID0gdGhpcy5pbnRlcnZhbHNbdGhpcy5zbG90SW50ZXJ2YWxLZXkoc2xvdCldO1xuICAgIGludGVydmFsLnVuc3Vic2NyaWJlKCk7XG4gICAgZGVsZXRlIHRoaXMuaW50ZXJ2YWxzW3Nsb3RdO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwcml2YXRlIGhhc1Nsb3RJbnRlcnZhbChzbG90KSB7XG4gICAgcmV0dXJuIHRoaXMuc2xvdEludGVydmFsS2V5KHNsb3QpIGluIHRoaXMuaW50ZXJ2YWxzO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoKHRhc2tzPykge1xuICAgIGlmICh0YXNrcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBnb29nbGV0YWcuY21kLnB1c2goKCkgPT4ge1xuICAgICAgICBnb29nbGV0YWcucHViYWRzKCkucmVmcmVzaCgpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRhc2tzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIGdvb2dsZXRhZy5jbWQucHVzaCgoKSA9PiB7XG4gICAgICBnb29nbGV0YWcucHViYWRzKCkucmVmcmVzaCh0YXNrcy5tYXAodGFzayA9PiB0YXNrLnNsb3QpKTtcbiAgICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZSh0YXNrLnNsb3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFNsb3RJbnRlcnZhbCh0YXNrLCBpbnRlcnZhbCkge1xuICAgIGNvbnN0IHBhcnNlZEludGVydmFsID0gdGhpcy5wYXJzZUR1cmF0aW9uLnBhcnNlRHVyYXRpb24oaW50ZXJ2YWwpO1xuICAgIHRoaXMudmFsaWRhdGVJbnRlcnZhbChwYXJzZWRJbnRlcnZhbCwgaW50ZXJ2YWwpO1xuXG4gICAgY29uc3QgcmVmcmVzaCA9IHRpbWVyKHBhcnNlZEludGVydmFsLCBwYXJzZWRJbnRlcnZhbCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IGRvYyA9IHRoaXMuaW5qZWN0LmdldChET0NVTUVOVCk7XG4gICAgICBpZiAoIXRoaXMuaGlkZGVuQ2hlY2soZG9jLmdldEVsZW1lbnRCeUlkKHRhc2suc2xvdC5nZXRTbG90RWxlbWVudElkKCkpKSkge1xuICAgICAgICB0aGlzLnJlZnJlc2goW3Rhc2tdKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoRXZlbnQuZW1pdCh0YXNrLnNsb3QpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5pbnRlcnZhbHNbdGhpcy5zbG90SW50ZXJ2YWxLZXkodGFzay5zbG90KV0gPSByZWZyZXNoO1xuXG4gICAgcmV0dXJuIHJlZnJlc2g7XG4gIH1cblxuICBwcml2YXRlIHNsb3RJbnRlcnZhbEtleShzbG90KSB7XG4gICAgcmV0dXJuIHNsb3QuZ2V0U2xvdElkKCkuZ2V0RG9tSWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgdmFsaWRhdGVJbnRlcnZhbChtaWxsaXNlY29uZHMsIGJlZm9yZVBhcnNpbmcpIHtcbiAgICBpZiAobWlsbGlzZWNvbmRzIDwgMTAwMCkge1xuICAgICAgY29uc29sZS53YXJuKCdDYXJlZnVsOiAke2JlZm9yZVBhcnNpbmd9IGlzIHF1aXRlIGEgbG93IGludGVydmFsIScpO1xuICAgIH1cbiAgfVxuXG4gIGhpZGRlbkNoZWNrKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mICh3aW5kb3cpICE9PSAndW5kZWZpbmVkJyAmJiBlbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGNzcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgICAgaWYgKGNzcy5kaXNwbGF5ID09PSAnbm9uZScpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oaWRkZW5DaGVjayhlbGVtZW50LnBhcmVudEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgRWxlbWVudFJlZixcbiAgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLFxuICBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgSW5qZWN0LCBQTEFURk9STV9JRCwgT3B0aW9uYWxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRGZwU2VydmljZSwgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC5zZXJ2aWNlJztcbmltcG9ydCB7IERmcElER2VuZXJhdG9yU2VydmljZSwgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC1pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBEZnBSZWZyZXNoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvZGZwLXJlZnJlc2guc2VydmljZSc7XG5cbmltcG9ydCB7IERGUEluY29tcGxldGVFcnJvciwgR29vZ2xlU2xvdCwgRGZwQ29uZmlnIH0gZnJvbSAnLi4vY2xhc3MnO1xuaW1wb3J0IHsgREZQX0NPTkZJRyB9IGZyb20gJy4uL3NlcnZpY2UvaW5qZWN0aW9uX3Rva2VuJztcblxuZGVjbGFyZSB2YXIgZ29vZ2xldGFnO1xuXG5leHBvcnQgY2xhc3MgRGZwUmVmcmVzaEV2ZW50IHtcbiAgdHlwZTogc3RyaW5nO1xuICBzbG90OiBhbnk7XG4gIGRhdGE/OiBhbnk7XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2RmcC1hZCdcbn0pXG5leHBvcnQgY2xhc3MgRGZwQWREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgYWRVbml0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNsaWNrVXJsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZvcmNlU2FmZUZyYW1lOiBib29sZWFuO1xuICBASW5wdXQoKSBzYWZlRnJhbWVDb25maWc6IHN0cmluZztcbiAgQElucHV0KCkgcmVmcmVzaDogc3RyaW5nO1xuICBASW5wdXQoKSBwZXJzb25hbGl6ZWRBZHM6IGJvb2xlYW4gPSB0aGlzLmNvbmZpZy5wZXJzb25hbGl6ZWRBZHM7XG4gIEBJbnB1dCgpIGNvbGxhcHNlSWZFbXB0eTogYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgYWZ0ZXJSZWZyZXNoOiBFdmVudEVtaXR0ZXI8RGZwUmVmcmVzaEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIHNpemVzID0gW107XG5cbiAgcHJpdmF0ZSByZXNwb25zaXZlTWFwcGluZyA9IFtdO1xuXG4gIHByaXZhdGUgdGFyZ2V0aW5ncyA9IFtdO1xuXG4gIHByaXZhdGUgZXhjbHVzaW9ucyA9IFtdO1xuXG4gIHByaXZhdGUgc2NyaXB0cyA9IFtdO1xuXG4gIHByaXZhdGUgc2xvdDogR29vZ2xlU2xvdDtcblxuICBwcml2YXRlIG9uU2FtZU5hdmlnYXRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBkZnA6IERmcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkZnBJREdlbmVyYXRvcjogRGZwSURHZW5lcmF0b3JTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGZwUmVmcmVzaDogRGZwUmVmcmVzaFNlcnZpY2UsXG4gICAgQEluamVjdChERlBfQ09ORklHKSBwcml2YXRlIGNvbmZpZzogRGZwQ29uZmlnLFxuICAgIEBPcHRpb25hbCgpIHJvdXRlcjogUm91dGVyXG4gICkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmRmcFJlZnJlc2gucmVmcmVzaEV2ZW50LnN1YnNjcmliZShzbG90ID0+IHtcbiAgICAgICAgaWYgKHNsb3QgPT09IHRoaXMuc2xvdCkge1xuICAgICAgICAgIHRoaXMuYWZ0ZXJSZWZyZXNoLmVtaXQoeyB0eXBlOiAncmVmcmVzaCcsIHNsb3Q6IHNsb3QgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHJvdXRlcikge1xuICAgICAgICB0aGlzLm9uU2FtZU5hdmlnYXRpb24gPSByb3V0ZXIuZXZlbnRzLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpXG4gICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE5hdmlnYXRpb25FbmQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNsb3QgJiYgIXRoaXMucmVmcmVzaCAmJiB0aGlzLmNvbmZpZy5vblNhbWVOYXZpZ2F0aW9uID09PSAncmVmcmVzaCcpIHtcbiAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmRmcElER2VuZXJhdG9yLmRmcElER2VuZXJhdG9yKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuZGZwLmRlZmluZVRhc2soKCkgPT4ge1xuICAgICAgICB0aGlzLmRlZmluZVNsb3QoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnNsb3QpIHtcbiAgICAgIGdvb2dsZXRhZy5kZXN0cm95U2xvdHMoW3RoaXMuc2xvdF0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5vblNhbWVOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLm9uU2FtZU5hdmlnYXRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFJlc3BvbnNpdmVNYXBwaW5nKHNsb3QpIHtcbiAgICBjb25zdCBhZCA9IHRoaXMuZ2V0U3RhdGUoKTtcblxuICAgIGlmIChhZC5yZXNwb25zaXZlTWFwcGluZy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzaXplTWFwcGluZyA9IGdvb2dsZXRhZy5zaXplTWFwcGluZygpO1xuXG4gICAgYWQucmVzcG9uc2l2ZU1hcHBpbmcuZm9yRWFjaChtYXBwaW5nID0+IHtcbiAgICAgIHNpemVNYXBwaW5nLmFkZFNpemUobWFwcGluZy52aWV3cG9ydFNpemUsIG1hcHBpbmcuYWRTaXplcyk7XG4gICAgfSk7XG5cbiAgICBzbG90LmRlZmluZVNpemVNYXBwaW5nKHNpemVNYXBwaW5nLmJ1aWxkKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWZpbmVTbG90KCkge1xuICAgIGNvbnN0IGFkID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgdGhpcy5zbG90ID0gZ29vZ2xldGFnLmRlZmluZVNsb3QoYWQuYWRVbml0LCBhZC5zaXplcywgZWxlbWVudC5pZCk7XG5cbiAgICBpZiAodGhpcy5mb3JjZVNhZmVGcmFtZSAhPT0gdW5kZWZpbmVkICYmIGFkLmZvcmNlU2FmZUZyYW1lID09PSAhdGhpcy5jb25maWcuZm9yY2VTYWZlRnJhbWUpIHtcbiAgICAgIHRoaXMuc2xvdC5zZXRGb3JjZVNhZmVGcmFtZShhZC5mb3JjZVNhZmVGcmFtZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGVyc29uYWxpemVkQWRzID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5zbG90LnNldCgncmVxdWVzdE5vblBlcnNvbmFsaXplZEFkcycsIDEpO1xuICAgICAgZ29vZ2xldGFnLnB1YmFkcygpLnNldFJlcXVlc3ROb25QZXJzb25hbGl6ZWRBZHMoMSk7XG4gICAgfVxuXG4gICAgaWYgKGFkLmNsaWNrVXJsKSB7XG4gICAgICB0aGlzLnNsb3Quc2V0Q2xpY2tVcmwoYWQuY2xpY2tVcmwpO1xuICAgIH1cblxuICAgIGlmIChhZC5jb2xsYXBzZUlmRW1wdHkpIHtcbiAgICAgIHRoaXMuc2xvdC5zZXRDb2xsYXBzZUVtcHR5RGl2KHRydWUsIHRydWUpO1xuICAgIH1cblxuICAgIGlmIChhZC5zYWZlRnJhbWVDb25maWcpIHtcbiAgICAgIHRoaXMuc2xvdC5zZXRTYWZlRnJhbWVDb25maWcoXG4gICAgICAgIChKU09OLnBhcnNlKGFkLnNhZmVGcmFtZUNvbmZpZykpXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuc2xvdC5yZW5kZXJFbmRlZCA9IChnb29nbGVTbG90RXZlbnQ6IElBcmd1bWVudHMpID0+IHtcbiAgICAgIHRoaXMuYWZ0ZXJSZWZyZXNoLmVtaXQoeyB0eXBlOiAncmVuZGVyRW5kZWQnLCBzbG90OiB0aGlzLnNsb3QsIGRhdGE6IGdvb2dsZVNsb3RFdmVudCB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5zZXRSZXNwb25zaXZlTWFwcGluZyh0aGlzLnNsb3QpO1xuXG4gICAgYWQudGFyZ2V0aW5ncy5mb3JFYWNoKHRhcmdldGluZyA9PiB7XG4gICAgICB0aGlzLnNsb3Quc2V0VGFyZ2V0aW5nKHRhcmdldGluZy5rZXksIHRhcmdldGluZy52YWx1ZXMpO1xuICAgIH0pO1xuXG4gICAgYWQuZXhjbHVzaW9ucy5mb3JFYWNoKGV4Y2x1c2lvbiA9PiB7XG4gICAgICB0aGlzLnNsb3Quc2V0Q2F0ZWdvcnlFeGNsdXNpb24oZXhjbHVzaW9uKTtcbiAgICB9KTtcblxuICAgIGFkLnNjcmlwdHMuZm9yRWFjaChzY3JpcHQgPT4geyBzY3JpcHQodGhpcy5zbG90KTsgfSk7XG5cbiAgICBpZiAodGhpcy5jb25maWcuZW5hYmxlVmlkZW9BZHMpIHtcbiAgICAgIHRoaXMuc2xvdC5hZGRTZXJ2aWNlKGdvb2dsZXRhZy5jb21wYW5pb25BZHMoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5zbG90LmFkZFNlcnZpY2UoZ29vZ2xldGFnLnB1YmFkcygpKTtcblxuICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaENvbnRlbnQoKSB7XG4gICAgdGhpcy5kZnBSZWZyZXNoLnNsb3RSZWZyZXNoKHRoaXMuc2xvdCwgdGhpcy5yZWZyZXNoLCB0cnVlKS50aGVuKHNsb3QgPT4ge1xuICAgICAgdGhpcy5hZnRlclJlZnJlc2guZW1pdCh7IHR5cGU6ICdpbml0Jywgc2xvdDogc2xvdCB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrVmFsaWQoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgREZQSW5jb21wbGV0ZUVycm9yKCdkZnAtYWQnLCAnZGZwLXNpemUnKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmFkVW5pdCkge1xuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLWFkJywgJ2FkLXVuaXQnLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuZGZwUmVmcmVzaC5oaWRkZW5DaGVjayh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBnZXRTdGF0ZSgpIHtcbiAgICB0aGlzLmNoZWNrVmFsaWQoKTtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICBzaXplczogdGhpcy5zaXplcyxcbiAgICAgIHJlc3BvbnNpdmVNYXBwaW5nOiB0aGlzLnJlc3BvbnNpdmVNYXBwaW5nLFxuICAgICAgdGFyZ2V0aW5nczogdGhpcy50YXJnZXRpbmdzLFxuICAgICAgZXhjbHVzaW9uczogdGhpcy5leGNsdXNpb25zLFxuICAgICAgYWRVbml0OiB0aGlzLmFkVW5pdCxcbiAgICAgIGZvcmNlU2FmZUZyYW1lOiB0aGlzLmZvcmNlU2FmZUZyYW1lID09PSB0cnVlLFxuICAgICAgc2FmZUZyYW1lQ29uZmlnOiB0aGlzLnNhZmVGcmFtZUNvbmZpZyxcbiAgICAgIGNsaWNrVXJsOiB0aGlzLmNsaWNrVXJsLFxuICAgICAgcmVmcmVzaDogdGhpcy5yZWZyZXNoLFxuICAgICAgcGVyc29uYWxpemVkQWRzOiB0aGlzLnBlcnNvbmFsaXplZEFkcyA9PT0gdGhpcy5jb25maWcucGVyc29uYWxpemVkQWRzLFxuICAgICAgc2NyaXB0czogdGhpcy5zY3JpcHRzLFxuICAgICAgY29sbGFwc2VJZkVtcHR5OiB0aGlzLmNvbGxhcHNlSWZFbXB0eSA9PT0gdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgYWRkU2l6ZShzaXplKSB7XG4gICAgdGhpcy5zaXplcy5wdXNoKHNpemUpO1xuICB9XG5cbiAgYWRkUmVzcG9uc2l2ZU1hcHBpbmcobWFwcGluZykge1xuICAgIHRoaXMucmVzcG9uc2l2ZU1hcHBpbmcucHVzaChtYXBwaW5nKTtcbiAgfVxuXG4gIGFkZFRhcmdldGluZyh0YXJnZXRpbmcpIHtcbiAgICB0aGlzLnRhcmdldGluZ3MucHVzaCh0YXJnZXRpbmcpO1xuICB9XG5cbiAgYWRkRXhjbHVzaW9uKGV4Y2x1c2lvbikge1xuICAgIHRoaXMuZXhjbHVzaW9ucy5wdXNoKGV4Y2x1c2lvbik7XG4gIH1cblxuICBhZGRTY3JpcHQoc2NyaXB0KSB7XG4gICAgdGhpcy5zY3JpcHRzLnB1c2goc2NyaXB0KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgRWxlbWVudFJlZixcbiAgICBJbmplY3QsIGZvcndhcmRSZWYsXG4gICAgSG9zdExpc3RlbmVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEZnBBZERpcmVjdGl2ZSB9IGZyb20gJy4vZGZwLWFkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZnBSZWZyZXNoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvZGZwLXJlZnJlc2guc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZGZwLWFkW3Jlc3BvbnNpdmVdJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBBZFJlc3BvbnNpdmVEaXJlY3RpdmUge1xuXG4gICAgcHJpdmF0ZSBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50O1xuICAgIHByaXZhdGUgaWZyYW1lV2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIHNsb3Q6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXG4gICAgICAgIHByaXZhdGUgYWQ6IERmcEFkRGlyZWN0aXZlLFxuICAgICAgICBwcml2YXRlIGRmcFJlZnJlc2g6IERmcFJlZnJlc2hTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMuYWQuYWZ0ZXJSZWZyZXNoLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNsb3QgPSBldmVudC5zbG90O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcbiAgICBub3JtYWxpemVJZnJhbWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmFkLmlzSGlkZGVuKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pZnJhbWUgPSB0aGlzLmlmcmFtZSB8fCB0aGlzLmdldElmcmFtZSgpO1xuICAgICAgICBpZiAoIXRoaXMuaWZyYW1lKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIHRoaXMuaWZyYW1lV2lkdGggPSB0aGlzLmlmcmFtZVdpZHRoIHx8ICt0aGlzLmlmcmFtZS53aWR0aDtcblxuICAgICAgICBjb25zdCB3aW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuYWQuZ2V0U3RhdGUoKSxcbiAgICAgICAgICAgIHdpZHRoID0gMDtcblxuICAgICAgICBzdGF0ZS5zaXplcy5mb3JFYWNoKHNpemUgPT4ge1xuICAgICAgICAgICAgaWYgKHNpemVbMF0gPCB3aW5XaWR0aCkge1xuICAgICAgICAgICAgICAgIHdpZHRoID0gTWF0aC5tYXgod2lkdGgsIHNpemVbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc3RhdGUuc2l6ZXMubGVuZ3RoID4gMSAmJiB3aWR0aCAhPT0gdGhpcy5pZnJhbWVXaWR0aCkge1xuICAgICAgICAgICAgc3RhdGUgPSB0aGlzLmFkLmdldFN0YXRlKCk7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZVdpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2lkdGggKyAnJyk7XG4gICAgICAgICAgICB0aGlzLmRmcFJlZnJlc2guc2xvdFJlZnJlc2godGhpcy5zbG90LCBzdGF0ZS5yZWZyZXNoKS50aGVuKHNsb3QgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWQuYWZ0ZXJSZWZyZXNoLmVtaXQoeyB0eXBlOiAncmVzaXplJywgc2xvdDogc2xvdCB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmlmcmFtZSA9IHRoaXMuZ2V0SWZyYW1lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldElmcmFtZSgpIHtcbiAgICAgICAgY29uc3QgYWQ6IEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgIGlmcmFtZSA9IGFkLnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZScpO1xuICAgICAgICBpZiAoaWZyYW1lICYmICtpZnJhbWUud2lkdGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gaWZyYW1lO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3QsIGZvcndhcmRSZWYsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1hZC5kaXJlY3RpdmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkZnAtcmVzcG9uc2l2ZSdcbn0pXG5leHBvcnQgY2xhc3MgRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgdmlld3BvcnQgPSBbMCwgMF07XG4gIEBJbnB1dCgpIGFkU2l6ZXMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwQWREaXJlY3RpdmUpKVxuICAgIHByaXZhdGUgYWQ6IERmcEFkRGlyZWN0aXZlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hZC5hZGRSZXNwb25zaXZlTWFwcGluZyh0aGlzLmdldFN0YXRlKCkpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHZpZXdXaWR0aCh2YWw6IG51bWJlcikge1xuICAgIGlmICh2YWwgPiAwKSB7XG4gICAgICB0aGlzLnZpZXdwb3J0WzBdID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB2aWV3SGVpZ2h0KHZhbDogbnVtYmVyKSB7XG4gICAgaWYgKHZhbCA+IDApIHtcbiAgICAgIHRoaXMudmlld3BvcnRbMV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgYWRkU2l6ZShzaXplKSB7XG4gICAgdGhpcy5hZFNpemVzLnB1c2goc2l6ZSk7XG4gIH1cblxuICBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICB2aWV3cG9ydFNpemU6IHRoaXMudmlld3BvcnQsXG4gICAgICBhZFNpemVzOiB0aGlzLmFkU2l6ZXNcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmLCBPbkluaXQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcFJlc3BvbnNpdmVEaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1yZXNwb25zaXZlLmRpcmVjdGl2ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2RmcC1zaXplJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBTaXplRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcEFkRGlyZWN0aXZlKSlcbiAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSkpXG4gICAgcHJpdmF0ZSByZXNwOiBEZnBSZXNwb25zaXZlRGlyZWN0aXZlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5yZXNwIHx8IHRoaXMuYWQsXG4gICAgICBpbm5lclRleHQ6IHN0cmluZyA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmlubmVyVGV4dDtcblxuICAgIGlmICh0aGlzLndpZHRoICYmIHRoaXMuaGVpZ2h0KSB7XG4gICAgICB0YXJnZXQuYWRkU2l6ZShbdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdKTtcbiAgICB9IGVsc2UgaWYgKGlubmVyVGV4dC50cmltKCkgIT09ICcnKSB7XG4gICAgICB0YXJnZXQuYWRkU2l6ZShpbm5lclRleHQpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEFmdGVyQ29udGVudEluaXQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgREZQSW5jb21wbGV0ZUVycm9yIH0gZnJvbSAnLi4vY2xhc3MnO1xuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1hZC5kaXJlY3RpdmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkZnAtdGFyZ2V0aW5nJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBUYXJnZXRpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuICBASW5wdXQoKSBrZXk6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUodmFsOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+KSB7XG4gICAgaWYgKHZhbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICB2YWwuZm9yRWFjaCh2ID0+IHRoaXMuYWRkVmFsdWUodikpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZFZhbHVlKHZhbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB2YWx1ZXMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwQWREaXJlY3RpdmUpKVxuICAgIHByaXZhdGUgYWQ6IERmcEFkRGlyZWN0aXZlXG4gICkgeyB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGNvbnN0IHRhcmdldGluZyA9IHRoaXMuZ2V0U3RhdGUoKTtcbiAgICB0aGlzLmFkLmFkZFRhcmdldGluZyh0YXJnZXRpbmcpO1xuICB9XG5cbiAgY2hlY2tWYWxpZCgpIHtcbiAgICBpZiAodGhpcy5rZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLXRhcmdldGluZycsICdrZXknLCB0cnVlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLXRhcmdldGluZycsICd2YWx1ZScsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGdldFN0YXRlKCkge1xuICAgIHRoaXMuY2hlY2tWYWxpZCgpO1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcbiAgICAgIGtleTogdGhpcy5rZXksXG4gICAgICB2YWx1ZXM6IHRoaXMudmFsdWVzXG4gICAgfSk7XG4gIH1cblxuICBhZGRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAmJiAhdGhpcy52YWx1ZXMuZmluZChpdGVtID0+IGl0ZW0gPT09IHZhbHVlKSkge1xuICAgICAgdGhpcy52YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgRWxlbWVudFJlZixcbiAgSW5qZWN0LCBmb3J3YXJkUmVmLFxuICBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGZwLWV4Y2x1c2lvbidcbn0pXG5leHBvcnQgY2xhc3MgRGZwRXhjbHVzaW9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcEFkRGlyZWN0aXZlKSlcbiAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hZC5hZGRFeGNsdXNpb24odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXG4gIEluamVjdCwgZm9yd2FyZFJlZixcbiAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEZnBUYXJnZXRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2RmcC10YXJnZXRpbmcuZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGZwLXZhbHVlJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBWYWx1ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBUYXJnZXRpbmdEaXJlY3RpdmUpKVxuICAgIHByaXZhdGUgdGFyZ2V0aW5nOiBEZnBUYXJnZXRpbmdEaXJlY3RpdmVcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnRhcmdldGluZy5hZGRWYWx1ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbm5lclRleHQpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgSW5qZWN0LFxuICBQTEFURk9STV9JRFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGZwLWF1ZGllbmNlLXBpeGVsJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBBdWRpZW5jZVBpeGVsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBhZFVuaXQ6IHN0cmluZztcbiAgQElucHV0KCkgc2VnbWVudElkOiBudW1iZXI7XG4gIEBJbnB1dCgpIHBwaWQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgY29uc3QgYXhlbCA9IE1hdGgucmFuZG9tKCksXG4gICAgICAgIHJhbmRvbSA9IGF4ZWwgKiAxMDAwMDAwMDAwMDAwMDtcblxuICAgICAgbGV0IGFkVW5pdCA9ICcnO1xuICAgICAgaWYgKHRoaXMuYWRVbml0KSB7XG4gICAgICAgIGFkVW5pdCA9IGBkY19pdT0ke3RoaXMuYWRVbml0fWA7XG4gICAgICB9XG5cbiAgICAgIGxldCBwcGlkID0gJyc7XG4gICAgICBpZiAodGhpcy5wcGlkKSB7XG4gICAgICAgIHBwaWQgPSBgcHBpZD0ke3RoaXMucHBpZH1gO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwaXhlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICBwaXhlbC5zcmMgPSAnaHR0cHM6Ly9wdWJhZHMuZy5kb3VibGVjbGljay5uZXQvYWN0aXZpdHk7b3JkPSc7XG4gICAgICBwaXhlbC5zcmMgKz0gYCR7cmFuZG9tfTtkY19zZWc9JHt0aGlzLnNlZ21lbnRJZH07JHthZFVuaXR9JHtwcGlkfWA7XG5cbiAgICAgIHBpeGVsLndpZHRoID0gMTtcbiAgICAgIHBpeGVsLmhlaWdodCA9IDE7XG4gICAgICBwaXhlbC5ib3JkZXIgPSAnMCc7XG5cbiAgICAgIHBpeGVsLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcblxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYXBwZW5kKHBpeGVsKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERmcENvbmZpZywgfSBmcm9tICcuL2NsYXNzJztcbmltcG9ydCB7IERGUF9DT05GSUcgfSBmcm9tICcuL3NlcnZpY2UvaW5qZWN0aW9uX3Rva2VuJztcblxuaW1wb3J0IHsgSWRsZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvaWRsZS5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBFcnJvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvaHR0cC1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IFBhcnNlRHVyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL3NjcmlwdC1pbmplY3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IERmcFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvZGZwLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGZwSURHZW5lcmF0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2RmcC1pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBEZnBSZWZyZXNoU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9kZnAtcmVmcmVzaC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtYWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcFNpemVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtc2l6ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1yZXNwb25zaXZlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZnBBZFJlc3BvbnNpdmVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtYWQtcmVzcG9uc2l2ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwVGFyZ2V0aW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLXRhcmdldGluZy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwRXhjbHVzaW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLWV4Y2x1c2lvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwVmFsdWVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtdmFsdWUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcEF1ZGllbmNlUGl4ZWxEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtYXVkaWVuY2UtcGl4ZWwuZGlyZWN0aXZlJztcblxuY29uc3QgRElSRUNUSVZFUyA9IFtcbiAgRGZwQWREaXJlY3RpdmUsXG4gIERmcFNpemVEaXJlY3RpdmUsXG4gIERmcFJlc3BvbnNpdmVEaXJlY3RpdmUsXG4gIERmcEFkUmVzcG9uc2l2ZURpcmVjdGl2ZSxcbiAgRGZwVGFyZ2V0aW5nRGlyZWN0aXZlLCBEZnBFeGNsdXNpb25EaXJlY3RpdmUsIERmcFZhbHVlRGlyZWN0aXZlLFxuICBEZnBBdWRpZW5jZVBpeGVsRGlyZWN0aXZlXG5dO1xuXG5jb25zdCBTRVJWSUNFUyA9IFtcbiAgSHR0cEVycm9yU2VydmljZSxcbiAgUGFyc2VEdXJhdGlvblNlcnZpY2UsXG4gIFNjcmlwdEluamVjdG9yU2VydmljZSxcbiAgRGZwU2VydmljZSwgRGZwSURHZW5lcmF0b3JTZXJ2aWNlLCBEZnBSZWZyZXNoU2VydmljZVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIC4uLkRJUkVDVElWRVNcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgLi4uU0VSVklDRVNcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIC4uLkRJUkVDVElWRVNcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZnBNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBEZnBDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IERmcE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAuLi4oY29uZmlnICYmIGNvbmZpZy5pZGxlTG9hZCA9PT0gdHJ1ZSA/IFtJZGxlU2VydmljZV0gOiBbXSksXG4gICAgICAgIHsgcHJvdmlkZTogREZQX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZp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