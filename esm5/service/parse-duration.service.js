/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var DFPDurationError = /** @class */ (function (_super) {
    tslib_1.__extends(DFPDurationError, _super);
    function DFPDurationError(interval) {
        return _super.call(this, "Invalid interval: '" + interval + "'ls") || this;
    }
    return DFPDurationError;
}(Error));
var ParseDurationService = /** @class */ (function () {
    function ParseDurationService() {
    }
    /**
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    ParseDurationService.prototype.convertToMilliseconds = /**
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    function (time, unit) {
        console.assert(/^(m?s|min|h)$/g.test(unit));
        if (unit === 'ms') {
            return time;
        }
        if (unit === 's') {
            return time * 1000;
        }
        if (unit === 'min') {
            return time * 60 * 1000;
        }
        return time * 60 * 60 * 1000;
    };
    /**
     * @param {?} match
     * @return {?}
     */
    ParseDurationService.prototype.convert = /**
     * @param {?} match
     * @return {?}
     */
    function (match) {
        /** @type {?} */
        var time = parseFloat(match[1]);
        if (match.length === 2) {
            return time;
        }
        return this.convertToMilliseconds(time, match[2]);
    };
    /**
     * @param {?} interval
     * @return {?}
     */
    ParseDurationService.prototype.parseDuration = /**
     * @param {?} interval
     * @return {?}
     */
    function (interval) {
        if (interval === undefined || interval === null) {
            throw new DFPDurationError(interval);
        }
        if (typeof interval === 'number') {
            return interval;
        }
        if (typeof interval !== 'string') {
            throw new TypeError("'" + interval + "' must be of number or string type");
        }
        /** @type {?} */
        var match = interval.match(/((?:\d+)?.?\d+)(m?s|min|h)?/);
        if (!match) {
            throw new DFPDurationError(interval);
        }
        return this.convert(match);
    };
    ParseDurationService.decorators = [
        { type: Injectable }
    ];
    return ParseDurationService;
}());
export { ParseDurationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtZHVyYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzZXJ2aWNlL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDO0lBQStCLDRDQUFLO0lBQ2xDLDBCQUFZLFFBQVE7ZUFDbEIsa0JBQU0sd0JBQXNCLFFBQVEsUUFBSyxDQUFDO0lBQzVDLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFKRCxDQUErQixLQUFLLEdBSW5DO0FBRUQ7SUFBQTtJQTRDQSxDQUFDOzs7Ozs7SUF6Q0Msb0RBQXFCOzs7OztJQUFyQixVQUFzQixJQUFJLEVBQUUsSUFBSTtRQUM5QixPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTVDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDO1NBQUU7UUFDbkMsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1lBQUUsT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQUU7UUFDekMsSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO1lBQUUsT0FBTyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztTQUFFO1FBRWhELE9BQU8sSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRUQsc0NBQU87Ozs7SUFBUCxVQUFRLEtBQUs7O1lBQ0wsSUFBSSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDO1NBQUU7UUFFeEMsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7O0lBRUQsNENBQWE7Ozs7SUFBYixVQUFjLFFBQVE7UUFFcEIsSUFBSSxRQUFRLEtBQUssU0FBUyxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDL0MsTUFBTSxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDaEMsT0FBTyxRQUFRLENBQUM7U0FDakI7UUFFRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxNQUFNLElBQUksU0FBUyxDQUFDLE1BQUksUUFBUSx1Q0FBb0MsQ0FBQyxDQUFDO1NBQ3ZFOztZQUVLLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDO1FBRTNELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLElBQUksZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdEM7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7Z0JBMUNGLFVBQVU7O0lBNENYLDJCQUFDO0NBQUEsQUE1Q0QsSUE0Q0M7U0EzQ1ksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jbGFzcyBERlBEdXJhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihpbnRlcnZhbCkge1xuICAgIHN1cGVyKGBJbnZhbGlkIGludGVydmFsOiAnJHtpbnRlcnZhbH0nbHNgKTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFyc2VEdXJhdGlvblNlcnZpY2Uge1xuXG4gIGNvbnZlcnRUb01pbGxpc2Vjb25kcyh0aW1lLCB1bml0KSB7XG4gICAgY29uc29sZS5hc3NlcnQoL14obT9zfG1pbnxoKSQvZy50ZXN0KHVuaXQpKTtcblxuICAgIGlmICh1bml0ID09PSAnbXMnKSB7IHJldHVybiB0aW1lOyB9XG4gICAgaWYgKHVuaXQgPT09ICdzJykgeyByZXR1cm4gdGltZSAqIDEwMDA7IH1cbiAgICBpZiAodW5pdCA9PT0gJ21pbicpIHsgcmV0dXJuIHRpbWUgKiA2MCAqIDEwMDA7IH1cblxuICAgIHJldHVybiB0aW1lICogNjAgKiA2MCAqIDEwMDA7XG4gIH1cblxuICBjb252ZXJ0KG1hdGNoKSB7XG4gICAgY29uc3QgdGltZSA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuXG4gICAgaWYgKG1hdGNoLmxlbmd0aCA9PT0gMikgeyByZXR1cm4gdGltZTsgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udmVydFRvTWlsbGlzZWNvbmRzKHRpbWUsIG1hdGNoWzJdKTtcbiAgfVxuXG4gIHBhcnNlRHVyYXRpb24oaW50ZXJ2YWwpIHtcblxuICAgIGlmIChpbnRlcnZhbCA9PT0gdW5kZWZpbmVkIHx8IGludGVydmFsID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgREZQRHVyYXRpb25FcnJvcihpbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBpbnRlcnZhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBpbnRlcnZhbDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGludGVydmFsICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJyR7aW50ZXJ2YWx9JyBtdXN0IGJlIG9mIG51bWJlciBvciBzdHJpbmcgdHlwZWApO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGNoID0gaW50ZXJ2YWwubWF0Y2goLygoPzpcXGQrKT8uP1xcZCspKG0/c3xtaW58aCk/Lyk7XG5cbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICB0aHJvdyBuZXcgREZQRHVyYXRpb25FcnJvcihpbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udmVydChtYXRjaCk7XG4gIH1cblxufVxuIl19