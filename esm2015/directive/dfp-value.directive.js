/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Inject, forwardRef } from '@angular/core';
import { DfpTargetingDirective } from './dfp-targeting.directive';
export class DfpValueDirective {
    /**
     * @param {?} elementRef
     * @param {?} targeting
     */
    constructor(elementRef, targeting) {
        this.elementRef = elementRef;
        this.targeting = targeting;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.targeting.addValue(this.elementRef.nativeElement.innerText);
    }
}
DfpValueDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-value'
            },] }
];
/** @nocollapse */
DfpValueDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DfpTargetingDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpTargetingDirective),] }] }
];
if (false) {
    /** @type {?} */
    DfpValueDirective.prototype.elementRef;
    /** @type {?} */
    DfpValueDirective.prototype.targeting;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXZhbHVlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLXZhbHVlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxVQUFVLEVBQ3JCLE1BQU0sRUFBRSxVQUFVLEVBRW5CLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBS2xFLE1BQU07Ozs7O0lBRUosWUFDVSxZQUVBLFNBQWdDO1FBRmhDLGVBQVUsR0FBVixVQUFVO1FBRVYsY0FBUyxHQUFULFNBQVMsQ0FBdUI7S0FDckM7Ozs7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDbEU7OztZQWJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVzthQUN0Qjs7OztZQVRZLFVBQVU7WUFLZCxxQkFBcUIsdUJBU3pCLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMscUJBQXFCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXG4gIEluamVjdCwgZm9yd2FyZFJlZixcbiAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEZnBUYXJnZXRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2RmcC10YXJnZXRpbmcuZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGZwLXZhbHVlJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBWYWx1ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBUYXJnZXRpbmdEaXJlY3RpdmUpKVxuICAgIHByaXZhdGUgdGFyZ2V0aW5nOiBEZnBUYXJnZXRpbmdEaXJlY3RpdmVcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnRhcmdldGluZy5hZGRWYWx1ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbm5lclRleHQpO1xuICB9XG5cbn1cbiJdfQ==