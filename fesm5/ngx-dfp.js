import { InjectionToken, Injectable, NgZone, Inject, PLATFORM_ID, Optional, EventEmitter, Injector, Directive, ElementRef, Input, Output, forwardRef, HostListener, NgModule } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { __extends, __spread } from 'tslib';
import { timer, from } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var DFP_CONFIG = new InjectionToken('dfpConfig');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var IdleService = /** @class */ (function () {
    function IdleService(platformId, zone) {
        /** @type {?} */
        var win = isPlatformBrowser(platformId) ? window : {};
        if (win.requestIdleCallback) {
            this.requestIdleCallback = function (fun) {
                return win.requestIdleCallback(fun);
            };
        }
        else {
            this.requestIdleCallback = function (fun) {
                return zone.runOutsideAngular(function () { return win.setTimeout(fun, 50); });
            };
        }
    }
    /**
     * @param {?} fun
     * @return {?}
     */
    IdleService.prototype.request = /**
     * @param {?} fun
     * @return {?}
     */
    function (fun) {
        this.requestIdleCallback(fun);
    };
    IdleService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    IdleService.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: NgZone }
    ]; };
    return IdleService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HttpErrorService = /** @class */ (function () {
    function HttpErrorService() {
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
    HttpErrorService.prototype.httpError = /**
     * @param {?} response
     * @param {?} message
     * @return {?}
     */
    function (response, message) {
        console.log("Error (" + response.status + ") " + (message ? message : ''));
    };
    HttpErrorService.decorators = [
        { type: Injectable }
    ];
    return HttpErrorService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DFPDurationError = /** @class */ (function (_super) {
    __extends(DFPDurationError, _super);
    function DFPDurationError(interval) {
        return _super.call(this, "Invalid interval: '" + interval + "'ls") || this;
    }
    return DFPDurationError;
}(Error));
var ParseDurationService = /** @class */ (function () {
    function ParseDurationService() {
    }
    /**
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    ParseDurationService.prototype.convertToMilliseconds = /**
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    function (time, unit) {
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
    };
    /**
     * @param {?} match
     * @return {?}
     */
    ParseDurationService.prototype.convert = /**
     * @param {?} match
     * @return {?}
     */
    function (match) {
        /** @type {?} */
        var time = parseFloat(match[1]);
        if (match.length === 2) {
            return time;
        }
        return this.convertToMilliseconds(time, match[2]);
    };
    /**
     * @param {?} interval
     * @return {?}
     */
    ParseDurationService.prototype.parseDuration = /**
     * @param {?} interval
     * @return {?}
     */
    function (interval) {
        if (interval === undefined || interval === null) {
            throw new DFPDurationError(interval);
        }
        if (typeof interval === 'number') {
            return interval;
        }
        if (typeof interval !== 'string') {
            throw new TypeError("'" + interval + "' must be of number or string type");
        }
        /** @type {?} */
        var match = interval.match(/((?:\d+)?.?\d+)(m?s|min|h)?/);
        if (!match) {
            throw new DFPDurationError(interval);
        }
        return this.convert(match);
    };
    ParseDurationService.decorators = [
        { type: Injectable }
    ];
    return ParseDurationService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ScriptInjectorService = /** @class */ (function () {
    function ScriptInjectorService(httpError) {
        this.httpError = httpError;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    ScriptInjectorService.prototype.completeURL = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var ssl = document.location.protocol === 'https:';
        return (ssl ? 'https:' : 'http:') + url;
    };
    /**
     * @param {?} url
     * @return {?}
     */
    ScriptInjectorService.prototype.createScript = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.src = this.completeURL(url);
        return script;
    };
    /**
     * @param {?} script
     * @param {?} url
     * @return {?}
     */
    ScriptInjectorService.prototype.promiseScript = /**
     * @param {?} script
     * @param {?} url
     * @return {?}
     */
    function (script, url) {
        var _this = this;
        /** @type {?} */
        var promise = new Promise(function (resolve, reject) {
            script.onload = function () {
                resolve(script);
            };
            script.onerror = function () {
                reject({
                    path: url,
                    loaded: false
                });
            };
        });
        promise.catch(function (response) {
            _this.httpError.httpError({ status: 400 }, "loading script \"" + url + "\"");
        });
        return promise;
    };
    /**
     * @param {?} script
     * @return {?}
     */
    ScriptInjectorService.prototype.injectScript = /**
     * @param {?} script
     * @return {?}
     */
    function (script) {
        /** @type {?} */
        var head = document.head || document.querySelector('head');
        head.appendChild(script);
    };
    /**
     * @param {?} url
     * @return {?}
     */
    ScriptInjectorService.prototype.scriptInjector = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var script = this.createScript(url);
        this.injectScript(script);
        return this.promiseScript(script, url);
    };
    ScriptInjectorService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ScriptInjectorService.ctorParameters = function () { return [
        { type: HttpErrorService }
    ]; };
    return ScriptInjectorService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DFPIncompleteError = /** @class */ (function (_super) {
    __extends(DFPIncompleteError, _super);
    function DFPIncompleteError(directiveName, missingName, isAttribute) {
        return _super.call(this, "Incomplete definition of '" + directiveName + "': " +
            ("Missing " + (isAttribute ? 'attribute' : 'child directive') + " ") +
            ("'" + missingName + "'.")) || this;
    }
    return DFPIncompleteError;
}(Error));
var DFPTypeError = /** @class */ (function (_super) {
    __extends(DFPTypeError, _super);
    function DFPTypeError(directiveName, attributeName, wrongValue, expectedType) {
        return _super.call(this, "Wrong type for attribute '" + attributeName + "' on " +
            ("directive '" + directiveName + "': Expected " + expectedType) +
            (", got " + typeof wrongValue)) || this;
    }
    return DFPTypeError;
}(Error));
var DFPMissingParentError = /** @class */ (function (_super) {
    __extends(DFPMissingParentError, _super);
    function DFPMissingParentError(directiveName) {
        var parents = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parents[_i - 1] = arguments[_i];
        }
        var _this = this;
        console.assert(parents && parents.length > 0);
        if (Array.isArray(parents[0])) {
            parents = parents[0];
        }
        /** @type {?} */
        var parentMessage;
        if (parents.length > 1) {
            parents = parents.map(function (p) { return "'" + p + "'"; });
            parentMessage = ', which must be ';
            parentMessage += parents.slice(0, -1).join(', ');
            parentMessage += " or " + parents[parents.length - 1];
        }
        else {
            parentMessage = " '" + parents[0] + "'";
        }
        _this = _super.call(this, "Invalid use of '" + directiveName + "' directive. " +
            ("Missing parent directive" + parentMessage + ".")) || this;
        return _this;
    }
    return DFPMissingParentError;
}(Error));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DfpConfig = /** @class */ (function () {
    function DfpConfig() {
    }
    return DfpConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var GPT_LIBRARY_URL = '//www.googletagservices.com/tag/js/gpt.js';
var DFPConfigurationError = /** @class */ (function (_super) {
    __extends(DFPConfigurationError, _super);
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
            googletag.cmd.push(function () {
                _this.setup();
            });
            win.googletag = googletag;
            if (this.loadGPT) {
                /** @type {?} */
                var loadScript = function () {
                    _this.scriptInjector.scriptInjector(GPT_LIBRARY_URL).then(function (script) {
                        _this.loaded = true;
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
    DfpService.prototype.dfpConfig = /**
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
     * @param {?} pubads
     * @return {?}
     */
    DfpService.prototype.addSafeFrameConfig = /**
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
     * @param {?} pubads
     * @return {?}
     */
    DfpService.prototype.addTargeting = /**
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
     * @param {?} pubads
     * @return {?}
     */
    DfpService.prototype.addLocation = /**
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
     * @param {?} pubads
     * @return {?}
     */
    DfpService.prototype.addPPID = /**
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
     * @return {?}
     */
    DfpService.prototype.setup = /**
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        if (type === void 0) { type = 'dfp-ad'; }
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
        { type: Injectable }
    ];
    return DfpIDGeneratorService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DFPRefreshError = /** @class */ (function (_super) {
    __extends(DFPRefreshError, _super);
    function DFPRefreshError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DFPRefreshError;
}(Error));
var DfpRefreshService = /** @class */ (function () {
    function DfpRefreshService(config, inject, parseDuration) {
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
    DfpRefreshService.prototype.slotRefresh = /**
     * @param {?} slot
     * @param {?=} refreshInterval
     * @param {?=} initRefresh
     * @return {?}
     */
    function (slot, refreshInterval, initRefresh) {
        var _this = this;
        if (initRefresh === void 0) { initRefresh = false; }
        /** @type {?} */
        var deferred = from([slot]).toPromise();
        /** @type {?} */
        var task = { slot: slot, deferred: deferred };
        deferred.then(function () {
            if (_this.hasSlotInterval(slot)) {
                _this.cancelInterval(slot);
            }
            if (refreshInterval) {
                _this.addSlotInterval(task, refreshInterval);
            }
        });
        if (this.config.singleRequestMode === true && initRefresh) {
            // Use a timer to handle refresh of a single request mode
            this.refreshSlots.push(slot);
            if (this.singleRequest && !this.singleRequest.closed) {
                this.singleRequest.unsubscribe();
            }
            this.singleRequest = timer(100).subscribe(function () {
                /** @type {?} */
                var pubads = googletag.pubads();
                pubads.enableSingleRequest();
                googletag.enableServices();
                _this.refreshSlots.forEach(function (s) {
                    googletag.display(s.getSlotElementId());
                });
                pubads.refresh(_this.refreshSlots);
                _this.refreshSlots = [];
            });
        }
        else {
            googletag.display(slot.getSlotElementId());
            this.refresh([task]);
        }
        return deferred;
    };
    /**
     * @param {?} slot
     * @return {?}
     */
    DfpRefreshService.prototype.cancelInterval = /**
     * @param {?} slot
     * @return {?}
     */
    function (slot) {
        if (!this.hasSlotInterval(slot)) {
            throw new DFPRefreshError('No interval for given slot');
        }
        /** @type {?} */
        var interval = this.intervals[this.slotIntervalKey(slot)];
        interval.unsubscribe();
        delete this.intervals[slot];
        return this;
    };
    /**
     * @param {?} slot
     * @return {?}
     */
    DfpRefreshService.prototype.hasSlotInterval = /**
     * @param {?} slot
     * @return {?}
     */
    function (slot) {
        return this.slotIntervalKey(slot) in this.intervals;
    };
    /**
     * @param {?=} tasks
     * @return {?}
     */
    DfpRefreshService.prototype.refresh = /**
     * @param {?=} tasks
     * @return {?}
     */
    function (tasks) {
        if (tasks === undefined) {
            googletag.cmd.push(function () {
                googletag.pubads().refresh();
            });
            return;
        }
        if (tasks.length === 0) {
            return false;
        }
        googletag.cmd.push(function () {
            googletag.pubads().refresh(tasks.map(function (task) { return task.slot; }));
            tasks.forEach(function (task) {
                Promise.resolve(task.slot);
            });
        });
    };
    /**
     * @param {?} task
     * @param {?} interval
     * @return {?}
     */
    DfpRefreshService.prototype.addSlotInterval = /**
     * @param {?} task
     * @param {?} interval
     * @return {?}
     */
    function (task, interval) {
        var _this = this;
        /** @type {?} */
        var parsedInterval = this.parseDuration.parseDuration(interval);
        this.validateInterval(parsedInterval, interval);
        /** @type {?} */
        var refresh = timer(parsedInterval, parsedInterval).subscribe(function () {
            /** @type {?} */
            var doc = _this.inject.get(DOCUMENT);
            if (!_this.hiddenCheck(doc.getElementById(task.slot.getSlotElementId()))) {
                _this.refresh([task]);
                _this.refreshEvent.emit(task.slot);
            }
        });
        this.intervals[this.slotIntervalKey(task.slot)] = refresh;
        return refresh;
    };
    /**
     * @param {?} slot
     * @return {?}
     */
    DfpRefreshService.prototype.slotIntervalKey = /**
     * @param {?} slot
     * @return {?}
     */
    function (slot) {
        return slot.getSlotId().getDomId();
    };
    /**
     * @param {?} milliseconds
     * @param {?} beforeParsing
     * @return {?}
     */
    DfpRefreshService.prototype.validateInterval = /**
     * @param {?} milliseconds
     * @param {?} beforeParsing
     * @return {?}
     */
    function (milliseconds, beforeParsing) {
        if (milliseconds < 1000) {
            console.warn('Careful: ${beforeParsing} is quite a low interval!');
        }
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DfpRefreshService.prototype.hiddenCheck = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        if (typeof (window) !== 'undefined' && element != null) {
            /** @type {?} */
            var css = window.getComputedStyle(element);
            if (css.display === 'none') {
                return true;
            }
            else if (element.parentElement) {
                return this.hiddenCheck(element.parentElement);
            }
        }
        return false;
    };
    DfpRefreshService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DfpRefreshService.ctorParameters = function () { return [
        { type: DfpConfig, decorators: [{ type: Optional }, { type: Inject, args: [DFP_CONFIG,] }] },
        { type: Injector },
        { type: ParseDurationService }
    ]; };
    return DfpRefreshService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DfpAdDirective = /** @class */ (function () {
    function DfpAdDirective(platformId, elementRef, dfp, dfpIDGenerator, dfpRefresh, config, router) {
        var _this = this;
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
            this.dfpRefresh.refreshEvent.subscribe(function (slot) {
                if (slot === _this.slot) {
                    _this.afterRefresh.emit({ type: 'refresh', slot: slot });
                }
            });
            if (router) {
                this.onSameNavigation = router.events.pipe(filter(function (event) { return event instanceof NavigationEnd; }))
                    .subscribe(function (event) {
                    if (_this.slot && !_this.refresh && _this.config.onSameNavigation === 'refresh') {
                        _this.refreshContent.call(_this);
                    }
                });
            }
        }
    }
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            this.dfpIDGenerator.dfpIDGenerator(this.elementRef.nativeElement);
        }
    };
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (isPlatformBrowser(this.platformId)) {
            this.dfp.defineTask(function () {
                _this.defineSlot();
            });
        }
    };
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.slot) {
            googletag.destroySlots([this.slot]);
        }
        if (this.onSameNavigation) {
            this.onSameNavigation.unsubscribe();
        }
    };
    /**
     * @param {?} slot
     * @return {?}
     */
    DfpAdDirective.prototype.setResponsiveMapping = /**
     * @param {?} slot
     * @return {?}
     */
    function (slot) {
        /** @type {?} */
        var ad = this.getState();
        if (ad.responsiveMapping.length === 0) {
            return;
        }
        /** @type {?} */
        var sizeMapping = googletag.sizeMapping();
        ad.responsiveMapping.forEach(function (mapping) {
            sizeMapping.addSize(mapping.viewportSize, mapping.adSizes);
        });
        slot.defineSizeMapping(sizeMapping.build());
    };
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.defineSlot = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var ad = this.getState();
        /** @type {?} */
        var element = this.elementRef.nativeElement;
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
        this.slot.renderEnded = function (googleSlotEvent) {
            _this.afterRefresh.emit({ type: 'renderEnded', slot: _this.slot, data: googleSlotEvent });
        };
        this.setResponsiveMapping(this.slot);
        ad.targetings.forEach(function (targeting) {
            _this.slot.setTargeting(targeting.key, targeting.values);
        });
        ad.exclusions.forEach(function (exclusion) {
            _this.slot.setCategoryExclusion(exclusion);
        });
        ad.scripts.forEach(function (script) { script(_this.slot); });
        if (this.config.enableVideoAds) {
            this.slot.addService(googletag.companionAds());
        }
        this.slot.addService(googletag.pubads());
        this.refreshContent();
    };
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.refreshContent = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.dfpRefresh.slotRefresh(this.slot, this.refresh, true).then(function (slot) {
            _this.afterRefresh.emit({ type: 'init', slot: slot });
        });
    };
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.checkValid = /**
     * @return {?}
     */
    function () {
        if (this.sizes.length === 0) {
            throw new DFPIncompleteError('dfp-ad', 'dfp-size');
        }
        if (!this.adUnit) {
            throw new DFPIncompleteError('dfp-ad', 'ad-unit', true);
        }
    };
    Object.defineProperty(DfpAdDirective.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dfpRefresh.hiddenCheck(this.elementRef.nativeElement);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.getState = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} size
     * @return {?}
     */
    DfpAdDirective.prototype.addSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this.sizes.push(size);
    };
    /**
     * @param {?} mapping
     * @return {?}
     */
    DfpAdDirective.prototype.addResponsiveMapping = /**
     * @param {?} mapping
     * @return {?}
     */
    function (mapping) {
        this.responsiveMapping.push(mapping);
    };
    /**
     * @param {?} targeting
     * @return {?}
     */
    DfpAdDirective.prototype.addTargeting = /**
     * @param {?} targeting
     * @return {?}
     */
    function (targeting) {
        this.targetings.push(targeting);
    };
    /**
     * @param {?} exclusion
     * @return {?}
     */
    DfpAdDirective.prototype.addExclusion = /**
     * @param {?} exclusion
     * @return {?}
     */
    function (exclusion) {
        this.exclusions.push(exclusion);
    };
    /**
     * @param {?} script
     * @return {?}
     */
    DfpAdDirective.prototype.addScript = /**
     * @param {?} script
     * @return {?}
     */
    function (script) {
        this.scripts.push(script);
    };
    DfpAdDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-ad'
                },] }
    ];
    /** @nocollapse */
    DfpAdDirective.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ElementRef },
        { type: DfpService },
        { type: DfpIDGeneratorService },
        { type: DfpRefreshService },
        { type: DfpConfig, decorators: [{ type: Inject, args: [DFP_CONFIG,] }] },
        { type: Router, decorators: [{ type: Optional }] }
    ]; };
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
    return DfpAdDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DfpAdResponsiveDirective = /** @class */ (function () {
    function DfpAdResponsiveDirective(elementRef, ad, dfpRefresh) {
        var _this = this;
        this.elementRef = elementRef;
        this.ad = ad;
        this.dfpRefresh = dfpRefresh;
        this.ad.afterRefresh.subscribe(function (event) {
            _this.slot = event.slot;
        });
    }
    /**
     * @return {?}
     */
    DfpAdResponsiveDirective.prototype.normalizeIframe = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.ad.isHidden) {
            return false;
        }
        this.iframe = this.iframe || this.getIframe();
        if (!this.iframe) {
            return false;
        }
        this.iframeWidth = this.iframeWidth || +this.iframe.width;
        /** @type {?} */
        var winWidth = window.innerWidth;
        /** @type {?} */
        var state = this.ad.getState();
        /** @type {?} */
        var width = 0;
        state.sizes.forEach(function (size) {
            if (size[0] < winWidth) {
                width = Math.max(width, size[0]);
            }
        });
        if (state.sizes.length > 1 && width !== this.iframeWidth) {
            state = this.ad.getState();
            this.iframeWidth = width;
            this.iframe.setAttribute('width', width + '');
            this.dfpRefresh.slotRefresh(this.slot, state.refresh).then(function (slot) {
                _this.ad.afterRefresh.emit({ type: 'resize', slot: slot });
                _this.iframe = _this.getIframe();
            });
        }
    };
    /**
     * @return {?}
     */
    DfpAdResponsiveDirective.prototype.getIframe = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var ad = this.elementRef.nativeElement;
        /** @type {?} */
        var iframe = ad.querySelector('iframe');
        if (iframe && +iframe.width > 0) {
            return iframe;
        }
    };
    DfpAdResponsiveDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-ad[responsive]'
                },] }
    ];
    /** @nocollapse */
    DfpAdResponsiveDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(function () { return DfpAdDirective; }),] }] },
        { type: DfpRefreshService }
    ]; };
    DfpAdResponsiveDirective.propDecorators = {
        normalizeIframe: [{ type: HostListener, args: ['window:resize',] }]
    };
    return DfpAdResponsiveDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DfpResponsiveDirective = /** @class */ (function () {
    function DfpResponsiveDirective(ad) {
        this.ad = ad;
        this.viewport = [0, 0];
        this.adSizes = [];
    }
    /**
     * @return {?}
     */
    DfpResponsiveDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.ad.addResponsiveMapping(this.getState());
    };
    Object.defineProperty(DfpResponsiveDirective.prototype, "viewWidth", {
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val > 0) {
                this.viewport[0] = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DfpResponsiveDirective.prototype, "viewHeight", {
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val > 0) {
                this.viewport[1] = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} size
     * @return {?}
     */
    DfpResponsiveDirective.prototype.addSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this.adSizes.push(size);
    };
    /**
     * @return {?}
     */
    DfpResponsiveDirective.prototype.getState = /**
     * @return {?}
     */
    function () {
        return Object.freeze({
            viewportSize: this.viewport,
            adSizes: this.adSizes
        });
    };
    DfpResponsiveDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-responsive'
                },] }
    ];
    /** @nocollapse */
    DfpResponsiveDirective.ctorParameters = function () { return [
        { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(function () { return DfpAdDirective; }),] }] }
    ]; };
    DfpResponsiveDirective.propDecorators = {
        viewport: [{ type: Input }],
        adSizes: [{ type: Input }],
        viewWidth: [{ type: Input }],
        viewHeight: [{ type: Input }]
    };
    return DfpResponsiveDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DfpSizeDirective = /** @class */ (function () {
    function DfpSizeDirective(elementRef, ad, resp) {
        this.elementRef = elementRef;
        this.ad = ad;
        this.resp = resp;
    }
    /**
     * @return {?}
     */
    DfpSizeDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var target = this.resp || this.ad;
        /** @type {?} */
        var innerText = this.elementRef.nativeElement.innerText;
        if (this.width && this.height) {
            target.addSize([this.width, this.height]);
        }
        else if (innerText.trim() !== '') {
            target.addSize(innerText);
        }
    };
    DfpSizeDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-size'
                },] }
    ];
    /** @nocollapse */
    DfpSizeDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(function () { return DfpAdDirective; }),] }] },
        { type: DfpResponsiveDirective, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(function () { return DfpResponsiveDirective; }),] }] }
    ]; };
    DfpSizeDirective.propDecorators = {
        width: [{ type: Input }],
        height: [{ type: Input }]
    };
    return DfpSizeDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DfpTargetingDirective = /** @class */ (function () {
    function DfpTargetingDirective(ad) {
        this.ad = ad;
        this.values = [];
    }
    Object.defineProperty(DfpTargetingDirective.prototype, "value", {
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            var _this = this;
            if (val instanceof Array) {
                val.forEach(function (v) { return _this.addValue(v); });
            }
            else {
                this.addValue(val);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DfpTargetingDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var targeting = this.getState();
        this.ad.addTargeting(targeting);
    };
    /**
     * @return {?}
     */
    DfpTargetingDirective.prototype.checkValid = /**
     * @return {?}
     */
    function () {
        if (this.key === undefined) {
            throw new DFPIncompleteError('dfp-targeting', 'key', true);
        }
        if (this.values.length === 0) {
            throw new DFPIncompleteError('dfp-targeting', 'value', true);
        }
    };
    /**
     * @return {?}
     */
    DfpTargetingDirective.prototype.getState = /**
     * @return {?}
     */
    function () {
        this.checkValid();
        return Object.freeze({
            key: this.key,
            values: this.values
        });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DfpTargetingDirective.prototype.addValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value && !this.values.find(function (item) { return item === value; })) {
            this.values.push(value);
        }
    };
    DfpTargetingDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-targeting'
                },] }
    ];
    /** @nocollapse */
    DfpTargetingDirective.ctorParameters = function () { return [
        { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(function () { return DfpAdDirective; }),] }] }
    ]; };
    DfpTargetingDirective.propDecorators = {
        key: [{ type: Input }],
        value: [{ type: Input }]
    };
    return DfpTargetingDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DfpExclusionDirective = /** @class */ (function () {
    function DfpExclusionDirective(elementRef, ad) {
        this.elementRef = elementRef;
        this.ad = ad;
    }
    /**
     * @return {?}
     */
    DfpExclusionDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.ad.addExclusion(this.elementRef.nativeElement.innerText);
    };
    DfpExclusionDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-exclusion'
                },] }
    ];
    /** @nocollapse */
    DfpExclusionDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(function () { return DfpAdDirective; }),] }] }
    ]; };
    return DfpExclusionDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DfpValueDirective = /** @class */ (function () {
    function DfpValueDirective(elementRef, targeting) {
        this.elementRef = elementRef;
        this.targeting = targeting;
    }
    /**
     * @return {?}
     */
    DfpValueDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.targeting.addValue(this.elementRef.nativeElement.innerText);
    };
    DfpValueDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-value'
                },] }
    ];
    /** @nocollapse */
    DfpValueDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DfpTargetingDirective, decorators: [{ type: Inject, args: [forwardRef(function () { return DfpTargetingDirective; }),] }] }
    ]; };
    return DfpValueDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DfpAudiencePixelDirective = /** @class */ (function () {
    function DfpAudiencePixelDirective(platformId, elementRef) {
        this.platformId = platformId;
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    DfpAudiencePixelDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            var axel = Math.random();
            /** @type {?} */
            var random = axel * 10000000000000;
            /** @type {?} */
            var adUnit = '';
            if (this.adUnit) {
                adUnit = "dc_iu=" + this.adUnit;
            }
            /** @type {?} */
            var ppid = '';
            if (this.ppid) {
                ppid = "ppid=" + this.ppid;
            }
            /** @type {?} */
            var pixel = document.createElement('img');
            pixel.src = 'https://pubads.g.doubleclick.net/activity;ord=';
            pixel.src += random + ";dc_seg=" + this.segmentId + ";" + adUnit + ppid;
            pixel.width = 1;
            pixel.height = 1;
            pixel.border = '0';
            pixel.style.visibility = 'hidden';
            this.elementRef.nativeElement.append(pixel);
        }
    };
    DfpAudiencePixelDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-audience-pixel'
                },] }
    ];
    /** @nocollapse */
    DfpAudiencePixelDirective.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ElementRef }
    ]; };
    DfpAudiencePixelDirective.propDecorators = {
        adUnit: [{ type: Input }],
        segmentId: [{ type: Input }],
        ppid: [{ type: Input }]
    };
    return DfpAudiencePixelDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var DIRECTIVES = [
    DfpAdDirective,
    DfpSizeDirective,
    DfpResponsiveDirective,
    DfpAdResponsiveDirective,
    DfpTargetingDirective, DfpExclusionDirective, DfpValueDirective,
    DfpAudiencePixelDirective
];
/** @type {?} */
var SERVICES = [
    HttpErrorService,
    ParseDurationService,
    ScriptInjectorService,
    DfpService, DfpIDGeneratorService, DfpRefreshService
];
var DfpModule = /** @class */ (function () {
    function DfpModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    DfpModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: DfpModule,
            providers: __spread((config && config.idleLoad === true ? [IdleService] : []), [
                { provide: DFP_CONFIG, useValue: config || {} }
            ])
        };
    };
    DfpModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: __spread(DIRECTIVES),
                    providers: __spread(SERVICES),
                    exports: __spread(DIRECTIVES)
                },] }
    ];
    return DfpModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { DfpModule, DFP_CONFIG, IdleService, HttpErrorService, ParseDurationService, ScriptInjectorService, DfpService, DfpIDGeneratorService, DfpRefreshService, DfpAdDirective, DfpAdResponsiveDirective, DfpResponsiveDirective, DfpSizeDirective, DfpTargetingDirective, DfpExclusionDirective, DfpValueDirective, DfpAudiencePixelDirective, DfpConfig as ɵe, DfpAdResponsiveDirective as ɵm, DfpAdDirective as ɵa, DfpAudiencePixelDirective as ɵq, DfpExclusionDirective as ɵo, DfpResponsiveDirective as ɵl, DfpSizeDirective as ɵk, DfpTargetingDirective as ɵn, DfpValueDirective as ɵp, DfpIDGeneratorService as ɵh, DfpRefreshService as ɵi, DfpService as ɵc, HttpErrorService as ɵg, IdleService as ɵd, DFP_CONFIG as ɵb, ParseDurationService as ɵj, ScriptInjectorService as ɵf };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRmcC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL2luamVjdGlvbl90b2tlbi50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL2lkbGUuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL2h0dHAtZXJyb3Iuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UudHMiLCJuZzovL25neC1kZnAvc2VydmljZS9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9jbGFzcy9kZnAtZXJyb3JzLmNsYXNzLnRzIiwibmc6Ly9uZ3gtZGZwL2NsYXNzL2RmcC1jb25maWcuY2xhc3MudHMiLCJuZzovL25neC1kZnAvc2VydmljZS9kZnAuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL2RmcC1pZC1nZW5lcmF0b3Iuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UudHMiLCJuZzovL25neC1kZnAvZGlyZWN0aXZlL2RmcC1hZC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1kZnAvZGlyZWN0aXZlL2RmcC1hZC1yZXNwb25zaXZlLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kaXJlY3RpdmUvZGZwLXJlc3BvbnNpdmUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtZGZwL2RpcmVjdGl2ZS9kZnAtc2l6ZS5kaXJlY3RpdmUudHMiLCJuZzovL25neC1kZnAvZGlyZWN0aXZlL2RmcC10YXJnZXRpbmcuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtZGZwL2RpcmVjdGl2ZS9kZnAtZXhjbHVzaW9uLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kaXJlY3RpdmUvZGZwLXZhbHVlLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kaXJlY3RpdmUvZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kZnAubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERmcENvbmZpZyAgfSBmcm9tICcuLi9jbGFzcyc7XG5cbmV4cG9ydCBjb25zdCBERlBfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPERmcENvbmZpZz4oJ2RmcENvbmZpZycpO1xuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lLCBJbmplY3QsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJZGxlU2VydmljZSB7XG5cbiAgcHJpdmF0ZSByZXF1ZXN0SWRsZUNhbGxiYWNrOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHpvbmU6IE5nWm9uZVxuICApIHtcbiAgICBjb25zdCB3aW46IGFueSA9IGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpID8gd2luZG93IDoge307XG4gICAgaWYgKHdpbi5yZXF1ZXN0SWRsZUNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnJlcXVlc3RJZGxlQ2FsbGJhY2sgPSAoZnVuKSA9PiB7XG4gICAgICAgIHJldHVybiB3aW4ucmVxdWVzdElkbGVDYWxsYmFjayhmdW4pO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXF1ZXN0SWRsZUNhbGxiYWNrID0gKGZ1bikgPT4ge1xuICAgICAgICByZXR1cm4gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB3aW4uc2V0VGltZW91dChmdW4sIDUwKSk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJlcXVlc3QoZnVuKSB7XG4gICAgdGhpcy5yZXF1ZXN0SWRsZUNhbGxiYWNrKGZ1bik7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cEVycm9yU2VydmljZSB7XG5cbiAgaHR0cEVycm9yKHJlc3BvbnNlLCBtZXNzYWdlKSB7XG4gICAgY29uc29sZS5sb2coYEVycm9yICgke3Jlc3BvbnNlLnN0YXR1c30pICR7bWVzc2FnZSA/IG1lc3NhZ2UgOiAnJ31gKTtcbiAgfVxuXG4gIGlzRXJyb3JDb2RlID0gZnVuY3Rpb24gKGNvZGUpIHtcbiAgICBpZiAodHlwZW9mIGNvZGUgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gIShjb2RlID49IDIwMCAmJiBjb2RlIDwgMzAwKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvZGVbMF0gIT09ICcyJztcbiAgfTtcblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jbGFzcyBERlBEdXJhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihpbnRlcnZhbCkge1xuICAgIHN1cGVyKGBJbnZhbGlkIGludGVydmFsOiAnJHtpbnRlcnZhbH0nbHNgKTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFyc2VEdXJhdGlvblNlcnZpY2Uge1xuXG4gIGNvbnZlcnRUb01pbGxpc2Vjb25kcyh0aW1lLCB1bml0KSB7XG4gICAgY29uc29sZS5hc3NlcnQoL14obT9zfG1pbnxoKSQvZy50ZXN0KHVuaXQpKTtcblxuICAgIGlmICh1bml0ID09PSAnbXMnKSB7IHJldHVybiB0aW1lOyB9XG4gICAgaWYgKHVuaXQgPT09ICdzJykgeyByZXR1cm4gdGltZSAqIDEwMDA7IH1cbiAgICBpZiAodW5pdCA9PT0gJ21pbicpIHsgcmV0dXJuIHRpbWUgKiA2MCAqIDEwMDA7IH1cblxuICAgIHJldHVybiB0aW1lICogNjAgKiA2MCAqIDEwMDA7XG4gIH1cblxuICBjb252ZXJ0KG1hdGNoKSB7XG4gICAgY29uc3QgdGltZSA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuXG4gICAgaWYgKG1hdGNoLmxlbmd0aCA9PT0gMikgeyByZXR1cm4gdGltZTsgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udmVydFRvTWlsbGlzZWNvbmRzKHRpbWUsIG1hdGNoWzJdKTtcbiAgfVxuXG4gIHBhcnNlRHVyYXRpb24oaW50ZXJ2YWwpIHtcblxuICAgIGlmIChpbnRlcnZhbCA9PT0gdW5kZWZpbmVkIHx8IGludGVydmFsID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgREZQRHVyYXRpb25FcnJvcihpbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBpbnRlcnZhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBpbnRlcnZhbDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGludGVydmFsICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJyR7aW50ZXJ2YWx9JyBtdXN0IGJlIG9mIG51bWJlciBvciBzdHJpbmcgdHlwZWApO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGNoID0gaW50ZXJ2YWwubWF0Y2goLygoPzpcXGQrKT8uP1xcZCspKG0/c3xtaW58aCk/Lyk7XG5cbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICB0aHJvdyBuZXcgREZQRHVyYXRpb25FcnJvcihpbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udmVydChtYXRjaCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBIdHRwRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi9odHRwLWVycm9yLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBFcnJvcjogSHR0cEVycm9yU2VydmljZSkgeyB9XG5cbiAgcHJpdmF0ZSBjb21wbGV0ZVVSTCh1cmwpIHtcbiAgICBjb25zdCBzc2wgPSBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XG4gICAgcmV0dXJuIChzc2wgPyAnaHR0cHM6JyA6ICdodHRwOicpICsgdXJsO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVTY3JpcHQodXJsKSB7XG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgc2NyaXB0LnNyYyA9IHRoaXMuY29tcGxldGVVUkwodXJsKTtcblxuICAgIHJldHVybiBzY3JpcHQ7XG4gIH1cblxuICBwcml2YXRlIHByb21pc2VTY3JpcHQoc2NyaXB0LCB1cmwpIHtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZShzY3JpcHQpO1xuICAgICAgfTtcbiAgICAgIHNjcmlwdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICByZWplY3Qoe1xuICAgICAgICAgIHBhdGg6IHVybCxcbiAgICAgICAgICBsb2FkZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHByb21pc2UuY2F0Y2gocmVzcG9uc2UgPT4ge1xuICAgICAgdGhpcy5odHRwRXJyb3IuaHR0cEVycm9yKHsgc3RhdHVzOiA0MDAgfSwgYGxvYWRpbmcgc2NyaXB0IFwiJHt1cmx9XCJgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgaW5qZWN0U2NyaXB0KHNjcmlwdCkge1xuICAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKTtcbiAgICBoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gIH1cblxuICBzY3JpcHRJbmplY3Rvcih1cmwpIHtcbiAgICBjb25zdCBzY3JpcHQgPSB0aGlzLmNyZWF0ZVNjcmlwdCh1cmwpO1xuICAgIHRoaXMuaW5qZWN0U2NyaXB0KHNjcmlwdCk7XG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZVNjcmlwdChzY3JpcHQsIHVybCk7XG4gIH1cblxufVxuIiwiXG5cbmV4cG9ydCBjbGFzcyBERlBJbmNvbXBsZXRlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoZGlyZWN0aXZlTmFtZSwgbWlzc2luZ05hbWUsIGlzQXR0cmlidXRlPykge1xuICAgICAgICBzdXBlcihgSW5jb21wbGV0ZSBkZWZpbml0aW9uIG9mICcke2RpcmVjdGl2ZU5hbWV9JzogYCArXG4gICAgICAgICAgICBgTWlzc2luZyAke2lzQXR0cmlidXRlID8gJ2F0dHJpYnV0ZScgOiAnY2hpbGQgZGlyZWN0aXZlJ30gYCArXG4gICAgICAgICAgICBgJyR7bWlzc2luZ05hbWV9Jy5gKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBERlBUeXBlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoZGlyZWN0aXZlTmFtZSwgYXR0cmlidXRlTmFtZSwgd3JvbmdWYWx1ZSwgZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgYFdyb25nIHR5cGUgZm9yIGF0dHJpYnV0ZSAnJHthdHRyaWJ1dGVOYW1lfScgb24gYCArXG4gICAgICAgICAgICBgZGlyZWN0aXZlICcke2RpcmVjdGl2ZU5hbWV9JzogRXhwZWN0ZWQgJHtleHBlY3RlZFR5cGV9YCArXG4gICAgICAgICAgICBgLCBnb3QgJHt0eXBlb2Ygd3JvbmdWYWx1ZX1gXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgREZQTWlzc2luZ1BhcmVudEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGRpcmVjdGl2ZU5hbWUsIC4uLnBhcmVudHMpIHtcbiAgICAgICAgY29uc29sZS5hc3NlcnQocGFyZW50cyAmJiBwYXJlbnRzLmxlbmd0aCA+IDApO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJlbnRzWzBdKSkge1xuICAgICAgICAgICAgcGFyZW50cyA9IHBhcmVudHNbMF07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFyZW50TWVzc2FnZTtcbiAgICAgICAgaWYgKHBhcmVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgcGFyZW50cyA9IHBhcmVudHMubWFwKHAgPT4gYCcke3B9J2ApO1xuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSA9ICcsIHdoaWNoIG11c3QgYmUgJztcbiAgICAgICAgICAgIHBhcmVudE1lc3NhZ2UgKz0gcGFyZW50cy5zbGljZSgwLCAtMSkuam9pbignLCAnKTtcbiAgICAgICAgICAgIHBhcmVudE1lc3NhZ2UgKz0gYCBvciAke3BhcmVudHNbcGFyZW50cy5sZW5ndGggLSAxXX1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSA9IGAgJyR7cGFyZW50c1swXX0nYDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgYEludmFsaWQgdXNlIG9mICcke2RpcmVjdGl2ZU5hbWV9JyBkaXJlY3RpdmUuIGAgK1xuICAgICAgICAgICAgYE1pc3NpbmcgcGFyZW50IGRpcmVjdGl2ZSR7cGFyZW50TWVzc2FnZX0uYFxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBEZnBUYXJnZXRpbmcge1xuICBba2V5OiBzdHJpbmddOiBBcnJheTxzdHJpbmc+O1xufVxuXG5leHBvcnQgY2xhc3MgRGZwQ29uZmlnIHtcbiAgaWRsZUxvYWQ/OiBib29sZWFuO1xuICBvblNhbWVOYXZpZ2F0aW9uPzogJ3JlZnJlc2gnIHwgJ2lnbm9yZSc7XG4gIHNpbmdsZVJlcXVlc3RNb2RlPzogYm9vbGVhbjtcbiAgZW5hYmxlVmlkZW9BZHM/OiBib29sZWFuO1xuICBwZXJzb25hbGl6ZWRBZHM/OiBib29sZWFuO1xuICBjb2xsYXBzZUlmRW1wdHk/OiBib29sZWFuO1xuICBjZW50ZXJpbmc/OiBib29sZWFuO1xuICBsb2NhdGlvbj86IHN0cmluZyB8IEFycmF5PHN0cmluZz47XG4gIHBwaWQ/OiBzdHJpbmc7XG4gIGdsb2JhbFRhcmdldGluZz86IERmcFRhcmdldGluZztcbiAgZm9yY2VTYWZlRnJhbWU/OiBib29sZWFuO1xuICBzYWZlRnJhbWVDb25maWc/OiBvYmplY3Q7XG4gIGxvYWRHUFQ/OiBib29sZWFuO1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgREZQX0NPTkZJRyB9IGZyb20gJy4vaW5qZWN0aW9uX3Rva2VuJztcbmltcG9ydCB7IERmcENvbmZpZyB9IGZyb20gJy4uL2NsYXNzJztcbmltcG9ydCB7IElkbGVTZXJ2aWNlIH0gZnJvbSAnLi9pZGxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBHUFRfTElCUkFSWV9VUkwgPSAnLy93d3cuZ29vZ2xldGFnc2VydmljZXMuY29tL3RhZy9qcy9ncHQuanMnO1xuXG5jbGFzcyBERlBDb25maWd1cmF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7IH1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERmcFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgZW5hYmxlVmlkZW9BZHMgPSBmYWxzZTtcblxuICBwcml2YXRlIHBlcnNvbmFsaXplZEFkcyA9IHRydWU7XG5cbiAgcHJpdmF0ZSBjb2xsYXBzZUlmRW1wdHkgPSB0cnVlO1xuXG4gIHByaXZhdGUgY2VudGVyaW5nID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBsb2NhdGlvbiA9IG51bGw7XG5cbiAgcHJpdmF0ZSBwcGlkID0gbnVsbDtcblxuICBwcml2YXRlIGdsb2JhbFRhcmdldGluZyA9IG51bGw7XG5cbiAgcHJpdmF0ZSBmb3JjZVNhZmVGcmFtZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc2FmZUZyYW1lQ29uZmlnID0gbnVsbDtcblxuICBwcml2YXRlIGxvYWRHUFQgPSB0cnVlO1xuXG4gIHByaXZhdGUgbG9hZGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQE9wdGlvbmFsKCkgaWRsZUxvYWQ6IElkbGVTZXJ2aWNlLFxuICAgIEBJbmplY3QoREZQX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcbiAgICBwcml2YXRlIHNjcmlwdEluamVjdG9yOiBTY3JpcHRJbmplY3RvclNlcnZpY2VcbiAgKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93LFxuICAgICAgICBnb29nbGV0YWcgPSB3aW4uZ29vZ2xldGFnIHx8IHt9O1xuXG4gICAgICB0aGlzLmRmcENvbmZpZygpO1xuXG4gICAgICBnb29nbGV0YWcuY21kID0gZ29vZ2xldGFnLmNtZCB8fCBbXTtcbiAgICAgIGdvb2dsZXRhZy5jbWQucHVzaCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0dXAoKTtcbiAgICAgIH0pO1xuICAgICAgd2luLmdvb2dsZXRhZyA9IGdvb2dsZXRhZztcblxuICAgICAgaWYgKHRoaXMubG9hZEdQVCkge1xuICAgICAgICBjb25zdCBsb2FkU2NyaXB0ID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2NyaXB0SW5qZWN0b3Iuc2NyaXB0SW5qZWN0b3IoR1BUX0xJQlJBUllfVVJMKS50aGVuKChzY3JpcHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGlkbGVMb2FkKSB7XG4gICAgICAgICAgaWRsZUxvYWQucmVxdWVzdChsb2FkU2NyaXB0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2FkU2NyaXB0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRmcENvbmZpZygpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbmZpZykge1xuICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB0aGlzW2tleV0gPSB0aGlzLmNvbmZpZ1trZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkU2FmZUZyYW1lQ29uZmlnKHB1YmFkcykge1xuICAgIGlmICghdGhpcy5zYWZlRnJhbWVDb25maWcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNhZmVGcmFtZUNvbmZpZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ0ZyYW1lQ29uZmlnIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gICAgfVxuICAgIHB1YmFkcy5zZXRTYWZlRnJhbWVDb25maWcodGhpcy5zYWZlRnJhbWVDb25maWcpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRUYXJnZXRpbmcocHViYWRzKSB7XG4gICAgaWYgKCF0aGlzLmdsb2JhbFRhcmdldGluZykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAodHlwZW9mIHRoaXMuZ2xvYmFsVGFyZ2V0aW5nICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgbmV3IERGUENvbmZpZ3VyYXRpb25FcnJvcignVGFyZ2V0aW5nIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5nbG9iYWxUYXJnZXRpbmcpIHtcbiAgICAgIGlmICh0aGlzLmdsb2JhbFRhcmdldGluZy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHB1YmFkcy5zZXRUYXJnZXRpbmcoa2V5LCB0aGlzLmdsb2JhbFRhcmdldGluZ1trZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZExvY2F0aW9uKHB1YmFkcykge1xuICAgIGlmICghdGhpcy5sb2NhdGlvbikgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy5sb2NhdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHB1YmFkcy5zZXRMb2NhdGlvbih0aGlzLmxvY2F0aW9uKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5sb2NhdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ0xvY2F0aW9uIG11c3QgYmUgYW4gJyArXG4gICAgICAgICdhcnJheSBvciBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICBwdWJhZHMuc2V0TG9jYXRpb24uYXBwbHkocHViYWRzLCB0aGlzLmxvY2F0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkUFBJRChwdWJhZHMpIHtcbiAgICBpZiAoIXRoaXMucHBpZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAodHlwZW9mIHRoaXMucHBpZCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ1BQSUQgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cblxuICAgIHB1YmFkcy5zZXRQdWJsaXNoZXJQcm92aWRlZElkKHRoaXMucHBpZCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwKCkge1xuICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93LFxuICAgICAgZ29vZ2xldGFnID0gd2luLmdvb2dsZXRhZyxcbiAgICAgIHB1YmFkcyA9IGdvb2dsZXRhZy5wdWJhZHMoKTtcblxuICAgIGlmICh0aGlzLmVuYWJsZVZpZGVvQWRzKSB7XG4gICAgICBwdWJhZHMuZW5hYmxlVmlkZW9BZHMoKTtcbiAgICB9XG5cbiAgICAvLyBwZXJzb25hbGl6ZWRBZHMgaXMgZGVmYXVsdFxuICAgIGlmICh0aGlzLnBlcnNvbmFsaXplZEFkcyA9PT0gZmFsc2UpIHtcbiAgICAgIHB1YmFkcy5zZXRSZXF1ZXN0Tm9uUGVyc29uYWxpemVkQWRzKDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbGxhcHNlSWZFbXB0eSkge1xuICAgICAgcHViYWRzLmNvbGxhcHNlRW1wdHlEaXZzKCk7XG4gICAgfVxuXG4gICAgLy8gV2UgYWx3YXlzIHJlZnJlc2ggb3Vyc2VsdmVzXG4gICAgcHViYWRzLmRpc2FibGVJbml0aWFsTG9hZCgpO1xuXG4gICAgcHViYWRzLnNldEZvcmNlU2FmZUZyYW1lKHRoaXMuZm9yY2VTYWZlRnJhbWUpO1xuICAgIHB1YmFkcy5zZXRDZW50ZXJpbmcodGhpcy5jZW50ZXJpbmcpO1xuXG4gICAgdGhpcy5hZGRMb2NhdGlvbihwdWJhZHMpO1xuICAgIHRoaXMuYWRkUFBJRChwdWJhZHMpO1xuICAgIHRoaXMuYWRkVGFyZ2V0aW5nKHB1YmFkcyk7XG4gICAgdGhpcy5hZGRTYWZlRnJhbWVDb25maWcocHViYWRzKTtcblxuICAgIC8vIHB1YmFkcy5lbmFibGVTeW5jUmVuZGVyaW5nKCk7XG4gICAgcHViYWRzLmVuYWJsZUFzeW5jUmVuZGVyaW5nKCk7XG5cbiAgICBpZiAodGhpcy5jb25maWcuc2luZ2xlUmVxdWVzdE1vZGUgIT09IHRydWUpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5lbmFibGVWaWRlb0Fkcykge1xuICAgICAgICBwdWJhZHMuZW5hYmxlVmlkZW9BZHMoKTtcbiAgICAgIH1cbiAgICAgIGdvb2dsZXRhZy5lbmFibGVTZXJ2aWNlcygpO1xuICAgIH1cblxuICB9XG5cbiAgaGFzTG9hZGVkKCkge1xuICAgIHJldHVybiB0aGlzLmxvYWRlZDtcbiAgfVxuXG4gIGRlZmluZVRhc2sodGFzaykge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICBjb25zdCB3aW46IGFueSA9IHdpbmRvdyxcbiAgICAgICAgZ29vZ2xldGFnID0gd2luLmdvb2dsZXRhZztcbiAgICAgIGdvb2dsZXRhZy5jbWQucHVzaCh0YXNrKTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGZwSURHZW5lcmF0b3JTZXJ2aWNlIHtcblxuICBwcml2YXRlIGdlbmVyYXRlZElEcyA9IHt9O1xuXG4gIGdlbmVyYXRlSUQodHlwZSA9ICdkZnAtYWQnKSB7XG4gICAgbGV0IGlkID0gbnVsbDtcblxuICAgIGRvIHtcbiAgICAgIGNvbnN0IG51bWJlciA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zbGljZSgyKTtcbiAgICAgIGlkID0gdHlwZSArICctJyArIG51bWJlcjtcbiAgICB9IHdoaWxlIChpZCBpbiB0aGlzLmdlbmVyYXRlZElEcyk7XG5cbiAgICB0aGlzLmdlbmVyYXRlZElEc1tpZF0gPSB0cnVlO1xuXG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgZGZwSURHZW5lcmF0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50LmlkICYmICEoZWxlbWVudC5pZCBpbiB0aGlzLmdlbmVyYXRlZElEcykpIHtcbiAgICAgIHJldHVybiBlbGVtZW50LmlkO1xuICAgIH1cblxuICAgIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZUlEKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICBpZiAoZWxlbWVudCkgeyBlbGVtZW50LmlkID0gaWQ7IH1cblxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIGlzVGFrZW4oaWQpIHtcbiAgICByZXR1cm4gaWQgaW4gdGhpcy5nZW5lcmF0ZWRJRHM7XG4gIH1cblxuICBpc1VuaXF1ZShpZCkge1xuICAgIHJldHVybiAhdGhpcy5pc1Rha2VuKGlkKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIsIE9wdGlvbmFsLCBJbmplY3RvciwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgdGltZXIsIGZyb20gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRGZwQ29uZmlnIH0gZnJvbSAnLi4vY2xhc3MnO1xuaW1wb3J0IHsgREZQX0NPTkZJRyB9IGZyb20gJy4vaW5qZWN0aW9uX3Rva2VuJztcbmltcG9ydCB7IFBhcnNlRHVyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wYXJzZS1kdXJhdGlvbi5zZXJ2aWNlJztcblxuY2xhc3MgREZQUmVmcmVzaEVycm9yIGV4dGVuZHMgRXJyb3IgeyB9XG5cbmRlY2xhcmUgdmFyIGdvb2dsZXRhZztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERmcFJlZnJlc2hTZXJ2aWNlIHtcblxuICByZWZyZXNoRXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwcml2YXRlIHJlZnJlc2hTbG90cyA9IFtdO1xuICBwcml2YXRlIHNpbmdsZVJlcXVlc3Q6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBpbnRlcnZhbHMgPSB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERGUF9DT05GSUcpXG4gICAgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcbiAgICBwcml2YXRlIGluamVjdDogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBwYXJzZUR1cmF0aW9uOiBQYXJzZUR1cmF0aW9uU2VydmljZVxuICApIHsgfVxuXG4gIHNsb3RSZWZyZXNoKHNsb3QsIHJlZnJlc2hJbnRlcnZhbD8sIGluaXRSZWZyZXNoID0gZmFsc2UpIHtcbiAgICBjb25zdCBkZWZlcnJlZDogUHJvbWlzZTxhbnk+ID0gZnJvbShbc2xvdF0pLnRvUHJvbWlzZSgpLFxuICAgICAgdGFzayA9IHsgc2xvdDogc2xvdCwgZGVmZXJyZWQ6IGRlZmVycmVkIH07XG5cbiAgICBkZWZlcnJlZC50aGVuKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmhhc1Nsb3RJbnRlcnZhbChzbG90KSkge1xuICAgICAgICB0aGlzLmNhbmNlbEludGVydmFsKHNsb3QpO1xuICAgICAgfVxuICAgICAgaWYgKHJlZnJlc2hJbnRlcnZhbCkge1xuICAgICAgICB0aGlzLmFkZFNsb3RJbnRlcnZhbCh0YXNrLCByZWZyZXNoSW50ZXJ2YWwpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLnNpbmdsZVJlcXVlc3RNb2RlID09PSB0cnVlICYmIGluaXRSZWZyZXNoKSB7XG4gICAgICAvLyBVc2UgYSB0aW1lciB0byBoYW5kbGUgcmVmcmVzaCBvZiBhIHNpbmdsZSByZXF1ZXN0IG1vZGVcbiAgICAgIHRoaXMucmVmcmVzaFNsb3RzLnB1c2goc2xvdCk7XG4gICAgICBpZiAodGhpcy5zaW5nbGVSZXF1ZXN0ICYmICF0aGlzLnNpbmdsZVJlcXVlc3QuY2xvc2VkKSB7XG4gICAgICAgIHRoaXMuc2luZ2xlUmVxdWVzdC51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5zaW5nbGVSZXF1ZXN0ID0gdGltZXIoMTAwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBjb25zdCBwdWJhZHMgPSBnb29nbGV0YWcucHViYWRzKCk7XG4gICAgICAgIHB1YmFkcy5lbmFibGVTaW5nbGVSZXF1ZXN0KCk7XG4gICAgICAgIGdvb2dsZXRhZy5lbmFibGVTZXJ2aWNlcygpO1xuICAgICAgICB0aGlzLnJlZnJlc2hTbG90cy5mb3JFYWNoKHMgPT4ge1xuICAgICAgICAgIGdvb2dsZXRhZy5kaXNwbGF5KHMuZ2V0U2xvdEVsZW1lbnRJZCgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHB1YmFkcy5yZWZyZXNoKHRoaXMucmVmcmVzaFNsb3RzKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoU2xvdHMgPSBbXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBnb29nbGV0YWcuZGlzcGxheShzbG90LmdldFNsb3RFbGVtZW50SWQoKSk7XG4gICAgICB0aGlzLnJlZnJlc2goW3Rhc2tdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmZXJyZWQ7XG4gIH1cblxuICBjYW5jZWxJbnRlcnZhbChzbG90KSB7XG4gICAgaWYgKCF0aGlzLmhhc1Nsb3RJbnRlcnZhbChzbG90KSkge1xuICAgICAgdGhyb3cgbmV3IERGUFJlZnJlc2hFcnJvcignTm8gaW50ZXJ2YWwgZm9yIGdpdmVuIHNsb3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnRlcnZhbDogU3Vic2NyaXB0aW9uID0gdGhpcy5pbnRlcnZhbHNbdGhpcy5zbG90SW50ZXJ2YWxLZXkoc2xvdCldO1xuICAgIGludGVydmFsLnVuc3Vic2NyaWJlKCk7XG4gICAgZGVsZXRlIHRoaXMuaW50ZXJ2YWxzW3Nsb3RdO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwcml2YXRlIGhhc1Nsb3RJbnRlcnZhbChzbG90KSB7XG4gICAgcmV0dXJuIHRoaXMuc2xvdEludGVydmFsS2V5KHNsb3QpIGluIHRoaXMuaW50ZXJ2YWxzO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoKHRhc2tzPykge1xuICAgIGlmICh0YXNrcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBnb29nbGV0YWcuY21kLnB1c2goKCkgPT4ge1xuICAgICAgICBnb29nbGV0YWcucHViYWRzKCkucmVmcmVzaCgpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRhc2tzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIGdvb2dsZXRhZy5jbWQucHVzaCgoKSA9PiB7XG4gICAgICBnb29nbGV0YWcucHViYWRzKCkucmVmcmVzaCh0YXNrcy5tYXAodGFzayA9PiB0YXNrLnNsb3QpKTtcbiAgICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZSh0YXNrLnNsb3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFNsb3RJbnRlcnZhbCh0YXNrLCBpbnRlcnZhbCkge1xuICAgIGNvbnN0IHBhcnNlZEludGVydmFsID0gdGhpcy5wYXJzZUR1cmF0aW9uLnBhcnNlRHVyYXRpb24oaW50ZXJ2YWwpO1xuICAgIHRoaXMudmFsaWRhdGVJbnRlcnZhbChwYXJzZWRJbnRlcnZhbCwgaW50ZXJ2YWwpO1xuXG4gICAgY29uc3QgcmVmcmVzaCA9IHRpbWVyKHBhcnNlZEludGVydmFsLCBwYXJzZWRJbnRlcnZhbCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IGRvYyA9IHRoaXMuaW5qZWN0LmdldChET0NVTUVOVCk7XG4gICAgICBpZiAoIXRoaXMuaGlkZGVuQ2hlY2soZG9jLmdldEVsZW1lbnRCeUlkKHRhc2suc2xvdC5nZXRTbG90RWxlbWVudElkKCkpKSkge1xuICAgICAgICB0aGlzLnJlZnJlc2goW3Rhc2tdKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoRXZlbnQuZW1pdCh0YXNrLnNsb3QpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5pbnRlcnZhbHNbdGhpcy5zbG90SW50ZXJ2YWxLZXkodGFzay5zbG90KV0gPSByZWZyZXNoO1xuXG4gICAgcmV0dXJuIHJlZnJlc2g7XG4gIH1cblxuICBwcml2YXRlIHNsb3RJbnRlcnZhbEtleShzbG90KSB7XG4gICAgcmV0dXJuIHNsb3QuZ2V0U2xvdElkKCkuZ2V0RG9tSWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgdmFsaWRhdGVJbnRlcnZhbChtaWxsaXNlY29uZHMsIGJlZm9yZVBhcnNpbmcpIHtcbiAgICBpZiAobWlsbGlzZWNvbmRzIDwgMTAwMCkge1xuICAgICAgY29uc29sZS53YXJuKCdDYXJlZnVsOiAke2JlZm9yZVBhcnNpbmd9IGlzIHF1aXRlIGEgbG93IGludGVydmFsIScpO1xuICAgIH1cbiAgfVxuXG4gIGhpZGRlbkNoZWNrKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mICh3aW5kb3cpICE9PSAndW5kZWZpbmVkJyAmJiBlbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGNzcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgICAgaWYgKGNzcy5kaXNwbGF5ID09PSAnbm9uZScpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oaWRkZW5DaGVjayhlbGVtZW50LnBhcmVudEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgRWxlbWVudFJlZixcbiAgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLFxuICBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgSW5qZWN0LCBQTEFURk9STV9JRCwgT3B0aW9uYWxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRGZwU2VydmljZSwgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC5zZXJ2aWNlJztcbmltcG9ydCB7IERmcElER2VuZXJhdG9yU2VydmljZSwgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC1pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBEZnBSZWZyZXNoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvZGZwLXJlZnJlc2guc2VydmljZSc7XG5cbmltcG9ydCB7IERGUEluY29tcGxldGVFcnJvciwgR29vZ2xlU2xvdCwgRGZwQ29uZmlnIH0gZnJvbSAnLi4vY2xhc3MnO1xuaW1wb3J0IHsgREZQX0NPTkZJRyB9IGZyb20gJy4uL3NlcnZpY2UvaW5qZWN0aW9uX3Rva2VuJztcblxuZGVjbGFyZSB2YXIgZ29vZ2xldGFnO1xuXG5leHBvcnQgY2xhc3MgRGZwUmVmcmVzaEV2ZW50IHtcbiAgdHlwZTogc3RyaW5nO1xuICBzbG90OiBhbnk7XG4gIGRhdGE/OiBhbnk7XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2RmcC1hZCdcbn0pXG5leHBvcnQgY2xhc3MgRGZwQWREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgYWRVbml0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNsaWNrVXJsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZvcmNlU2FmZUZyYW1lOiBib29sZWFuO1xuICBASW5wdXQoKSBzYWZlRnJhbWVDb25maWc6IHN0cmluZztcbiAgQElucHV0KCkgcmVmcmVzaDogc3RyaW5nO1xuICBASW5wdXQoKSBwZXJzb25hbGl6ZWRBZHM6IGJvb2xlYW4gPSB0aGlzLmNvbmZpZy5wZXJzb25hbGl6ZWRBZHM7XG4gIEBJbnB1dCgpIGNvbGxhcHNlSWZFbXB0eTogYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgYWZ0ZXJSZWZyZXNoOiBFdmVudEVtaXR0ZXI8RGZwUmVmcmVzaEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIHNpemVzID0gW107XG5cbiAgcHJpdmF0ZSByZXNwb25zaXZlTWFwcGluZyA9IFtdO1xuXG4gIHByaXZhdGUgdGFyZ2V0aW5ncyA9IFtdO1xuXG4gIHByaXZhdGUgZXhjbHVzaW9ucyA9IFtdO1xuXG4gIHByaXZhdGUgc2NyaXB0cyA9IFtdO1xuXG4gIHByaXZhdGUgc2xvdDogR29vZ2xlU2xvdDtcblxuICBwcml2YXRlIG9uU2FtZU5hdmlnYXRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBkZnA6IERmcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkZnBJREdlbmVyYXRvcjogRGZwSURHZW5lcmF0b3JTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGZwUmVmcmVzaDogRGZwUmVmcmVzaFNlcnZpY2UsXG4gICAgQEluamVjdChERlBfQ09ORklHKSBwcml2YXRlIGNvbmZpZzogRGZwQ29uZmlnLFxuICAgIEBPcHRpb25hbCgpIHJvdXRlcjogUm91dGVyXG4gICkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmRmcFJlZnJlc2gucmVmcmVzaEV2ZW50LnN1YnNjcmliZShzbG90ID0+IHtcbiAgICAgICAgaWYgKHNsb3QgPT09IHRoaXMuc2xvdCkge1xuICAgICAgICAgIHRoaXMuYWZ0ZXJSZWZyZXNoLmVtaXQoeyB0eXBlOiAncmVmcmVzaCcsIHNsb3Q6IHNsb3QgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHJvdXRlcikge1xuICAgICAgICB0aGlzLm9uU2FtZU5hdmlnYXRpb24gPSByb3V0ZXIuZXZlbnRzLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpXG4gICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE5hdmlnYXRpb25FbmQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNsb3QgJiYgIXRoaXMucmVmcmVzaCAmJiB0aGlzLmNvbmZpZy5vblNhbWVOYXZpZ2F0aW9uID09PSAncmVmcmVzaCcpIHtcbiAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmRmcElER2VuZXJhdG9yLmRmcElER2VuZXJhdG9yKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuZGZwLmRlZmluZVRhc2soKCkgPT4ge1xuICAgICAgICB0aGlzLmRlZmluZVNsb3QoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnNsb3QpIHtcbiAgICAgIGdvb2dsZXRhZy5kZXN0cm95U2xvdHMoW3RoaXMuc2xvdF0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5vblNhbWVOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLm9uU2FtZU5hdmlnYXRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFJlc3BvbnNpdmVNYXBwaW5nKHNsb3QpIHtcbiAgICBjb25zdCBhZCA9IHRoaXMuZ2V0U3RhdGUoKTtcblxuICAgIGlmIChhZC5yZXNwb25zaXZlTWFwcGluZy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzaXplTWFwcGluZyA9IGdvb2dsZXRhZy5zaXplTWFwcGluZygpO1xuXG4gICAgYWQucmVzcG9uc2l2ZU1hcHBpbmcuZm9yRWFjaChtYXBwaW5nID0+IHtcbiAgICAgIHNpemVNYXBwaW5nLmFkZFNpemUobWFwcGluZy52aWV3cG9ydFNpemUsIG1hcHBpbmcuYWRTaXplcyk7XG4gICAgfSk7XG5cbiAgICBzbG90LmRlZmluZVNpemVNYXBwaW5nKHNpemVNYXBwaW5nLmJ1aWxkKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWZpbmVTbG90KCkge1xuICAgIGNvbnN0IGFkID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgdGhpcy5zbG90ID0gZ29vZ2xldGFnLmRlZmluZVNsb3QoYWQuYWRVbml0LCBhZC5zaXplcywgZWxlbWVudC5pZCk7XG5cbiAgICBpZiAodGhpcy5mb3JjZVNhZmVGcmFtZSAhPT0gdW5kZWZpbmVkICYmIGFkLmZvcmNlU2FmZUZyYW1lID09PSAhdGhpcy5jb25maWcuZm9yY2VTYWZlRnJhbWUpIHtcbiAgICAgIHRoaXMuc2xvdC5zZXRGb3JjZVNhZmVGcmFtZShhZC5mb3JjZVNhZmVGcmFtZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGVyc29uYWxpemVkQWRzID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5zbG90LnNldCgncmVxdWVzdE5vblBlcnNvbmFsaXplZEFkcycsIDEpO1xuICAgICAgZ29vZ2xldGFnLnB1YmFkcygpLnNldFJlcXVlc3ROb25QZXJzb25hbGl6ZWRBZHMoMSk7XG4gICAgfVxuXG4gICAgaWYgKGFkLmNsaWNrVXJsKSB7XG4gICAgICB0aGlzLnNsb3Quc2V0Q2xpY2tVcmwoYWQuY2xpY2tVcmwpO1xuICAgIH1cblxuICAgIGlmIChhZC5jb2xsYXBzZUlmRW1wdHkpIHtcbiAgICAgIHRoaXMuc2xvdC5zZXRDb2xsYXBzZUVtcHR5RGl2KHRydWUsIHRydWUpO1xuICAgIH1cblxuICAgIGlmIChhZC5zYWZlRnJhbWVDb25maWcpIHtcbiAgICAgIHRoaXMuc2xvdC5zZXRTYWZlRnJhbWVDb25maWcoXG4gICAgICAgIChKU09OLnBhcnNlKGFkLnNhZmVGcmFtZUNvbmZpZykpXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuc2xvdC5yZW5kZXJFbmRlZCA9IChnb29nbGVTbG90RXZlbnQ6IElBcmd1bWVudHMpID0+IHtcbiAgICAgIHRoaXMuYWZ0ZXJSZWZyZXNoLmVtaXQoeyB0eXBlOiAncmVuZGVyRW5kZWQnLCBzbG90OiB0aGlzLnNsb3QsIGRhdGE6IGdvb2dsZVNsb3RFdmVudCB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5zZXRSZXNwb25zaXZlTWFwcGluZyh0aGlzLnNsb3QpO1xuXG4gICAgYWQudGFyZ2V0aW5ncy5mb3JFYWNoKHRhcmdldGluZyA9PiB7XG4gICAgICB0aGlzLnNsb3Quc2V0VGFyZ2V0aW5nKHRhcmdldGluZy5rZXksIHRhcmdldGluZy52YWx1ZXMpO1xuICAgIH0pO1xuXG4gICAgYWQuZXhjbHVzaW9ucy5mb3JFYWNoKGV4Y2x1c2lvbiA9PiB7XG4gICAgICB0aGlzLnNsb3Quc2V0Q2F0ZWdvcnlFeGNsdXNpb24oZXhjbHVzaW9uKTtcbiAgICB9KTtcblxuICAgIGFkLnNjcmlwdHMuZm9yRWFjaChzY3JpcHQgPT4geyBzY3JpcHQodGhpcy5zbG90KTsgfSk7XG5cbiAgICBpZiAodGhpcy5jb25maWcuZW5hYmxlVmlkZW9BZHMpIHtcbiAgICAgIHRoaXMuc2xvdC5hZGRTZXJ2aWNlKGdvb2dsZXRhZy5jb21wYW5pb25BZHMoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5zbG90LmFkZFNlcnZpY2UoZ29vZ2xldGFnLnB1YmFkcygpKTtcblxuICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaENvbnRlbnQoKSB7XG4gICAgdGhpcy5kZnBSZWZyZXNoLnNsb3RSZWZyZXNoKHRoaXMuc2xvdCwgdGhpcy5yZWZyZXNoLCB0cnVlKS50aGVuKHNsb3QgPT4ge1xuICAgICAgdGhpcy5hZnRlclJlZnJlc2guZW1pdCh7IHR5cGU6ICdpbml0Jywgc2xvdDogc2xvdCB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrVmFsaWQoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgREZQSW5jb21wbGV0ZUVycm9yKCdkZnAtYWQnLCAnZGZwLXNpemUnKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmFkVW5pdCkge1xuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLWFkJywgJ2FkLXVuaXQnLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuZGZwUmVmcmVzaC5oaWRkZW5DaGVjayh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBnZXRTdGF0ZSgpIHtcbiAgICB0aGlzLmNoZWNrVmFsaWQoKTtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICBzaXplczogdGhpcy5zaXplcyxcbiAgICAgIHJlc3BvbnNpdmVNYXBwaW5nOiB0aGlzLnJlc3BvbnNpdmVNYXBwaW5nLFxuICAgICAgdGFyZ2V0aW5nczogdGhpcy50YXJnZXRpbmdzLFxuICAgICAgZXhjbHVzaW9uczogdGhpcy5leGNsdXNpb25zLFxuICAgICAgYWRVbml0OiB0aGlzLmFkVW5pdCxcbiAgICAgIGZvcmNlU2FmZUZyYW1lOiB0aGlzLmZvcmNlU2FmZUZyYW1lID09PSB0cnVlLFxuICAgICAgc2FmZUZyYW1lQ29uZmlnOiB0aGlzLnNhZmVGcmFtZUNvbmZpZyxcbiAgICAgIGNsaWNrVXJsOiB0aGlzLmNsaWNrVXJsLFxuICAgICAgcmVmcmVzaDogdGhpcy5yZWZyZXNoLFxuICAgICAgcGVyc29uYWxpemVkQWRzOiB0aGlzLnBlcnNvbmFsaXplZEFkcyA9PT0gdGhpcy5jb25maWcucGVyc29uYWxpemVkQWRzLFxuICAgICAgc2NyaXB0czogdGhpcy5zY3JpcHRzLFxuICAgICAgY29sbGFwc2VJZkVtcHR5OiB0aGlzLmNvbGxhcHNlSWZFbXB0eSA9PT0gdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgYWRkU2l6ZShzaXplKSB7XG4gICAgdGhpcy5zaXplcy5wdXNoKHNpemUpO1xuICB9XG5cbiAgYWRkUmVzcG9uc2l2ZU1hcHBpbmcobWFwcGluZykge1xuICAgIHRoaXMucmVzcG9uc2l2ZU1hcHBpbmcucHVzaChtYXBwaW5nKTtcbiAgfVxuXG4gIGFkZFRhcmdldGluZyh0YXJnZXRpbmcpIHtcbiAgICB0aGlzLnRhcmdldGluZ3MucHVzaCh0YXJnZXRpbmcpO1xuICB9XG5cbiAgYWRkRXhjbHVzaW9uKGV4Y2x1c2lvbikge1xuICAgIHRoaXMuZXhjbHVzaW9ucy5wdXNoKGV4Y2x1c2lvbik7XG4gIH1cblxuICBhZGRTY3JpcHQoc2NyaXB0KSB7XG4gICAgdGhpcy5zY3JpcHRzLnB1c2goc2NyaXB0KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgRWxlbWVudFJlZixcbiAgICBJbmplY3QsIGZvcndhcmRSZWYsXG4gICAgSG9zdExpc3RlbmVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEZnBBZERpcmVjdGl2ZSB9IGZyb20gJy4vZGZwLWFkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZnBSZWZyZXNoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvZGZwLXJlZnJlc2guc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZGZwLWFkW3Jlc3BvbnNpdmVdJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBBZFJlc3BvbnNpdmVEaXJlY3RpdmUge1xuXG4gICAgcHJpdmF0ZSBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50O1xuICAgIHByaXZhdGUgaWZyYW1lV2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIHNsb3Q6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXG4gICAgICAgIHByaXZhdGUgYWQ6IERmcEFkRGlyZWN0aXZlLFxuICAgICAgICBwcml2YXRlIGRmcFJlZnJlc2g6IERmcFJlZnJlc2hTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMuYWQuYWZ0ZXJSZWZyZXNoLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNsb3QgPSBldmVudC5zbG90O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcbiAgICBub3JtYWxpemVJZnJhbWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmFkLmlzSGlkZGVuKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pZnJhbWUgPSB0aGlzLmlmcmFtZSB8fCB0aGlzLmdldElmcmFtZSgpO1xuICAgICAgICBpZiAoIXRoaXMuaWZyYW1lKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIHRoaXMuaWZyYW1lV2lkdGggPSB0aGlzLmlmcmFtZVdpZHRoIHx8ICt0aGlzLmlmcmFtZS53aWR0aDtcblxuICAgICAgICBjb25zdCB3aW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuYWQuZ2V0U3RhdGUoKSxcbiAgICAgICAgICAgIHdpZHRoID0gMDtcblxuICAgICAgICBzdGF0ZS5zaXplcy5mb3JFYWNoKHNpemUgPT4ge1xuICAgICAgICAgICAgaWYgKHNpemVbMF0gPCB3aW5XaWR0aCkge1xuICAgICAgICAgICAgICAgIHdpZHRoID0gTWF0aC5tYXgod2lkdGgsIHNpemVbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc3RhdGUuc2l6ZXMubGVuZ3RoID4gMSAmJiB3aWR0aCAhPT0gdGhpcy5pZnJhbWVXaWR0aCkge1xuICAgICAgICAgICAgc3RhdGUgPSB0aGlzLmFkLmdldFN0YXRlKCk7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZVdpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2lkdGggKyAnJyk7XG4gICAgICAgICAgICB0aGlzLmRmcFJlZnJlc2guc2xvdFJlZnJlc2godGhpcy5zbG90LCBzdGF0ZS5yZWZyZXNoKS50aGVuKHNsb3QgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWQuYWZ0ZXJSZWZyZXNoLmVtaXQoeyB0eXBlOiAncmVzaXplJywgc2xvdDogc2xvdCB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmlmcmFtZSA9IHRoaXMuZ2V0SWZyYW1lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldElmcmFtZSgpIHtcbiAgICAgICAgY29uc3QgYWQ6IEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgIGlmcmFtZSA9IGFkLnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZScpO1xuICAgICAgICBpZiAoaWZyYW1lICYmICtpZnJhbWUud2lkdGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gaWZyYW1lO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3QsIGZvcndhcmRSZWYsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1hZC5kaXJlY3RpdmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkZnAtcmVzcG9uc2l2ZSdcbn0pXG5leHBvcnQgY2xhc3MgRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgdmlld3BvcnQgPSBbMCwgMF07XG4gIEBJbnB1dCgpIGFkU2l6ZXMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwQWREaXJlY3RpdmUpKVxuICAgIHByaXZhdGUgYWQ6IERmcEFkRGlyZWN0aXZlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hZC5hZGRSZXNwb25zaXZlTWFwcGluZyh0aGlzLmdldFN0YXRlKCkpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHZpZXdXaWR0aCh2YWw6IG51bWJlcikge1xuICAgIGlmICh2YWwgPiAwKSB7XG4gICAgICB0aGlzLnZpZXdwb3J0WzBdID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB2aWV3SGVpZ2h0KHZhbDogbnVtYmVyKSB7XG4gICAgaWYgKHZhbCA+IDApIHtcbiAgICAgIHRoaXMudmlld3BvcnRbMV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgYWRkU2l6ZShzaXplKSB7XG4gICAgdGhpcy5hZFNpemVzLnB1c2goc2l6ZSk7XG4gIH1cblxuICBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICB2aWV3cG9ydFNpemU6IHRoaXMudmlld3BvcnQsXG4gICAgICBhZFNpemVzOiB0aGlzLmFkU2l6ZXNcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmLCBPbkluaXQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcFJlc3BvbnNpdmVEaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1yZXNwb25zaXZlLmRpcmVjdGl2ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2RmcC1zaXplJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBTaXplRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcEFkRGlyZWN0aXZlKSlcbiAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSkpXG4gICAgcHJpdmF0ZSByZXNwOiBEZnBSZXNwb25zaXZlRGlyZWN0aXZlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5yZXNwIHx8IHRoaXMuYWQsXG4gICAgICBpbm5lclRleHQ6IHN0cmluZyA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmlubmVyVGV4dDtcblxuICAgIGlmICh0aGlzLndpZHRoICYmIHRoaXMuaGVpZ2h0KSB7XG4gICAgICB0YXJnZXQuYWRkU2l6ZShbdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdKTtcbiAgICB9IGVsc2UgaWYgKGlubmVyVGV4dC50cmltKCkgIT09ICcnKSB7XG4gICAgICB0YXJnZXQuYWRkU2l6ZShpbm5lclRleHQpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEFmdGVyQ29udGVudEluaXQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgREZQSW5jb21wbGV0ZUVycm9yIH0gZnJvbSAnLi4vY2xhc3MnO1xuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1hZC5kaXJlY3RpdmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkZnAtdGFyZ2V0aW5nJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBUYXJnZXRpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuICBASW5wdXQoKSBrZXk6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUodmFsOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+KSB7XG4gICAgaWYgKHZhbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICB2YWwuZm9yRWFjaCh2ID0+IHRoaXMuYWRkVmFsdWUodikpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZFZhbHVlKHZhbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB2YWx1ZXMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwQWREaXJlY3RpdmUpKVxuICAgIHByaXZhdGUgYWQ6IERmcEFkRGlyZWN0aXZlXG4gICkgeyB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGNvbnN0IHRhcmdldGluZyA9IHRoaXMuZ2V0U3RhdGUoKTtcbiAgICB0aGlzLmFkLmFkZFRhcmdldGluZyh0YXJnZXRpbmcpO1xuICB9XG5cbiAgY2hlY2tWYWxpZCgpIHtcbiAgICBpZiAodGhpcy5rZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLXRhcmdldGluZycsICdrZXknLCB0cnVlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLXRhcmdldGluZycsICd2YWx1ZScsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGdldFN0YXRlKCkge1xuICAgIHRoaXMuY2hlY2tWYWxpZCgpO1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcbiAgICAgIGtleTogdGhpcy5rZXksXG4gICAgICB2YWx1ZXM6IHRoaXMudmFsdWVzXG4gICAgfSk7XG4gIH1cblxuICBhZGRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAmJiAhdGhpcy52YWx1ZXMuZmluZChpdGVtID0+IGl0ZW0gPT09IHZhbHVlKSkge1xuICAgICAgdGhpcy52YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgRWxlbWVudFJlZixcbiAgSW5qZWN0LCBmb3J3YXJkUmVmLFxuICBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGZwLWV4Y2x1c2lvbidcbn0pXG5leHBvcnQgY2xhc3MgRGZwRXhjbHVzaW9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcEFkRGlyZWN0aXZlKSlcbiAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hZC5hZGRFeGNsdXNpb24odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXG4gIEluamVjdCwgZm9yd2FyZFJlZixcbiAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEZnBUYXJnZXRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2RmcC10YXJnZXRpbmcuZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGZwLXZhbHVlJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBWYWx1ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBUYXJnZXRpbmdEaXJlY3RpdmUpKVxuICAgIHByaXZhdGUgdGFyZ2V0aW5nOiBEZnBUYXJnZXRpbmdEaXJlY3RpdmVcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnRhcmdldGluZy5hZGRWYWx1ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbm5lclRleHQpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgSW5qZWN0LFxuICBQTEFURk9STV9JRFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGZwLWF1ZGllbmNlLXBpeGVsJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBBdWRpZW5jZVBpeGVsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBhZFVuaXQ6IHN0cmluZztcbiAgQElucHV0KCkgc2VnbWVudElkOiBudW1iZXI7XG4gIEBJbnB1dCgpIHBwaWQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgY29uc3QgYXhlbCA9IE1hdGgucmFuZG9tKCksXG4gICAgICAgIHJhbmRvbSA9IGF4ZWwgKiAxMDAwMDAwMDAwMDAwMDtcblxuICAgICAgbGV0IGFkVW5pdCA9ICcnO1xuICAgICAgaWYgKHRoaXMuYWRVbml0KSB7XG4gICAgICAgIGFkVW5pdCA9IGBkY19pdT0ke3RoaXMuYWRVbml0fWA7XG4gICAgICB9XG5cbiAgICAgIGxldCBwcGlkID0gJyc7XG4gICAgICBpZiAodGhpcy5wcGlkKSB7XG4gICAgICAgIHBwaWQgPSBgcHBpZD0ke3RoaXMucHBpZH1gO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwaXhlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICBwaXhlbC5zcmMgPSAnaHR0cHM6Ly9wdWJhZHMuZy5kb3VibGVjbGljay5uZXQvYWN0aXZpdHk7b3JkPSc7XG4gICAgICBwaXhlbC5zcmMgKz0gYCR7cmFuZG9tfTtkY19zZWc9JHt0aGlzLnNlZ21lbnRJZH07JHthZFVuaXR9JHtwcGlkfWA7XG5cbiAgICAgIHBpeGVsLndpZHRoID0gMTtcbiAgICAgIHBpeGVsLmhlaWdodCA9IDE7XG4gICAgICBwaXhlbC5ib3JkZXIgPSAnMCc7XG5cbiAgICAgIHBpeGVsLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcblxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYXBwZW5kKHBpeGVsKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERmcENvbmZpZywgfSBmcm9tICcuL2NsYXNzJztcbmltcG9ydCB7IERGUF9DT05GSUcgfSBmcm9tICcuL3NlcnZpY2UvaW5qZWN0aW9uX3Rva2VuJztcblxuaW1wb3J0IHsgSWRsZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvaWRsZS5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBFcnJvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvaHR0cC1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IFBhcnNlRHVyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL3NjcmlwdC1pbmplY3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IERmcFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvZGZwLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGZwSURHZW5lcmF0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2RmcC1pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBEZnBSZWZyZXNoU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9kZnAtcmVmcmVzaC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtYWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcFNpemVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtc2l6ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1yZXNwb25zaXZlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZnBBZFJlc3BvbnNpdmVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtYWQtcmVzcG9uc2l2ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwVGFyZ2V0aW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLXRhcmdldGluZy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwRXhjbHVzaW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLWV4Y2x1c2lvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwVmFsdWVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtdmFsdWUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcEF1ZGllbmNlUGl4ZWxEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtYXVkaWVuY2UtcGl4ZWwuZGlyZWN0aXZlJztcblxuY29uc3QgRElSRUNUSVZFUyA9IFtcbiAgRGZwQWREaXJlY3RpdmUsXG4gIERmcFNpemVEaXJlY3RpdmUsXG4gIERmcFJlc3BvbnNpdmVEaXJlY3RpdmUsXG4gIERmcEFkUmVzcG9uc2l2ZURpcmVjdGl2ZSxcbiAgRGZwVGFyZ2V0aW5nRGlyZWN0aXZlLCBEZnBFeGNsdXNpb25EaXJlY3RpdmUsIERmcFZhbHVlRGlyZWN0aXZlLFxuICBEZnBBdWRpZW5jZVBpeGVsRGlyZWN0aXZlXG5dO1xuXG5jb25zdCBTRVJWSUNFUyA9IFtcbiAgSHR0cEVycm9yU2VydmljZSxcbiAgUGFyc2VEdXJhdGlvblNlcnZpY2UsXG4gIFNjcmlwdEluamVjdG9yU2VydmljZSxcbiAgRGZwU2VydmljZSwgRGZwSURHZW5lcmF0b3JTZXJ2aWNlLCBEZnBSZWZyZXNoU2VydmljZVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIC4uLkRJUkVDVElWRVNcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgLi4uU0VSVklDRVNcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIC4uLkRJUkVDVElWRVNcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZnBNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBEZnBDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IERmcE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAuLi4oY29uZmlnICYmIGNvbmZpZy5pZGxlTG9hZCA9PT0gdHJ1ZSA/IFtJZGxlU2VydmljZV0gOiBbXSksXG4gICAgICAgIHsgcHJvdmlkZTogREZQX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyB8fCB7fSB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBSUEsSUFBYSxVQUFVLEdBQUcsSUFBSSxjQUFjLENBQVksV0FBVyxDQUFDOzs7Ozs7QUNKcEU7SUFRRSxxQkFDdUIsVUFBa0IsRUFDdkMsSUFBWTs7UUFFWixJQUFNLEdBQUcsR0FBUSxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzdELElBQUksR0FBRyxDQUFDLG1CQUFtQixFQUFFO1lBQzNCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxVQUFDLEdBQUc7Z0JBQzdCLE9BQU8sR0FBRyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3JDLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFVBQUMsR0FBRztnQkFDN0IsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBTSxPQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFBLENBQUMsQ0FBQzthQUM5RCxDQUFDO1NBQ0g7S0FDRjs7Ozs7SUFFRCw2QkFBTzs7OztJQUFQLFVBQVEsR0FBRztRQUNULElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMvQjs7Z0JBdkJGLFVBQVU7Ozs7Z0JBTTBCLE1BQU0sdUJBQXRDLE1BQU0sU0FBQyxXQUFXO2dCQVRGLE1BQU07O3NCQUEzQjs7Ozs7OztBQ0FBOzsyQkFTZ0IsVUFBVSxJQUFJO1lBQzFCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUM1QixPQUFPLEVBQUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDckM7WUFDRCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7U0FDeEI7Ozs7Ozs7SUFURCxvQ0FBUzs7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