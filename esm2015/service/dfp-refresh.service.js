/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, EventEmitter, Optional, Injector, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { timer, from } from 'rxjs';
import { DfpConfig } from '../class';
import { DFP_CONFIG } from './injection_token';
import { ParseDurationService } from './parse-duration.service';
class DFPRefreshError extends Error {
}
export class DfpRefreshService {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXJlZnJlc2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxPQUFPLEVBQWdCLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEUscUJBQXNCLFNBQVEsS0FBSztDQUFJO0FBS3ZDLE1BQU07Ozs7OztJQU9KLFlBRVUsTUFBaUIsRUFDakIsUUFDQTtRQUZBLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsV0FBTSxHQUFOLE1BQU07UUFDTixrQkFBYSxHQUFiLGFBQWE7NEJBVFcsSUFBSSxZQUFZLEVBQUU7NEJBQzdCLEVBQUU7eUJBRUwsRUFBRTtLQU9qQjs7Ozs7OztJQUVMLFdBQVcsQ0FBQyxJQUFJLEVBQUUsZUFBZ0IsRUFBRSxXQUFXLEdBQUcsS0FBSzs7UUFDckQsTUFBTSxRQUFRLEdBQWlCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQ1g7O1FBRDVDLE1BQ0UsSUFBSSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7UUFFNUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDakIsRUFBRSxDQUFDLENBQUMsSUFB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LENBQUM7UUFFMUQsTUFBTSxDQUFDLE9BQU8sQ0FBQzs7Ozs7O0lBR1QsZUFBZSxDQUFDLElBQUk7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7Ozs7OztJQUc3QixnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsYUFBYTtRQUNsRCxFQUFFLENBQUMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLG9EQUFvRCxDQUFDLENBQUM7U0FDcEU7Ozs7OztJQUdILFdBQVcsQ0FBQyxPQUFnQjtRQUMxQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDOztZQUN2RCxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0MsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ2I7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNoRDtTQUNGO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNkOzs7WUEzSEYsVUFBVTs7OztZQVJGLFNBQVMsdUJBaUJiLFFBQVEsWUFBSSxNQUFNLFNBQUMsVUFBVTtZQXRCVyxRQUFRO1lBTzVDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciwgT3B0aW9uYWwsIEluamVjdG9yLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCB0aW1lciwgZnJvbSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEZnBDb25maWcgfSBmcm9tICcuLi9jbGFzcyc7XG5pbXBvcnQgeyBERlBfQ09ORklHIH0gZnJvbSAnLi9pbmplY3Rpb25fdG9rZW4nO1xuaW1wb3J0IHsgUGFyc2VEdXJhdGlvblNlcnZpY2UgfSBmcm9tICcuL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UnO1xuXG5jbGFzcyBERlBSZWZyZXNoRXJyb3IgZXh0ZW5kcyBFcnJvciB7IH1cblxuZGVjbGFyZSB2YXIgZ29vZ2xldGFnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGZwUmVmcmVzaFNlcnZpY2Uge1xuXG4gIHJlZnJlc2hFdmVudDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHByaXZhdGUgcmVmcmVzaFNsb3RzID0gW107XG4gIHByaXZhdGUgc2luZ2xlUmVxdWVzdDogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGludGVydmFscyA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoREZQX0NPTkZJRylcbiAgICBwcml2YXRlIGNvbmZpZzogRGZwQ29uZmlnLFxuICAgIHByaXZhdGUgaW5qZWN0OiBJbmplY3RvcixcbiAgICBwcml2YXRlIHBhcnNlRHVyYXRpb246IFBhcnNlRHVyYXRpb25TZXJ2aWNlXG4gICkgeyB9XG5cbiAgc2xvdFJlZnJlc2goc2xvdCwgcmVmcmVzaEludGVydmFsPywgaW5pdFJlZnJlc2ggPSBmYWxzZSkge1xuICAgIGNvbnN0IGRlZmVycmVkOiBQcm9taXNlPGFueT4gPSBmcm9tKFtzbG90XSkudG9Qcm9taXNlKCksXG4gICAgICB0YXNrID0geyBzbG90OiBzbG90LCBkZWZlcnJlZDogZGVmZXJyZWQgfTtcblxuICAgIGRlZmVycmVkLnRoZW4oKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaGFzU2xvdEludGVydmFsKHNsb3QpKSB7XG4gICAgICAgIHRoaXMuY2FuY2VsSW50ZXJ2YWwoc2xvdCk7XG4gICAgICB9XG4gICAgICBpZiAocmVmcmVzaEludGVydmFsKSB7XG4gICAgICAgIHRoaXMuYWRkU2xvdEludGVydmFsKHRhc2ssIHJlZnJlc2hJbnRlcnZhbCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5jb25maWcuc2luZ2xlUmVxdWVzdE1vZGUgPT09IHRydWUgJiYgaW5pdFJlZnJlc2gpIHtcbiAgICAgIC8vIFVzZSBhIHRpbWVyIHRvIGhhbmRsZSByZWZyZXNoIG9mIGEgc2luZ2xlIHJlcXVlc3QgbW9kZVxuICAgICAgdGhpcy5yZWZyZXNoU2xvdHMucHVzaChzbG90KTtcbiAgICAgIGlmICh0aGlzLnNpbmdsZVJlcXVlc3QgJiYgIXRoaXMuc2luZ2xlUmVxdWVzdC5jbG9zZWQpIHtcbiAgICAgICAgdGhpcy5zaW5nbGVSZXF1ZXN0LnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnNpbmdsZVJlcXVlc3QgPSB0aW1lcigxMDApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHB1YmFkcyA9IGdvb2dsZXRhZy5wdWJhZHMoKTtcbiAgICAgICAgcHViYWRzLmVuYWJsZVNpbmdsZVJlcXVlc3QoKTtcbiAgICAgICAgZ29vZ2xldGFnLmVuYWJsZVNlcnZpY2VzKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaFNsb3RzLmZvckVhY2gocyA9PiB7XG4gICAgICAgICAgZ29vZ2xldGFnLmRpc3BsYXkocy5nZXRTbG90RWxlbWVudElkKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcHViYWRzLnJlZnJlc2godGhpcy5yZWZyZXNoU2xvdHMpO1xuICAgICAgICB0aGlzLnJlZnJlc2hTbG90cyA9IFtdO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdvb2dsZXRhZy5kaXNwbGF5KHNsb3QuZ2V0U2xvdEVsZW1lbnRJZCgpKTtcbiAgICAgIHRoaXMucmVmcmVzaChbdGFza10pO1xuICAgIH1cblxuICAgIHJldHVybiBkZWZlcnJlZDtcbiAgfVxuXG4gIGNhbmNlbEludGVydmFsKHNsb3QpIHtcbiAgICBpZiAoIXRoaXMuaGFzU2xvdEludGVydmFsKHNsb3QpKSB7XG4gICAgICB0aHJvdyBuZXcgREZQUmVmcmVzaEVycm9yKCdObyBpbnRlcnZhbCBmb3IgZ2l2ZW4gc2xvdCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGludGVydmFsOiBTdWJzY3JpcHRpb24gPSB0aGlzLmludGVydmFsc1t0aGlzLnNsb3RJbnRlcnZhbEtleShzbG90KV07XG4gICAgaW50ZXJ2YWwudW5zdWJzY3JpYmUoKTtcbiAgICBkZWxldGUgdGhpcy5pbnRlcnZhbHNbc2xvdF07XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByaXZhdGUgaGFzU2xvdEludGVydmFsKHNsb3QpIHtcbiAgICByZXR1cm4gdGhpcy5zbG90SW50ZXJ2YWxLZXkoc2xvdCkgaW4gdGhpcy5pbnRlcnZhbHM7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2godGFza3M/KSB7XG4gICAgaWYgKHRhc2tzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGdvb2dsZXRhZy5jbWQucHVzaCgoKSA9PiB7XG4gICAgICAgIGdvb2dsZXRhZy5wdWJhZHMoKS5yZWZyZXNoKCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGFza3MubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgZ29vZ2xldGFnLmNtZC5wdXNoKCgpID0+IHtcbiAgICAgIGdvb2dsZXRhZy5wdWJhZHMoKS5yZWZyZXNoKHRhc2tzLm1hcCh0YXNrID0+IHRhc2suc2xvdCkpO1xuICAgICAgdGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHRhc2suc2xvdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkU2xvdEludGVydmFsKHRhc2ssIGludGVydmFsKSB7XG4gICAgY29uc3QgcGFyc2VkSW50ZXJ2YWwgPSB0aGlzLnBhcnNlRHVyYXRpb24ucGFyc2VEdXJhdGlvbihpbnRlcnZhbCk7XG4gICAgdGhpcy52YWxpZGF0ZUludGVydmFsKHBhcnNlZEludGVydmFsLCBpbnRlcnZhbCk7XG5cbiAgICBjb25zdCByZWZyZXNoID0gdGltZXIocGFyc2VkSW50ZXJ2YWwsIHBhcnNlZEludGVydmFsKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgZG9jID0gdGhpcy5pbmplY3QuZ2V0KERPQ1VNRU5UKTtcbiAgICAgIGlmICghdGhpcy5oaWRkZW5DaGVjayhkb2MuZ2V0RWxlbWVudEJ5SWQodGFzay5zbG90LmdldFNsb3RFbGVtZW50SWQoKSkpKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaChbdGFza10pO1xuICAgICAgICB0aGlzLnJlZnJlc2hFdmVudC5lbWl0KHRhc2suc2xvdCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmludGVydmFsc1t0aGlzLnNsb3RJbnRlcnZhbEtleSh0YXNrLnNsb3QpXSA9IHJlZnJlc2g7XG5cbiAgICByZXR1cm4gcmVmcmVzaDtcbiAgfVxuXG4gIHByaXZhdGUgc2xvdEludGVydmFsS2V5KHNsb3QpIHtcbiAgICByZXR1cm4gc2xvdC5nZXRTbG90SWQoKS5nZXREb21JZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZUludGVydmFsKG1pbGxpc2Vjb25kcywgYmVmb3JlUGFyc2luZykge1xuICAgIGlmIChtaWxsaXNlY29uZHMgPCAxMDAwKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0NhcmVmdWw6ICR7YmVmb3JlUGFyc2luZ30gaXMgcXVpdGUgYSBsb3cgaW50ZXJ2YWwhJyk7XG4gICAgfVxuICB9XG5cbiAgaGlkZGVuQ2hlY2soZWxlbWVudDogRWxlbWVudCkge1xuICAgIGlmICh0eXBlb2YgKHdpbmRvdykgIT09ICd1bmRlZmluZWQnICYmIGVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgY29uc3QgY3NzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gICAgICBpZiAoY3NzLmRpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZGRlbkNoZWNrKGVsZW1lbnQucGFyZW50RWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19