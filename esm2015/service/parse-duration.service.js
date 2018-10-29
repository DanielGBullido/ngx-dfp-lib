/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
class DFPDurationError extends Error {
    /**
     * @param {?} interval
     */
    constructor(interval) {
        super(`Invalid interval: '${interval}'ls`);
    }
}
export class ParseDurationService {
    /**
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    convertToMilliseconds(time, unit) {
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
    }
    /**
     * @param {?} match
     * @return {?}
     */
    convert(match) {
        /** @type {?} */
        const time = parseFloat(match[1]);
        if (match.length === 2) {
            return time;
        }
        return this.convertToMilliseconds(time, match[2]);
    }
    /**
     * @param {?} interval
     * @return {?}
     */
    parseDuration(interval) {
        if (interval === undefined || interval === null) {
            throw new DFPDurationError(interval);
        }
        if (typeof interval === 'number') {
            return interval;
        }
        if (typeof interval !== 'string') {
            throw new TypeError(`'${interval}' must be of number or string type`);
        }
        /** @type {?} */
        const match = interval.match(/((?:\d+)?.?\d+)(m?s|min|h)?/);
        if (!match) {
            throw new DFPDurationError(interval);
        }
        return this.convert(match);
    }
}
ParseDurationService.decorators = [
    { type: Injectable }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtZHVyYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzZXJ2aWNlL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0Msc0JBQXVCLFNBQVEsS0FBSzs7OztJQUNsQyxZQUFZLFFBQVE7UUFDbEIsS0FBSyxDQUFDLHNCQUFzQixRQUFRLEtBQUssQ0FBQyxDQUFDO0tBQzVDO0NBQ0Y7QUFHRCxNQUFNOzs7Ozs7SUFFSixxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsSUFBSTtRQUM5QixPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTVDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUFFO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FBRTtRQUN6QyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztTQUFFO1FBRWhELE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7S0FDOUI7Ozs7O0lBRUQsT0FBTyxDQUFDLEtBQUs7O1FBQ1gsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWxDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FBRTtRQUV4QyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuRDs7Ozs7SUFFRCxhQUFhLENBQUMsUUFBUTtRQUVwQixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssU0FBUyxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0QztRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUNqQjtRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxJQUFJLFFBQVEsb0NBQW9DLENBQUMsQ0FBQztTQUN2RTs7UUFFRCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFFNUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDNUI7OztZQTFDRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jbGFzcyBERlBEdXJhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihpbnRlcnZhbCkge1xuICAgIHN1cGVyKGBJbnZhbGlkIGludGVydmFsOiAnJHtpbnRlcnZhbH0nbHNgKTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFyc2VEdXJhdGlvblNlcnZpY2Uge1xuXG4gIGNvbnZlcnRUb01pbGxpc2Vjb25kcyh0aW1lLCB1bml0KSB7XG4gICAgY29uc29sZS5hc3NlcnQoL14obT9zfG1pbnxoKSQvZy50ZXN0KHVuaXQpKTtcblxuICAgIGlmICh1bml0ID09PSAnbXMnKSB7IHJldHVybiB0aW1lOyB9XG4gICAgaWYgKHVuaXQgPT09ICdzJykgeyByZXR1cm4gdGltZSAqIDEwMDA7IH1cbiAgICBpZiAodW5pdCA9PT0gJ21pbicpIHsgcmV0dXJuIHRpbWUgKiA2MCAqIDEwMDA7IH1cblxuICAgIHJldHVybiB0aW1lICogNjAgKiA2MCAqIDEwMDA7XG4gIH1cblxuICBjb252ZXJ0KG1hdGNoKSB7XG4gICAgY29uc3QgdGltZSA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuXG4gICAgaWYgKG1hdGNoLmxlbmd0aCA9PT0gMikgeyByZXR1cm4gdGltZTsgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udmVydFRvTWlsbGlzZWNvbmRzKHRpbWUsIG1hdGNoWzJdKTtcbiAgfVxuXG4gIHBhcnNlRHVyYXRpb24oaW50ZXJ2YWwpIHtcblxuICAgIGlmIChpbnRlcnZhbCA9PT0gdW5kZWZpbmVkIHx8IGludGVydmFsID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgREZQRHVyYXRpb25FcnJvcihpbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBpbnRlcnZhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBpbnRlcnZhbDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGludGVydmFsICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJyR7aW50ZXJ2YWx9JyBtdXN0IGJlIG9mIG51bWJlciBvciBzdHJpbmcgdHlwZWApO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGNoID0gaW50ZXJ2YWwubWF0Y2goLygoPzpcXGQrKT8uP1xcZCspKG0/c3xtaW58aCk/Lyk7XG5cbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICB0aHJvdyBuZXcgREZQRHVyYXRpb25FcnJvcihpbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udmVydChtYXRjaCk7XG4gIH1cblxufVxuIl19