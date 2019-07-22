/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export class IdleService {
    /**
     * @param {?} platformId
     * @param {?} zone
     */
    constructor(platformId, zone) {
        /** @type {?} */
        const win = isPlatformBrowser(platformId) ? window : {};
        if (win.requestIdleCallback) {
            this.requestIdleCallback = (/**
             * @param {?} fun
             * @return {?}
             */
            (fun) => {
                return win.requestIdleCallback(fun);
            });
        }
        else {
            this.requestIdleCallback = (/**
             * @param {?} fun
             * @return {?}
             */
            (fun) => {
                return zone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => win.setTimeout(fun, 50)));
            });
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    IdleService.prototype.requestIdleCallback;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvaWRsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR3BELE1BQU0sT0FBTyxXQUFXOzs7OztJQUl0QixZQUN1QixVQUFrQixFQUN2QyxJQUFZOztjQUVOLEdBQUcsR0FBUSxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzVELElBQUksR0FBRyxDQUFDLG1CQUFtQixFQUFFO1lBQzNCLElBQUksQ0FBQyxtQkFBbUI7Ozs7WUFBRyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNqQyxPQUFPLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUEsQ0FBQztTQUNIO2FBQU07WUFDTCxJQUFJLENBQUMsbUJBQW1COzs7O1lBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDakMsT0FBTyxJQUFJLENBQUMsaUJBQWlCOzs7Z0JBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUMsQ0FBQztZQUMvRCxDQUFDLENBQUEsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsR0FBRztRQUNULElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7WUF2QkYsVUFBVTs7OztZQU0wQixNQUFNLHVCQUF0QyxNQUFNLFNBQUMsV0FBVztZQVRGLE1BQU07Ozs7Ozs7SUFNekIsMENBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lLCBJbmplY3QsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJZGxlU2VydmljZSB7XG5cbiAgcHJpdmF0ZSByZXF1ZXN0SWRsZUNhbGxiYWNrOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHpvbmU6IE5nWm9uZVxuICApIHtcbiAgICBjb25zdCB3aW46IGFueSA9IGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpID8gd2luZG93IDoge307XG4gICAgaWYgKHdpbi5yZXF1ZXN0SWRsZUNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnJlcXVlc3RJZGxlQ2FsbGJhY2sgPSAoZnVuKSA9PiB7XG4gICAgICAgIHJldHVybiB3aW4ucmVxdWVzdElkbGVDYWxsYmFjayhmdW4pO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXF1ZXN0SWRsZUNhbGxiYWNrID0gKGZ1bikgPT4ge1xuICAgICAgICByZXR1cm4gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB3aW4uc2V0VGltZW91dChmdW4sIDUwKSk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJlcXVlc3QoZnVuKSB7XG4gICAgdGhpcy5yZXF1ZXN0SWRsZUNhbGxiYWNrKGZ1bik7XG4gIH1cblxufVxuIl19