/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Inject, forwardRef } from '@angular/core';
import { DFPIncompleteError } from '../class';
import { DfpAdDirective } from './dfp-ad.directive';
var DfpTargetingDirective = /** @class */ (function () {
    function DfpTargetingDirective(ad) {
        this.ad = ad;
        this.values = [];
    }
    Object.defineProperty(DfpTargetingDirective.prototype, "value", {
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            var _this = this;
            if (val instanceof Array) {
                val.forEach((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return _this.addValue(v); }));
            }
            else {
                this.addValue(val);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DfpTargetingDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var targeting = this.getState();
        this.ad.addTargeting(targeting);
    };
    /**
     * @return {?}
     */
    DfpTargetingDirective.prototype.checkValid = /**
     * @return {?}
     */
    function () {
        if (this.key === undefined) {
            throw new DFPIncompleteError('dfp-targeting', 'key', true);
        }
        if (this.values.length === 0) {
            throw new DFPIncompleteError('dfp-targeting', 'value', true);
        }
    };
    /**
     * @return {?}
     */
    DfpTargetingDirective.prototype.getState = /**
     * @return {?}
     */
    function () {
        this.checkValid();
        return Object.freeze({
            key: this.key,
            values: this.values
        });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DfpTargetingDirective.prototype.addValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value && !this.values.find((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item === value; }))) {
            this.values.push(value);
        }
    };
    DfpTargetingDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-targeting'
                },] }
    ];
    /** @nocollapse */
    DfpTargetingDirective.ctorParameters = function () { return [
        { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return DfpAdDirective; })),] }] }
    ]; };
    DfpTargetingDirective.propDecorators = {
        key: [{ type: Input }],
        value: [{ type: Input }]
    };
    return DfpTargetingDirective;
}());
export { DfpTargetingDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXRhcmdldGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlL2RmcC10YXJnZXRpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBEO0lBa0JFLCtCQUVVLEVBQWtCO1FBQWxCLE9BQUUsR0FBRixFQUFFLENBQWdCO1FBSnBCLFdBQU0sR0FBRyxFQUFFLENBQUM7SUFLaEIsQ0FBQztJQWRMLHNCQUNJLHdDQUFLOzs7OztRQURULFVBQ1UsR0FBMkI7WUFEckMsaUJBT0M7WUFMQyxJQUFJLEdBQUcsWUFBWSxLQUFLLEVBQUU7Z0JBQ3hCLEdBQUcsQ0FBQyxPQUFPOzs7O2dCQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBaEIsQ0FBZ0IsRUFBQyxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDcEI7UUFDSCxDQUFDOzs7T0FBQTs7OztJQVNELGtEQUFrQjs7O0lBQWxCOztZQUNRLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2pDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCwwQ0FBVTs7O0lBQVY7UUFDRSxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQzFCLE1BQU0sSUFBSSxrQkFBa0IsQ0FBQyxlQUFlLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDOUQ7SUFDSCxDQUFDOzs7O0lBRUQsd0NBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNuQixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCx3Q0FBUTs7OztJQUFSLFVBQVMsS0FBSztRQUNaLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJOzs7O1FBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLEtBQUssS0FBSyxFQUFkLENBQWMsRUFBQyxFQUFFO1lBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQzs7Z0JBakRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtpQkFDMUI7Ozs7Z0JBSlEsY0FBYyx1QkFxQmxCLE1BQU0sU0FBQyxVQUFVOzs7d0JBQUMsY0FBTSxPQUFBLGNBQWMsRUFBZCxDQUFjLEVBQUM7OztzQkFkekMsS0FBSzt3QkFFTCxLQUFLOztJQTRDUiw0QkFBQztDQUFBLEFBbkRELElBbURDO1NBaERZLHFCQUFxQjs7O0lBRWhDLG9DQUFxQjs7Ozs7SUFXckIsdUNBQW9COzs7OztJQUdsQixtQ0FDMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEFmdGVyQ29udGVudEluaXQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgREZQSW5jb21wbGV0ZUVycm9yIH0gZnJvbSAnLi4vY2xhc3MnO1xuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1hZC5kaXJlY3RpdmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkZnAtdGFyZ2V0aW5nJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBUYXJnZXRpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuICBASW5wdXQoKSBrZXk6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUodmFsOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+KSB7XG4gICAgaWYgKHZhbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICB2YWwuZm9yRWFjaCh2ID0+IHRoaXMuYWRkVmFsdWUodikpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZFZhbHVlKHZhbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB2YWx1ZXMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwQWREaXJlY3RpdmUpKVxuICAgIHByaXZhdGUgYWQ6IERmcEFkRGlyZWN0aXZlXG4gICkgeyB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGNvbnN0IHRhcmdldGluZyA9IHRoaXMuZ2V0U3RhdGUoKTtcbiAgICB0aGlzLmFkLmFkZFRhcmdldGluZyh0YXJnZXRpbmcpO1xuICB9XG5cbiAgY2hlY2tWYWxpZCgpIHtcbiAgICBpZiAodGhpcy5rZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLXRhcmdldGluZycsICdrZXknLCB0cnVlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLXRhcmdldGluZycsICd2YWx1ZScsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGdldFN0YXRlKCkge1xuICAgIHRoaXMuY2hlY2tWYWxpZCgpO1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcbiAgICAgIGtleTogdGhpcy5rZXksXG4gICAgICB2YWx1ZXM6IHRoaXMudmFsdWVzXG4gICAgfSk7XG4gIH1cblxuICBhZGRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAmJiAhdGhpcy52YWx1ZXMuZmluZChpdGVtID0+IGl0ZW0gPT09IHZhbHVlKSkge1xuICAgICAgdGhpcy52YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==