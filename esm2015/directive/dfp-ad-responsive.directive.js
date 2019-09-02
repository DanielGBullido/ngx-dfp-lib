/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Inject, forwardRef, HostListener } from '@angular/core';
import { DfpAdDirective } from './dfp-ad.directive';
import { DfpRefreshService } from '../service/dfp-refresh.service';
export class DfpAdResponsiveDirective {
    /**
     * @param {?} elementRef
     * @param {?} ad
     * @param {?} dfpRefresh
     */
    constructor(elementRef, ad, dfpRefresh) {
        this.elementRef = elementRef;
        this.ad = ad;
        this.dfpRefresh = dfpRefresh;
        this.ad.afterRefresh.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            this.slot = event.slot;
        }));
    }
    /**
     * @return {?}
     */
    normalizeIframe() {
        if (this.ad.isHidden) {
            return false;
        }
        this.iframe = this.iframe || this.getIframe();
        if (!this.iframe) {
            return false;
        }
        this.iframeWidth = this.iframeWidth || +this.iframe.width;
        /** @type {?} */
        const winWidth = window.innerWidth;
        /** @type {?} */
        let state = this.ad.getState();
        /** @type {?} */
        let width = 0;
        state.sizes.forEach((/**
         * @param {?} size
         * @return {?}
         */
        size => {
            if (size[0] < winWidth) {
                width = Math.max(width, size[0]);
            }
        }));
        if (state.sizes.length > 1 && width !== this.iframeWidth) {
            state = this.ad.getState();
            this.iframeWidth = width;
            this.iframe.setAttribute('width', width + '');
            this.dfpRefresh.slotRefresh(this.slot, state.refresh).then((/**
             * @param {?} slot
             * @return {?}
             */
            slot => {
                this.ad.afterRefresh.emit({ type: 'resize', slot: slot });
                this.iframe = this.getIframe();
            }));
        }
    }
    /**
     * @return {?}
     */
    getIframe() {
        /** @type {?} */
        const ad = this.elementRef.nativeElement;
        /** @type {?} */
        const iframe = ad.querySelector('iframe');
        if (iframe && +iframe.width > 0) {
            return iframe;
        }
    }
}
DfpAdResponsiveDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-ad[responsive]'
            },] }
];
/** @nocollapse */
DfpAdResponsiveDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => DfpAdDirective)),] }] },
    { type: DfpRefreshService }
];
DfpAdResponsiveDirective.propDecorators = {
    normalizeIframe: [{ type: HostListener, args: ['window:resize',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    DfpAdResponsiveDirective.prototype.iframe;
    /**
     * @type {?}
     * @private
     */
    DfpAdResponsiveDirective.prototype.iframeWidth;
    /**
     * @type {?}
     * @private
     */
    DfpAdResponsiveDirective.prototype.slot;
    /**
     * @type {?}
     * @private
     */
    DfpAdResponsiveDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    DfpAdResponsiveDirective.prototype.ad;
    /**
     * @type {?}
     * @private
     */
    DfpAdResponsiveDirective.prototype.dfpRefresh;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWFkLXJlc3BvbnNpdmUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZS9kZnAtYWQtcmVzcG9uc2l2ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQUUsVUFBVSxFQUNyQixNQUFNLEVBQUUsVUFBVSxFQUNsQixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBS25FLE1BQU0sT0FBTyx3QkFBd0I7Ozs7OztJQU1qQyxZQUNZLFVBQXNCLEVBRXRCLEVBQWtCLEVBQ2xCLFVBQTZCO1FBSDdCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFFdEIsT0FBRSxHQUFGLEVBQUUsQ0FBZ0I7UUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFFckMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUMzQixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFHRCxlQUFlO1FBQ1gsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUNsQixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPLEtBQUssQ0FBQztTQUFFO1FBRW5DLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDOztjQUVwRCxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVU7O1lBRTlCLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTs7WUFDMUIsS0FBSyxHQUFHLENBQUM7UUFFYixLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU87Ozs7UUFBQyxJQUFJLENBQUMsRUFBRTtZQUN2QixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLEVBQUU7Z0JBQ3BCLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwQztRQUNMLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdEQsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJOzs7O1lBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzlELElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzFELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25DLENBQUMsRUFBQyxDQUFDO1NBQ047SUFDTCxDQUFDOzs7O0lBRUQsU0FBUzs7Y0FDQyxFQUFFLEdBQVksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhOztjQUM3QyxNQUFNLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDdkMsSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtZQUM3QixPQUFPLE1BQU0sQ0FBQztTQUNqQjtJQUNMLENBQUM7OztZQTFESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjthQUNqQzs7OztZQVZjLFVBQVU7WUFLaEIsY0FBYyx1QkFjZCxNQUFNLFNBQUMsVUFBVTs7O29CQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsRUFBQztZQWJ2QyxpQkFBaUI7Ozs4QkFzQnJCLFlBQVksU0FBQyxlQUFlOzs7Ozs7O0lBZjdCLDBDQUFrQzs7Ozs7SUFDbEMsK0NBQTRCOzs7OztJQUM1Qix3Q0FBa0I7Ozs7O0lBR2QsOENBQThCOzs7OztJQUM5QixzQ0FDMEI7Ozs7O0lBQzFCLDhDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLFxuICAgIEluamVjdCwgZm9yd2FyZFJlZixcbiAgICBIb3N0TGlzdGVuZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcFJlZnJlc2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9kZnAtcmVmcmVzaC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdkZnAtYWRbcmVzcG9uc2l2ZV0nXG59KVxuZXhwb3J0IGNsYXNzIERmcEFkUmVzcG9uc2l2ZURpcmVjdGl2ZSB7XG5cbiAgICBwcml2YXRlIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBpZnJhbWVXaWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgc2xvdDogYW55O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcEFkRGlyZWN0aXZlKSlcbiAgICAgICAgcHJpdmF0ZSBhZDogRGZwQWREaXJlY3RpdmUsXG4gICAgICAgIHByaXZhdGUgZGZwUmVmcmVzaDogRGZwUmVmcmVzaFNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5hZC5hZnRlclJlZnJlc2guc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2xvdCA9IGV2ZW50LnNsb3Q7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxuICAgIG5vcm1hbGl6ZUlmcmFtZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuYWQuaXNIaWRkZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlmcmFtZSA9IHRoaXMuaWZyYW1lIHx8IHRoaXMuZ2V0SWZyYW1lKCk7XG4gICAgICAgIGlmICghdGhpcy5pZnJhbWUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgdGhpcy5pZnJhbWVXaWR0aCA9IHRoaXMuaWZyYW1lV2lkdGggfHwgK3RoaXMuaWZyYW1lLndpZHRoO1xuXG4gICAgICAgIGNvbnN0IHdpbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5hZC5nZXRTdGF0ZSgpLFxuICAgICAgICAgICAgd2lkdGggPSAwO1xuXG4gICAgICAgIHN0YXRlLnNpemVzLmZvckVhY2goc2l6ZSA9PiB7XG4gICAgICAgICAgICBpZiAoc2l6ZVswXSA8IHdpbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSBNYXRoLm1heCh3aWR0aCwgc2l6ZVswXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzdGF0ZS5zaXplcy5sZW5ndGggPiAxICYmIHdpZHRoICE9PSB0aGlzLmlmcmFtZVdpZHRoKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IHRoaXMuYWQuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lV2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aCArICcnKTtcbiAgICAgICAgICAgIHRoaXMuZGZwUmVmcmVzaC5zbG90UmVmcmVzaCh0aGlzLnNsb3QsIHN0YXRlLnJlZnJlc2gpLnRoZW4oc2xvdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZC5hZnRlclJlZnJlc2guZW1pdCh7IHR5cGU6ICdyZXNpemUnLCBzbG90OiBzbG90IH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuaWZyYW1lID0gdGhpcy5nZXRJZnJhbWUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SWZyYW1lKCkge1xuICAgICAgICBjb25zdCBhZDogRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgaWZyYW1lID0gYWQucXVlcnlTZWxlY3RvcignaWZyYW1lJyk7XG4gICAgICAgIGlmIChpZnJhbWUgJiYgK2lmcmFtZS53aWR0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBpZnJhbWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=