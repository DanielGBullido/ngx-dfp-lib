/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Inject, forwardRef, HostListener } from '@angular/core';
import { DfpAdDirective } from './dfp-ad.directive';
import { DfpRefreshService } from '../service/dfp-refresh.service';
var DfpAdResponsiveDirective = /** @class */ (function () {
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
        { type: Directive, args: [{
                    selector: 'dfp-ad[responsive]'
                },] }
    ];
    /** @nocollapse */
    DfpAdResponsiveDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(function () { return DfpAdDirective; }),] }] },
        { type: DfpRefreshService }
    ]; };
    DfpAdResponsiveDirective.propDecorators = {
        normalizeIframe: [{ type: HostListener, args: ['window:resize',] }]
    };
    return DfpAdResponsiveDirective;
}());
export { DfpAdResponsiveDirective };
if (false) {
    /** @type {?} */
    DfpAdResponsiveDirective.prototype.iframe;
    /** @type {?} */
    DfpAdResponsiveDirective.prototype.iframeWidth;
    /** @type {?} */
    DfpAdResponsiveDirective.prototype.slot;
    /** @type {?} */
    DfpAdResponsiveDirective.prototype.elementRef;
    /** @type {?} */
    DfpAdResponsiveDirective.prototype.ad;
    /** @type {?} */
    DfpAdResponsiveDirective.prototype.dfpRefresh;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWFkLXJlc3BvbnNpdmUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZS9kZnAtYWQtcmVzcG9uc2l2ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQUUsVUFBVSxFQUNyQixNQUFNLEVBQUUsVUFBVSxFQUNsQixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOztJQVcvRCxrQ0FDWSxZQUVBLEVBQWtCLEVBQ2xCO1FBSlosaUJBU0M7UUFSVyxlQUFVLEdBQVYsVUFBVTtRQUVWLE9BQUUsR0FBRixFQUFFLENBQWdCO1FBQ2xCLGVBQVUsR0FBVixVQUFVO1FBRWxCLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDaEMsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQzFCLENBQUMsQ0FBQztLQUNOOzs7O0lBR0Qsa0RBQWU7OztJQURmO1FBQUEsaUJBOEJDO1FBNUJHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUFFO1FBRW5DLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDOztRQUUxRCxJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDOztRQUVuQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUNoQjs7UUFEZCxJQUNJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFFZCxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwQztTQUNKLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdkQsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO2dCQUMzRCxLQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQyxDQUFDLENBQUM7U0FDTjtLQUNKOzs7O0lBRUQsNENBQVM7OztJQUFUOztRQUNJLElBQU0sRUFBRSxHQUFZLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUNUOztRQUR4QyxJQUNJLE1BQU0sR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2pCO0tBQ0o7O2dCQTFESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtpQkFDakM7Ozs7Z0JBVmMsVUFBVTtnQkFLaEIsY0FBYyx1QkFjZCxNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxjQUFjLEVBQWQsQ0FBYyxDQUFDO2dCQWJ2QyxpQkFBaUI7OztrQ0FzQnJCLFlBQVksU0FBQyxlQUFlOzttQ0E3QmpDOztTQVlhLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLFxuICAgIEluamVjdCwgZm9yd2FyZFJlZixcbiAgICBIb3N0TGlzdGVuZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcFJlZnJlc2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9kZnAtcmVmcmVzaC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdkZnAtYWRbcmVzcG9uc2l2ZV0nXG59KVxuZXhwb3J0IGNsYXNzIERmcEFkUmVzcG9uc2l2ZURpcmVjdGl2ZSB7XG5cbiAgICBwcml2YXRlIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBpZnJhbWVXaWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgc2xvdDogYW55O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcEFkRGlyZWN0aXZlKSlcbiAgICAgICAgcHJpdmF0ZSBhZDogRGZwQWREaXJlY3RpdmUsXG4gICAgICAgIHByaXZhdGUgZGZwUmVmcmVzaDogRGZwUmVmcmVzaFNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5hZC5hZnRlclJlZnJlc2guc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2xvdCA9IGV2ZW50LnNsb3Q7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxuICAgIG5vcm1hbGl6ZUlmcmFtZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuYWQuaXNIaWRkZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlmcmFtZSA9IHRoaXMuaWZyYW1lIHx8IHRoaXMuZ2V0SWZyYW1lKCk7XG4gICAgICAgIGlmICghdGhpcy5pZnJhbWUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgdGhpcy5pZnJhbWVXaWR0aCA9IHRoaXMuaWZyYW1lV2lkdGggfHwgK3RoaXMuaWZyYW1lLndpZHRoO1xuXG4gICAgICAgIGNvbnN0IHdpbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5hZC5nZXRTdGF0ZSgpLFxuICAgICAgICAgICAgd2lkdGggPSAwO1xuXG4gICAgICAgIHN0YXRlLnNpemVzLmZvckVhY2goc2l6ZSA9PiB7XG4gICAgICAgICAgICBpZiAoc2l6ZVswXSA8IHdpbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSBNYXRoLm1heCh3aWR0aCwgc2l6ZVswXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzdGF0ZS5zaXplcy5sZW5ndGggPiAxICYmIHdpZHRoICE9PSB0aGlzLmlmcmFtZVdpZHRoKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IHRoaXMuYWQuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lV2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aCArICcnKTtcbiAgICAgICAgICAgIHRoaXMuZGZwUmVmcmVzaC5zbG90UmVmcmVzaCh0aGlzLnNsb3QsIHN0YXRlLnJlZnJlc2gpLnRoZW4oc2xvdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZC5hZnRlclJlZnJlc2guZW1pdCh7IHR5cGU6ICdyZXNpemUnLCBzbG90OiBzbG90IH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuaWZyYW1lID0gdGhpcy5nZXRJZnJhbWUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SWZyYW1lKCkge1xuICAgICAgICBjb25zdCBhZDogRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgaWZyYW1lID0gYWQucXVlcnlTZWxlY3RvcignaWZyYW1lJyk7XG4gICAgICAgIGlmIChpZnJhbWUgJiYgK2lmcmFtZS53aWR0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBpZnJhbWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=