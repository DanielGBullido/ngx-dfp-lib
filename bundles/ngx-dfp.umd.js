(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('@angular/router'), require('rxjs/operators'), require('@angular/common'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ngx-dfp', ['exports', 'rxjs', '@angular/router', 'rxjs/operators', '@angular/common', '@angular/core'], factory) :
    (factory((global['ngx-dfp'] = {}),global.rxjs,global.ng.router,global.rxjs.operators,global.ng.common,global.ng.core));
}(this, (function (exports,rxjs,router,operators,common,core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DFP_CONFIG = new core.InjectionToken('dfpConfig');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IdleService = /** @class */ (function () {
        function IdleService(platformId, zone) {
            /** @type {?} */
            var win = common.isPlatformBrowser(platformId) ? window : {};
            if (win.requestIdleCallback) {
                this.requestIdleCallback = ( /**
                 * @param {?} fun
                 * @return {?}
                 */function (fun) {
                    return win.requestIdleCallback(fun);
                });
            }
            else {
                this.requestIdleCallback = ( /**
                 * @param {?} fun
                 * @return {?}
                 */function (fun) {
                    return zone.runOutsideAngular(( /**
                     * @return {?}
                     */function () { return win.setTimeout(fun, 50); }));
                });
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HttpErrorService = /** @class */ (function () {
        function HttpErrorService() {
            this.isErrorCode = ( /**
             * @param {?} code
             * @return {?}
             */function (code) {
                if (typeof code === 'number') {
                    return !(code >= 200 && code < 300);
                }
                return code[0] !== '2';
            });
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            { type: core.Injectable }
        ];
        return ParseDurationService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ScriptInjectorService = /** @class */ (function () {
        function ScriptInjectorService(httpError) {
            this.httpError = httpError;
        }
        /**
         * @private
         * @param {?} url
         * @return {?}
         */
        ScriptInjectorService.prototype.completeURL = /**
         * @private
         * @param {?} url
         * @return {?}
         */
            function (url) {
                /** @type {?} */
                var ssl = document.location.protocol === 'https:';
                return (ssl ? 'https:' : 'http:') + url;
            };
        /**
         * @private
         * @param {?} url
         * @return {?}
         */
        ScriptInjectorService.prototype.createScript = /**
         * @private
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
         * @private
         * @param {?} script
         * @param {?} url
         * @return {?}
         */
        ScriptInjectorService.prototype.promiseScript = /**
         * @private
         * @param {?} script
         * @param {?} url
         * @return {?}
         */
            function (script, url) {
                var _this = this;
                /** @type {?} */
                var promise = new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    script.onload = ( /**
                     * @return {?}
                     */function () {
                        resolve(script);
                    });
                    script.onerror = ( /**
                     * @return {?}
                     */function () {
                        reject({
                            path: url,
                            loaded: false
                        });
                    });
                }));
                promise.catch(( /**
                 * @param {?} response
                 * @return {?}
                 */function (response) {
                    _this.httpError.httpError({ status: 400 }, "loading script \"" + url + "\"");
                }));
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                parents = parents.map(( /**
                 * @param {?} p
                 * @return {?}
                 */function (p) { return "'" + p + "'"; }));
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DfpConfig = /** @class */ (function () {
        function DfpConfig() {
        }
        return DfpConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            if (common.isPlatformBrowser(this.platformId)) {
                /** @type {?} */
                var win = window;
                /** @type {?} */
                var googletag = win.googletag || {};
                this.dfpConfig();
                googletag.cmd = googletag.cmd || [];
                googletag.cmd.push(( /**
                 * @return {?}
                 */function () {
                    _this.setup();
                }));
                win.googletag = googletag;
                if (this.loadGPT) {
                    /** @type {?} */
                    var loadScript = ( /**
                     * @return {?}
                     */function () {
                        _this.scriptInjector.scriptInjector(GPT_LIBRARY_URL).then(( /**
                         * @param {?} script
                         * @return {?}
                         */function (script) {
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
                deferred.then(( /**
                 * @return {?}
                 */function () {
                    if (_this.hasSlotInterval(slot)) {
                        _this.cancelInterval(slot);
                    }
                    if (refreshInterval) {
                        _this.addSlotInterval(task, refreshInterval);
                    }
                }));
                if (this.config.singleRequestMode === true && initRefresh) {
                    // Use a timer to handle refresh of a single request mode
                    this.refreshSlots.push(slot);
                    if (this.singleRequest && !this.singleRequest.closed) {
                        this.singleRequest.unsubscribe();
                    }
                    this.singleRequest = rxjs.timer(100).subscribe(( /**
                     * @return {?}
                     */function () {
                        /** @type {?} */
                        var pubads = googletag.pubads();
                        pubads.enableSingleRequest();
                        googletag.enableServices();
                        _this.refreshSlots.forEach(( /**
                         * @param {?} s
                         * @return {?}
                         */function (s) {
                            googletag.display(s.getSlotElementId());
                        }));
                        pubads.refresh(_this.refreshSlots);
                        _this.refreshSlots = [];
                    }));
                }
                else {
                    googletag.display(slot.getSlotElementId());
                    this.refresh([task]);
                }
                return deferred;
            };
        /**
         * @template THIS
         * @this {THIS}
         * @param {?} slot
         * @return {THIS}
         */
        DfpRefreshService.prototype.cancelInterval = /**
         * @template THIS
         * @this {THIS}
         * @param {?} slot
         * @return {THIS}
         */
            function (slot) {
                if (!( /** @type {?} */(this)).hasSlotInterval(slot)) {
                    throw new DFPRefreshError('No interval for given slot');
                }
                /** @type {?} */
                var interval = ( /** @type {?} */(this)).intervals[( /** @type {?} */(this)).slotIntervalKey(slot)];
                interval.unsubscribe();
                delete ( /** @type {?} */(this)).intervals[slot];
                return ( /** @type {?} */(this));
            };
        /**
         * @private
         * @param {?} slot
         * @return {?}
         */
        DfpRefreshService.prototype.hasSlotInterval = /**
         * @private
         * @param {?} slot
         * @return {?}
         */
            function (slot) {
                return this.slotIntervalKey(slot) in this.intervals;
            };
        /**
         * @private
         * @param {?=} tasks
         * @return {?}
         */
        DfpRefreshService.prototype.refresh = /**
         * @private
         * @param {?=} tasks
         * @return {?}
         */
            function (tasks) {
                if (tasks === undefined) {
                    googletag.cmd.push(( /**
                     * @return {?}
                     */function () {
                        googletag.pubads().refresh();
                    }));
                    return;
                }
                if (tasks.length === 0) {
                    return false;
                }
                googletag.cmd.push(( /**
                 * @return {?}
                 */function () {
                    googletag.pubads().refresh(tasks.map(( /**
                     * @param {?} task
                     * @return {?}
                     */function (task) { return task.slot; })));
                    tasks.forEach(( /**
                     * @param {?} task
                     * @return {?}
                     */function (task) {
                        Promise.resolve(task.slot);
                    }));
                }));
            };
        /**
         * @private
         * @param {?} task
         * @param {?} interval
         * @return {?}
         */
        DfpRefreshService.prototype.addSlotInterval = /**
         * @private
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
                var refresh = rxjs.timer(parsedInterval, parsedInterval).subscribe(( /**
                 * @return {?}
                 */function () {
                    /** @type {?} */
                    var doc = _this.inject.get(common.DOCUMENT);
                    if (!_this.hiddenCheck(doc.getElementById(task.slot.getSlotElementId()))) {
                        _this.refresh([task]);
                        _this.refreshEvent.emit(task.slot);
                    }
                }));
                this.intervals[this.slotIntervalKey(task.slot)] = refresh;
                return refresh;
            };
        /**
         * @private
         * @param {?} slot
         * @return {?}
         */
        DfpRefreshService.prototype.slotIntervalKey = /**
         * @private
         * @param {?} slot
         * @return {?}
         */
            function (slot) {
                return slot.getSlotId().getDomId();
            };
        /**
         * @private
         * @param {?} milliseconds
         * @param {?} beforeParsing
         * @return {?}
         */
        DfpRefreshService.prototype.validateInterval = /**
         * @private
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DfpAdDirective = /** @class */ (function () {
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
                this.dfpRefresh.refreshEvent.subscribe(( /**
                 * @param {?} slot
                 * @return {?}
                 */function (slot) {
                    if (slot === _this.slot) {
                        _this.afterRefresh.emit({ type: 'refresh', slot: slot });
                    }
                }));
                if (router$$1) {
                    this.onSameNavigation = router$$1.events.pipe(operators.filter(( /**
                     * @param {?} event
                     * @return {?}
                     */function (event) { return event instanceof router.NavigationEnd; })))
                        .subscribe(( /**
                 * @param {?} event
                 * @return {?}
                 */function (event) {
                        if (_this.slot && !_this.refresh && _this.config.onSameNavigation === 'refresh') {
                            _this.refreshContent.call(_this);
                        }
                    }));
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
                    this.dfp.defineTask(( /**
                     * @return {?}
                     */function () {
                        _this.defineSlot();
                    }));
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
         * @private
         * @param {?} slot
         * @return {?}
         */
        DfpAdDirective.prototype.setResponsiveMapping = /**
         * @private
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
                ad.responsiveMapping.forEach(( /**
                 * @param {?} mapping
                 * @return {?}
                 */function (mapping) {
                    sizeMapping.addSize(mapping.viewportSize, mapping.adSizes);
                }));
                slot.defineSizeMapping(sizeMapping.build());
            };
        /**
         * @private
         * @return {?}
         */
        DfpAdDirective.prototype.defineSlot = /**
         * @private
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
                googletag.pubads().addEventListener('slotRenderEnded', ( /**
                 * @param {?} event
                 * @return {?}
                 */function (event) {
                    if (event.slot === _this.slot) {
                        _this.afterRefresh.emit({ type: 'renderEnded', slot: _this.slot, data: event });
                    }
                }));
                this.setResponsiveMapping(this.slot);
                ad.targetings.forEach(( /**
                 * @param {?} targeting
                 * @return {?}
                 */function (targeting) {
                    _this.slot.setTargeting(targeting.key, targeting.values);
                }));
                ad.exclusions.forEach(( /**
                 * @param {?} exclusion
                 * @return {?}
                 */function (exclusion) {
                    _this.slot.setCategoryExclusion(exclusion);
                }));
                ad.scripts.forEach(( /**
                 * @param {?} script
                 * @return {?}
                 */function (script) { script(_this.slot); }));
                if (this.config.enableVideoAds) {
                    this.slot.addService(googletag.companionAds());
                }
                this.slot.addService(googletag.pubads());
                this.refreshContent();
            };
        /**
         * @private
         * @return {?}
         */
        DfpAdDirective.prototype.refreshContent = /**
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                this.dfpRefresh.slotRefresh(this.slot, this.refresh, true).then(( /**
                 * @param {?} slot
                 * @return {?}
                 */function (slot) {
                    _this.afterRefresh.emit({ type: 'init', slot: slot });
                }));
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DfpAdResponsiveDirective = /** @class */ (function () {
        function DfpAdResponsiveDirective(elementRef, ad, dfpRefresh) {
            var _this = this;
            this.elementRef = elementRef;
            this.ad = ad;
            this.dfpRefresh = dfpRefresh;
            this.ad.afterRefresh.subscribe(( /**
             * @param {?} event
             * @return {?}
             */function (event) {
                _this.slot = event.slot;
            }));
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
                state.sizes.forEach(( /**
                 * @param {?} size
                 * @return {?}
                 */function (size) {
                    if (size[0] < winWidth) {
                        width = Math.max(width, size[0]);
                    }
                }));
                if (state.sizes.length > 1 && width !== this.iframeWidth) {
                    state = this.ad.getState();
                    this.iframeWidth = width;
                    this.iframe.setAttribute('width', width + '');
                    this.dfpRefresh.slotRefresh(this.slot, state.refresh).then(( /**
                     * @param {?} slot
                     * @return {?}
                     */function (slot) {
                        _this.ad.afterRefresh.emit({ type: 'resize', slot: slot });
                        _this.iframe = _this.getIframe();
                    }));
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
                { type: DfpAdDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(( /**
                                                 * @return {?}
                                                 */function () { return DfpAdDirective; })),] }] },
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                { type: DfpAdDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(( /**
                                                 * @return {?}
                                                 */function () { return DfpAdDirective; })),] }] }
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            { type: core.Directive, args: [{
                        selector: 'dfp-size'
                    },] }
        ];
        /** @nocollapse */
        DfpSizeDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: DfpAdDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(( /**
                                                 * @return {?}
                                                 */function () { return DfpAdDirective; })),] }] },
                { type: DfpResponsiveDirective, decorators: [{ type: core.Optional }, { type: core.Inject, args: [core.forwardRef(( /**
                                                 * @return {?}
                                                 */function () { return DfpResponsiveDirective; })),] }] }
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
             */ function (val) {
                var _this = this;
                if (val instanceof Array) {
                    val.forEach(( /**
                     * @param {?} v
                     * @return {?}
                     */function (v) { return _this.addValue(v); }));
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
                if (value && !this.values.find(( /**
                 * @param {?} item
                 * @return {?}
                 */function (item) { return item === value; }))) {
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
                { type: DfpAdDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(( /**
                                                 * @return {?}
                                                 */function () { return DfpAdDirective; })),] }] }
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            { type: core.Directive, args: [{
                        selector: 'dfp-exclusion'
                    },] }
        ];
        /** @nocollapse */
        DfpExclusionDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: DfpAdDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(( /**
                                                 * @return {?}
                                                 */function () { return DfpAdDirective; })),] }] }
            ];
        };
        return DfpExclusionDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            { type: core.Directive, args: [{
                        selector: 'dfp-value'
                    },] }
        ];
        /** @nocollapse */
        DfpValueDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: DfpTargetingDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(( /**
                                                 * @return {?}
                                                 */function () { return DfpTargetingDirective; })),] }] }
            ];
        };
        return DfpValueDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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

//# sourceMappingURL=ngx-dfp.umd.js.map