/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.ad.afterRefresh.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.slot = event.slot;
        }));
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
        state.sizes.forEach((/**
         * @param {?} size
         * @return {?}
         */
        function (size) {
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
            function (slot) {
                _this.ad.afterRefresh.emit({ type: 'resize', slot: slot });
                _this.iframe = _this.getIframe();
            }));
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
        { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return DfpAdDirective; })),] }] },
        { type: DfpRefreshService }
    ]; };
    DfpAdResponsiveDirective.propDecorators = {
        normalizeIframe: [{ type: HostListener, args: ['window:resize',] }]
    };
    return DfpAdResponsiveDirective;
}());
export { DfpAdResponsiveDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWFkLXJlc3BvbnNpdmUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZS9kZnAtYWQtcmVzcG9uc2l2ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQUUsVUFBVSxFQUNyQixNQUFNLEVBQUUsVUFBVSxFQUNsQixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRW5FO0lBU0ksa0NBQ1ksVUFBc0IsRUFFdEIsRUFBa0IsRUFDbEIsVUFBNkI7UUFKekMsaUJBU0M7UUFSVyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBRXRCLE9BQUUsR0FBRixFQUFFLENBQWdCO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBRXJDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLEtBQUs7WUFDaEMsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzNCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUdELGtEQUFlOzs7SUFEZjtRQUFBLGlCQThCQztRQTVCRyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFLE9BQU8sS0FBSyxDQUFDO1NBQUU7UUFFbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7O1lBRXBELFFBQVEsR0FBRyxNQUFNLENBQUMsVUFBVTs7WUFFOUIsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFOztZQUMxQixLQUFLLEdBQUcsQ0FBQztRQUViLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsSUFBSTtZQUNwQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLEVBQUU7Z0JBQ3BCLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwQztRQUNMLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdEQsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJOzs7O1lBQUMsVUFBQSxJQUFJO2dCQUMzRCxLQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNuQyxDQUFDLEVBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7OztJQUVELDRDQUFTOzs7SUFBVDs7WUFDVSxFQUFFLEdBQVksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhOztZQUM3QyxNQUFNLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDdkMsSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtZQUM3QixPQUFPLE1BQU0sQ0FBQztTQUNqQjtJQUNMLENBQUM7O2dCQTFESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtpQkFDakM7Ozs7Z0JBVmMsVUFBVTtnQkFLaEIsY0FBYyx1QkFjZCxNQUFNLFNBQUMsVUFBVTs7O3dCQUFDLGNBQU0sT0FBQSxjQUFjLEVBQWQsQ0FBYyxFQUFDO2dCQWJ2QyxpQkFBaUI7OztrQ0FzQnJCLFlBQVksU0FBQyxlQUFlOztJQXVDakMsK0JBQUM7Q0FBQSxBQTNERCxJQTJEQztTQXhEWSx3QkFBd0I7Ozs7OztJQUVqQywwQ0FBa0M7Ozs7O0lBQ2xDLCtDQUE0Qjs7Ozs7SUFDNUIsd0NBQWtCOzs7OztJQUdkLDhDQUE4Qjs7Ozs7SUFDOUIsc0NBQzBCOzs7OztJQUMxQiw4Q0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgRWxlbWVudFJlZixcbiAgICBJbmplY3QsIGZvcndhcmRSZWYsXG4gICAgSG9zdExpc3RlbmVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEZnBBZERpcmVjdGl2ZSB9IGZyb20gJy4vZGZwLWFkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZnBSZWZyZXNoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvZGZwLXJlZnJlc2guc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZGZwLWFkW3Jlc3BvbnNpdmVdJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBBZFJlc3BvbnNpdmVEaXJlY3RpdmUge1xuXG4gICAgcHJpdmF0ZSBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50O1xuICAgIHByaXZhdGUgaWZyYW1lV2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIHNsb3Q6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXG4gICAgICAgIHByaXZhdGUgYWQ6IERmcEFkRGlyZWN0aXZlLFxuICAgICAgICBwcml2YXRlIGRmcFJlZnJlc2g6IERmcFJlZnJlc2hTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMuYWQuYWZ0ZXJSZWZyZXNoLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNsb3QgPSBldmVudC5zbG90O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcbiAgICBub3JtYWxpemVJZnJhbWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmFkLmlzSGlkZGVuKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pZnJhbWUgPSB0aGlzLmlmcmFtZSB8fCB0aGlzLmdldElmcmFtZSgpO1xuICAgICAgICBpZiAoIXRoaXMuaWZyYW1lKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIHRoaXMuaWZyYW1lV2lkdGggPSB0aGlzLmlmcmFtZVdpZHRoIHx8ICt0aGlzLmlmcmFtZS53aWR0aDtcblxuICAgICAgICBjb25zdCB3aW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuYWQuZ2V0U3RhdGUoKSxcbiAgICAgICAgICAgIHdpZHRoID0gMDtcblxuICAgICAgICBzdGF0ZS5zaXplcy5mb3JFYWNoKHNpemUgPT4ge1xuICAgICAgICAgICAgaWYgKHNpemVbMF0gPCB3aW5XaWR0aCkge1xuICAgICAgICAgICAgICAgIHdpZHRoID0gTWF0aC5tYXgod2lkdGgsIHNpemVbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc3RhdGUuc2l6ZXMubGVuZ3RoID4gMSAmJiB3aWR0aCAhPT0gdGhpcy5pZnJhbWVXaWR0aCkge1xuICAgICAgICAgICAgc3RhdGUgPSB0aGlzLmFkLmdldFN0YXRlKCk7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZVdpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2lkdGggKyAnJyk7XG4gICAgICAgICAgICB0aGlzLmRmcFJlZnJlc2guc2xvdFJlZnJlc2godGhpcy5zbG90LCBzdGF0ZS5yZWZyZXNoKS50aGVuKHNsb3QgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWQuYWZ0ZXJSZWZyZXNoLmVtaXQoeyB0eXBlOiAncmVzaXplJywgc2xvdDogc2xvdCB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmlmcmFtZSA9IHRoaXMuZ2V0SWZyYW1lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldElmcmFtZSgpIHtcbiAgICAgICAgY29uc3QgYWQ6IEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgIGlmcmFtZSA9IGFkLnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZScpO1xuICAgICAgICBpZiAoaWZyYW1lICYmICtpZnJhbWUud2lkdGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gaWZyYW1lO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19