/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Inject, forwardRef } from '@angular/core';
import { DfpAdDirective } from './dfp-ad.directive';
var DfpExclusionDirective = /** @class */ (function () {
    function DfpExclusionDirective(elementRef, ad) {
        this.elementRef = elementRef;
        this.ad = ad;
    }
    /**
     * @return {?}
     */
    DfpExclusionDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.ad.addExclusion(this.elementRef.nativeElement.innerText);
    };
    DfpExclusionDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-exclusion'
                },] }
    ];
    /** @nocollapse */
    DfpExclusionDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return DfpAdDirective; })),] }] }
    ]; };
    return DfpExclusionDirective;
}());
export { DfpExclusionDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DfpExclusionDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    DfpExclusionDirective.prototype.ad;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWV4Y2x1c2lvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlL2RmcC1leGNsdXNpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLFVBQVUsRUFDckIsTUFBTSxFQUFFLFVBQVUsRUFFbkIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBEO0lBS0UsK0JBQ1UsVUFBc0IsRUFFdEIsRUFBa0I7UUFGbEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUV0QixPQUFFLEdBQUYsRUFBRSxDQUFnQjtJQUN6QixDQUFDOzs7O0lBRUosd0NBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEUsQ0FBQzs7Z0JBYkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO2lCQUMxQjs7OztnQkFUWSxVQUFVO2dCQUtkLGNBQWMsdUJBU2xCLE1BQU0sU0FBQyxVQUFVOzs7d0JBQUMsY0FBTSxPQUFBLGNBQWMsRUFBZCxDQUFjLEVBQUM7O0lBUTVDLDRCQUFDO0NBQUEsQUFmRCxJQWVDO1NBWlkscUJBQXFCOzs7Ozs7SUFHOUIsMkNBQThCOzs7OztJQUM5QixtQ0FDMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXG4gIEluamVjdCwgZm9yd2FyZFJlZixcbiAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEZnBBZERpcmVjdGl2ZSB9IGZyb20gJy4vZGZwLWFkLmRpcmVjdGl2ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2RmcC1leGNsdXNpb24nXG59KVxuZXhwb3J0IGNsYXNzIERmcEV4Y2x1c2lvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXG4gICAgcHJpdmF0ZSBhZDogRGZwQWREaXJlY3RpdmVcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWQuYWRkRXhjbHVzaW9uKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmlubmVyVGV4dCk7XG4gIH1cblxufVxuIl19