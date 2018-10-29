/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            this.requestIdleCallback = (fun) => {
                return win.requestIdleCallback(fun);
            };
        }
        else {
            this.requestIdleCallback = (fun) => {
                return zone.runOutsideAngular(() => win.setTimeout(fun, 50));
            };
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
    /** @type {?} */
    IdleService.prototype.requestIdleCallback;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvaWRsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR3BELE1BQU07Ozs7O0lBSUosWUFDdUIsVUFBa0IsRUFDdkMsSUFBWTs7UUFFWixNQUFNLEdBQUcsR0FBUSxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDN0QsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDakMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNyQyxDQUFDO1NBQ0g7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDOUQsQ0FBQztTQUNIO0tBQ0Y7Ozs7O0lBRUQsT0FBTyxDQUFDLEdBQUc7UUFDVCxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDL0I7OztZQXZCRixVQUFVOzs7O1lBTTBCLE1BQU0sdUJBQXRDLE1BQU0sU0FBQyxXQUFXO1lBVEYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSWRsZVNlcnZpY2Uge1xuXG4gIHByaXZhdGUgcmVxdWVzdElkbGVDYWxsYmFjazogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICB6b25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgY29uc3Qgd2luOiBhbnkgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKSA/IHdpbmRvdyA6IHt9O1xuICAgIGlmICh3aW4ucmVxdWVzdElkbGVDYWxsYmFjaykge1xuICAgICAgdGhpcy5yZXF1ZXN0SWRsZUNhbGxiYWNrID0gKGZ1bikgPT4ge1xuICAgICAgICByZXR1cm4gd2luLnJlcXVlc3RJZGxlQ2FsbGJhY2soZnVuKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVxdWVzdElkbGVDYWxsYmFjayA9IChmdW4pID0+IHtcbiAgICAgICAgcmV0dXJuIHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gd2luLnNldFRpbWVvdXQoZnVuLCA1MCkpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICByZXF1ZXN0KGZ1bikge1xuICAgIHRoaXMucmVxdWVzdElkbGVDYWxsYmFjayhmdW4pO1xuICB9XG5cbn1cbiJdfQ==