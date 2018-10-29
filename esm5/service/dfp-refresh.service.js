/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
export { DfpRefreshService };
if (false) {
    /** @type {?} */
    DfpRefreshService.prototype.refreshEvent;
    /** @type {?} */
    DfpRefreshService.prototype.refreshSlots;
    /** @type {?} */
    DfpRefreshService.prototype.singleRequest;
    /** @type {?} */
    DfpRefreshService.prototype.intervals;
    /** @type {?} */
    DfpRefreshService.prototype.config;
    /** @type {?} */
    DfpRefreshService.prototype.inject;
    /** @type {?} */
    DfpRefreshService.prototype.parseDuration;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXJlZnJlc2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUFnQixLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWpELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhFLElBQUE7SUFBOEIsMkNBQUs7Ozs7MEJBVG5DO0VBUzhCLEtBQUssRUFBSSxDQUFBOztJQVlyQywyQkFFVSxNQUFpQixFQUNqQixRQUNBO1FBRkEsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixXQUFNLEdBQU4sTUFBTTtRQUNOLGtCQUFhLEdBQWIsYUFBYTs0QkFUVyxJQUFJLFlBQVksRUFBRTs0QkFDN0IsRUFBRTt5QkFFTCxFQUFFO0tBT2pCOzs7Ozs7O0lBRUwsdUNBQVc7Ozs7OztJQUFYLFVBQVksSUFBSSxFQUFFLGVBQWdCLEVBQUUsV0FBbUI7UUFBdkQsaUJBbUNDO1FBbkNtQyw0QkFBQSxFQUFBLG1CQUFtQjs7UUFDckQsSUFBTSxRQUFRLEdBQWlCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQ1g7O1FBRDVDLElBQ0UsSUFBSSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7UUFFNUMs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QyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUUxRCxNQUFNLENBQUMsT0FBTyxDQUFDOzs7Ozs7SUFHVCwyQ0FBZTs7OztjQUFDLElBQUk7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7Ozs7OztJQUc3Qiw0Q0FBZ0I7Ozs7O2NBQUMsWUFBWSxFQUFFLGFBQWE7UUFDbEQsRUFBRSxDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1NBQ3BFOzs7Ozs7SUFHSCx1Q0FBVzs7OztJQUFYLFVBQVksT0FBZ0I7UUFDMUIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFdBQVcsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzs7WUFDdkQsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNiO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDaEQ7U0FDRjtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDZDs7Z0JBM0hGLFVBQVU7Ozs7Z0JBUkYsU0FBUyx1QkFpQmIsUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVO2dCQXRCVyxRQUFRO2dCQU81QyxvQkFBb0I7OzRCQVA3Qjs7U0FjYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIsIE9wdGlvbmFsLCBJbmplY3RvciwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgdGltZXIsIGZyb20gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRGZwQ29uZmlnIH0gZnJvbSAnLi4vY2xhc3MnO1xuaW1wb3J0IHsgREZQX0NPTkZJRyB9IGZyb20gJy4vaW5qZWN0aW9uX3Rva2VuJztcbmltcG9ydCB7IFBhcnNlRHVyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wYXJzZS1kdXJhdGlvbi5zZXJ2aWNlJztcblxuY2xhc3MgREZQUmVmcmVzaEVycm9yIGV4dGVuZHMgRXJyb3IgeyB9XG5cbmRlY2xhcmUgdmFyIGdvb2dsZXRhZztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERmcFJlZnJlc2hTZXJ2aWNlIHtcblxuICByZWZyZXNoRXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwcml2YXRlIHJlZnJlc2hTbG90cyA9IFtdO1xuICBwcml2YXRlIHNpbmdsZVJlcXVlc3Q6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBpbnRlcnZhbHMgPSB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERGUF9DT05GSUcpXG4gICAgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcbiAgICBwcml2YXRlIGluamVjdDogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBwYXJzZUR1cmF0aW9uOiBQYXJzZUR1cmF0aW9uU2VydmljZVxuICApIHsgfVxuXG4gIHNsb3RSZWZyZXNoKHNsb3QsIHJlZnJlc2hJbnRlcnZhbD8sIGluaXRSZWZyZXNoID0gZmFsc2UpIHtcbiAgICBjb25zdCBkZWZlcnJlZDogUHJvbWlzZTxhbnk+ID0gZnJvbShbc2xvdF0pLnRvUHJvbWlzZSgpLFxuICAgICAgdGFzayA9IHsgc2xvdDogc2xvdCwgZGVmZXJyZWQ6IGRlZmVycmVkIH07XG5cbiAgICBkZWZlcnJlZC50aGVuKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmhhc1Nsb3RJbnRlcnZhbChzbG90KSkge1xuICAgICAgICB0aGlzLmNhbmNlbEludGVydmFsKHNsb3QpO1xuICAgICAgfVxuICAgICAgaWYgKHJlZnJlc2hJbnRlcnZhbCkge1xuICAgICAgICB0aGlzLmFkZFNsb3RJbnRlcnZhbCh0YXNrLCByZWZyZXNoSW50ZXJ2YWwpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLnNpbmdsZVJlcXVlc3RNb2RlID09PSB0cnVlICYmIGluaXRSZWZyZXNoKSB7XG4gICAgICAvLyBVc2UgYSB0aW1lciB0byBoYW5kbGUgcmVmcmVzaCBvZiBhIHNpbmdsZSByZXF1ZXN0IG1vZGVcbiAgICAgIHRoaXMucmVmcmVzaFNsb3RzLnB1c2goc2xvdCk7XG4gICAgICBpZiAodGhpcy5zaW5nbGVSZXF1ZXN0ICYmICF0aGlzLnNpbmdsZVJlcXVlc3QuY2xvc2VkKSB7XG4gICAgICAgIHRoaXMuc2luZ2xlUmVxdWVzdC51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5zaW5nbGVSZXF1ZXN0ID0gdGltZXIoMTAwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBjb25zdCBwdWJhZHMgPSBnb29nbGV0YWcucHViYWRzKCk7XG4gICAgICAgIHB1YmFkcy5lbmFibGVTaW5nbGVSZXF1ZXN0KCk7XG4gICAgICAgIGdvb2dsZXRhZy5lbmFibGVTZXJ2aWNlcygpO1xuICAgICAgICB0aGlzLnJlZnJlc2hTbG90cy5mb3JFYWNoKHMgPT4ge1xuICAgICAgICAgIGdvb2dsZXRhZy5kaXNwbGF5KHMuZ2V0U2xvdEVsZW1lbnRJZCgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHB1YmFkcy5yZWZyZXNoKHRoaXMucmVmcmVzaFNsb3RzKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoU2xvdHMgPSBbXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBnb29nbGV0YWcuZGlzcGxheShzbG90LmdldFNsb3RFbGVtZW50SWQoKSk7XG4gICAgICB0aGlzLnJlZnJlc2goW3Rhc2tdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmZXJyZWQ7XG4gIH1cblxuICBjYW5jZWxJbnRlcnZhbChzbG90KSB7XG4gICAgaWYgKCF0aGlzLmhhc1Nsb3RJbnRlcnZhbChzbG90KSkge1xuICAgICAgdGhyb3cgbmV3IERGUFJlZnJlc2hFcnJvcignTm8gaW50ZXJ2YWwgZm9yIGdpdmVuIHNsb3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnRlcnZhbDogU3Vic2NyaXB0aW9uID0gdGhpcy5pbnRlcnZhbHNbdGhpcy5zbG90SW50ZXJ2YWxLZXkoc2xvdCldO1xuICAgIGludGVydmFsLnVuc3Vic2NyaWJlKCk7XG4gICAgZGVsZXRlIHRoaXMuaW50ZXJ2YWxzW3Nsb3RdO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwcml2YXRlIGhhc1Nsb3RJbnRlcnZhbChzbG90KSB7XG4gICAgcmV0dXJuIHRoaXMuc2xvdEludGVydmFsS2V5KHNsb3QpIGluIHRoaXMuaW50ZXJ2YWxzO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoKHRhc2tzPykge1xuICAgIGlmICh0YXNrcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBnb29nbGV0YWcuY21kLnB1c2goKCkgPT4ge1xuICAgICAgICBnb29nbGV0YWcucHViYWRzKCkucmVmcmVzaCgpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRhc2tzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIGdvb2dsZXRhZy5jbWQucHVzaCgoKSA9PiB7XG4gICAgICBnb29nbGV0YWcucHViYWRzKCkucmVmcmVzaCh0YXNrcy5tYXAodGFzayA9PiB0YXNrLnNsb3QpKTtcbiAgICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZSh0YXNrLnNsb3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFNsb3RJbnRlcnZhbCh0YXNrLCBpbnRlcnZhbCkge1xuICAgIGNvbnN0IHBhcnNlZEludGVydmFsID0gdGhpcy5wYXJzZUR1cmF0aW9uLnBhcnNlRHVyYXRpb24oaW50ZXJ2YWwpO1xuICAgIHRoaXMudmFsaWRhdGVJbnRlcnZhbChwYXJzZWRJbnRlcnZhbCwgaW50ZXJ2YWwpO1xuXG4gICAgY29uc3QgcmVmcmVzaCA9IHRpbWVyKHBhcnNlZEludGVydmFsLCBwYXJzZWRJbnRlcnZhbCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IGRvYyA9IHRoaXMuaW5qZWN0LmdldChET0NVTUVOVCk7XG4gICAgICBpZiAoIXRoaXMuaGlkZGVuQ2hlY2soZG9jLmdldEVsZW1lbnRCeUlkKHRhc2suc2xvdC5nZXRTbG90RWxlbWVudElkKCkpKSkge1xuICAgICAgICB0aGlzLnJlZnJlc2goW3Rhc2tdKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoRXZlbnQuZW1pdCh0YXNrLnNsb3QpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5pbnRlcnZhbHNbdGhpcy5zbG90SW50ZXJ2YWxLZXkodGFzay5zbG90KV0gPSByZWZyZXNoO1xuXG4gICAgcmV0dXJuIHJlZnJlc2g7XG4gIH1cblxuICBwcml2YXRlIHNsb3RJbnRlcnZhbEtleShzbG90KSB7XG4gICAgcmV0dXJuIHNsb3QuZ2V0U2xvdElkKCkuZ2V0RG9tSWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgdmFsaWRhdGVJbnRlcnZhbChtaWxsaXNlY29uZHMsIGJlZm9yZVBhcnNpbmcpIHtcbiAgICBpZiAobWlsbGlzZWNvbmRzIDwgMTAwMCkge1xuICAgICAgY29uc29sZS53YXJuKCdDYXJlZnVsOiAke2JlZm9yZVBhcnNpbmd9IGlzIHF1aXRlIGEgbG93IGludGVydmFsIScpO1xuICAgIH1cbiAgfVxuXG4gIGhpZGRlbkNoZWNrKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mICh3aW5kb3cpICE9PSAndW5kZWZpbmVkJyAmJiBlbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGNzcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgICAgaWYgKGNzcy5kaXNwbGF5ID09PSAnbm9uZScpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oaWRkZW5DaGVjayhlbGVtZW50LnBhcmVudEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==