/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        deferred.then((/**
         * @return {?}
         */
        () => {
            if (this.hasSlotInterval(slot)) {
                this.cancelInterval(slot);
            }
            if (refreshInterval) {
                this.addSlotInterval(task, refreshInterval);
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
            () => {
                /** @type {?} */
                const pubads = googletag.pubads();
                pubads.enableSingleRequest();
                googletag.enableServices();
                this.refreshSlots.forEach((/**
                 * @param {?} s
                 * @return {?}
                 */
                s => {
                    googletag.display(s.getSlotElementId());
                }));
                pubads.refresh(this.refreshSlots);
                this.refreshSlots = [];
            }));
        }
        else {
            googletag.display(slot.getSlotElementId());
            this.refresh([task]);
        }
        return deferred;
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} slot
     * @return {THIS}
     */
    cancelInterval(slot) {
        if (!(/** @type {?} */ (this)).hasSlotInterval(slot)) {
            throw new DFPRefreshError('No interval for given slot');
        }
        /** @type {?} */
        const interval = (/** @type {?} */ (this)).intervals[(/** @type {?} */ (this)).slotIntervalKey(slot)];
        interval.unsubscribe();
        delete (/** @type {?} */ (this)).intervals[slot];
        return (/** @type {?} */ (this));
    }
    /**
     * @private
     * @param {?} slot
     * @return {?}
     */
    hasSlotInterval(slot) {
        return this.slotIntervalKey(slot) in this.intervals;
    }
    /**
     * @private
     * @param {?=} tasks
     * @return {?}
     */
    refresh(tasks) {
        if (tasks === undefined) {
            googletag.cmd.push((/**
             * @return {?}
             */
            () => {
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
        () => {
            googletag.pubads().refresh(tasks.map((/**
             * @param {?} task
             * @return {?}
             */
            task => task.slot)));
            tasks.forEach((/**
             * @param {?} task
             * @return {?}
             */
            task => {
                Promise.resolve(task.slot);
            }));
        }));
    }
    /**
     * @private
     * @param {?} task
     * @param {?} interval
     * @return {?}
     */
    addSlotInterval(task, interval) {
        /** @type {?} */
        const parsedInterval = this.parseDuration.parseDuration(interval);
        this.validateInterval(parsedInterval, interval);
        /** @type {?} */
        const refresh = timer(parsedInterval, parsedInterval).subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const doc = this.inject.get(DOCUMENT);
            if (!this.hiddenCheck(doc.getElementById(task.slot.getSlotElementId()))) {
                this.refresh([task]);
                this.refreshEvent.emit(task.slot);
            }
        }));
        this.intervals[this.slotIntervalKey(task.slot)] = refresh;
        return refresh;
    }
    /**
     * @private
     * @param {?} slot
     * @return {?}
     */
    slotIntervalKey(slot) {
        return slot.getSlotId().getDomId();
    }
    /**
     * @private
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXJlZnJlc2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxPQUFPLEVBQWdCLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEUsTUFBTSxlQUFnQixTQUFRLEtBQUs7Q0FBSTtBQUt2QyxNQUFNLE9BQU8saUJBQWlCOzs7Ozs7SUFPNUIsWUFFVSxNQUFpQixFQUNqQixNQUFnQixFQUNoQixhQUFtQztRQUZuQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLFdBQU0sR0FBTixNQUFNLENBQVU7UUFDaEIsa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBVDdDLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0MsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFFbEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztJQU9uQixDQUFDOzs7Ozs7O0lBRUwsV0FBVyxDQUFDLElBQUksRUFBRSxlQUFnQixFQUFFLFdBQVcsR0FBRyxLQUFLOztjQUMvQyxRQUFRLEdBQWlCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFOztjQUNyRCxJQUFJLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEs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QU8sQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUFFTyxlQUFlLENBQUMsSUFBSTtRQUMxQixPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7O0lBRU8sZ0JBQWdCLENBQUMsWUFBWSxFQUFFLGFBQWE7UUFDbEQsSUFBSSxZQUFZLEdBQUcsSUFBSSxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0RBQW9ELENBQUMsQ0FBQztTQUNwRTtJQUNILENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQWdCO1FBQzFCLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFdBQVcsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFOztrQkFDaEQsR0FBRyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7WUFDNUMsSUFBSSxHQUFHLENBQUMsT0FBTyxLQUFLLE1BQU0sRUFBRTtnQkFDMUIsT0FBTyxJQUFJLENBQUM7YUFDYjtpQkFBTSxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUU7Z0JBQ2hDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDaEQ7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7O1lBM0hGLFVBQVU7Ozs7WUFSRixTQUFTLHVCQWlCYixRQUFRLFlBQUksTUFBTSxTQUFDLFVBQVU7WUF0QlcsUUFBUTtZQU81QyxvQkFBb0I7Ozs7SUFTM0IseUNBQXFEOzs7OztJQUNyRCx5Q0FBMEI7Ozs7O0lBQzFCLDBDQUFvQzs7Ozs7SUFDcEMsc0NBQXVCOzs7OztJQUdyQixtQ0FDeUI7Ozs7O0lBQ3pCLG1DQUF3Qjs7Ozs7SUFDeEIsMENBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyLCBPcHRpb25hbCwgSW5qZWN0b3IsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIHRpbWVyLCBmcm9tIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERmcENvbmZpZyB9IGZyb20gJy4uL2NsYXNzJztcbmltcG9ydCB7IERGUF9DT05GSUcgfSBmcm9tICcuL2luamVjdGlvbl90b2tlbic7XG5pbXBvcnQgeyBQYXJzZUR1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vcGFyc2UtZHVyYXRpb24uc2VydmljZSc7XG5cbmNsYXNzIERGUFJlZnJlc2hFcnJvciBleHRlbmRzIEVycm9yIHsgfVxuXG5kZWNsYXJlIHZhciBnb29nbGV0YWc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZnBSZWZyZXNoU2VydmljZSB7XG5cbiAgcmVmcmVzaEV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHJpdmF0ZSByZWZyZXNoU2xvdHMgPSBbXTtcbiAgcHJpdmF0ZSBzaW5nbGVSZXF1ZXN0OiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgaW50ZXJ2YWxzID0ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChERlBfQ09ORklHKVxuICAgIHByaXZhdGUgY29uZmlnOiBEZnBDb25maWcsXG4gICAgcHJpdmF0ZSBpbmplY3Q6IEluamVjdG9yLFxuICAgIHByaXZhdGUgcGFyc2VEdXJhdGlvbjogUGFyc2VEdXJhdGlvblNlcnZpY2VcbiAgKSB7IH1cblxuICBzbG90UmVmcmVzaChzbG90LCByZWZyZXNoSW50ZXJ2YWw/LCBpbml0UmVmcmVzaCA9IGZhbHNlKSB7XG4gICAgY29uc3QgZGVmZXJyZWQ6IFByb21pc2U8YW55PiA9IGZyb20oW3Nsb3RdKS50b1Byb21pc2UoKSxcbiAgICAgIHRhc2sgPSB7IHNsb3Q6IHNsb3QsIGRlZmVycmVkOiBkZWZlcnJlZCB9O1xuXG4gICAgZGVmZXJyZWQudGhlbigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5oYXNTbG90SW50ZXJ2YWwoc2xvdCkpIHtcbiAgICAgICAgdGhpcy5jYW5jZWxJbnRlcnZhbChzbG90KTtcbiAgICAgIH1cbiAgICAgIGlmIChyZWZyZXNoSW50ZXJ2YWwpIHtcbiAgICAgICAgdGhpcy5hZGRTbG90SW50ZXJ2YWwodGFzaywgcmVmcmVzaEludGVydmFsKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5zaW5nbGVSZXF1ZXN0TW9kZSA9PT0gdHJ1ZSAmJiBpbml0UmVmcmVzaCkge1xuICAgICAgLy8gVXNlIGEgdGltZXIgdG8gaGFuZGxlIHJlZnJlc2ggb2YgYSBzaW5nbGUgcmVxdWVzdCBtb2RlXG4gICAgICB0aGlzLnJlZnJlc2hTbG90cy5wdXNoKHNsb3QpO1xuICAgICAgaWYgKHRoaXMuc2luZ2xlUmVxdWVzdCAmJiAhdGhpcy5zaW5nbGVSZXF1ZXN0LmNsb3NlZCkge1xuICAgICAgICB0aGlzLnNpbmdsZVJlcXVlc3QudW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2luZ2xlUmVxdWVzdCA9IHRpbWVyKDEwMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgY29uc3QgcHViYWRzID0gZ29vZ2xldGFnLnB1YmFkcygpO1xuICAgICAgICBwdWJhZHMuZW5hYmxlU2luZ2xlUmVxdWVzdCgpO1xuICAgICAgICBnb29nbGV0YWcuZW5hYmxlU2VydmljZXMoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoU2xvdHMuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICBnb29nbGV0YWcuZGlzcGxheShzLmdldFNsb3RFbGVtZW50SWQoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBwdWJhZHMucmVmcmVzaCh0aGlzLnJlZnJlc2hTbG90cyk7XG4gICAgICAgIHRoaXMucmVmcmVzaFNsb3RzID0gW107XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ29vZ2xldGFnLmRpc3BsYXkoc2xvdC5nZXRTbG90RWxlbWVudElkKCkpO1xuICAgICAgdGhpcy5yZWZyZXNoKFt0YXNrXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmVycmVkO1xuICB9XG5cbiAgY2FuY2VsSW50ZXJ2YWwoc2xvdCkge1xuICAgIGlmICghdGhpcy5oYXNTbG90SW50ZXJ2YWwoc2xvdCkpIHtcbiAgICAgIHRocm93IG5ldyBERlBSZWZyZXNoRXJyb3IoJ05vIGludGVydmFsIGZvciBnaXZlbiBzbG90Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgaW50ZXJ2YWw6IFN1YnNjcmlwdGlvbiA9IHRoaXMuaW50ZXJ2YWxzW3RoaXMuc2xvdEludGVydmFsS2V5KHNsb3QpXTtcbiAgICBpbnRlcnZhbC51bnN1YnNjcmliZSgpO1xuICAgIGRlbGV0ZSB0aGlzLmludGVydmFsc1tzbG90XTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNTbG90SW50ZXJ2YWwoc2xvdCkge1xuICAgIHJldHVybiB0aGlzLnNsb3RJbnRlcnZhbEtleShzbG90KSBpbiB0aGlzLmludGVydmFscztcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaCh0YXNrcz8pIHtcbiAgICBpZiAodGFza3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZ29vZ2xldGFnLmNtZC5wdXNoKCgpID0+IHtcbiAgICAgICAgZ29vZ2xldGFnLnB1YmFkcygpLnJlZnJlc2goKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0YXNrcy5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICBnb29nbGV0YWcuY21kLnB1c2goKCkgPT4ge1xuICAgICAgZ29vZ2xldGFnLnB1YmFkcygpLnJlZnJlc2godGFza3MubWFwKHRhc2sgPT4gdGFzay5zbG90KSk7XG4gICAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUodGFzay5zbG90KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRTbG90SW50ZXJ2YWwodGFzaywgaW50ZXJ2YWwpIHtcbiAgICBjb25zdCBwYXJzZWRJbnRlcnZhbCA9IHRoaXMucGFyc2VEdXJhdGlvbi5wYXJzZUR1cmF0aW9uKGludGVydmFsKTtcbiAgICB0aGlzLnZhbGlkYXRlSW50ZXJ2YWwocGFyc2VkSW50ZXJ2YWwsIGludGVydmFsKTtcblxuICAgIGNvbnN0IHJlZnJlc2ggPSB0aW1lcihwYXJzZWRJbnRlcnZhbCwgcGFyc2VkSW50ZXJ2YWwpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBkb2MgPSB0aGlzLmluamVjdC5nZXQoRE9DVU1FTlQpO1xuICAgICAgaWYgKCF0aGlzLmhpZGRlbkNoZWNrKGRvYy5nZXRFbGVtZW50QnlJZCh0YXNrLnNsb3QuZ2V0U2xvdEVsZW1lbnRJZCgpKSkpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoKFt0YXNrXSk7XG4gICAgICAgIHRoaXMucmVmcmVzaEV2ZW50LmVtaXQodGFzay5zbG90KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuaW50ZXJ2YWxzW3RoaXMuc2xvdEludGVydmFsS2V5KHRhc2suc2xvdCldID0gcmVmcmVzaDtcblxuICAgIHJldHVybiByZWZyZXNoO1xuICB9XG5cbiAgcHJpdmF0ZSBzbG90SW50ZXJ2YWxLZXkoc2xvdCkge1xuICAgIHJldHVybiBzbG90LmdldFNsb3RJZCgpLmdldERvbUlkKCk7XG4gIH1cblxuICBwcml2YXRlIHZhbGlkYXRlSW50ZXJ2YWwobWlsbGlzZWNvbmRzLCBiZWZvcmVQYXJzaW5nKSB7XG4gICAgaWYgKG1pbGxpc2Vjb25kcyA8IDEwMDApIHtcbiAgICAgIGNvbnNvbGUud2FybignQ2FyZWZ1bDogJHtiZWZvcmVQYXJzaW5nfSBpcyBxdWl0ZSBhIGxvdyBpbnRlcnZhbCEnKTtcbiAgICB9XG4gIH1cblxuICBoaWRkZW5DaGVjayhlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgaWYgKHR5cGVvZiAod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcgJiYgZWxlbWVudCAhPSBudWxsKSB7XG4gICAgICBjb25zdCBjc3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgICAgIGlmIChjc3MuZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChlbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlkZGVuQ2hlY2soZWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=