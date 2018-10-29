/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                val.forEach(function (v) { return _this.addValue(v); });
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
        if (value && !this.values.find(function (item) { return item === value; })) {
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
        { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(function () { return DfpAdDirective; }),] }] }
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
    /** @type {?} */
    DfpTargetingDirective.prototype.values;
    /** @type {?} */
    DfpTargetingDirective.prototype.ad;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXRhcmdldGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlL2RmcC10YXJnZXRpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztJQW9CbEQsK0JBRVUsRUFBa0I7UUFBbEIsT0FBRSxHQUFGLEVBQUUsQ0FBZ0I7c0JBSlgsRUFBRTtLQUtkO0lBZEwsc0JBQ0ksd0NBQUs7Ozs7O1FBRFQsVUFDVSxHQUEyQjtZQURyQyxpQkFPQztZQUxDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO2FBQ3BDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQjtTQUNGOzs7T0FBQTs7OztJQVNELGtEQUFrQjs7O0lBQWxCOztRQUNFLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNqQzs7OztJQUVELDBDQUFVOzs7SUFBVjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLElBQUksa0JBQWtCLENBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1RDtRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxJQUFJLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDOUQ7S0FDRjs7OztJQUVELHdDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNuQixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRUQsd0NBQVE7Ozs7SUFBUixVQUFTLEtBQUs7UUFDWixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksS0FBSyxLQUFLLEVBQWQsQ0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO0tBQ0Y7O2dCQWpERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7aUJBQzFCOzs7O2dCQUpRLGNBQWMsdUJBcUJsQixNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxjQUFjLEVBQWQsQ0FBYyxDQUFDOzs7c0JBZHpDLEtBQUs7d0JBRUwsS0FBSzs7Z0NBWlI7O1NBUWEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlckNvbnRlbnRJbml0LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERGUEluY29tcGxldGVFcnJvciB9IGZyb20gJy4uL2NsYXNzJztcbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGZwLXRhcmdldGluZydcbn0pXG5leHBvcnQgY2xhc3MgRGZwVGFyZ2V0aW5nRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgQElucHV0KCkga2V5OiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlKHZhbDogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPikge1xuICAgIGlmICh2YWwgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdmFsLmZvckVhY2godiA9PiB0aGlzLmFkZFZhbHVlKHYpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRWYWx1ZSh2YWwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdmFsdWVzID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcEFkRGlyZWN0aXZlKSlcbiAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZVxuICApIHsgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBjb25zdCB0YXJnZXRpbmcgPSB0aGlzLmdldFN0YXRlKCk7XG4gICAgdGhpcy5hZC5hZGRUYXJnZXRpbmcodGFyZ2V0aW5nKTtcbiAgfVxuXG4gIGNoZWNrVmFsaWQoKSB7XG4gICAgaWYgKHRoaXMua2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBERlBJbmNvbXBsZXRlRXJyb3IoJ2RmcC10YXJnZXRpbmcnLCAna2V5JywgdHJ1ZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnZhbHVlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBERlBJbmNvbXBsZXRlRXJyb3IoJ2RmcC10YXJnZXRpbmcnLCAndmFsdWUnLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBnZXRTdGF0ZSgpIHtcbiAgICB0aGlzLmNoZWNrVmFsaWQoKTtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICBrZXk6IHRoaXMua2V5LFxuICAgICAgdmFsdWVzOiB0aGlzLnZhbHVlc1xuICAgIH0pO1xuICB9XG5cbiAgYWRkVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgJiYgIXRoaXMudmFsdWVzLmZpbmQoaXRlbSA9PiBpdGVtID09PSB2YWx1ZSkpIHtcbiAgICAgIHRoaXMudmFsdWVzLnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=