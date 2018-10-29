/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
export { IdleService };
if (false) {
    /** @type {?} */
    IdleService.prototype.requestIdleCallback;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvaWRsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztJQU9sRCxxQkFDdUIsVUFBa0IsRUFDdkMsSUFBWTs7UUFFWixJQUFNLEdBQUcsR0FBUSxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDN0QsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsVUFBQyxHQUFHO2dCQUM3QixNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3JDLENBQUM7U0FDSDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLG1CQUFtQixHQUFHLFVBQUMsR0FBRztnQkFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFNLE9BQUEsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQXZCLENBQXVCLENBQUMsQ0FBQzthQUM5RCxDQUFDO1NBQ0g7S0FDRjs7Ozs7SUFFRCw2QkFBTzs7OztJQUFQLFVBQVEsR0FBRztRQUNULElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMvQjs7Z0JBdkJGLFVBQVU7Ozs7Z0JBTTBCLE1BQU0sdUJBQXRDLE1BQU0sU0FBQyxXQUFXO2dCQVRGLE1BQU07O3NCQUEzQjs7U0FJYSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lLCBJbmplY3QsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJZGxlU2VydmljZSB7XG5cbiAgcHJpdmF0ZSByZXF1ZXN0SWRsZUNhbGxiYWNrOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHpvbmU6IE5nWm9uZVxuICApIHtcbiAgICBjb25zdCB3aW46IGFueSA9IGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpID8gd2luZG93IDoge307XG4gICAgaWYgKHdpbi5yZXF1ZXN0SWRsZUNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnJlcXVlc3RJZGxlQ2FsbGJhY2sgPSAoZnVuKSA9PiB7XG4gICAgICAgIHJldHVybiB3aW4ucmVxdWVzdElkbGVDYWxsYmFjayhmdW4pO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXF1ZXN0SWRsZUNhbGxiYWNrID0gKGZ1bikgPT4ge1xuICAgICAgICByZXR1cm4gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB3aW4uc2V0VGltZW91dChmdW4sIDUwKSk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJlcXVlc3QoZnVuKSB7XG4gICAgdGhpcy5yZXF1ZXN0SWRsZUNhbGxiYWNrKGZ1bik7XG4gIH1cblxufVxuIl19