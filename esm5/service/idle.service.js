/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
var IdleService = /** @class */ (function () {
    function IdleService(platformId, zone) {
        /** @type {?} */
        var win = isPlatformBrowser(platformId) ? window : {};
        if (win.requestIdleCallback) {
            this.requestIdleCallback = (/**
             * @param {?} fun
             * @return {?}
             */
            function (fun) {
                return win.requestIdleCallback(fun);
            });
        }
        else {
            this.requestIdleCallback = (/**
             * @param {?} fun
             * @return {?}
             */
            function (fun) {
                return zone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () { return win.setTimeout(fun, 50); }));
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
    /**
     * @type {?}
     * @private
     */
    IdleService.prototype.requestIdleCallback;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvaWRsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBEO0lBS0UscUJBQ3VCLFVBQWtCLEVBQ3ZDLElBQVk7O1lBRU4sR0FBRyxHQUFRLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDNUQsSUFBSSxHQUFHLENBQUMsbUJBQW1CLEVBQUU7WUFDM0IsSUFBSSxDQUFDLG1CQUFtQjs7OztZQUFHLFVBQUMsR0FBRztnQkFDN0IsT0FBTyxHQUFHLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFBLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUFDLG1CQUFtQjs7OztZQUFHLFVBQUMsR0FBRztnQkFDN0IsT0FBTyxJQUFJLENBQUMsaUJBQWlCOzs7Z0JBQUMsY0FBTSxPQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUF2QixDQUF1QixFQUFDLENBQUM7WUFDL0QsQ0FBQyxDQUFBLENBQUM7U0FDSDtJQUNILENBQUM7Ozs7O0lBRUQsNkJBQU87Ozs7SUFBUCxVQUFRLEdBQUc7UUFDVCxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Z0JBdkJGLFVBQVU7Ozs7Z0JBTTBCLE1BQU0sdUJBQXRDLE1BQU0sU0FBQyxXQUFXO2dCQVRGLE1BQU07O0lBNEIzQixrQkFBQztDQUFBLEFBekJELElBeUJDO1NBeEJZLFdBQVc7Ozs7OztJQUV0QiwwQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUsIEluamVjdCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIElkbGVTZXJ2aWNlIHtcblxuICBwcml2YXRlIHJlcXVlc3RJZGxlQ2FsbGJhY2s6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgem9uZTogTmdab25lXG4gICkge1xuICAgIGNvbnN0IHdpbjogYW55ID0gaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkgPyB3aW5kb3cgOiB7fTtcbiAgICBpZiAod2luLnJlcXVlc3RJZGxlQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMucmVxdWVzdElkbGVDYWxsYmFjayA9IChmdW4pID0+IHtcbiAgICAgICAgcmV0dXJuIHdpbi5yZXF1ZXN0SWRsZUNhbGxiYWNrKGZ1bik7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlcXVlc3RJZGxlQ2FsbGJhY2sgPSAoZnVuKSA9PiB7XG4gICAgICAgIHJldHVybiB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHdpbi5zZXRUaW1lb3V0KGZ1biwgNTApKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcmVxdWVzdChmdW4pIHtcbiAgICB0aGlzLnJlcXVlc3RJZGxlQ2FsbGJhY2soZnVuKTtcbiAgfVxuXG59XG4iXX0=