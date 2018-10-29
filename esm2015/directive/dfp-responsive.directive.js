/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Inject, forwardRef, Input } from '@angular/core';
import { DfpAdDirective } from './dfp-ad.directive';
export class DfpResponsiveDirective {
    /**
     * @param {?} ad
     */
    constructor(ad) {
        this.ad = ad;
        this.viewport = [0, 0];
        this.adSizes = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.ad.addResponsiveMapping(this.getState());
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set viewWidth(val) {
        if (val > 0) {
            this.viewport[0] = val;
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set viewHeight(val) {
        if (val > 0) {
            this.viewport[1] = val;
        }
    }
    /**
     * @param {?} size
     * @return {?}
     */
    addSize(size) {
        this.adSizes.push(size);
    }
    /**
     * @return {?}
     */
    getState() {
        return Object.freeze({
            viewportSize: this.viewport,
            adSizes: this.adSizes
        });
    }
}
DfpResponsiveDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-responsive'
            },] }
];
/** @nocollapse */
DfpResponsiveDirective.ctorParameters = () => [
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpAdDirective),] }] }
];
DfpResponsiveDirective.propDecorators = {
    viewport: [{ type: Input }],
    adSizes: [{ type: Input }],
    viewWidth: [{ type: Input }],
    viewHeight: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DfpResponsiveDirective.prototype.viewport;
    /** @type {?} */
    DfpResponsiveDirective.prototype.adSizes;
    /** @type {?} */
    DfpResponsiveDirective.prototype.ad;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXJlc3BvbnNpdmUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZS9kZnAtcmVzcG9uc2l2ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBS3BELE1BQU07Ozs7SUFLSixZQUVVLEVBQWtCO1FBQWxCLE9BQUUsR0FBRixFQUFFLENBQWdCO3dCQUxSLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzt1QkFDUCxFQUFFO0tBS2hCOzs7O0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDL0M7Ozs7O0lBRUQsSUFDSSxTQUFTLENBQUMsR0FBVztRQUN2QixFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ3hCO0tBQ0Y7Ozs7O0lBRUQsSUFDSSxVQUFVLENBQUMsR0FBVztRQUN4QixFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ3hCO0tBQ0Y7Ozs7O0lBRUQsT0FBTyxDQUFDLElBQUk7UUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qjs7OztJQUVELFFBQVE7UUFDTixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNuQixZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDM0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3RCLENBQUMsQ0FBQztLQUNKOzs7WUF4Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7YUFDM0I7Ozs7WUFKUSxjQUFjLHVCQVdsQixNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQzs7O3VCQUp6QyxLQUFLO3NCQUNMLEtBQUs7d0JBV0wsS0FBSzt5QkFPTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3QsIGZvcndhcmRSZWYsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1hZC5kaXJlY3RpdmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkZnAtcmVzcG9uc2l2ZSdcbn0pXG5leHBvcnQgY2xhc3MgRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgdmlld3BvcnQgPSBbMCwgMF07XG4gIEBJbnB1dCgpIGFkU2l6ZXMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwQWREaXJlY3RpdmUpKVxuICAgIHByaXZhdGUgYWQ6IERmcEFkRGlyZWN0aXZlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hZC5hZGRSZXNwb25zaXZlTWFwcGluZyh0aGlzLmdldFN0YXRlKCkpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHZpZXdXaWR0aCh2YWw6IG51bWJlcikge1xuICAgIGlmICh2YWwgPiAwKSB7XG4gICAgICB0aGlzLnZpZXdwb3J0WzBdID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB2aWV3SGVpZ2h0KHZhbDogbnVtYmVyKSB7XG4gICAgaWYgKHZhbCA+IDApIHtcbiAgICAgIHRoaXMudmlld3BvcnRbMV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgYWRkU2l6ZShzaXplKSB7XG4gICAgdGhpcy5hZFNpemVzLnB1c2goc2l6ZSk7XG4gIH1cblxuICBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICB2aWV3cG9ydFNpemU6IHRoaXMudmlld3BvcnQsXG4gICAgICBhZFNpemVzOiB0aGlzLmFkU2l6ZXNcbiAgICB9KTtcbiAgfVxufVxuIl19