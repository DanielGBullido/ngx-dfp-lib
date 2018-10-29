/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            val.forEach(v => this.addValue(v));
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
        if (value && !this.values.find(item => item === value)) {
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
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpAdDirective),] }] }
];
DfpTargetingDirective.propDecorators = {
    key: [{ type: Input }],
    value: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DfpTargetingDirective.prototype.key;
    /** @type {?} */
    DfpTargetingDirective.prototype.values;
    /** @type {?} */
    DfpTargetingDirective.prototype.ad;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXRhcmdldGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlL2RmcC10YXJnZXRpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBS3BELE1BQU07Ozs7SUFlSixZQUVVLEVBQWtCO1FBQWxCLE9BQUUsR0FBRixFQUFFLENBQWdCO3NCQUpYLEVBQUU7S0FLZDs7Ozs7SUFkTCxJQUNJLEtBQUssQ0FBQyxHQUEyQjtRQUNuQyxFQUFFLENBQUMsQ0FBQyxHQUFHLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6QixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BCO0tBQ0Y7Ozs7SUFTRCxrQkFBa0I7O1FBQ2hCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNqQzs7OztJQUVELFVBQVU7UUFDUixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxJQUFJLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDNUQ7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sSUFBSSxrQkFBa0IsQ0FBQyxlQUFlLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzlEO0tBQ0Y7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ25CLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCxRQUFRLENBQUMsS0FBSztRQUNaLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6QjtLQUNGOzs7WUFqREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2FBQzFCOzs7O1lBSlEsY0FBYyx1QkFxQmxCLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDOzs7a0JBZHpDLEtBQUs7b0JBRUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJDb250ZW50SW5pdCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBERlBJbmNvbXBsZXRlRXJyb3IgfSBmcm9tICcuLi9jbGFzcyc7XG5pbXBvcnQgeyBEZnBBZERpcmVjdGl2ZSB9IGZyb20gJy4vZGZwLWFkLmRpcmVjdGl2ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2RmcC10YXJnZXRpbmcnXG59KVxuZXhwb3J0IGNsYXNzIERmcFRhcmdldGluZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuXG4gIEBJbnB1dCgpIGtleTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZSh2YWw6IHN0cmluZyB8IEFycmF5PHN0cmluZz4pIHtcbiAgICBpZiAodmFsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHZhbC5mb3JFYWNoKHYgPT4gdGhpcy5hZGRWYWx1ZSh2KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkVmFsdWUodmFsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHZhbHVlcyA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXG4gICAgcHJpdmF0ZSBhZDogRGZwQWREaXJlY3RpdmVcbiAgKSB7IH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgY29uc3QgdGFyZ2V0aW5nID0gdGhpcy5nZXRTdGF0ZSgpO1xuICAgIHRoaXMuYWQuYWRkVGFyZ2V0aW5nKHRhcmdldGluZyk7XG4gIH1cblxuICBjaGVja1ZhbGlkKCkge1xuICAgIGlmICh0aGlzLmtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgREZQSW5jb21wbGV0ZUVycm9yKCdkZnAtdGFyZ2V0aW5nJywgJ2tleScsIHRydWUpO1xuICAgIH1cbiAgICBpZiAodGhpcy52YWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgREZQSW5jb21wbGV0ZUVycm9yKCdkZnAtdGFyZ2V0aW5nJywgJ3ZhbHVlJywgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0U3RhdGUoKSB7XG4gICAgdGhpcy5jaGVja1ZhbGlkKCk7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgICAga2V5OiB0aGlzLmtleSxcbiAgICAgIHZhbHVlczogdGhpcy52YWx1ZXNcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlICYmICF0aGlzLnZhbHVlcy5maW5kKGl0ZW0gPT4gaXRlbSA9PT0gdmFsdWUpKSB7XG4gICAgICB0aGlzLnZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cblxufVxuIl19