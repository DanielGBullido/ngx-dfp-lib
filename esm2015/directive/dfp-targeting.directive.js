/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Inject, forwardRef } from '@angular/core';
import { DFPIncompleteError } from '../class';
import { DfpAdDirective } from './dfp-ad.directive';
export class DfpTargetingDirective {
    /**
     * @param {?} ad
     */
    constructor(ad) {
        this.ad = ad;
        this.values = [];
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set value(val) {
        if (val instanceof Array) {
            val.forEach((/**
             * @param {?} v
             * @return {?}
             */
            v => this.addValue(v)));
        }
        else {
            this.addValue(val);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        /** @type {?} */
        const targeting = this.getState();
        this.ad.addTargeting(targeting);
    }
    /**
     * @return {?}
     */
    checkValid() {
        if (this.key === undefined) {
            throw new DFPIncompleteError('dfp-targeting', 'key', true);
        }
        if (this.values.length === 0) {
            throw new DFPIncompleteError('dfp-targeting', 'value', true);
        }
    }
    /**
     * @return {?}
     */
    getState() {
        this.checkValid();
        return Object.freeze({
            key: this.key,
            values: this.values
        });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    addValue(value) {
        if (value && !this.values.find((/**
         * @param {?} item
         * @return {?}
         */
        item => item === value))) {
            this.values.push(value);
        }
    }
}
DfpTargetingDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-targeting'
            },] }
];
/** @nocollapse */
DfpTargetingDirective.ctorParameters = () => [
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => DfpAdDirective)),] }] }
];
DfpTargetingDirective.propDecorators = {
    key: [{ type: Input }],
    value: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DfpTargetingDirective.prototype.key;
    /**
     * @type {?}
     * @private
     */
    DfpTargetingDirective.prototype.values;
    /**
     * @type {?}
     * @private
     */
    DfpTargetingDirective.prototype.ad;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXRhcmdldGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlL2RmcC10YXJnZXRpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBS3BELE1BQU0sT0FBTyxxQkFBcUI7Ozs7SUFlaEMsWUFFVSxFQUFrQjtRQUFsQixPQUFFLEdBQUYsRUFBRSxDQUFnQjtRQUpwQixXQUFNLEdBQUcsRUFBRSxDQUFDO0lBS2hCLENBQUM7Ozs7O0lBZEwsSUFDSSxLQUFLLENBQUMsR0FBMkI7UUFDbkMsSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFO1lBQ3hCLEdBQUcsQ0FBQyxPQUFPOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDOzs7O0lBU0Qsa0JBQWtCOztjQUNWLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2pDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCxVQUFVO1FBQ1IsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUMxQixNQUFNLElBQUksa0JBQWtCLENBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1RDtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzVCLE1BQU0sSUFBSSxrQkFBa0IsQ0FBQyxlQUFlLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzlEO0lBQ0gsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ25CLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxLQUFLO1FBQ1osSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7Ozs7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6QjtJQUNILENBQUM7OztZQWpERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7YUFDMUI7Ozs7WUFKUSxjQUFjLHVCQXFCbEIsTUFBTSxTQUFDLFVBQVU7OztvQkFBQyxHQUFHLEVBQUUsQ0FBQyxjQUFjLEVBQUM7OztrQkFkekMsS0FBSztvQkFFTCxLQUFLOzs7O0lBRk4sb0NBQXFCOzs7OztJQVdyQix1Q0FBb0I7Ozs7O0lBR2xCLG1DQUMwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJDb250ZW50SW5pdCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBERlBJbmNvbXBsZXRlRXJyb3IgfSBmcm9tICcuLi9jbGFzcyc7XG5pbXBvcnQgeyBEZnBBZERpcmVjdGl2ZSB9IGZyb20gJy4vZGZwLWFkLmRpcmVjdGl2ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2RmcC10YXJnZXRpbmcnXG59KVxuZXhwb3J0IGNsYXNzIERmcFRhcmdldGluZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuXG4gIEBJbnB1dCgpIGtleTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZSh2YWw6IHN0cmluZyB8IEFycmF5PHN0cmluZz4pIHtcbiAgICBpZiAodmFsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHZhbC5mb3JFYWNoKHYgPT4gdGhpcy5hZGRWYWx1ZSh2KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkVmFsdWUodmFsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHZhbHVlcyA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXG4gICAgcHJpdmF0ZSBhZDogRGZwQWREaXJlY3RpdmVcbiAgKSB7IH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgY29uc3QgdGFyZ2V0aW5nID0gdGhpcy5nZXRTdGF0ZSgpO1xuICAgIHRoaXMuYWQuYWRkVGFyZ2V0aW5nKHRhcmdldGluZyk7XG4gIH1cblxuICBjaGVja1ZhbGlkKCkge1xuICAgIGlmICh0aGlzLmtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgREZQSW5jb21wbGV0ZUVycm9yKCdkZnAtdGFyZ2V0aW5nJywgJ2tleScsIHRydWUpO1xuICAgIH1cbiAgICBpZiAodGhpcy52YWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgREZQSW5jb21wbGV0ZUVycm9yKCdkZnAtdGFyZ2V0aW5nJywgJ3ZhbHVlJywgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0U3RhdGUoKSB7XG4gICAgdGhpcy5jaGVja1ZhbGlkKCk7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgICAga2V5OiB0aGlzLmtleSxcbiAgICAgIHZhbHVlczogdGhpcy52YWx1ZXNcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlICYmICF0aGlzLnZhbHVlcy5maW5kKGl0ZW0gPT4gaXRlbSA9PT0gdmFsdWUpKSB7XG4gICAgICB0aGlzLnZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cblxufVxuIl19