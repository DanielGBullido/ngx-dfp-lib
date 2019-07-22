/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Inject, forwardRef, Input } from '@angular/core';
import { DfpAdDirective } from './dfp-ad.directive';
var DfpResponsiveDirective = /** @class */ (function () {
    function DfpResponsiveDirective(ad) {
        this.ad = ad;
        this.viewport = [0, 0];
        this.adSizes = [];
    }
    /**
     * @return {?}
     */
    DfpResponsiveDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.ad.addResponsiveMapping(this.getState());
    };
    Object.defineProperty(DfpResponsiveDirective.prototype, "viewWidth", {
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val > 0) {
                this.viewport[0] = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DfpResponsiveDirective.prototype, "viewHeight", {
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val > 0) {
                this.viewport[1] = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} size
     * @return {?}
     */
    DfpResponsiveDirective.prototype.addSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this.adSizes.push(size);
    };
    /**
     * @return {?}
     */
    DfpResponsiveDirective.prototype.getState = /**
     * @return {?}
     */
    function () {
        return Object.freeze({
            viewportSize: this.viewport,
            adSizes: this.adSizes
        });
    };
    DfpResponsiveDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-responsive'
                },] }
    ];
    /** @nocollapse */
    DfpResponsiveDirective.ctorParameters = function () { return [
        { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return DfpAdDirective; })),] }] }
    ]; };
    DfpResponsiveDirective.propDecorators = {
        viewport: [{ type: Input }],
        adSizes: [{ type: Input }],
        viewWidth: [{ type: Input }],
        viewHeight: [{ type: Input }]
    };
    return DfpResponsiveDirective;
}());
export { DfpResponsiveDirective };
if (false) {
    /** @type {?} */
    DfpResponsiveDirective.prototype.viewport;
    /** @type {?} */
    DfpResponsiveDirective.prototype.adSizes;
    /**
     * @type {?}
     * @private
     */
    DfpResponsiveDirective.prototype.ad;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXJlc3BvbnNpdmUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZS9kZnAtcmVzcG9uc2l2ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBEO0lBUUUsZ0NBRVUsRUFBa0I7UUFBbEIsT0FBRSxHQUFGLEVBQUUsQ0FBZ0I7UUFMbkIsYUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLFlBQU8sR0FBRyxFQUFFLENBQUM7SUFLbEIsQ0FBQzs7OztJQUVMLHlDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELHNCQUNJLDZDQUFTOzs7OztRQURiLFVBQ2MsR0FBVztZQUN2QixJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDeEI7UUFDSCxDQUFDOzs7T0FBQTtJQUVELHNCQUNJLDhDQUFVOzs7OztRQURkLFVBQ2UsR0FBVztZQUN4QixJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDeEI7UUFDSCxDQUFDOzs7T0FBQTs7Ozs7SUFFRCx3Q0FBTzs7OztJQUFQLFVBQVEsSUFBSTtRQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCx5Q0FBUTs7O0lBQVI7UUFDRSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbkIsWUFBWSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQzNCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixDQUFDLENBQUM7SUFDTCxDQUFDOztnQkF4Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCOzs7O2dCQUpRLGNBQWMsdUJBV2xCLE1BQU0sU0FBQyxVQUFVOzs7d0JBQUMsY0FBTSxPQUFBLGNBQWMsRUFBZCxDQUFjLEVBQUM7OzsyQkFKekMsS0FBSzswQkFDTCxLQUFLOzRCQVdMLEtBQUs7NkJBT0wsS0FBSzs7SUFpQlIsNkJBQUM7Q0FBQSxBQXpDRCxJQXlDQztTQXRDWSxzQkFBc0I7OztJQUVqQywwQ0FBMkI7O0lBQzNCLHlDQUFzQjs7Ozs7SUFHcEIsb0NBQzBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3QsIGZvcndhcmRSZWYsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1hZC5kaXJlY3RpdmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkZnAtcmVzcG9uc2l2ZSdcbn0pXG5leHBvcnQgY2xhc3MgRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgdmlld3BvcnQgPSBbMCwgMF07XG4gIEBJbnB1dCgpIGFkU2l6ZXMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwQWREaXJlY3RpdmUpKVxuICAgIHByaXZhdGUgYWQ6IERmcEFkRGlyZWN0aXZlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hZC5hZGRSZXNwb25zaXZlTWFwcGluZyh0aGlzLmdldFN0YXRlKCkpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHZpZXdXaWR0aCh2YWw6IG51bWJlcikge1xuICAgIGlmICh2YWwgPiAwKSB7XG4gICAgICB0aGlzLnZpZXdwb3J0WzBdID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB2aWV3SGVpZ2h0KHZhbDogbnVtYmVyKSB7XG4gICAgaWYgKHZhbCA+IDApIHtcbiAgICAgIHRoaXMudmlld3BvcnRbMV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgYWRkU2l6ZShzaXplKSB7XG4gICAgdGhpcy5hZFNpemVzLnB1c2goc2l6ZSk7XG4gIH1cblxuICBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICB2aWV3cG9ydFNpemU6IHRoaXMudmlld3BvcnQsXG4gICAgICBhZFNpemVzOiB0aGlzLmFkU2l6ZXNcbiAgICB9KTtcbiAgfVxufVxuIl19