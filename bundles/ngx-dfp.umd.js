(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('@angular/router'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ngx-dfp', ['exports', '@angular/core', '@angular/common', 'rxjs', '@angular/router', 'rxjs/operators'], factory) :
    (factory((global['ngx-dfp'] = {}),global.ng.core,global.ng.common,global.rxjs,global.ng.router,global.rxjs.operators));
}(this, (function (exports,core,common,rxjs,router,operators) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DFP_CONFIG = new core.InjectionToken('dfpConfig');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var IdleService = (function () {
        function IdleService(platformId, zone) {
            /** @type {?} */
            var win = common.isPlatformBrowser(platformId) ? window : {};
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        IdleService.ctorParameters = function () {
            return [
                { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
                { type: core.NgZone }
            ];
        };
        return IdleService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HttpErrorService = (function () {
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
            { type: core.Injectable }
        ];
        return HttpErrorService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DFPDurationError = (function (_super) {
        __extends(DFPDurationError, _super);
        function DFPDurationError(interval) {
            return _super.call(this, "Invalid interval: '" + interval + "'ls") || this;
        }
        return DFPDurationError;
    }(Error));
    var ParseDurationService = (function () {
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
            { type: core.Injectable }
        ];
        return ParseDurationService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ScriptInjectorService = (function () {
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ScriptInjectorService.ctorParameters = function () {
            return [
                { type: HttpErrorService }
            ];
        };
        return ScriptInjectorService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DFPIncompleteError = (function (_super) {
        __extends(DFPIncompleteError, _super);
        function DFPIncompleteError(directiveName, missingName, isAttribute) {
            return _super.call(this, "Incomplete definition of '" + directiveName + "': " +
                ("Missing " + (isAttribute ? 'attribute' : 'child directive') + " ") +
                ("'" + missingName + "'.")) || this;
        }
        return DFPIncompleteError;
    }(Error));
    var DFPTypeError = (function (_super) {
        __extends(DFPTypeError, _super);
        function DFPTypeError(directiveName, attributeName, wrongValue, expectedType) {
            return _super.call(this, "Wrong type for attribute '" + attributeName + "' on " +
                ("directive '" + directiveName + "': Expected " + expectedType) +
                (", got " + typeof wrongValue)) || this;
        }
        return DFPTypeError;
    }(Error));
    var DFPMissingParentError = (function (_super) {
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
    var DfpConfig = (function () {
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
    var DFPConfigurationError = (function (_super) {
        __extends(DFPConfigurationError, _super);
        function DFPConfigurationError() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DFPConfigurationError;
    }(Error));
    var DfpService = (function () {
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
            if (common.isPlatformBrowser(this.platformId)) {
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
                if (common.isPlatformBrowser(this.platformId)) {
                    /** @type {?} */
                    var win = window;
                    /** @type {?} */
                    var googletag = win.googletag;
                    googletag.cmd.push(task);
                }
            };
        DfpService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DfpService.ctorParameters = function () {
            return [
                { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
                { type: IdleService, decorators: [{ type: core.Optional }] },
                { type: DfpConfig, decorators: [{ type: core.Inject, args: [DFP_CONFIG,] }] },
                { type: ScriptInjectorService }
            ];
        };
        return DfpService;
    }());

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
    var DFPRefreshError = (function (_super) {
        __extends(DFPRefreshError, _super);
        function DFPRefreshError() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DFPRefreshError;
    }(Error));
    var DfpRefreshService = (function () {
        function DfpRefreshService(config, inject, parseDuration) {
            this.config = config;
            this.inject = inject;
            this.parseDuration = parseDuration;
            this.refreshEvent = new core.EventEmitter();
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
                if (initRefresh === void 0) {
                    initRefresh = false;
                }
                /** @type {?} */
                var deferred = rxjs.from([slot]).toPromise();
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
                    this.singleRequest = rxjs.timer(100).subscribe(function () {
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
                var refresh = rxjs.timer(parsedInterval, parsedInterval).subscribe(function () {
                    /** @type {?} */
                    var doc = _this.inject.get(common.DOCUMENT);
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DfpRefreshService.ctorParameters = function () {
            return [
                { type: DfpConfig, decorators: [{ type: core.Optional }, { type: core.Inject, args: [DFP_CONFIG,] }] },
                { type: core.Injector },
                { type: ParseDurationService }
            ];
        };
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
    var DfpAdDirective = (function () {
        function DfpAdDirective(platformId, elementRef, dfp, dfpIDGenerator, dfpRefresh, config, router$$1) {
            var _this = this;
            this.platformId = platformId;
            this.elementRef = elementRef;
            this.dfp = dfp;
            this.dfpIDGenerator = dfpIDGenerator;
            this.dfpRefresh = dfpRefresh;
            this.config = config;
            this.personalizedAds = this.config.personalizedAds;
            this.afterRefresh = new core.EventEmitter();
            this.sizes = [];
            this.responsiveMapping = [];
            this.targetings = [];
            this.exclusions = [];
            this.scripts = [];
            if (common.isPlatformBrowser(this.platformId)) {
                this.dfpRefresh.refreshEvent.subscribe(function (slot) {
                    if (slot === _this.slot) {
                        _this.afterRefresh.emit({ type: 'refresh', slot: slot });
                    }
                });
                if (router$$1) {
                    this.onSameNavigation = router$$1.events.pipe(operators.filter(function (event) { return event instanceof router.NavigationEnd; }))
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
                if (common.isPlatformBrowser(this.platformId)) {
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
                if (common.isPlatformBrowser(this.platformId)) {
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
             */ function () {
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
            { type: core.Directive, args: [{
                        selector: 'dfp-ad'
                    },] }
        ];
        /** @nocollapse */
        DfpAdDirective.ctorParameters = function () {
            return [
                { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
                { type: core.ElementRef },
                { type: DfpService },
                { type: DfpIDGeneratorService },
                { type: DfpRefreshService },
                { type: DfpConfig, decorators: [{ type: core.Inject, args: [DFP_CONFIG,] }] },
                { type: router.Router, decorators: [{ type: core.Optional }] }
            ];
        };
        DfpAdDirective.propDecorators = {
            adUnit: [{ type: core.Input }],
            clickUrl: [{ type: core.Input }],
            forceSafeFrame: [{ type: core.Input }],
            safeFrameConfig: [{ type: core.Input }],
            refresh: [{ type: core.Input }],
            personalizedAds: [{ type: core.Input }],
            collapseIfEmpty: [{ type: core.Input }],
            afterRefresh: [{ type: core.Output }]
        };
        return DfpAdDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DfpAdResponsiveDirective = (function () {
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
            { type: core.Directive, args: [{
                        selector: 'dfp-ad[responsive]'
                    },] }
        ];
        /** @nocollapse */
        DfpAdResponsiveDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: DfpAdDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return DfpAdDirective; }),] }] },
                { type: DfpRefreshService }
            ];
        };
        DfpAdResponsiveDirective.propDecorators = {
            normalizeIframe: [{ type: core.HostListener, args: ['window:resize',] }]
        };
        return DfpAdResponsiveDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DfpResponsiveDirective = (function () {
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
             */ function (val) {
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
             */ function (val) {
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
            { type: core.Directive, args: [{
                        selector: 'dfp-responsive'
                    },] }
        ];
        /** @nocollapse */
        DfpResponsiveDirective.ctorParameters = function () {
            return [
                { type: DfpAdDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return DfpAdDirective; }),] }] }
            ];
        };
        DfpResponsiveDirective.propDecorators = {
            viewport: [{ type: core.Input }],
            adSizes: [{ type: core.Input }],
            viewWidth: [{ type: core.Input }],
            viewHeight: [{ type: core.Input }]
        };
        return DfpResponsiveDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DfpSizeDirective = (function () {
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
            { type: core.Directive, args: [{
                        selector: 'dfp-size'
                    },] }
        ];
        /** @nocollapse */
        DfpSizeDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: DfpAdDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return DfpAdDirective; }),] }] },
                { type: DfpResponsiveDirective, decorators: [{ type: core.Optional }, { type: core.Inject, args: [core.forwardRef(function () { return DfpResponsiveDirective; }),] }] }
            ];
        };
        DfpSizeDirective.propDecorators = {
            width: [{ type: core.Input }],
            height: [{ type: core.Input }]
        };
        return DfpSizeDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DfpTargetingDirective = (function () {
        function DfpTargetingDirective(ad) {
            this.ad = ad;
            this.values = [];
        }
        Object.defineProperty(DfpTargetingDirective.prototype, "value", {
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
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
            { type: core.Directive, args: [{
                        selector: 'dfp-targeting'
                    },] }
        ];
        /** @nocollapse */
        DfpTargetingDirective.ctorParameters = function () {
            return [
                { type: DfpAdDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return DfpAdDirective; }),] }] }
            ];
        };
        DfpTargetingDirective.propDecorators = {
            key: [{ type: core.Input }],
            value: [{ type: core.Input }]
        };
        return DfpTargetingDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DfpExclusionDirective = (function () {
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
            { type: core.Directive, args: [{
                        selector: 'dfp-exclusion'
                    },] }
        ];
        /** @nocollapse */
        DfpExclusionDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: DfpAdDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return DfpAdDirective; }),] }] }
            ];
        };
        return DfpExclusionDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DfpValueDirective = (function () {
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
            { type: core.Directive, args: [{
                        selector: 'dfp-value'
                    },] }
        ];
        /** @nocollapse */
        DfpValueDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: DfpTargetingDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return DfpTargetingDirective; }),] }] }
            ];
        };
        return DfpValueDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DfpAudiencePixelDirective = (function () {
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
                if (common.isPlatformBrowser(this.platformId)) {
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
            { type: core.Directive, args: [{
                        selector: 'dfp-audience-pixel'
                    },] }
        ];
        /** @nocollapse */
        DfpAudiencePixelDirective.ctorParameters = function () {
            return [
                { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
                { type: core.ElementRef }
            ];
        };
        DfpAudiencePixelDirective.propDecorators = {
            adUnit: [{ type: core.Input }],
            segmentId: [{ type: core.Input }],
            ppid: [{ type: core.Input }]
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
    var DfpModule = (function () {
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
            { type: core.NgModule, args: [{
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

    exports.DfpModule = DfpModule;
    exports.DFP_CONFIG = DFP_CONFIG;
    exports.IdleService = IdleService;
    exports.HttpErrorService = HttpErrorService;
    exports.ParseDurationService = ParseDurationService;
    exports.ScriptInjectorService = ScriptInjectorService;
    exports.DfpService = DfpService;
    exports.DfpIDGeneratorService = DfpIDGeneratorService;
    exports.DfpRefreshService = DfpRefreshService;
    exports.DfpAdDirective = DfpAdDirective;
    exports.DfpAdResponsiveDirective = DfpAdResponsiveDirective;
    exports.DfpResponsiveDirective = DfpResponsiveDirective;
    exports.DfpSizeDirective = DfpSizeDirective;
    exports.DfpTargetingDirective = DfpTargetingDirective;
    exports.DfpExclusionDirective = DfpExclusionDirective;
    exports.DfpValueDirective = DfpValueDirective;
    exports.DfpAudiencePixelDirective = DfpAudiencePixelDirective;
    exports.ɵe = DfpConfig;
    exports.ɵm = DfpAdResponsiveDirective;
    exports.ɵa = DfpAdDirective;
    exports.ɵq = DfpAudiencePixelDirective;
    exports.ɵo = DfpExclusionDirective;
    exports.ɵl = DfpResponsiveDirective;
    exports.ɵk = DfpSizeDirective;
    exports.ɵn = DfpTargetingDirective;
    exports.ɵp = DfpValueDirective;
    exports.ɵh = DfpIDGeneratorService;
    exports.ɵi = DfpRefreshService;
    exports.ɵc = DfpService;
    exports.ɵg = HttpErrorService;
    exports.ɵd = IdleService;
    exports.ɵb = DFP_CONFIG;
    exports.ɵj = ParseDurationService;
    exports.ɵf = ScriptInjectorService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRmcC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1kZnAvc2VydmljZS9pbmplY3Rpb25fdG9rZW4udHMiLCJuZzovL25neC1kZnAvc2VydmljZS9pZGxlLnNlcnZpY2UudHMiLCJuZzovL25neC1kZnAvc2VydmljZS9odHRwLWVycm9yLnNlcnZpY2UudHMiLCJub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwibmc6Ly9uZ3gtZGZwL3NlcnZpY2UvcGFyc2UtZHVyYXRpb24uc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL3NjcmlwdC1pbmplY3Rvci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtZGZwL2NsYXNzL2RmcC1lcnJvcnMuY2xhc3MudHMiLCJuZzovL25neC1kZnAvY2xhc3MvZGZwLWNvbmZpZy5jbGFzcy50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL2RmcC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtZGZwL3NlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtZGZwL3NlcnZpY2UvZGZwLXJlZnJlc2guc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9kaXJlY3RpdmUvZGZwLWFkLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kaXJlY3RpdmUvZGZwLWFkLXJlc3BvbnNpdmUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtZGZwL2RpcmVjdGl2ZS9kZnAtcmVzcG9uc2l2ZS5kaXJlY3RpdmUudHMiLCJuZzovL25neC1kZnAvZGlyZWN0aXZlL2RmcC1zaXplLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kaXJlY3RpdmUvZGZwLXRhcmdldGluZy5kaXJlY3RpdmUudHMiLCJuZzovL25neC1kZnAvZGlyZWN0aXZlL2RmcC1leGNsdXNpb24uZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtZGZwL2RpcmVjdGl2ZS9kZnAtdmFsdWUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtZGZwL2RpcmVjdGl2ZS9kZnAtYXVkaWVuY2UtcGl4ZWwuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtZGZwL2RmcC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGZwQ29uZmlnICB9IGZyb20gJy4uL2NsYXNzJztcblxuZXhwb3J0IGNvbnN0IERGUF9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48RGZwQ29uZmlnPignZGZwQ29uZmlnJyk7XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUsIEluamVjdCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIElkbGVTZXJ2aWNlIHtcblxuICBwcml2YXRlIHJlcXVlc3RJZGxlQ2FsbGJhY2s6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgem9uZTogTmdab25lXG4gICkge1xuICAgIGNvbnN0IHdpbjogYW55ID0gaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkgPyB3aW5kb3cgOiB7fTtcbiAgICBpZiAod2luLnJlcXVlc3RJZGxlQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMucmVxdWVzdElkbGVDYWxsYmFjayA9IChmdW4pID0+IHtcbiAgICAgICAgcmV0dXJuIHdpbi5yZXF1ZXN0SWRsZUNhbGxiYWNrKGZ1bik7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlcXVlc3RJZGxlQ2FsbGJhY2sgPSAoZnVuKSA9PiB7XG4gICAgICAgIHJldHVybiB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHdpbi5zZXRUaW1lb3V0KGZ1biwgNTApKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcmVxdWVzdChmdW4pIHtcbiAgICB0aGlzLnJlcXVlc3RJZGxlQ2FsbGJhY2soZnVuKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIdHRwRXJyb3JTZXJ2aWNlIHtcblxuICBodHRwRXJyb3IocmVzcG9uc2UsIG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmxvZyhgRXJyb3IgKCR7cmVzcG9uc2Uuc3RhdHVzfSkgJHttZXNzYWdlID8gbWVzc2FnZSA6ICcnfWApO1xuICB9XG5cbiAgaXNFcnJvckNvZGUgPSBmdW5jdGlvbiAoY29kZSkge1xuICAgIGlmICh0eXBlb2YgY29kZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiAhKGNvZGUgPj0gMjAwICYmIGNvZGUgPCAzMDApO1xuICAgIH1cbiAgICByZXR1cm4gY29kZVswXSAhPT0gJzInO1xuICB9O1xuXG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY2xhc3MgREZQRHVyYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoaW50ZXJ2YWwpIHtcbiAgICBzdXBlcihgSW52YWxpZCBpbnRlcnZhbDogJyR7aW50ZXJ2YWx9J2xzYCk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhcnNlRHVyYXRpb25TZXJ2aWNlIHtcblxuICBjb252ZXJ0VG9NaWxsaXNlY29uZHModGltZSwgdW5pdCkge1xuICAgIGNvbnNvbGUuYXNzZXJ0KC9eKG0/c3xtaW58aCkkL2cudGVzdCh1bml0KSk7XG5cbiAgICBpZiAodW5pdCA9PT0gJ21zJykgeyByZXR1cm4gdGltZTsgfVxuICAgIGlmICh1bml0ID09PSAncycpIHsgcmV0dXJuIHRpbWUgKiAxMDAwOyB9XG4gICAgaWYgKHVuaXQgPT09ICdtaW4nKSB7IHJldHVybiB0aW1lICogNjAgKiAxMDAwOyB9XG5cbiAgICByZXR1cm4gdGltZSAqIDYwICogNjAgKiAxMDAwO1xuICB9XG5cbiAgY29udmVydChtYXRjaCkge1xuICAgIGNvbnN0IHRpbWUgPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcblxuICAgIGlmIChtYXRjaC5sZW5ndGggPT09IDIpIHsgcmV0dXJuIHRpbWU7IH1cblxuICAgIHJldHVybiB0aGlzLmNvbnZlcnRUb01pbGxpc2Vjb25kcyh0aW1lLCBtYXRjaFsyXSk7XG4gIH1cblxuICBwYXJzZUR1cmF0aW9uKGludGVydmFsKSB7XG5cbiAgICBpZiAoaW50ZXJ2YWwgPT09IHVuZGVmaW5lZCB8fCBpbnRlcnZhbCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IERGUER1cmF0aW9uRXJyb3IoaW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgaW50ZXJ2YWwgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gaW50ZXJ2YWw7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBpbnRlcnZhbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCcke2ludGVydmFsfScgbXVzdCBiZSBvZiBudW1iZXIgb3Igc3RyaW5nIHR5cGVgKTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXRjaCA9IGludGVydmFsLm1hdGNoKC8oKD86XFxkKyk/Lj9cXGQrKShtP3N8bWlufGgpPy8pO1xuXG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgdGhyb3cgbmV3IERGUER1cmF0aW9uRXJyb3IoaW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvbnZlcnQobWF0Y2gpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSHR0cEVycm9yU2VydmljZSB9IGZyb20gJy4vaHR0cC1lcnJvci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNjcmlwdEluamVjdG9yU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwRXJyb3I6IEh0dHBFcnJvclNlcnZpY2UpIHsgfVxuXG4gIHByaXZhdGUgY29tcGxldGVVUkwodXJsKSB7XG4gICAgY29uc3Qgc3NsID0gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwczonO1xuICAgIHJldHVybiAoc3NsID8gJ2h0dHBzOicgOiAnaHR0cDonKSArIHVybDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU2NyaXB0KHVybCkge1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIHNjcmlwdC5zcmMgPSB0aGlzLmNvbXBsZXRlVVJMKHVybCk7XG5cbiAgICByZXR1cm4gc2NyaXB0O1xuICB9XG5cbiAgcHJpdmF0ZSBwcm9taXNlU2NyaXB0KHNjcmlwdCwgdXJsKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoc2NyaXB0KTtcbiAgICAgIH07XG4gICAgICBzY3JpcHQub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICBwYXRoOiB1cmwsXG4gICAgICAgICAgbG9hZGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBwcm9taXNlLmNhdGNoKHJlc3BvbnNlID0+IHtcbiAgICAgIHRoaXMuaHR0cEVycm9yLmh0dHBFcnJvcih7IHN0YXR1czogNDAwIH0sIGBsb2FkaW5nIHNjcmlwdCBcIiR7dXJsfVwiYCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGluamVjdFNjcmlwdChzY3JpcHQpIHtcbiAgICBjb25zdCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJyk7XG4gICAgaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICB9XG5cbiAgc2NyaXB0SW5qZWN0b3IodXJsKSB7XG4gICAgY29uc3Qgc2NyaXB0ID0gdGhpcy5jcmVhdGVTY3JpcHQodXJsKTtcbiAgICB0aGlzLmluamVjdFNjcmlwdChzY3JpcHQpO1xuICAgIHJldHVybiB0aGlzLnByb21pc2VTY3JpcHQoc2NyaXB0LCB1cmwpO1xuICB9XG5cbn1cbiIsIlxuXG5leHBvcnQgY2xhc3MgREZQSW5jb21wbGV0ZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGRpcmVjdGl2ZU5hbWUsIG1pc3NpbmdOYW1lLCBpc0F0dHJpYnV0ZT8pIHtcbiAgICAgICAgc3VwZXIoYEluY29tcGxldGUgZGVmaW5pdGlvbiBvZiAnJHtkaXJlY3RpdmVOYW1lfSc6IGAgK1xuICAgICAgICAgICAgYE1pc3NpbmcgJHtpc0F0dHJpYnV0ZSA/ICdhdHRyaWJ1dGUnIDogJ2NoaWxkIGRpcmVjdGl2ZSd9IGAgK1xuICAgICAgICAgICAgYCcke21pc3NpbmdOYW1lfScuYCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgREZQVHlwZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGRpcmVjdGl2ZU5hbWUsIGF0dHJpYnV0ZU5hbWUsIHdyb25nVmFsdWUsIGV4cGVjdGVkVHlwZSkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIGBXcm9uZyB0eXBlIGZvciBhdHRyaWJ1dGUgJyR7YXR0cmlidXRlTmFtZX0nIG9uIGAgK1xuICAgICAgICAgICAgYGRpcmVjdGl2ZSAnJHtkaXJlY3RpdmVOYW1lfSc6IEV4cGVjdGVkICR7ZXhwZWN0ZWRUeXBlfWAgK1xuICAgICAgICAgICAgYCwgZ290ICR7dHlwZW9mIHdyb25nVmFsdWV9YFxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERGUE1pc3NpbmdQYXJlbnRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihkaXJlY3RpdmVOYW1lLCAuLi5wYXJlbnRzKSB7XG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KHBhcmVudHMgJiYgcGFyZW50cy5sZW5ndGggPiAwKTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyZW50c1swXSkpIHtcbiAgICAgICAgICAgIHBhcmVudHMgPSBwYXJlbnRzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhcmVudE1lc3NhZ2U7XG4gICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHBhcmVudHMgPSBwYXJlbnRzLm1hcChwID0+IGAnJHtwfSdgKTtcbiAgICAgICAgICAgIHBhcmVudE1lc3NhZ2UgPSAnLCB3aGljaCBtdXN0IGJlICc7XG4gICAgICAgICAgICBwYXJlbnRNZXNzYWdlICs9IHBhcmVudHMuc2xpY2UoMCwgLTEpLmpvaW4oJywgJyk7XG4gICAgICAgICAgICBwYXJlbnRNZXNzYWdlICs9IGAgb3IgJHtwYXJlbnRzW3BhcmVudHMubGVuZ3RoIC0gMV19YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudE1lc3NhZ2UgPSBgICcke3BhcmVudHNbMF19J2A7XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIGBJbnZhbGlkIHVzZSBvZiAnJHtkaXJlY3RpdmVOYW1lfScgZGlyZWN0aXZlLiBgICtcbiAgICAgICAgICAgIGBNaXNzaW5nIHBhcmVudCBkaXJlY3RpdmUke3BhcmVudE1lc3NhZ2V9LmBcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRGZwVGFyZ2V0aW5nIHtcbiAgW2tleTogc3RyaW5nXTogQXJyYXk8c3RyaW5nPjtcbn1cblxuZXhwb3J0IGNsYXNzIERmcENvbmZpZyB7XG4gIGlkbGVMb2FkPzogYm9vbGVhbjtcbiAgb25TYW1lTmF2aWdhdGlvbj86ICdyZWZyZXNoJyB8ICdpZ25vcmUnO1xuICBzaW5nbGVSZXF1ZXN0TW9kZT86IGJvb2xlYW47XG4gIGVuYWJsZVZpZGVvQWRzPzogYm9vbGVhbjtcbiAgcGVyc29uYWxpemVkQWRzPzogYm9vbGVhbjtcbiAgY29sbGFwc2VJZkVtcHR5PzogYm9vbGVhbjtcbiAgY2VudGVyaW5nPzogYm9vbGVhbjtcbiAgbG9jYXRpb24/OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+O1xuICBwcGlkPzogc3RyaW5nO1xuICBnbG9iYWxUYXJnZXRpbmc/OiBEZnBUYXJnZXRpbmc7XG4gIGZvcmNlU2FmZUZyYW1lPzogYm9vbGVhbjtcbiAgc2FmZUZyYW1lQ29uZmlnPzogb2JqZWN0O1xuICBsb2FkR1BUPzogYm9vbGVhbjtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsLCBQTEFURk9STV9JRCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IERGUF9DT05GSUcgfSBmcm9tICcuL2luamVjdGlvbl90b2tlbic7XG5pbXBvcnQgeyBEZnBDb25maWcgfSBmcm9tICcuLi9jbGFzcyc7XG5pbXBvcnQgeyBJZGxlU2VydmljZSB9IGZyb20gJy4vaWRsZS5zZXJ2aWNlJztcbmltcG9ydCB7IFNjcmlwdEluamVjdG9yU2VydmljZSB9IGZyb20gJy4vc2NyaXB0LWluamVjdG9yLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgR1BUX0xJQlJBUllfVVJMID0gJy8vd3d3Lmdvb2dsZXRhZ3NlcnZpY2VzLmNvbS90YWcvanMvZ3B0LmpzJztcblxuY2xhc3MgREZQQ29uZmlndXJhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3IgeyB9XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZnBTZXJ2aWNlIHtcblxuICBwcml2YXRlIGVuYWJsZVZpZGVvQWRzID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBwZXJzb25hbGl6ZWRBZHMgPSB0cnVlO1xuXG4gIHByaXZhdGUgY29sbGFwc2VJZkVtcHR5ID0gdHJ1ZTtcblxuICBwcml2YXRlIGNlbnRlcmluZyA9IGZhbHNlO1xuXG4gIHByaXZhdGUgbG9jYXRpb24gPSBudWxsO1xuXG4gIHByaXZhdGUgcHBpZCA9IG51bGw7XG5cbiAgcHJpdmF0ZSBnbG9iYWxUYXJnZXRpbmcgPSBudWxsO1xuXG4gIHByaXZhdGUgZm9yY2VTYWZlRnJhbWUgPSBmYWxzZTtcblxuICBwcml2YXRlIHNhZmVGcmFtZUNvbmZpZyA9IG51bGw7XG5cbiAgcHJpdmF0ZSBsb2FkR1BUID0gdHJ1ZTtcblxuICBwcml2YXRlIGxvYWRlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIEBPcHRpb25hbCgpIGlkbGVMb2FkOiBJZGxlU2VydmljZSxcbiAgICBASW5qZWN0KERGUF9DT05GSUcpIHByaXZhdGUgY29uZmlnOiBEZnBDb25maWcsXG4gICAgcHJpdmF0ZSBzY3JpcHRJbmplY3RvcjogU2NyaXB0SW5qZWN0b3JTZXJ2aWNlXG4gICkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICBjb25zdCB3aW46IGFueSA9IHdpbmRvdyxcbiAgICAgICAgZ29vZ2xldGFnID0gd2luLmdvb2dsZXRhZyB8fCB7fTtcblxuICAgICAgdGhpcy5kZnBDb25maWcoKTtcblxuICAgICAgZ29vZ2xldGFnLmNtZCA9IGdvb2dsZXRhZy5jbWQgfHwgW107XG4gICAgICBnb29nbGV0YWcuY21kLnB1c2goKCkgPT4ge1xuICAgICAgICB0aGlzLnNldHVwKCk7XG4gICAgICB9KTtcbiAgICAgIHdpbi5nb29nbGV0YWcgPSBnb29nbGV0YWc7XG5cbiAgICAgIGlmICh0aGlzLmxvYWRHUFQpIHtcbiAgICAgICAgY29uc3QgbG9hZFNjcmlwdCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnNjcmlwdEluamVjdG9yLnNjcmlwdEluamVjdG9yKEdQVF9MSUJSQVJZX1VSTCkudGhlbigoc2NyaXB0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChpZGxlTG9hZCkge1xuICAgICAgICAgIGlkbGVMb2FkLnJlcXVlc3QobG9hZFNjcmlwdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9hZFNjcmlwdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZnBDb25maWcoKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb25maWcpIHtcbiAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdGhpc1trZXldID0gdGhpcy5jb25maWdba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZFNhZmVGcmFtZUNvbmZpZyhwdWJhZHMpIHtcbiAgICBpZiAoIXRoaXMuc2FmZUZyYW1lQ29uZmlnKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5zYWZlRnJhbWVDb25maWcgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgREZQQ29uZmlndXJhdGlvbkVycm9yKCdGcmFtZUNvbmZpZyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cbiAgICBwdWJhZHMuc2V0U2FmZUZyYW1lQ29uZmlnKHRoaXMuc2FmZUZyYW1lQ29uZmlnKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkVGFyZ2V0aW5nKHB1YmFkcykge1xuICAgIGlmICghdGhpcy5nbG9iYWxUYXJnZXRpbmcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmdsb2JhbFRhcmdldGluZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ1RhcmdldGluZyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuZ2xvYmFsVGFyZ2V0aW5nKSB7XG4gICAgICBpZiAodGhpcy5nbG9iYWxUYXJnZXRpbmcuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBwdWJhZHMuc2V0VGFyZ2V0aW5nKGtleSwgdGhpcy5nbG9iYWxUYXJnZXRpbmdba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRMb2NhdGlvbihwdWJhZHMpIHtcbiAgICBpZiAoIXRoaXMubG9jYXRpb24pIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMubG9jYXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICBwdWJhZHMuc2V0TG9jYXRpb24odGhpcy5sb2NhdGlvbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMubG9jYXRpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgREZQQ29uZmlndXJhdGlvbkVycm9yKCdMb2NhdGlvbiBtdXN0IGJlIGFuICcgK1xuICAgICAgICAnYXJyYXkgb3Igc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgcHViYWRzLnNldExvY2F0aW9uLmFwcGx5KHB1YmFkcywgdGhpcy5sb2NhdGlvbik7XG4gIH1cblxuICBwcml2YXRlIGFkZFBQSUQocHViYWRzKSB7XG4gICAgaWYgKCF0aGlzLnBwaWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnBwaWQgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgREZQQ29uZmlndXJhdGlvbkVycm9yKCdQUElEIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICBwdWJhZHMuc2V0UHVibGlzaGVyUHJvdmlkZWRJZCh0aGlzLnBwaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cCgpIHtcbiAgICBjb25zdCB3aW46IGFueSA9IHdpbmRvdyxcbiAgICAgIGdvb2dsZXRhZyA9IHdpbi5nb29nbGV0YWcsXG4gICAgICBwdWJhZHMgPSBnb29nbGV0YWcucHViYWRzKCk7XG5cbiAgICBpZiAodGhpcy5lbmFibGVWaWRlb0Fkcykge1xuICAgICAgcHViYWRzLmVuYWJsZVZpZGVvQWRzKCk7XG4gICAgfVxuXG4gICAgLy8gcGVyc29uYWxpemVkQWRzIGlzIGRlZmF1bHRcbiAgICBpZiAodGhpcy5wZXJzb25hbGl6ZWRBZHMgPT09IGZhbHNlKSB7XG4gICAgICBwdWJhZHMuc2V0UmVxdWVzdE5vblBlcnNvbmFsaXplZEFkcygxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb2xsYXBzZUlmRW1wdHkpIHtcbiAgICAgIHB1YmFkcy5jb2xsYXBzZUVtcHR5RGl2cygpO1xuICAgIH1cblxuICAgIC8vIFdlIGFsd2F5cyByZWZyZXNoIG91cnNlbHZlc1xuICAgIHB1YmFkcy5kaXNhYmxlSW5pdGlhbExvYWQoKTtcblxuICAgIHB1YmFkcy5zZXRGb3JjZVNhZmVGcmFtZSh0aGlzLmZvcmNlU2FmZUZyYW1lKTtcbiAgICBwdWJhZHMuc2V0Q2VudGVyaW5nKHRoaXMuY2VudGVyaW5nKTtcblxuICAgIHRoaXMuYWRkTG9jYXRpb24ocHViYWRzKTtcbiAgICB0aGlzLmFkZFBQSUQocHViYWRzKTtcbiAgICB0aGlzLmFkZFRhcmdldGluZyhwdWJhZHMpO1xuICAgIHRoaXMuYWRkU2FmZUZyYW1lQ29uZmlnKHB1YmFkcyk7XG5cbiAgICAvLyBwdWJhZHMuZW5hYmxlU3luY1JlbmRlcmluZygpO1xuICAgIHB1YmFkcy5lbmFibGVBc3luY1JlbmRlcmluZygpO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLnNpbmdsZVJlcXVlc3RNb2RlICE9PSB0cnVlKSB7XG4gICAgICBpZiAodGhpcy5jb25maWcuZW5hYmxlVmlkZW9BZHMpIHtcbiAgICAgICAgcHViYWRzLmVuYWJsZVZpZGVvQWRzKCk7XG4gICAgICB9XG4gICAgICBnb29nbGV0YWcuZW5hYmxlU2VydmljZXMoKTtcbiAgICB9XG5cbiAgfVxuXG4gIGhhc0xvYWRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2FkZWQ7XG4gIH1cblxuICBkZWZpbmVUYXNrKHRhc2spIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgY29uc3Qgd2luOiBhbnkgPSB3aW5kb3csXG4gICAgICAgIGdvb2dsZXRhZyA9IHdpbi5nb29nbGV0YWc7XG4gICAgICBnb29nbGV0YWcuY21kLnB1c2godGFzayk7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERmcElER2VuZXJhdG9yU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZWRJRHMgPSB7fTtcblxuICBnZW5lcmF0ZUlEKHR5cGUgPSAnZGZwLWFkJykge1xuICAgIGxldCBpZCA9IG51bGw7XG5cbiAgICBkbyB7XG4gICAgICBjb25zdCBudW1iZXIgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc2xpY2UoMik7XG4gICAgICBpZCA9IHR5cGUgKyAnLScgKyBudW1iZXI7XG4gICAgfSB3aGlsZSAoaWQgaW4gdGhpcy5nZW5lcmF0ZWRJRHMpO1xuXG4gICAgdGhpcy5nZW5lcmF0ZWRJRHNbaWRdID0gdHJ1ZTtcblxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIGRmcElER2VuZXJhdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5pZCAmJiAhKGVsZW1lbnQuaWQgaW4gdGhpcy5nZW5lcmF0ZWRJRHMpKSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5pZDtcbiAgICB9XG5cbiAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVJRChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgaWYgKGVsZW1lbnQpIHsgZWxlbWVudC5pZCA9IGlkOyB9XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICBpc1Rha2VuKGlkKSB7XG4gICAgcmV0dXJuIGlkIGluIHRoaXMuZ2VuZXJhdGVkSURzO1xuICB9XG5cbiAgaXNVbmlxdWUoaWQpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNUYWtlbihpZCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyLCBPcHRpb25hbCwgSW5qZWN0b3IsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIHRpbWVyLCBmcm9tIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERmcENvbmZpZyB9IGZyb20gJy4uL2NsYXNzJztcbmltcG9ydCB7IERGUF9DT05GSUcgfSBmcm9tICcuL2luamVjdGlvbl90b2tlbic7XG5pbXBvcnQgeyBQYXJzZUR1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vcGFyc2UtZHVyYXRpb24uc2VydmljZSc7XG5cbmNsYXNzIERGUFJlZnJlc2hFcnJvciBleHRlbmRzIEVycm9yIHsgfVxuXG5kZWNsYXJlIHZhciBnb29nbGV0YWc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZnBSZWZyZXNoU2VydmljZSB7XG5cbiAgcmVmcmVzaEV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHJpdmF0ZSByZWZyZXNoU2xvdHMgPSBbXTtcbiAgcHJpdmF0ZSBzaW5nbGVSZXF1ZXN0OiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgaW50ZXJ2YWxzID0ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChERlBfQ09ORklHKVxuICAgIHByaXZhdGUgY29uZmlnOiBEZnBDb25maWcsXG4gICAgcHJpdmF0ZSBpbmplY3Q6IEluamVjdG9yLFxuICAgIHByaXZhdGUgcGFyc2VEdXJhdGlvbjogUGFyc2VEdXJhdGlvblNlcnZpY2VcbiAgKSB7IH1cblxuICBzbG90UmVmcmVzaChzbG90LCByZWZyZXNoSW50ZXJ2YWw/LCBpbml0UmVmcmVzaCA9IGZhbHNlKSB7XG4gICAgY29uc3QgZGVmZXJyZWQ6IFByb21pc2U8YW55PiA9IGZyb20oW3Nsb3RdKS50b1Byb21pc2UoKSxcbiAgICAgIHRhc2sgPSB7IHNsb3Q6IHNsb3QsIGRlZmVycmVkOiBkZWZlcnJlZCB9O1xuXG4gICAgZGVmZXJyZWQudGhlbigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5oYXNTbG90SW50ZXJ2YWwoc2xvdCkpIHtcbiAgICAgICAgdGhpcy5jYW5jZWxJbnRlcnZhbChzbG90KTtcbiAgICAgIH1cbiAgICAgIGlmIChyZWZyZXNoSW50ZXJ2YWwpIHtcbiAgICAgICAgdGhpcy5hZGRTbG90SW50ZXJ2YWwodGFzaywgcmVmcmVzaEludGVydmFsKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5zaW5nbGVSZXF1ZXN0TW9kZSA9PT0gdHJ1ZSAmJiBpbml0UmVmcmVzaCkge1xuICAgICAgLy8gVXNlIGEgdGltZXIgdG8gaGFuZGxlIHJlZnJlc2ggb2YgYSBzaW5nbGUgcmVxdWVzdCBtb2RlXG4gICAgICB0aGlzLnJlZnJlc2hTbG90cy5wdXNoKHNsb3QpO1xuICAgICAgaWYgKHRoaXMuc2luZ2xlUmVxdWVzdCAmJiAhdGhpcy5zaW5nbGVSZXF1ZXN0LmNsb3NlZCkge1xuICAgICAgICB0aGlzLnNpbmdsZVJlcXVlc3QudW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2luZ2xlUmVxdWVzdCA9IHRpbWVyKDEwMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgY29uc3QgcHViYWRzID0gZ29vZ2xldGFnLnB1YmFkcygpO1xuICAgICAgICBwdWJhZHMuZW5hYmxlU2luZ2xlUmVxdWVzdCgpO1xuICAgICAgICBnb29nbGV0YWcuZW5hYmxlU2VydmljZXMoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoU2xvdHMuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICBnb29nbGV0YWcuZGlzcGxheShzLmdldFNsb3RFbGVtZW50SWQoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBwdWJhZHMucmVmcmVzaCh0aGlzLnJlZnJlc2hTbG90cyk7XG4gICAgICAgIHRoaXMucmVmcmVzaFNsb3RzID0gW107XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ29vZ2xldGFnLmRpc3BsYXkoc2xvdC5nZXRTbG90RWxlbWVudElkKCkpO1xuICAgICAgdGhpcy5yZWZyZXNoKFt0YXNrXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmVycmVkO1xuICB9XG5cbiAgY2FuY2VsSW50ZXJ2YWwoc2xvdCkge1xuICAgIGlmICghdGhpcy5oYXNTbG90SW50ZXJ2YWwoc2xvdCkpIHtcbiAgICAgIHRocm93IG5ldyBERlBSZWZyZXNoRXJyb3IoJ05vIGludGVydmFsIGZvciBnaXZlbiBzbG90Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgaW50ZXJ2YWw6IFN1YnNjcmlwdGlvbiA9IHRoaXMuaW50ZXJ2YWxzW3RoaXMuc2xvdEludGVydmFsS2V5KHNsb3QpXTtcbiAgICBpbnRlcnZhbC51bnN1YnNjcmliZSgpO1xuICAgIGRlbGV0ZSB0aGlzLmludGVydmFsc1tzbG90XTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNTbG90SW50ZXJ2YWwoc2xvdCkge1xuICAgIHJldHVybiB0aGlzLnNsb3RJbnRlcnZhbEtleShzbG90KSBpbiB0aGlzLmludGVydmFscztcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaCh0YXNrcz8pIHtcbiAgICBpZiAodGFza3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZ29vZ2xldGFnLmNtZC5wdXNoKCgpID0+IHtcbiAgICAgICAgZ29vZ2xldGFnLnB1YmFkcygpLnJlZnJlc2goKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0YXNrcy5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICBnb29nbGV0YWcuY21kLnB1c2goKCkgPT4ge1xuICAgICAgZ29vZ2xldGFnLnB1YmFkcygpLnJlZnJlc2godGFza3MubWFwKHRhc2sgPT4gdGFzay5zbG90KSk7XG4gICAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUodGFzay5zbG90KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRTbG90SW50ZXJ2YWwodGFzaywgaW50ZXJ2YWwpIHtcbiAgICBjb25zdCBwYXJzZWRJbnRlcnZhbCA9IHRoaXMucGFyc2VEdXJhdGlvbi5wYXJzZUR1cmF0aW9uKGludGVydmFsKTtcbiAgICB0aGlzLnZhbGlkYXRlSW50ZXJ2YWwocGFyc2VkSW50ZXJ2YWwsIGludGVydmFsKTtcblxuICAgIGNvbnN0IHJlZnJlc2ggPSB0aW1lcihwYXJzZWRJbnRlcnZhbCwgcGFyc2VkSW50ZXJ2YWwpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBkb2MgPSB0aGlzLmluamVjdC5nZXQoRE9DVU1FTlQpO1xuICAgICAgaWYgKCF0aGlzLmhpZGRlbkNoZWNrKGRvYy5nZXRFbGVtZW50QnlJZCh0YXNrLnNsb3QuZ2V0U2xvdEVsZW1lbnRJZCgpKSkpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoKFt0YXNrXSk7XG4gICAgICAgIHRoaXMucmVmcmVzaEV2ZW50LmVtaXQodGFzay5zbG90KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuaW50ZXJ2YWxzW3RoaXMuc2xvdEludGVydmFsS2V5KHRhc2suc2xvdCldID0gcmVmcmVzaDtcblxuICAgIHJldHVybiByZWZyZXNoO1xuICB9XG5cbiAgcHJpdmF0ZSBzbG90SW50ZXJ2YWxLZXkoc2xvdCkge1xuICAgIHJldHVybiBzbG90LmdldFNsb3RJZCgpLmdldERvbUlkKCk7XG4gIH1cblxuICBwcml2YXRlIHZhbGlkYXRlSW50ZXJ2YWwobWlsbGlzZWNvbmRzLCBiZWZvcmVQYXJzaW5nKSB7XG4gICAgaWYgKG1pbGxpc2Vjb25kcyA8IDEwMDApIHtcbiAgICAgIGNvbnNvbGUud2FybignQ2FyZWZ1bDogJHtiZWZvcmVQYXJzaW5nfSBpcyBxdWl0ZSBhIGxvdyBpbnRlcnZhbCEnKTtcbiAgICB9XG4gIH1cblxuICBoaWRkZW5DaGVjayhlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgaWYgKHR5cGVvZiAod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcgJiYgZWxlbWVudCAhPSBudWxsKSB7XG4gICAgICBjb25zdCBjc3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgICAgIGlmIChjc3MuZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChlbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlkZGVuQ2hlY2soZWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXG4gIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcixcbiAgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIEluamVjdCwgUExBVEZPUk1fSUQsIE9wdGlvbmFsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IERmcFNlcnZpY2UsIH0gZnJvbSAnLi4vc2VydmljZS9kZnAuc2VydmljZSc7XG5pbXBvcnQgeyBEZnBJREdlbmVyYXRvclNlcnZpY2UsIH0gZnJvbSAnLi4vc2VydmljZS9kZnAtaWQtZ2VuZXJhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGZwUmVmcmVzaFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBERlBJbmNvbXBsZXRlRXJyb3IsIEdvb2dsZVNsb3QsIERmcENvbmZpZyB9IGZyb20gJy4uL2NsYXNzJztcbmltcG9ydCB7IERGUF9DT05GSUcgfSBmcm9tICcuLi9zZXJ2aWNlL2luamVjdGlvbl90b2tlbic7XG5cbmRlY2xhcmUgdmFyIGdvb2dsZXRhZztcblxuZXhwb3J0IGNsYXNzIERmcFJlZnJlc2hFdmVudCB7XG4gIHR5cGU6IHN0cmluZztcbiAgc2xvdDogYW55O1xuICBkYXRhPzogYW55O1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkZnAtYWQnXG59KVxuZXhwb3J0IGNsYXNzIERmcEFkRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGFkVW5pdDogc3RyaW5nO1xuICBASW5wdXQoKSBjbGlja1VybDogc3RyaW5nO1xuICBASW5wdXQoKSBmb3JjZVNhZmVGcmFtZTogYm9vbGVhbjtcbiAgQElucHV0KCkgc2FmZUZyYW1lQ29uZmlnOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHJlZnJlc2g6IHN0cmluZztcbiAgQElucHV0KCkgcGVyc29uYWxpemVkQWRzOiBib29sZWFuID0gdGhpcy5jb25maWcucGVyc29uYWxpemVkQWRzO1xuICBASW5wdXQoKSBjb2xsYXBzZUlmRW1wdHk6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGFmdGVyUmVmcmVzaDogRXZlbnRFbWl0dGVyPERmcFJlZnJlc2hFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBzaXplcyA9IFtdO1xuXG4gIHByaXZhdGUgcmVzcG9uc2l2ZU1hcHBpbmcgPSBbXTtcblxuICBwcml2YXRlIHRhcmdldGluZ3MgPSBbXTtcblxuICBwcml2YXRlIGV4Y2x1c2lvbnMgPSBbXTtcblxuICBwcml2YXRlIHNjcmlwdHMgPSBbXTtcblxuICBwcml2YXRlIHNsb3Q6IEdvb2dsZVNsb3Q7XG5cbiAgcHJpdmF0ZSBvblNhbWVOYXZpZ2F0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgZGZwOiBEZnBTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGZwSURHZW5lcmF0b3I6IERmcElER2VuZXJhdG9yU2VydmljZSxcbiAgICBwcml2YXRlIGRmcFJlZnJlc2g6IERmcFJlZnJlc2hTZXJ2aWNlLFxuICAgIEBJbmplY3QoREZQX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcbiAgICBAT3B0aW9uYWwoKSByb3V0ZXI6IFJvdXRlclxuICApIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5kZnBSZWZyZXNoLnJlZnJlc2hFdmVudC5zdWJzY3JpYmUoc2xvdCA9PiB7XG4gICAgICAgIGlmIChzbG90ID09PSB0aGlzLnNsb3QpIHtcbiAgICAgICAgICB0aGlzLmFmdGVyUmVmcmVzaC5lbWl0KHsgdHlwZTogJ3JlZnJlc2gnLCBzbG90OiBzbG90IH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChyb3V0ZXIpIHtcbiAgICAgICAgdGhpcy5vblNhbWVOYXZpZ2F0aW9uID0gcm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBOYXZpZ2F0aW9uRW5kKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zbG90ICYmICF0aGlzLnJlZnJlc2ggJiYgdGhpcy5jb25maWcub25TYW1lTmF2aWdhdGlvbiA9PT0gJ3JlZnJlc2gnKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5kZnBJREdlbmVyYXRvci5kZnBJREdlbmVyYXRvcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmRmcC5kZWZpbmVUYXNrKCgpID0+IHtcbiAgICAgICAgdGhpcy5kZWZpbmVTbG90KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zbG90KSB7XG4gICAgICBnb29nbGV0YWcuZGVzdHJveVNsb3RzKFt0aGlzLnNsb3RdKTtcbiAgICB9XG4gICAgaWYgKHRoaXMub25TYW1lTmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5vblNhbWVOYXZpZ2F0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRSZXNwb25zaXZlTWFwcGluZyhzbG90KSB7XG4gICAgY29uc3QgYWQgPSB0aGlzLmdldFN0YXRlKCk7XG5cbiAgICBpZiAoYWQucmVzcG9uc2l2ZU1hcHBpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2l6ZU1hcHBpbmcgPSBnb29nbGV0YWcuc2l6ZU1hcHBpbmcoKTtcblxuICAgIGFkLnJlc3BvbnNpdmVNYXBwaW5nLmZvckVhY2gobWFwcGluZyA9PiB7XG4gICAgICBzaXplTWFwcGluZy5hZGRTaXplKG1hcHBpbmcudmlld3BvcnRTaXplLCBtYXBwaW5nLmFkU2l6ZXMpO1xuICAgIH0pO1xuXG4gICAgc2xvdC5kZWZpbmVTaXplTWFwcGluZyhzaXplTWFwcGluZy5idWlsZCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVmaW5lU2xvdCgpIHtcbiAgICBjb25zdCBhZCA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMuc2xvdCA9IGdvb2dsZXRhZy5kZWZpbmVTbG90KGFkLmFkVW5pdCwgYWQuc2l6ZXMsIGVsZW1lbnQuaWQpO1xuXG4gICAgaWYgKHRoaXMuZm9yY2VTYWZlRnJhbWUgIT09IHVuZGVmaW5lZCAmJiBhZC5mb3JjZVNhZmVGcmFtZSA9PT0gIXRoaXMuY29uZmlnLmZvcmNlU2FmZUZyYW1lKSB7XG4gICAgICB0aGlzLnNsb3Quc2V0Rm9yY2VTYWZlRnJhbWUoYWQuZm9yY2VTYWZlRnJhbWUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBlcnNvbmFsaXplZEFkcyA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuc2xvdC5zZXQoJ3JlcXVlc3ROb25QZXJzb25hbGl6ZWRBZHMnLCAxKTtcbiAgICAgIGdvb2dsZXRhZy5wdWJhZHMoKS5zZXRSZXF1ZXN0Tm9uUGVyc29uYWxpemVkQWRzKDEpO1xuICAgIH1cblxuICAgIGlmIChhZC5jbGlja1VybCkge1xuICAgICAgdGhpcy5zbG90LnNldENsaWNrVXJsKGFkLmNsaWNrVXJsKTtcbiAgICB9XG5cbiAgICBpZiAoYWQuY29sbGFwc2VJZkVtcHR5KSB7XG4gICAgICB0aGlzLnNsb3Quc2V0Q29sbGFwc2VFbXB0eURpdih0cnVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoYWQuc2FmZUZyYW1lQ29uZmlnKSB7XG4gICAgICB0aGlzLnNsb3Quc2V0U2FmZUZyYW1lQ29uZmlnKFxuICAgICAgICAoSlNPTi5wYXJzZShhZC5zYWZlRnJhbWVDb25maWcpKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLnNsb3QucmVuZGVyRW5kZWQgPSAoZ29vZ2xlU2xvdEV2ZW50OiBJQXJndW1lbnRzKSA9PiB7XG4gICAgICB0aGlzLmFmdGVyUmVmcmVzaC5lbWl0KHsgdHlwZTogJ3JlbmRlckVuZGVkJywgc2xvdDogdGhpcy5zbG90LCBkYXRhOiBnb29nbGVTbG90RXZlbnQgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuc2V0UmVzcG9uc2l2ZU1hcHBpbmcodGhpcy5zbG90KTtcblxuICAgIGFkLnRhcmdldGluZ3MuZm9yRWFjaCh0YXJnZXRpbmcgPT4ge1xuICAgICAgdGhpcy5zbG90LnNldFRhcmdldGluZyh0YXJnZXRpbmcua2V5LCB0YXJnZXRpbmcudmFsdWVzKTtcbiAgICB9KTtcblxuICAgIGFkLmV4Y2x1c2lvbnMuZm9yRWFjaChleGNsdXNpb24gPT4ge1xuICAgICAgdGhpcy5zbG90LnNldENhdGVnb3J5RXhjbHVzaW9uKGV4Y2x1c2lvbik7XG4gICAgfSk7XG5cbiAgICBhZC5zY3JpcHRzLmZvckVhY2goc2NyaXB0ID0+IHsgc2NyaXB0KHRoaXMuc2xvdCk7IH0pO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLmVuYWJsZVZpZGVvQWRzKSB7XG4gICAgICB0aGlzLnNsb3QuYWRkU2VydmljZShnb29nbGV0YWcuY29tcGFuaW9uQWRzKCkpO1xuICAgIH1cblxuICAgIHRoaXMuc2xvdC5hZGRTZXJ2aWNlKGdvb2dsZXRhZy5wdWJhZHMoKSk7XG5cbiAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hDb250ZW50KCkge1xuICAgIHRoaXMuZGZwUmVmcmVzaC5zbG90UmVmcmVzaCh0aGlzLnNsb3QsIHRoaXMucmVmcmVzaCwgdHJ1ZSkudGhlbihzbG90ID0+IHtcbiAgICAgIHRoaXMuYWZ0ZXJSZWZyZXNoLmVtaXQoeyB0eXBlOiAnaW5pdCcsIHNsb3Q6IHNsb3QgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1ZhbGlkKCkge1xuICAgIGlmICh0aGlzLnNpemVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLWFkJywgJ2RmcC1zaXplJyk7XG4gICAgfVxuICAgIGlmICghdGhpcy5hZFVuaXQpIHtcbiAgICAgIHRocm93IG5ldyBERlBJbmNvbXBsZXRlRXJyb3IoJ2RmcC1hZCcsICdhZC11bml0JywgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLmRmcFJlZnJlc2guaGlkZGVuQ2hlY2sodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgZ2V0U3RhdGUoKSB7XG4gICAgdGhpcy5jaGVja1ZhbGlkKCk7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgICAgc2l6ZXM6IHRoaXMuc2l6ZXMsXG4gICAgICByZXNwb25zaXZlTWFwcGluZzogdGhpcy5yZXNwb25zaXZlTWFwcGluZyxcbiAgICAgIHRhcmdldGluZ3M6IHRoaXMudGFyZ2V0aW5ncyxcbiAgICAgIGV4Y2x1c2lvbnM6IHRoaXMuZXhjbHVzaW9ucyxcbiAgICAgIGFkVW5pdDogdGhpcy5hZFVuaXQsXG4gICAgICBmb3JjZVNhZmVGcmFtZTogdGhpcy5mb3JjZVNhZmVGcmFtZSA9PT0gdHJ1ZSxcbiAgICAgIHNhZmVGcmFtZUNvbmZpZzogdGhpcy5zYWZlRnJhbWVDb25maWcsXG4gICAgICBjbGlja1VybDogdGhpcy5jbGlja1VybCxcbiAgICAgIHJlZnJlc2g6IHRoaXMucmVmcmVzaCxcbiAgICAgIHBlcnNvbmFsaXplZEFkczogdGhpcy5wZXJzb25hbGl6ZWRBZHMgPT09IHRoaXMuY29uZmlnLnBlcnNvbmFsaXplZEFkcyxcbiAgICAgIHNjcmlwdHM6IHRoaXMuc2NyaXB0cyxcbiAgICAgIGNvbGxhcHNlSWZFbXB0eTogdGhpcy5jb2xsYXBzZUlmRW1wdHkgPT09IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFNpemUoc2l6ZSkge1xuICAgIHRoaXMuc2l6ZXMucHVzaChzaXplKTtcbiAgfVxuXG4gIGFkZFJlc3BvbnNpdmVNYXBwaW5nKG1hcHBpbmcpIHtcbiAgICB0aGlzLnJlc3BvbnNpdmVNYXBwaW5nLnB1c2gobWFwcGluZyk7XG4gIH1cblxuICBhZGRUYXJnZXRpbmcodGFyZ2V0aW5nKSB7XG4gICAgdGhpcy50YXJnZXRpbmdzLnB1c2godGFyZ2V0aW5nKTtcbiAgfVxuXG4gIGFkZEV4Y2x1c2lvbihleGNsdXNpb24pIHtcbiAgICB0aGlzLmV4Y2x1c2lvbnMucHVzaChleGNsdXNpb24pO1xuICB9XG5cbiAgYWRkU2NyaXB0KHNjcmlwdCkge1xuICAgIHRoaXMuc2NyaXB0cy5wdXNoKHNjcmlwdCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXG4gICAgSW5qZWN0LCBmb3J3YXJkUmVmLFxuICAgIEhvc3RMaXN0ZW5lclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1hZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwUmVmcmVzaFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2RmcC1hZFtyZXNwb25zaXZlXSdcbn0pXG5leHBvcnQgY2xhc3MgRGZwQWRSZXNwb25zaXZlRGlyZWN0aXZlIHtcblxuICAgIHByaXZhdGUgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudDtcbiAgICBwcml2YXRlIGlmcmFtZVdpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzbG90OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwQWREaXJlY3RpdmUpKVxuICAgICAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZSxcbiAgICAgICAgcHJpdmF0ZSBkZnBSZWZyZXNoOiBEZnBSZWZyZXNoU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLmFkLmFmdGVyUmVmcmVzaC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5zbG90ID0gZXZlbnQuc2xvdDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gICAgbm9ybWFsaXplSWZyYW1lKCkge1xuICAgICAgICBpZiAodGhpcy5hZC5pc0hpZGRlbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaWZyYW1lID0gdGhpcy5pZnJhbWUgfHwgdGhpcy5nZXRJZnJhbWUoKTtcbiAgICAgICAgaWYgKCF0aGlzLmlmcmFtZSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICB0aGlzLmlmcmFtZVdpZHRoID0gdGhpcy5pZnJhbWVXaWR0aCB8fCArdGhpcy5pZnJhbWUud2lkdGg7XG5cbiAgICAgICAgY29uc3Qgd2luV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLmFkLmdldFN0YXRlKCksXG4gICAgICAgICAgICB3aWR0aCA9IDA7XG5cbiAgICAgICAgc3RhdGUuc2l6ZXMuZm9yRWFjaChzaXplID0+IHtcbiAgICAgICAgICAgIGlmIChzaXplWzBdIDwgd2luV2lkdGgpIHtcbiAgICAgICAgICAgICAgICB3aWR0aCA9IE1hdGgubWF4KHdpZHRoLCBzaXplWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHN0YXRlLnNpemVzLmxlbmd0aCA+IDEgJiYgd2lkdGggIT09IHRoaXMuaWZyYW1lV2lkdGgpIHtcbiAgICAgICAgICAgIHN0YXRlID0gdGhpcy5hZC5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5pZnJhbWVXaWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5pZnJhbWUuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHdpZHRoICsgJycpO1xuICAgICAgICAgICAgdGhpcy5kZnBSZWZyZXNoLnNsb3RSZWZyZXNoKHRoaXMuc2xvdCwgc3RhdGUucmVmcmVzaCkudGhlbihzbG90ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkLmFmdGVyUmVmcmVzaC5lbWl0KHsgdHlwZTogJ3Jlc2l6ZScsIHNsb3Q6IHNsb3QgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pZnJhbWUgPSB0aGlzLmdldElmcmFtZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRJZnJhbWUoKSB7XG4gICAgICAgIGNvbnN0IGFkOiBFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICBpZnJhbWUgPSBhZC5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKTtcbiAgICAgICAgaWYgKGlmcmFtZSAmJiAraWZyYW1lLndpZHRoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGlmcmFtZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5qZWN0LCBmb3J3YXJkUmVmLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGZwLXJlc3BvbnNpdmUnXG59KVxuZXhwb3J0IGNsYXNzIERmcFJlc3BvbnNpdmVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHZpZXdwb3J0ID0gWzAsIDBdO1xuICBASW5wdXQoKSBhZFNpemVzID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcEFkRGlyZWN0aXZlKSlcbiAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWQuYWRkUmVzcG9uc2l2ZU1hcHBpbmcodGhpcy5nZXRTdGF0ZSgpKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB2aWV3V2lkdGgodmFsOiBudW1iZXIpIHtcbiAgICBpZiAodmFsID4gMCkge1xuICAgICAgdGhpcy52aWV3cG9ydFswXSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgdmlld0hlaWdodCh2YWw6IG51bWJlcikge1xuICAgIGlmICh2YWwgPiAwKSB7XG4gICAgICB0aGlzLnZpZXdwb3J0WzFdID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGFkZFNpemUoc2l6ZSkge1xuICAgIHRoaXMuYWRTaXplcy5wdXNoKHNpemUpO1xuICB9XG5cbiAgZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgICAgdmlld3BvcnRTaXplOiB0aGlzLnZpZXdwb3J0LFxuICAgICAgYWRTaXplczogdGhpcy5hZFNpemVzXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiwgT25Jbml0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEZnBBZERpcmVjdGl2ZSB9IGZyb20gJy4vZGZwLWFkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZnBSZXNwb25zaXZlRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtcmVzcG9uc2l2ZS5kaXJlY3RpdmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkZnAtc2l6ZSdcbn0pXG5leHBvcnQgY2xhc3MgRGZwU2l6ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgaGVpZ2h0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXG4gICAgcHJpdmF0ZSBhZDogRGZwQWREaXJlY3RpdmUsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcFJlc3BvbnNpdmVEaXJlY3RpdmUpKVxuICAgIHByaXZhdGUgcmVzcDogRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMucmVzcCB8fCB0aGlzLmFkLFxuICAgICAgaW5uZXJUZXh0OiBzdHJpbmcgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbm5lclRleHQ7XG5cbiAgICBpZiAodGhpcy53aWR0aCAmJiB0aGlzLmhlaWdodCkge1xuICAgICAgdGFyZ2V0LmFkZFNpemUoW3RoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XSk7XG4gICAgfSBlbHNlIGlmIChpbm5lclRleHQudHJpbSgpICE9PSAnJykge1xuICAgICAgdGFyZ2V0LmFkZFNpemUoaW5uZXJUZXh0KTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlckNvbnRlbnRJbml0LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERGUEluY29tcGxldGVFcnJvciB9IGZyb20gJy4uL2NsYXNzJztcbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGZwLXRhcmdldGluZydcbn0pXG5leHBvcnQgY2xhc3MgRGZwVGFyZ2V0aW5nRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgQElucHV0KCkga2V5OiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlKHZhbDogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPikge1xuICAgIGlmICh2YWwgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdmFsLmZvckVhY2godiA9PiB0aGlzLmFkZFZhbHVlKHYpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRWYWx1ZSh2YWwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdmFsdWVzID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcEFkRGlyZWN0aXZlKSlcbiAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZVxuICApIHsgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBjb25zdCB0YXJnZXRpbmcgPSB0aGlzLmdldFN0YXRlKCk7XG4gICAgdGhpcy5hZC5hZGRUYXJnZXRpbmcodGFyZ2V0aW5nKTtcbiAgfVxuXG4gIGNoZWNrVmFsaWQoKSB7XG4gICAgaWYgKHRoaXMua2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBERlBJbmNvbXBsZXRlRXJyb3IoJ2RmcC10YXJnZXRpbmcnLCAna2V5JywgdHJ1ZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnZhbHVlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBERlBJbmNvbXBsZXRlRXJyb3IoJ2RmcC10YXJnZXRpbmcnLCAndmFsdWUnLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBnZXRTdGF0ZSgpIHtcbiAgICB0aGlzLmNoZWNrVmFsaWQoKTtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICBrZXk6IHRoaXMua2V5LFxuICAgICAgdmFsdWVzOiB0aGlzLnZhbHVlc1xuICAgIH0pO1xuICB9XG5cbiAgYWRkVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgJiYgIXRoaXMudmFsdWVzLmZpbmQoaXRlbSA9PiBpdGVtID09PSB2YWx1ZSkpIHtcbiAgICAgIHRoaXMudmFsdWVzLnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXG4gIEluamVjdCwgZm9yd2FyZFJlZixcbiAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEZnBBZERpcmVjdGl2ZSB9IGZyb20gJy4vZGZwLWFkLmRpcmVjdGl2ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2RmcC1leGNsdXNpb24nXG59KVxuZXhwb3J0IGNsYXNzIERmcEV4Y2x1c2lvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXG4gICAgcHJpdmF0ZSBhZDogRGZwQWREaXJlY3RpdmVcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWQuYWRkRXhjbHVzaW9uKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmlubmVyVGV4dCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLFxuICBJbmplY3QsIGZvcndhcmRSZWYsXG4gIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGZwVGFyZ2V0aW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtdGFyZ2V0aW5nLmRpcmVjdGl2ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2RmcC12YWx1ZSdcbn0pXG5leHBvcnQgY2xhc3MgRGZwVmFsdWVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwVGFyZ2V0aW5nRGlyZWN0aXZlKSlcbiAgICBwcml2YXRlIHRhcmdldGluZzogRGZwVGFyZ2V0aW5nRGlyZWN0aXZlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy50YXJnZXRpbmcuYWRkVmFsdWUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIEluamVjdCxcbiAgUExBVEZPUk1fSURcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2RmcC1hdWRpZW5jZS1waXhlbCdcbn0pXG5leHBvcnQgY2xhc3MgRGZwQXVkaWVuY2VQaXhlbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgYWRVbml0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNlZ21lbnRJZDogbnVtYmVyO1xuICBASW5wdXQoKSBwcGlkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNvbnN0IGF4ZWwgPSBNYXRoLnJhbmRvbSgpLFxuICAgICAgICByYW5kb20gPSBheGVsICogMTAwMDAwMDAwMDAwMDA7XG5cbiAgICAgIGxldCBhZFVuaXQgPSAnJztcbiAgICAgIGlmICh0aGlzLmFkVW5pdCkge1xuICAgICAgICBhZFVuaXQgPSBgZGNfaXU9JHt0aGlzLmFkVW5pdH1gO1xuICAgICAgfVxuXG4gICAgICBsZXQgcHBpZCA9ICcnO1xuICAgICAgaWYgKHRoaXMucHBpZCkge1xuICAgICAgICBwcGlkID0gYHBwaWQ9JHt0aGlzLnBwaWR9YDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGl4ZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgcGl4ZWwuc3JjID0gJ2h0dHBzOi8vcHViYWRzLmcuZG91YmxlY2xpY2submV0L2FjdGl2aXR5O29yZD0nO1xuICAgICAgcGl4ZWwuc3JjICs9IGAke3JhbmRvbX07ZGNfc2VnPSR7dGhpcy5zZWdtZW50SWR9OyR7YWRVbml0fSR7cHBpZH1gO1xuXG4gICAgICBwaXhlbC53aWR0aCA9IDE7XG4gICAgICBwaXhlbC5oZWlnaHQgPSAxO1xuICAgICAgcGl4ZWwuYm9yZGVyID0gJzAnO1xuXG4gICAgICBwaXhlbC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG5cbiAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFwcGVuZChwaXhlbCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEZnBDb25maWcsIH0gZnJvbSAnLi9jbGFzcyc7XG5pbXBvcnQgeyBERlBfQ09ORklHIH0gZnJvbSAnLi9zZXJ2aWNlL2luamVjdGlvbl90b2tlbic7XG5cbmltcG9ydCB7IElkbGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2lkbGUuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2h0dHAtZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBQYXJzZUR1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9wYXJzZS1kdXJhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFNjcmlwdEluamVjdG9yU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBEZnBTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2RmcC5zZXJ2aWNlJztcbmltcG9ydCB7IERmcElER2VuZXJhdG9yU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9kZnAtaWQtZ2VuZXJhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGZwUmVmcmVzaFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvZGZwLXJlZnJlc2guc2VydmljZSc7XG5cbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLWFkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZnBTaXplRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLXNpemUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcFJlc3BvbnNpdmVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtcmVzcG9uc2l2ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwQWRSZXNwb25zaXZlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLWFkLXJlc3BvbnNpdmUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcFRhcmdldGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC10YXJnZXRpbmcuZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcEV4Y2x1c2lvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1leGNsdXNpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcFZhbHVlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLXZhbHVlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZnBBdWRpZW5jZVBpeGVsRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZSc7XG5cbmNvbnN0IERJUkVDVElWRVMgPSBbXG4gIERmcEFkRGlyZWN0aXZlLFxuICBEZnBTaXplRGlyZWN0aXZlLFxuICBEZnBSZXNwb25zaXZlRGlyZWN0aXZlLFxuICBEZnBBZFJlc3BvbnNpdmVEaXJlY3RpdmUsXG4gIERmcFRhcmdldGluZ0RpcmVjdGl2ZSwgRGZwRXhjbHVzaW9uRGlyZWN0aXZlLCBEZnBWYWx1ZURpcmVjdGl2ZSxcbiAgRGZwQXVkaWVuY2VQaXhlbERpcmVjdGl2ZVxuXTtcblxuY29uc3QgU0VSVklDRVMgPSBbXG4gIEh0dHBFcnJvclNlcnZpY2UsXG4gIFBhcnNlRHVyYXRpb25TZXJ2aWNlLFxuICBTY3JpcHRJbmplY3RvclNlcnZpY2UsXG4gIERmcFNlcnZpY2UsIERmcElER2VuZXJhdG9yU2VydmljZSwgRGZwUmVmcmVzaFNlcnZpY2Vcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcblxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICAuLi5ESVJFQ1RJVkVTXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIC4uLlNFUlZJQ0VTXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICAuLi5ESVJFQ1RJVkVTXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGZwTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogRGZwQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBEZnBNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgLi4uKGNvbmZpZyAmJiBjb25maWcuaWRsZUxvYWQgPT09IHRydWUgPyBbSWRsZVNlcnZpY2VdIDogW10pLFxuICAgICAgICB7IHByb3ZpZGU6IERGUF9DT05GSUcsIHVzZVZhbHVlOiBjb25maWcgfHwge30gfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJJbmplY3Rpb25Ub2tlbiIsImlzUGxhdGZvcm1Ccm93c2VyIiwiSW5qZWN0YWJsZSIsIkluamVjdCIsIlBMQVRGT1JNX0lEIiwiTmdab25lIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJPcHRpb25hbCIsIkV2ZW50RW1pdHRlciIsImZyb20iLCJ0aW1lciIsIkRPQ1VNRU5UIiwiSW5qZWN0b3IiLCJyb3V0ZXIiLCJmaWx0ZXIiLCJOYXZpZ2F0aW9uRW5kIiwiRGlyZWN0aXZlIiwiRWxlbWVudFJlZiIsIlJvdXRlciIsIklucHV0IiwiT3V0cHV0IiwiZm9yd2FyZFJlZiIsIkhvc3RMaXN0ZW5lciIsIk5nTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFJQSxRQUFhLFVBQVUsR0FBRyxJQUFJQSxtQkFBYyxDQUFZLFdBQVcsQ0FBQzs7Ozs7O0FDSnBFO1FBUUUscUJBQ3VCLFVBQWtCLEVBQ3ZDLElBQVk7O1lBRVosSUFBTSxHQUFHLEdBQVFDLHdCQUFpQixDQUFDLFVBQVUsQ0FBQyxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDN0QsSUFBSSxHQUFHLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxVQUFDLEdBQUc7b0JBQzdCLE9BQU8sR0FBRyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNyQyxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFVBQUMsR0FBRztvQkFDN0IsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBTSxPQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFBLENBQUMsQ0FBQztpQkFDOUQsQ0FBQzthQUNIO1NBQ0Y7Ozs7O1FBRUQsNkJBQU87Ozs7WUFBUCxVQUFRLEdBQUc7Z0JBQ1QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQy9COztvQkF2QkZDLGVBQVU7Ozs7O3dCQU0wQixNQUFNLHVCQUF0Q0MsV0FBTSxTQUFDQyxnQkFBVzt3QkFURkMsV0FBTTs7OzBCQUEzQjs7Ozs7OztBQ0FBOzsrQkFTZ0IsVUFBVSxJQUFJO2dCQUMxQixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDNUIsT0FBTyxFQUFFLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2lCQUNyQztnQkFDRCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7YUFDeEI7Ozs7Ozs7UUFURCxvQ0FBUzs7Ozs7WUFBVCxVQUFVLFFBQVEsRUFBRSxPQUFPO2dCQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVUsUUFBUSxDQUFDLE1BQU0sV0FBSyxPQUFPLEdBQUcsT0FBTyxHQUFHLEVBQUUsQ0FBRSxDQUFDLENBQUM7YUFDckU7O29CQUxGSCxlQUFVOzsrQkFGWDs7O0lDQUE7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDO1FBQzdCLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYzthQUNoQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDL0UsT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztBQUVGLHVCQUEwQixDQUFDLEVBQUUsQ0FBQztRQUMxQixhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLGdCQUFnQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ3ZDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekYsQ0FBQztBQUVELG9CQXdGdUIsQ0FBQyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJO1lBQ0EsT0FBTyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSTtnQkFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5RTtRQUNELE9BQU8sS0FBSyxFQUFFO1lBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQUU7Z0JBQy9CO1lBQ0osSUFBSTtnQkFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BEO29CQUNPO2dCQUFFLElBQUksQ0FBQztvQkFBRSxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUM7YUFBRTtTQUNwQztRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztBQUVEO1FBQ0ksS0FBSyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7WUFDOUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDOzs7Ozs7SUN4SUQsSUFBQTtRQUErQkksb0NBQUs7UUFDbEMsMEJBQVksUUFBUTttQkFDbEIsa0JBQU0sd0JBQXNCLFFBQVEsUUFBSyxDQUFDO1NBQzNDOytCQUxIO01BRStCLEtBQUssRUFJbkMsQ0FBQTs7Ozs7Ozs7O1FBS0Msb0RBQXFCOzs7OztZQUFyQixVQUFzQixJQUFJLEVBQUUsSUFBSTtnQkFDOUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFNUMsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO29CQUFFLE9BQU8sSUFBSSxDQUFDO2lCQUFFO2dCQUNuQyxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7b0JBQUUsT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDO2lCQUFFO2dCQUN6QyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7b0JBQUUsT0FBTyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztpQkFBRTtnQkFFaEQsT0FBTyxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7YUFDOUI7Ozs7O1FBRUQsc0NBQU87Ozs7WUFBUCxVQUFRLEtBQUs7O2dCQUNYLElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFbEMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFBRSxPQUFPLElBQUksQ0FBQztpQkFBRTtnQkFFeEMsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25EOzs7OztRQUVELDRDQUFhOzs7O1lBQWIsVUFBYyxRQUFRO2dCQUVwQixJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtvQkFDL0MsTUFBTSxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN0QztnQkFFRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtvQkFDaEMsT0FBTyxRQUFRLENBQUM7aUJBQ2pCO2dCQUVELElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO29CQUNoQyxNQUFNLElBQUksU0FBUyxDQUFDLE1BQUksUUFBUSx1Q0FBb0MsQ0FBQyxDQUFDO2lCQUN2RTs7Z0JBRUQsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2dCQUU1RCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNWLE1BQU0sSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDdEM7Z0JBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVCOztvQkExQ0ZKLGVBQVU7O21DQVJYOzs7Ozs7O0FDQUE7UUFPRSwrQkFBb0IsU0FBMkI7WUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7U0FBSzs7Ozs7UUFFNUMsMkNBQVc7Ozs7c0JBQUMsR0FBRzs7Z0JBQ3JCLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQztnQkFDcEQsT0FBTyxDQUFDLEdBQUcsR0FBRyxRQUFRLEdBQUcsT0FBTyxJQUFJLEdBQUcsQ0FBQzs7Ozs7O1FBR2xDLDRDQUFZOzs7O3NCQUFDLEdBQUc7O2dCQUN0QixJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVoRCxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDcEIsTUFBTSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztnQkFDaEMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVuQyxPQUFPLE1BQU0sQ0FBQzs7Ozs7OztRQUdSLDZDQUFhOzs7OztzQkFBQyxNQUFNLEVBQUUsR0FBRzs7O2dCQUMvQixJQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO29CQUMxQyxNQUFNLENBQUMsTUFBTSxHQUFHO3dCQUNkLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDakIsQ0FBQztvQkFDRixNQUFNLENBQUMsT0FBTyxHQUFHO3dCQUNmLE1BQU0sQ0FBQzs0QkFDTCxJQUFJLEVBQUUsR0FBRzs0QkFDVCxNQUFNLEVBQUUsS0FBSzt5QkFDZCxDQUFDLENBQUM7cUJBQ0osQ0FBQztpQkFDSCxDQUFDLENBQUM7Z0JBRUgsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFBLFFBQVE7b0JBQ3BCLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLHNCQUFtQixHQUFHLE9BQUcsQ0FBQyxDQUFDO2lCQUN0RSxDQUFDLENBQUM7Z0JBRUgsT0FBTyxPQUFPLENBQUM7Ozs7OztRQUdqQiw0Q0FBWTs7OztZQUFaLFVBQWEsTUFBTTs7Z0JBQ2pCLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMxQjs7Ozs7UUFFRCw4Q0FBYzs7OztZQUFkLFVBQWUsR0FBRzs7Z0JBQ2hCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDeEM7O29CQWpERkEsZUFBVTs7Ozs7d0JBRkYsZ0JBQWdCOzs7b0NBRnpCOzs7Ozs7O0lDRUEsSUFBQTtRQUF3Q0ksc0NBQUs7UUFDekMsNEJBQVksYUFBYSxFQUFFLFdBQVcsRUFBRSxXQUFZO21CQUNoRCxrQkFBTSwrQkFBNkIsYUFBYSxRQUFLO2lCQUNqRCxjQUFXLFdBQVcsR0FBRyxXQUFXLEdBQUcsaUJBQWlCLE9BQUcsQ0FBQTtpQkFDM0QsTUFBSSxXQUFXLE9BQUksQ0FBQSxDQUFDO1NBQzNCO2lDQVBMO01BRXdDLEtBQUssRUFNNUMsQ0FBQTtBQU5ELElBUUEsSUFBQTtRQUFrQ0EsZ0NBQUs7UUFDbkMsc0JBQVksYUFBYSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsWUFBWTttQkFDOUQsa0JBQ0ksK0JBQTZCLGFBQWEsVUFBTztpQkFDakQsZ0JBQWMsYUFBYSxvQkFBZSxZQUFjLENBQUE7aUJBQ3hELFdBQVMsT0FBTyxVQUFZLENBQUEsQ0FDL0I7U0FDSjsyQkFqQkw7TUFVa0MsS0FBSyxFQVF0QyxDQUFBO0FBUkQsSUFVQSxJQUFBO1FBQTJDQSx5Q0FBSztRQUM1QywrQkFBWSxhQUFhO1lBQUUsaUJBQVU7aUJBQVYsVUFBVSxFQUFWLHFCQUFVLEVBQVYsSUFBVTtnQkFBVixnQ0FBVTs7WUFBckMsaUJBb0JDO1lBbkJHLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMzQixPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3hCOztZQUVELElBQUksYUFBYSxDQUFDO1lBQ2xCLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3BCLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsTUFBSSxDQUFDLE1BQUcsR0FBQSxDQUFDLENBQUM7Z0JBQ3JDLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQztnQkFDbkMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqRCxhQUFhLElBQUksU0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUcsQ0FBQzthQUN6RDtpQkFBTTtnQkFDSCxhQUFhLEdBQUcsT0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQUcsQ0FBQzthQUN0QztZQUVELFFBQUEsa0JBQ0kscUJBQW1CLGFBQWEsa0JBQWU7aUJBQy9DLDZCQUEyQixhQUFhLE1BQUcsQ0FBQSxDQUM5QyxTQUFDOztTQUNMO29DQXpDTDtNQW9CMkMsS0FBSyxFQXNCL0MsQ0FBQTs7Ozs7O0FDMUNELFFBSUE7Ozt3QkFKQTtRQWtCQzs7Ozs7Ozs7Ozs7O0FDVkQsUUFBYSxlQUFlLEdBQUcsMkNBQTJDLENBQUM7SUFFM0UsSUFBQTtRQUFvQ0EseUNBQUs7Ozs7b0NBVnpDO01BVW9DLEtBQUssRUFBSSxDQUFBOztRQTJCM0Msb0JBQytCLFVBQWtCLEVBQ25DLFFBQXFCLEVBQ0wsTUFBaUIsRUFDckM7WUFKVixpQkErQkM7WUE5QjhCLGVBQVUsR0FBVixVQUFVLENBQVE7WUFFbkIsV0FBTSxHQUFOLE1BQU0sQ0FBVztZQUNyQyxtQkFBYyxHQUFkLGNBQWM7a0NBMUJDLEtBQUs7bUNBRUosSUFBSTttQ0FFSixJQUFJOzZCQUVWLEtBQUs7NEJBRU4sSUFBSTt3QkFFUixJQUFJO21DQUVPLElBQUk7a0NBRUwsS0FBSzttQ0FFSixJQUFJOzJCQUVaLElBQUk7MEJBRUwsS0FBSztZQVFwQixJQUFJTCx3QkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7O2dCQUN0QyxJQUFNLEdBQUcsR0FBUSxNQUFNLENBQ1c7O2dCQURsQyxJQUNFLFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztnQkFFbEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUVqQixTQUFTLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO2dCQUNwQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDakIsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUNkLENBQUMsQ0FBQztnQkFDSCxHQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFFMUIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFOztvQkFDaEIsSUFBTSxVQUFVLEdBQUc7d0JBQ2pCLEtBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU07NEJBQzlELEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO3lCQUNwQixDQUFDLENBQUM7cUJBQ0osQ0FBQztvQkFDRixJQUFJLFFBQVEsRUFBRTt3QkFDWixRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUM5Qjt5QkFBTTt3QkFDTCxVQUFVLEVBQUUsQ0FBQztxQkFDZDtpQkFDRjthQUNGO1NBQ0Y7Ozs7UUFFTyw4QkFBUzs7OztnQkFDZixLQUFLLElBQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQzdCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQzlCO2lCQUNGOzs7Ozs7UUFHSyx1Q0FBa0I7Ozs7c0JBQUMsTUFBTTtnQkFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7b0JBQUUsT0FBTyxLQUFLLENBQUM7aUJBQUU7Z0JBQzVDLElBQUksT0FBTyxJQUFJLENBQUMsZUFBZSxLQUFLLFFBQVEsRUFBRTtvQkFDNUMsTUFBTSxJQUFJLHFCQUFxQixDQUFDLCtCQUErQixDQUFDLENBQUM7aUJBQ2xFO2dCQUNELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Ozs7OztRQUcxQyxpQ0FBWTs7OztzQkFBQyxNQUFNO2dCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtvQkFBRSxPQUFPLEtBQUssQ0FBQztpQkFBRTtnQkFDNUMsSUFBSSxPQUFPLElBQUksQ0FBQyxlQUFlLEtBQUssUUFBUSxFQUFFO29CQUM1QyxNQUFNLElBQUkscUJBQXFCLENBQUMsNkJBQTZCLENBQUMsQ0FBQztpQkFDaEU7Z0JBRUQsS0FBSyxJQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO29CQUN0QyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUM1QyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQ3JEO2lCQUNGOzs7Ozs7UUFHSyxnQ0FBVzs7OztzQkFBQyxNQUFNO2dCQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFBRSxPQUFPLEtBQUssQ0FBQztpQkFBRTtnQkFFckMsSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO29CQUNyQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDbEMsT0FBTztpQkFDUjtnQkFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ2pDLE1BQU0sSUFBSSxxQkFBcUIsQ0FBQyxzQkFBc0I7d0JBQ3BELGlCQUFpQixDQUFDLENBQUM7aUJBQ3RCO2dCQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7OztRQUcxQyw0QkFBTzs7OztzQkFBQyxNQUFNO2dCQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFBRSxPQUFPLEtBQUssQ0FBQztpQkFBRTtnQkFDakMsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUNqQyxNQUFNLElBQUkscUJBQXFCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztpQkFDMUQ7Z0JBRUQsTUFBTSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7UUFHbkMsMEJBQUs7Ozs7O2dCQUNYLElBQU0sR0FBRyxHQUFRLE1BQU0sQ0FFTzs7Z0JBRjlCLElBQ0UsU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQ0c7O2dCQUY5QixJQUVFLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBRTlCLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDdkIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUN6Qjs7Z0JBR0QsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLEtBQUssRUFBRTtvQkFDbEMsTUFBTSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN4QztnQkFFRCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7b0JBQ3hCLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2lCQUM1Qjs7Z0JBR0QsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBRTVCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzlDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUVwQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7O2dCQUdoQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztnQkFFOUIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixLQUFLLElBQUksRUFBRTtvQkFDMUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTt3QkFDOUIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO3FCQUN6QjtvQkFDRCxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7aUJBQzVCOzs7OztRQUlILDhCQUFTOzs7WUFBVDtnQkFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDcEI7Ozs7O1FBRUQsK0JBQVU7Ozs7WUFBVixVQUFXLElBQUk7Z0JBQ2IsSUFBSUEsd0JBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFOztvQkFDdEMsSUFBTSxHQUFHLEdBQVEsTUFBTSxDQUNLOztvQkFENUIsSUFDRSxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztvQkFDNUIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzFCO2FBQ0Y7O29CQW5LRkMsZUFBVTs7Ozs7d0JBMEJrQyxNQUFNLHVCQUE5Q0MsV0FBTSxTQUFDQyxnQkFBVzt3QkFqQ2QsV0FBVyx1QkFrQ2ZHLGFBQVE7d0JBbkNKLFNBQVMsdUJBb0NiSixXQUFNLFNBQUMsVUFBVTt3QkFsQ2IscUJBQXFCOzs7eUJBTjlCOzs7Ozs7O0FDQUE7O2dDQUt5QixFQUFFOzs7Ozs7UUFFekIsMENBQVU7Ozs7WUFBVixVQUFXLElBQWU7Z0JBQWYscUJBQUE7b0JBQUEsZUFBZTs7O2dCQUN4QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7Z0JBRWQsR0FBRzs7b0JBQ0QsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakQsRUFBRSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO2lCQUMxQixRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUVsQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFFN0IsT0FBTyxFQUFFLENBQUM7YUFDWDs7Ozs7UUFFRCw4Q0FBYzs7OztZQUFkLFVBQWUsT0FBb0I7Z0JBQ2pDLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtvQkFDL0QsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDO2lCQUNuQjs7Z0JBRUQsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQzFELElBQUksT0FBTyxFQUFFO29CQUFFLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO2lCQUFFO2dCQUVqQyxPQUFPLEVBQUUsQ0FBQzthQUNYOzs7OztRQUVELHVDQUFPOzs7O1lBQVAsVUFBUSxFQUFFO2dCQUNSLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDaEM7Ozs7O1FBRUQsd0NBQVE7Ozs7WUFBUixVQUFTLEVBQUU7Z0JBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDMUI7O29CQW5DRkQsZUFBVTs7b0NBRlg7Ozs7Ozs7SUNTQSxJQUFBO1FBQThCSSxtQ0FBSzs7Ozs4QkFUbkM7TUFTOEIsS0FBSyxFQUFJLENBQUE7O1FBWXJDLDJCQUVVLE1BQWlCLEVBQ2pCLFFBQ0E7WUFGQSxXQUFNLEdBQU4sTUFBTSxDQUFXO1lBQ2pCLFdBQU0sR0FBTixNQUFNO1lBQ04sa0JBQWEsR0FBYixhQUFhO2dDQVRXLElBQUlFLGlCQUFZLEVBQUU7Z0NBQzdCLEVBQUU7NkJBRUwsRUFBRTtTQU9qQjs7Ozs7OztRQUVMLHVDQUFXOzs7Ozs7WUFBWCxVQUFZLElBQUksRUFBRSxlQUFnQixFQUFFLFdBQW1CO2dCQUF2RCxpQkFtQ0M7Z0JBbkNtQyw0QkFBQTtvQkFBQSxtQkFBbUI7OztnQkFDckQsSUFBTSxRQUFRLEdBQWlCQyxTQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUNYOztnQkFENUMsSUFDRSxJQUFJLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQztnQkFFNUMsUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDWixJQUFJLEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQzlCLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzNCO29CQUNELElBQUksZUFBZSxFQUFFO3dCQUNuQixLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztxQkFDN0M7aUJBQ0YsQ0FBQyxDQUFDO2dCQUVILElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsS0FBSyxJQUFJLElBQUksV0FBVyxFQUFFOztvQkFFekQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzdCLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO3dCQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO3FCQUNsQztvQkFDRCxJQUFJLENBQUMsYUFBYSxHQUFHQyxVQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDOzt3QkFDeEMsSUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUNsQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzt3QkFDN0IsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO3dCQUMzQixLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7NEJBQ3pCLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQzt5QkFDekMsQ0FBQyxDQUFDO3dCQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUNsQyxLQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztxQkFDeEIsQ0FBQyxDQUFDO2lCQUNKO3FCQUFNO29CQUNMLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ3RCO2dCQUVELE9BQU8sUUFBUSxDQUFDO2FBQ2pCOzs7OztRQUVELDBDQUFjOzs7O1lBQWQsVUFBZSxJQUFJO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDL0IsTUFBTSxJQUFJLGVBQWUsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2lCQUN6RDs7Z0JBRUQsSUFBTSxRQUFRLEdBQWlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMxRSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFNUIsT0FBTyxJQUFJLENBQUM7YUFDYjs7Ozs7UUFFTywyQ0FBZTs7OztzQkFBQyxJQUFJO2dCQUMxQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQzs7Ozs7O1FBRzlDLG1DQUFPOzs7O3NCQUFDLEtBQU07Z0JBQ3BCLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtvQkFDdkIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7d0JBQ2pCLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztxQkFDOUIsQ0FBQyxDQUFDO29CQUNILE9BQU87aUJBQ1I7Z0JBRUQsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFBRSxPQUFPLEtBQUssQ0FBQztpQkFBRTtnQkFFekMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ2pCLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxJQUFJLEdBQUEsQ0FBQyxDQUFDLENBQUM7b0JBQ3pELEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO3dCQUNoQixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDNUIsQ0FBQyxDQUFDO2lCQUNKLENBQUMsQ0FBQzs7Ozs7OztRQUdHLDJDQUFlOzs7OztzQkFBQyxJQUFJLEVBQUUsUUFBUTs7O2dCQUNwQyxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQzs7Z0JBRWhELElBQU0sT0FBTyxHQUFHQSxVQUFLLENBQUMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzs7b0JBQzlELElBQU0sR0FBRyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDQyxlQUFRLENBQUMsQ0FBQztvQkFDdEMsSUFBSSxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFO3dCQUN2RSxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDckIsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNuQztpQkFDRixDQUFDLENBQUM7Z0JBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztnQkFFMUQsT0FBTyxPQUFPLENBQUM7Ozs7OztRQUdULDJDQUFlOzs7O3NCQUFDLElBQUk7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs7Ozs7O1FBRzdCLDRDQUFnQjs7Ozs7c0JBQUMsWUFBWSxFQUFFLGFBQWE7Z0JBQ2xELElBQUksWUFBWSxHQUFHLElBQUksRUFBRTtvQkFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO2lCQUNwRTs7Ozs7O1FBR0gsdUNBQVc7Ozs7WUFBWCxVQUFZLE9BQWdCO2dCQUMxQixJQUFJLFFBQVEsTUFBTSxDQUFDLEtBQUssV0FBVyxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7O29CQUN0RCxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzdDLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxNQUFNLEVBQUU7d0JBQzFCLE9BQU8sSUFBSSxDQUFDO3FCQUNiO3lCQUFNLElBQUksT0FBTyxDQUFDLGFBQWEsRUFBRTt3QkFDaEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztxQkFDaEQ7aUJBQ0Y7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7YUFDZDs7b0JBM0hGVCxlQUFVOzs7Ozt3QkFSRixTQUFTLHVCQWlCYkssYUFBUSxZQUFJSixXQUFNLFNBQUMsVUFBVTt3QkF0QldTLGFBQVE7d0JBTzVDLG9CQUFvQjs7O2dDQVA3Qjs7Ozs7Ozs7Ozs7O0FDQUE7UUF1REUsd0JBQytCLFVBQWtCLEVBQ3ZDLFlBQ0EsS0FDQSxnQkFDQSxZQUNvQixNQUFpQixFQUNqQ0MsU0FBYztZQVA1QixpQkF3QkM7WUF2QjhCLGVBQVUsR0FBVixVQUFVLENBQVE7WUFDdkMsZUFBVSxHQUFWLFVBQVU7WUFDVixRQUFHLEdBQUgsR0FBRztZQUNILG1CQUFjLEdBQWQsY0FBYztZQUNkLGVBQVUsR0FBVixVQUFVO1lBQ1UsV0FBTSxHQUFOLE1BQU0sQ0FBVzttQ0F6QlgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlO2dDQUdQLElBQUlMLGlCQUFZLEVBQUU7eUJBRTFELEVBQUU7cUNBRVUsRUFBRTs4QkFFVCxFQUFFOzhCQUVGLEVBQUU7MkJBRUwsRUFBRTtZQWVsQixJQUFJUCx3QkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7b0JBQ3pDLElBQUksSUFBSSxLQUFLLEtBQUksQ0FBQyxJQUFJLEVBQUU7d0JBQ3RCLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztxQkFDekQ7aUJBQ0YsQ0FBQyxDQUFDO2dCQUNILElBQUlZLFNBQU0sRUFBRTtvQkFDVixJQUFJLENBQUMsZ0JBQWdCLEdBQUdBLFNBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDQyxnQkFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxZQUFZQyxvQkFBYSxHQUFBLENBQUMsQ0FBQzt5QkFDeEYsU0FBUyxDQUFDLFVBQUMsS0FBb0I7d0JBQzlCLElBQUksS0FBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUksQ0FBQyxPQUFPLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLEVBQUU7NEJBQzVFLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO3lCQUNoQztxQkFDRixDQUFDLENBQUM7aUJBQ047YUFDRjtTQUNGOzs7O1FBRUQsaUNBQVE7OztZQUFSO2dCQUNFLElBQUlkLHdCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDbkU7YUFDRjs7OztRQUVELHdDQUFlOzs7WUFBZjtnQkFBQSxpQkFNQztnQkFMQyxJQUFJQSx3QkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQ3RDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO3dCQUNsQixLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7cUJBQ25CLENBQUMsQ0FBQztpQkFDSjthQUNGOzs7O1FBRUQsb0NBQVc7OztZQUFYO2dCQUNFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDYixTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ3JDO2dCQUNELElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO29CQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3JDO2FBQ0Y7Ozs7O1FBRU8sNkNBQW9COzs7O3NCQUFDLElBQUk7O2dCQUMvQixJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBRTNCLElBQUksRUFBRSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQ3JDLE9BQU87aUJBQ1I7O2dCQUVELElBQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFFNUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87b0JBQ2xDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQzVELENBQUMsQ0FBQztnQkFFSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7Ozs7O1FBR3RDLG1DQUFVOzs7Ozs7Z0JBQ2hCLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FDZ0I7O2dCQUQxQyxJQUNFLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztnQkFFMUMsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRWxFLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxTQUFTLElBQUksRUFBRSxDQUFDLGNBQWMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFO29CQUMxRixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDaEQ7Z0JBRUQsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLEtBQUssRUFBRTtvQkFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzlDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDcEQ7Z0JBRUQsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO29CQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDcEM7Z0JBRUQsSUFBSSxFQUFFLENBQUMsZUFBZSxFQUFFO29CQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDM0M7Z0JBRUQsSUFBSSxFQUFFLENBQUMsZUFBZSxFQUFFO29CQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFDaEMsQ0FBQztpQkFDSDtnQkFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFDLGVBQTJCO29CQUNsRCxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7aUJBQ3pGLENBQUM7Z0JBRUYsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFckMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxTQUFTO29CQUM3QixLQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDekQsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUztvQkFDN0IsS0FBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDM0MsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTSxJQUFNLE1BQU0sQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRXJELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7b0JBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO2lCQUNoRDtnQkFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFFekMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOzs7OztRQUdoQix1Q0FBYzs7Ozs7Z0JBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO29CQUNsRSxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQ3RELENBQUMsQ0FBQzs7Ozs7UUFHTCxtQ0FBVTs7O1lBQVY7Z0JBQ0UsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQzNCLE1BQU0sSUFBSSxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQ3BEO2dCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNoQixNQUFNLElBQUksa0JBQWtCLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDekQ7YUFDRjtRQUVELHNCQUFJLG9DQUFROzs7Z0JBQVo7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ25FOzs7V0FBQTs7OztRQUVELGlDQUFROzs7WUFBUjtnQkFDRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztvQkFDbkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO29CQUNqQixpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCO29CQUN6QyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7b0JBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtvQkFDM0IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNuQixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJO29CQUM1QyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7b0JBQ3JDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtvQkFDdkIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNyQixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWU7b0JBQ3JFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDckIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLEtBQUssSUFBSTtpQkFDL0MsQ0FBQyxDQUFDO2FBQ0o7Ozs7O1FBRUQsZ0NBQU87Ozs7WUFBUCxVQUFRLElBQUk7Z0JBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkI7Ozs7O1FBRUQsNkNBQW9COzs7O1lBQXBCLFVBQXFCLE9BQU87Z0JBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdEM7Ozs7O1FBRUQscUNBQVk7Ozs7WUFBWixVQUFhLFNBQVM7Z0JBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2pDOzs7OztRQUVELHFDQUFZOzs7O1lBQVosVUFBYSxTQUFTO2dCQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNqQzs7Ozs7UUFFRCxrQ0FBUzs7OztZQUFULFVBQVUsTUFBTTtnQkFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMzQjs7b0JBM01GZSxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLFFBQVE7cUJBQ25COzs7Ozt3QkE0QjRDLE1BQU0sdUJBQTlDYixXQUFNLFNBQUNDLGdCQUFXO3dCQXZEVmEsZUFBVTt3QkFVZCxVQUFVO3dCQUNWLHFCQUFxQjt3QkFDckIsaUJBQWlCO3dCQUVlLFNBQVMsdUJBOEM3Q2QsV0FBTSxTQUFDLFVBQVU7d0JBdkRiZSxhQUFNLHVCQXdEVlgsYUFBUTs7Ozs2QkEvQlZZLFVBQUs7K0JBQ0xBLFVBQUs7cUNBQ0xBLFVBQUs7c0NBQ0xBLFVBQUs7OEJBQ0xBLFVBQUs7c0NBQ0xBLFVBQUs7c0NBQ0xBLFVBQUs7bUNBRUxDLFdBQU07OzZCQXZDVDs7Ozs7OztBQ0FBO1FBa0JJLGtDQUNZLFlBRUEsRUFBa0IsRUFDbEI7WUFKWixpQkFTQztZQVJXLGVBQVUsR0FBVixVQUFVO1lBRVYsT0FBRSxHQUFGLEVBQUUsQ0FBZ0I7WUFDbEIsZUFBVSxHQUFWLFVBQVU7WUFFbEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztnQkFDaEMsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQzFCLENBQUMsQ0FBQztTQUNOOzs7O1FBR0Qsa0RBQWU7OztZQURmO2dCQUFBLGlCQThCQztnQkE1QkcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtvQkFDbEIsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2dCQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUFFLE9BQU8sS0FBSyxDQUFDO2lCQUFFO2dCQUVuQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Z0JBRTFELElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7O2dCQUVuQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUNoQjs7Z0JBRGQsSUFDSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUVkLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtvQkFDcEIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxFQUFFO3dCQUNwQixLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3BDO2lCQUNKLENBQUMsQ0FBQztnQkFFSCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRTtvQkFDdEQsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO29CQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO3dCQUMzRCxLQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUMxRCxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztxQkFDbEMsQ0FBQyxDQUFDO2lCQUNOO2FBQ0o7Ozs7UUFFRCw0Q0FBUzs7O1lBQVQ7O2dCQUNJLElBQU0sRUFBRSxHQUFZLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUNUOztnQkFEeEMsSUFDSSxNQUFNLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtvQkFDN0IsT0FBTyxNQUFNLENBQUM7aUJBQ2pCO2FBQ0o7O29CQTFESkosY0FBUyxTQUFDO3dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7cUJBQ2pDOzs7Ozt3QkFWY0MsZUFBVTt3QkFLaEIsY0FBYyx1QkFjZGQsV0FBTSxTQUFDa0IsZUFBVSxDQUFDLGNBQU0sT0FBQSxjQUFjLEdBQUEsQ0FBQzt3QkFidkMsaUJBQWlCOzs7O3NDQXNCckJDLGlCQUFZLFNBQUMsZUFBZTs7dUNBN0JqQzs7Ozs7OztBQ0FBO1FBWUUsZ0NBRVUsRUFBa0I7WUFBbEIsT0FBRSxHQUFGLEVBQUUsQ0FBZ0I7NEJBTFIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzJCQUNQLEVBQUU7U0FLaEI7Ozs7UUFFTCx5Q0FBUTs7O1lBQVI7Z0JBQ0UsSUFBSSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUMvQztRQUVELHNCQUNJLDZDQUFTOzs7O2dCQURiLFVBQ2MsR0FBVztnQkFDdkIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO29CQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2lCQUN4QjthQUNGOzs7V0FBQTtRQUVELHNCQUNJLDhDQUFVOzs7O2dCQURkLFVBQ2UsR0FBVztnQkFDeEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO29CQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2lCQUN4QjthQUNGOzs7V0FBQTs7Ozs7UUFFRCx3Q0FBTzs7OztZQUFQLFVBQVEsSUFBSTtnQkFDVixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6Qjs7OztRQUVELHlDQUFROzs7WUFBUjtnQkFDRSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7b0JBQ25CLFlBQVksRUFBRSxJQUFJLENBQUMsUUFBUTtvQkFDM0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO2lCQUN0QixDQUFDLENBQUM7YUFDSjs7b0JBeENGTixjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtxQkFDM0I7Ozs7O3dCQUpRLGNBQWMsdUJBV2xCYixXQUFNLFNBQUNrQixlQUFVLENBQUMsY0FBTSxPQUFBLGNBQWMsR0FBQSxDQUFDOzs7OytCQUp6Q0YsVUFBSzs4QkFDTEEsVUFBSztnQ0FXTEEsVUFBSztpQ0FPTEEsVUFBSzs7cUNBNUJSOzs7Ozs7O0FDQUE7UUFhRSwwQkFDVSxZQUVBLEVBQWtCLEVBRWxCLElBQTRCO1lBSjVCLGVBQVUsR0FBVixVQUFVO1lBRVYsT0FBRSxHQUFGLEVBQUUsQ0FBZ0I7WUFFbEIsU0FBSSxHQUFKLElBQUksQ0FBd0I7U0FDakM7Ozs7UUFFTCxtQ0FBUTs7O1lBQVI7O2dCQUNFLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FDMkI7O2dCQUQ5RCxJQUNFLFNBQVMsR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7Z0JBRTlELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUM3QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztpQkFDM0M7cUJBQU0sSUFBSSxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO29CQUNsQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUMzQjthQUNGOztvQkF6QkZILGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsVUFBVTtxQkFDckI7Ozs7O3dCQVBtQkMsZUFBVTt3QkFFckIsY0FBYyx1QkFhbEJkLFdBQU0sU0FBQ2tCLGVBQVUsQ0FBQyxjQUFNLE9BQUEsY0FBYyxHQUFBLENBQUM7d0JBWm5DLHNCQUFzQix1QkFjMUJkLGFBQVEsWUFBSUosV0FBTSxTQUFDa0IsZUFBVSxDQUFDLGNBQU0sT0FBQSxzQkFBc0IsR0FBQSxDQUFDOzs7OzRCQVA3REYsVUFBSzs2QkFDTEEsVUFBSzs7K0JBWFI7Ozs7Ozs7QUNBQTtRQXVCRSwrQkFFVSxFQUFrQjtZQUFsQixPQUFFLEdBQUYsRUFBRSxDQUFnQjswQkFKWCxFQUFFO1NBS2Q7UUFkTCxzQkFDSSx3Q0FBSzs7OztnQkFEVCxVQUNVLEdBQTJCO2dCQURyQyxpQkFPQztnQkFMQyxJQUFJLEdBQUcsWUFBWSxLQUFLLEVBQUU7b0JBQ3hCLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFBLENBQUMsQ0FBQztpQkFDcEM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDcEI7YUFDRjs7O1dBQUE7Ozs7UUFTRCxrREFBa0I7OztZQUFsQjs7Z0JBQ0UsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNqQzs7OztRQUVELDBDQUFVOzs7WUFBVjtnQkFDRSxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFO29CQUMxQixNQUFNLElBQUksa0JBQWtCLENBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDNUQ7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQzVCLE1BQU0sSUFBSSxrQkFBa0IsQ0FBQyxlQUFlLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUM5RDthQUNGOzs7O1FBRUQsd0NBQVE7OztZQUFSO2dCQUNFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDbEIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO29CQUNuQixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7b0JBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2lCQUNwQixDQUFDLENBQUM7YUFDSjs7Ozs7UUFFRCx3Q0FBUTs7OztZQUFSLFVBQVMsS0FBSztnQkFDWixJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxLQUFLLEtBQUssR0FBQSxDQUFDLEVBQUU7b0JBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN6QjthQUNGOztvQkFqREZILGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsZUFBZTtxQkFDMUI7Ozs7O3dCQUpRLGNBQWMsdUJBcUJsQmIsV0FBTSxTQUFDa0IsZUFBVSxDQUFDLGNBQU0sT0FBQSxjQUFjLEdBQUEsQ0FBQzs7OzswQkFkekNGLFVBQUs7NEJBRUxBLFVBQUs7O29DQVpSOzs7Ozs7O0FDQUE7UUFhRSwrQkFDVSxZQUVBLEVBQWtCO1lBRmxCLGVBQVUsR0FBVixVQUFVO1lBRVYsT0FBRSxHQUFGLEVBQUUsQ0FBZ0I7U0FDeEI7Ozs7UUFFSix3Q0FBUTs7O1lBQVI7Z0JBQ0UsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDL0Q7O29CQWJGSCxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLGVBQWU7cUJBQzFCOzs7Ozt3QkFUWUMsZUFBVTt3QkFLZCxjQUFjLHVCQVNsQmQsV0FBTSxTQUFDa0IsZUFBVSxDQUFDLGNBQU0sT0FBQSxjQUFjLEdBQUEsQ0FBQzs7O29DQWY1Qzs7Ozs7OztBQ0FBO1FBYUUsMkJBQ1UsWUFFQSxTQUFnQztZQUZoQyxlQUFVLEdBQVYsVUFBVTtZQUVWLGNBQVMsR0FBVCxTQUFTLENBQXVCO1NBQ3JDOzs7O1FBRUwsb0NBQVE7OztZQUFSO2dCQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2xFOztvQkFiRkwsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxXQUFXO3FCQUN0Qjs7Ozs7d0JBVFlDLGVBQVU7d0JBS2QscUJBQXFCLHVCQVN6QmQsV0FBTSxTQUFDa0IsZUFBVSxDQUFDLGNBQU0sT0FBQSxxQkFBcUIsR0FBQSxDQUFDOzs7Z0NBZm5EOzs7Ozs7O0FDQUE7UUFrQkUsbUNBQytCLFVBQWtCLEVBQ3ZDO1lBRHFCLGVBQVUsR0FBVixVQUFVLENBQVE7WUFDdkMsZUFBVSxHQUFWLFVBQVU7U0FDZjs7OztRQUVMLDRDQUFROzs7WUFBUjtnQkFDRSxJQUFJcEIsd0JBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFOztvQkFDdEMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUNPOztvQkFEakMsSUFDRSxNQUFNLEdBQUcsSUFBSSxHQUFHLGNBQWMsQ0FBQzs7b0JBRWpDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUNmLE1BQU0sR0FBRyxXQUFTLElBQUksQ0FBQyxNQUFRLENBQUM7cUJBQ2pDOztvQkFFRCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7b0JBQ2QsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO3dCQUNiLElBQUksR0FBRyxVQUFRLElBQUksQ0FBQyxJQUFNLENBQUM7cUJBQzVCOztvQkFFRCxJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUU1QyxLQUFLLENBQUMsR0FBRyxHQUFHLGdEQUFnRCxDQUFDO29CQUM3RCxLQUFLLENBQUMsR0FBRyxJQUFPLE1BQU0sZ0JBQVcsSUFBSSxDQUFDLFNBQVMsU0FBSSxNQUFNLEdBQUcsSUFBTSxDQUFDO29CQUVuRSxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBQ2pCLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO29CQUVuQixLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7b0JBRWxDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDN0M7YUFDRjs7b0JBMUNGZSxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtxQkFDL0I7Ozs7O3dCQVE0QyxNQUFNLHVCQUE5Q2IsV0FBTSxTQUFDQyxnQkFBVzt3QkFsQlZhLGVBQVU7Ozs7NkJBYXBCRSxVQUFLO2dDQUNMQSxVQUFLOzJCQUNMQSxVQUFLOzt3Q0FoQlI7Ozs7Ozs7Ozs7Ozs7SUN1QkEsSUFBTSxVQUFVLEdBQUc7UUFDakIsY0FBYztRQUNkLGdCQUFnQjtRQUNoQixzQkFBc0I7UUFDdEIsd0JBQXdCO1FBQ3hCLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLGlCQUFpQjtRQUMvRCx5QkFBeUI7S0FDMUIsQ0FBQzs7SUFFRixJQUFNLFFBQVEsR0FBRztRQUNmLGdCQUFnQjtRQUNoQixvQkFBb0I7UUFDcEIscUJBQXFCO1FBQ3JCLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxpQkFBaUI7S0FDckQsQ0FBQzs7Ozs7Ozs7UUFpQk8saUJBQU87Ozs7WUFBZCxVQUFlLE1BQWtCO2dCQUMvQixPQUFPO29CQUNMLFFBQVEsRUFBRSxTQUFTO29CQUNuQixTQUFTLFlBQ0gsTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRTt3QkFDM0QsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLElBQUksRUFBRSxFQUFFO3NCQUNoRDtpQkFDRixDQUFDO2FBQ0g7O29CQXZCRkksYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRSxFQUVSO3dCQUNELFlBQVksV0FDUCxVQUFVLENBQ2Q7d0JBQ0QsU0FBUyxXQUNKLFFBQVEsQ0FDWjt3QkFDRCxPQUFPLFdBQ0YsVUFBVSxDQUNkO3FCQUNGOzt3QkFwREQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9