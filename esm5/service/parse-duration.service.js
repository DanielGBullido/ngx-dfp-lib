/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtZHVyYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzZXJ2aWNlL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLElBQUE7SUFBK0IsNENBQUs7SUFDbEMsMEJBQVksUUFBUTtlQUNsQixrQkFBTSx3QkFBc0IsUUFBUSxRQUFLLENBQUM7S0FDM0M7MkJBTEg7RUFFK0IsS0FBSyxFQUluQyxDQUFBOzs7Ozs7Ozs7SUFLQyxvREFBcUI7Ozs7O0lBQXJCLFVBQXNCLElBQUksRUFBRSxJQUFJO1FBQzlCLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQUU7UUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUFFO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1NBQUU7UUFFaEQsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztLQUM5Qjs7Ozs7SUFFRCxzQ0FBTzs7OztJQUFQLFVBQVEsS0FBSzs7UUFDWCxJQUFNLElBQUksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUFFO1FBRXhDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ25EOzs7OztJQUVELDRDQUFhOzs7O0lBQWIsVUFBYyxRQUFRO1FBRXBCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEQsTUFBTSxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQ2pCO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLElBQUksU0FBUyxDQUFDLE1BQUksUUFBUSx1Q0FBb0MsQ0FBQyxDQUFDO1NBQ3ZFOztRQUVELElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUU1RCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLElBQUksZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdEM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1Qjs7Z0JBMUNGLFVBQVU7OytCQVJYOztTQVNhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY2xhc3MgREZQRHVyYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoaW50ZXJ2YWwpIHtcbiAgICBzdXBlcihgSW52YWxpZCBpbnRlcnZhbDogJyR7aW50ZXJ2YWx9J2xzYCk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhcnNlRHVyYXRpb25TZXJ2aWNlIHtcblxuICBjb252ZXJ0VG9NaWxsaXNlY29uZHModGltZSwgdW5pdCkge1xuICAgIGNvbnNvbGUuYXNzZXJ0KC9eKG0/c3xtaW58aCkkL2cudGVzdCh1bml0KSk7XG5cbiAgICBpZiAodW5pdCA9PT0gJ21zJykgeyByZXR1cm4gdGltZTsgfVxuICAgIGlmICh1bml0ID09PSAncycpIHsgcmV0dXJuIHRpbWUgKiAxMDAwOyB9XG4gICAgaWYgKHVuaXQgPT09ICdtaW4nKSB7IHJldHVybiB0aW1lICogNjAgKiAxMDAwOyB9XG5cbiAgICByZXR1cm4gdGltZSAqIDYwICogNjAgKiAxMDAwO1xuICB9XG5cbiAgY29udmVydChtYXRjaCkge1xuICAgIGNvbnN0IHRpbWUgPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcblxuICAgIGlmIChtYXRjaC5sZW5ndGggPT09IDIpIHsgcmV0dXJuIHRpbWU7IH1cblxuICAgIHJldHVybiB0aGlzLmNvbnZlcnRUb01pbGxpc2Vjb25kcyh0aW1lLCBtYXRjaFsyXSk7XG4gIH1cblxuICBwYXJzZUR1cmF0aW9uKGludGVydmFsKSB7XG5cbiAgICBpZiAoaW50ZXJ2YWwgPT09IHVuZGVmaW5lZCB8fCBpbnRlcnZhbCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IERGUER1cmF0aW9uRXJyb3IoaW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgaW50ZXJ2YWwgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gaW50ZXJ2YWw7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBpbnRlcnZhbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCcke2ludGVydmFsfScgbXVzdCBiZSBvZiBudW1iZXIgb3Igc3RyaW5nIHR5cGVgKTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXRjaCA9IGludGVydmFsLm1hdGNoKC8oKD86XFxkKyk/Lj9cXGQrKShtP3N8bWlufGgpPy8pO1xuXG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgdGhyb3cgbmV3IERGUER1cmF0aW9uRXJyb3IoaW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvbnZlcnQobWF0Y2gpO1xuICB9XG5cbn1cbiJdfQ==