/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Inject, forwardRef, Optional } from '@angular/core';
import { DfpAdDirective } from './dfp-ad.directive';
import { DfpResponsiveDirective } from './dfp-responsive.directive';
var DfpSizeDirective = /** @class */ (function () {
    function DfpSizeDirective(elementRef, ad, resp) {
        this.elementRef = elementRef;
        this.ad = ad;
        this.resp = resp;
    }
    /**
     * @return {?}
     */
    DfpSizeDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var target = this.resp || this.ad;
        /** @type {?} */
        var innerText = this.elementRef.nativeElement.innerText;
        if (this.width && this.height) {
            target.addSize([this.width, this.height]);
        }
        else if (innerText.trim() !== '') {
            target.addSize(innerText);
        }
    };
    DfpSizeDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-size'
                },] }
    ];
    /** @nocollapse */
    DfpSizeDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return DfpAdDirective; })),] }] },
        { type: DfpResponsiveDirective, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return DfpResponsiveDirective; })),] }] }
    ]; };
    DfpSizeDirective.propDecorators = {
        width: [{ type: Input }],
        height: [{ type: Input }]
    };
    return DfpSizeDirective;
}());
export { DfpSizeDirective };
if (false) {
    /** @type {?} */
    DfpSizeDirective.prototype.width;
    /** @type {?} */
    DfpSizeDirective.prototype.height;
    /**
     * @type {?}
     * @private
     */
    DfpSizeDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    DfpSizeDirective.prototype.ad;
    /**
     * @type {?}
     * @private
     */
    DfpSizeDirective.prototype.resp;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXNpemUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZS9kZnAtc2l6ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFVLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFcEU7SUFRRSwwQkFDVSxVQUFzQixFQUV0QixFQUFrQixFQUVsQixJQUE0QjtRQUo1QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBRXRCLE9BQUUsR0FBRixFQUFFLENBQWdCO1FBRWxCLFNBQUksR0FBSixJQUFJLENBQXdCO0lBQ2xDLENBQUM7Ozs7SUFFTCxtQ0FBUTs7O0lBQVI7O1lBQ1EsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7O1lBQ2pDLFNBQVMsR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTO1FBRTdELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQzNDO2FBQU0sSUFBSSxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2xDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0I7SUFDSCxDQUFDOztnQkF6QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxVQUFVO2lCQUNyQjs7OztnQkFQbUIsVUFBVTtnQkFFckIsY0FBYyx1QkFhbEIsTUFBTSxTQUFDLFVBQVU7Ozt3QkFBQyxjQUFNLE9BQUEsY0FBYyxFQUFkLENBQWMsRUFBQztnQkFabkMsc0JBQXNCLHVCQWMxQixRQUFRLFlBQUksTUFBTSxTQUFDLFVBQVU7Ozt3QkFBQyxjQUFNLE9BQUEsc0JBQXNCLEVBQXRCLENBQXNCLEVBQUM7Ozt3QkFQN0QsS0FBSzt5QkFDTCxLQUFLOztJQXFCUix1QkFBQztDQUFBLEFBM0JELElBMkJDO1NBeEJZLGdCQUFnQjs7O0lBRTNCLGlDQUF1Qjs7SUFDdkIsa0NBQXdCOzs7OztJQUd0QixzQ0FBOEI7Ozs7O0lBQzlCLDhCQUMwQjs7Ozs7SUFDMUIsZ0NBQ29DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmLCBPbkluaXQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcFJlc3BvbnNpdmVEaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1yZXNwb25zaXZlLmRpcmVjdGl2ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2RmcC1zaXplJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBTaXplRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcEFkRGlyZWN0aXZlKSlcbiAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSkpXG4gICAgcHJpdmF0ZSByZXNwOiBEZnBSZXNwb25zaXZlRGlyZWN0aXZlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5yZXNwIHx8IHRoaXMuYWQsXG4gICAgICBpbm5lclRleHQ6IHN0cmluZyA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmlubmVyVGV4dDtcblxuICAgIGlmICh0aGlzLndpZHRoICYmIHRoaXMuaGVpZ2h0KSB7XG4gICAgICB0YXJnZXQuYWRkU2l6ZShbdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdKTtcbiAgICB9IGVsc2UgaWYgKGlubmVyVGV4dC50cmltKCkgIT09ICcnKSB7XG4gICAgICB0YXJnZXQuYWRkU2l6ZShpbm5lclRleHQpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=