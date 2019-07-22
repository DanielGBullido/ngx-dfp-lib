/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, EventEmitter, Optional, Injector, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { timer, from } from 'rxjs';
import { DfpConfig } from '../class';
import { DFP_CONFIG } from './injection_token';
import { ParseDurationService } from './parse-duration.service';
var DFPRefreshError = /** @class */ (function (_super) {
    tslib_1.__extends(DFPRefreshError, _super);
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
        deferred.then((/**
         * @return {?}
         */
        function () {
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
            this.singleRequest = timer(100).subscribe((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var pubads = googletag.pubads();
                pubads.enableSingleRequest();
                googletag.enableServices();
                _this.refreshSlots.forEach((/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) {
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
        if (!(/** @type {?} */ (this)).hasSlotInterval(slot)) {
            throw new DFPRefreshError('No interval for given slot');
        }
        /** @type {?} */
        var interval = (/** @type {?} */ (this)).intervals[(/** @type {?} */ (this)).slotIntervalKey(slot)];
        interval.unsubscribe();
        delete (/** @type {?} */ (this)).intervals[slot];
        return (/** @type {?} */ (this));
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
            googletag.cmd.push((/**
             * @return {?}
             */
            function () {
                googletag.pubads().refresh();
            }));
            return;
        }
        if (tasks.length === 0) {
            return false;
        }
        googletag.cmd.push((/**
         * @return {?}
         */
        function () {
            googletag.pubads().refresh(tasks.map((/**
             * @param {?} task
             * @return {?}
             */
            function (task) { return task.slot; })));
            tasks.forEach((/**
             * @param {?} task
             * @return {?}
             */
            function (task) {
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
        var refresh = timer(parsedInterval, parsedInterval).subscribe((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var doc = _this.inject.get(DOCUMENT);
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
export { DfpRefreshService };
if (false) {
    /** @type {?} */
    DfpRefreshService.prototype.refreshEvent;
    /**
     * @type {?}
     * @private
     */
    DfpRefreshService.prototype.refreshSlots;
    /**
     * @type {?}
     * @private
     */
    DfpRefreshService.prototype.singleRequest;
    /**
     * @type {?}
     * @private
     */
    DfpRefreshService.prototype.intervals;
    /**
     * @type {?}
     * @private
     */
    DfpRefreshService.prototype.config;
    /**
     * @type {?}
     * @private
     */
    DfpRefreshService.prototype.inject;
    /**
     * @type {?}
     * @private
     */
    DfpRefreshService.prototype.parseDuration;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXJlZnJlc2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUFnQixLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWpELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhFO0lBQThCLDJDQUFLO0lBQW5DOztJQUFzQyxDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQUFDLEFBQXZDLENBQThCLEtBQUssR0FBSTtBQUl2QztJQVFFLDJCQUVVLE1BQWlCLEVBQ2pCLE1BQWdCLEVBQ2hCLGFBQW1DO1FBRm5DLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsV0FBTSxHQUFOLE1BQU0sQ0FBVTtRQUNoQixrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFUN0MsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QyxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUVsQixjQUFTLEdBQUcsRUFBRSxDQUFDO0lBT25CLENBQUM7Ozs7Ozs7SUFFTCx1Q0FBVzs7Ozs7O0lBQVgsVUFBWSxJQUFJLEVBQUUsZUFBZ0IsRUFBRSxXQUFtQjtRQUF2RCxpQkFtQ0M7UUFuQ21DLDRCQUFBLEVBQUEsbUJBQW1COztZQUMvQyxRQUFRLEdBQWlCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxD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bUNBQXdCOzs7OztJQUN4QiwwQ0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIsIE9wdGlvbmFsLCBJbmplY3RvciwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgdGltZXIsIGZyb20gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRGZwQ29uZmlnIH0gZnJvbSAnLi4vY2xhc3MnO1xuaW1wb3J0IHsgREZQX0NPTkZJRyB9IGZyb20gJy4vaW5qZWN0aW9uX3Rva2VuJztcbmltcG9ydCB7IFBhcnNlRHVyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wYXJzZS1kdXJhdGlvbi5zZXJ2aWNlJztcblxuY2xhc3MgREZQUmVmcmVzaEVycm9yIGV4dGVuZHMgRXJyb3IgeyB9XG5cbmRlY2xhcmUgdmFyIGdvb2dsZXRhZztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERmcFJlZnJlc2hTZXJ2aWNlIHtcblxuICByZWZyZXNoRXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwcml2YXRlIHJlZnJlc2hTbG90cyA9IFtdO1xuICBwcml2YXRlIHNpbmdsZVJlcXVlc3Q6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBpbnRlcnZhbHMgPSB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERGUF9DT05GSUcpXG4gICAgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcbiAgICBwcml2YXRlIGluamVjdDogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBwYXJzZUR1cmF0aW9uOiBQYXJzZUR1cmF0aW9uU2VydmljZVxuICApIHsgfVxuXG4gIHNsb3RSZWZyZXNoKHNsb3QsIHJlZnJlc2hJbnRlcnZhbD8sIGluaXRSZWZyZXNoID0gZmFsc2UpIHtcbiAgICBjb25zdCBkZWZlcnJlZDogUHJvbWlzZTxhbnk+ID0gZnJvbShbc2xvdF0pLnRvUHJvbWlzZSgpLFxuICAgICAgdGFzayA9IHsgc2xvdDogc2xvdCwgZGVmZXJyZWQ6IGRlZmVycmVkIH07XG5cbiAgICBkZWZlcnJlZC50aGVuKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmhhc1Nsb3RJbnRlcnZhbChzbG90KSkge1xuICAgICAgICB0aGlzLmNhbmNlbEludGVydmFsKHNsb3QpO1xuICAgICAgfVxuICAgICAgaWYgKHJlZnJlc2hJbnRlcnZhbCkge1xuICAgICAgICB0aGlzLmFkZFNsb3RJbnRlcnZhbCh0YXNrLCByZWZyZXNoSW50ZXJ2YWwpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLnNpbmdsZVJlcXVlc3RNb2RlID09PSB0cnVlICYmIGluaXRSZWZyZXNoKSB7XG4gICAgICAvLyBVc2UgYSB0aW1lciB0byBoYW5kbGUgcmVmcmVzaCBvZiBhIHNpbmdsZSByZXF1ZXN0IG1vZGVcbiAgICAgIHRoaXMucmVmcmVzaFNsb3RzLnB1c2goc2xvdCk7XG4gICAgICBpZiAodGhpcy5zaW5nbGVSZXF1ZXN0ICYmICF0aGlzLnNpbmdsZVJlcXVlc3QuY2xvc2VkKSB7XG4gICAgICAgIHRoaXMuc2luZ2xlUmVxdWVzdC51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5zaW5nbGVSZXF1ZXN0ID0gdGltZXIoMTAwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBjb25zdCBwdWJhZHMgPSBnb29nbGV0YWcucHViYWRzKCk7XG4gICAgICAgIHB1YmFkcy5lbmFibGVTaW5nbGVSZXF1ZXN0KCk7XG4gICAgICAgIGdvb2dsZXRhZy5lbmFibGVTZXJ2aWNlcygpO1xuICAgICAgICB0aGlzLnJlZnJlc2hTbG90cy5mb3JFYWNoKHMgPT4ge1xuICAgICAgICAgIGdvb2dsZXRhZy5kaXNwbGF5KHMuZ2V0U2xvdEVsZW1lbnRJZCgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHB1YmFkcy5yZWZyZXNoKHRoaXMucmVmcmVzaFNsb3RzKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoU2xvdHMgPSBbXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBnb29nbGV0YWcuZGlzcGxheShzbG90LmdldFNsb3RFbGVtZW50SWQoKSk7XG4gICAgICB0aGlzLnJlZnJlc2goW3Rhc2tdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmZXJyZWQ7XG4gIH1cblxuICBjYW5jZWxJbnRlcnZhbChzbG90KSB7XG4gICAgaWYgKCF0aGlzLmhhc1Nsb3RJbnRlcnZhbChzbG90KSkge1xuICAgICAgdGhyb3cgbmV3IERGUFJlZnJlc2hFcnJvcignTm8gaW50ZXJ2YWwgZm9yIGdpdmVuIHNsb3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnRlcnZhbDogU3Vic2NyaXB0aW9uID0gdGhpcy5pbnRlcnZhbHNbdGhpcy5zbG90SW50ZXJ2YWxLZXkoc2xvdCldO1xuICAgIGludGVydmFsLnVuc3Vic2NyaWJlKCk7XG4gICAgZGVsZXRlIHRoaXMuaW50ZXJ2YWxzW3Nsb3RdO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwcml2YXRlIGhhc1Nsb3RJbnRlcnZhbChzbG90KSB7XG4gICAgcmV0dXJuIHRoaXMuc2xvdEludGVydmFsS2V5KHNsb3QpIGluIHRoaXMuaW50ZXJ2YWxzO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoKHRhc2tzPykge1xuICAgIGlmICh0YXNrcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBnb29nbGV0YWcuY21kLnB1c2goKCkgPT4ge1xuICAgICAgICBnb29nbGV0YWcucHViYWRzKCkucmVmcmVzaCgpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRhc2tzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIGdvb2dsZXRhZy5jbWQucHVzaCgoKSA9PiB7XG4gICAgICBnb29nbGV0YWcucHViYWRzKCkucmVmcmVzaCh0YXNrcy5tYXAodGFzayA9PiB0YXNrLnNsb3QpKTtcbiAgICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZSh0YXNrLnNsb3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFNsb3RJbnRlcnZhbCh0YXNrLCBpbnRlcnZhbCkge1xuICAgIGNvbnN0IHBhcnNlZEludGVydmFsID0gdGhpcy5wYXJzZUR1cmF0aW9uLnBhcnNlRHVyYXRpb24oaW50ZXJ2YWwpO1xuICAgIHRoaXMudmFsaWRhdGVJbnRlcnZhbChwYXJzZWRJbnRlcnZhbCwgaW50ZXJ2YWwpO1xuXG4gICAgY29uc3QgcmVmcmVzaCA9IHRpbWVyKHBhcnNlZEludGVydmFsLCBwYXJzZWRJbnRlcnZhbCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IGRvYyA9IHRoaXMuaW5qZWN0LmdldChET0NVTUVOVCk7XG4gICAgICBpZiAoIXRoaXMuaGlkZGVuQ2hlY2soZG9jLmdldEVsZW1lbnRCeUlkKHRhc2suc2xvdC5nZXRTbG90RWxlbWVudElkKCkpKSkge1xuICAgICAgICB0aGlzLnJlZnJlc2goW3Rhc2tdKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoRXZlbnQuZW1pdCh0YXNrLnNsb3QpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5pbnRlcnZhbHNbdGhpcy5zbG90SW50ZXJ2YWxLZXkodGFzay5zbG90KV0gPSByZWZyZXNoO1xuXG4gICAgcmV0dXJuIHJlZnJlc2g7XG4gIH1cblxuICBwcml2YXRlIHNsb3RJbnRlcnZhbEtleShzbG90KSB7XG4gICAgcmV0dXJuIHNsb3QuZ2V0U2xvdElkKCkuZ2V0RG9tSWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgdmFsaWRhdGVJbnRlcnZhbChtaWxsaXNlY29uZHMsIGJlZm9yZVBhcnNpbmcpIHtcbiAgICBpZiAobWlsbGlzZWNvbmRzIDwgMTAwMCkge1xuICAgICAgY29uc29sZS53YXJuKCdDYXJlZnVsOiAke2JlZm9yZVBhcnNpbmd9IGlzIHF1aXRlIGEgbG93IGludGVydmFsIScpO1xuICAgIH1cbiAgfVxuXG4gIGhpZGRlbkNoZWNrKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mICh3aW5kb3cpICE9PSAndW5kZWZpbmVkJyAmJiBlbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGNzcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgICAgaWYgKGNzcy5kaXNwbGF5ID09PSAnbm9uZScpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oaWRkZW5DaGVjayhlbGVtZW50LnBhcmVudEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==