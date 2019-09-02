/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtZHVyYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzZXJ2aWNlL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsTUFBTSxnQkFBaUIsU0FBUSxLQUFLOzs7O0lBQ2xDLFlBQVksUUFBUTtRQUNsQixLQUFLLENBQUMsc0JBQXNCLFFBQVEsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGO0FBR0QsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7O0lBRS9CLHFCQUFxQixDQUFDLElBQUksRUFBRSxJQUFJO1FBQzlCLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFNUMsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUM7U0FBRTtRQUNuQyxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7WUFBRSxPQUFPLElBQUksR0FBRyxJQUFJLENBQUM7U0FBRTtRQUN6QyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7WUFBRSxPQUFPLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1NBQUU7UUFFaEQsT0FBTyxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDL0IsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsS0FBSzs7Y0FDTCxJQUFJLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUM7U0FBRTtRQUV4QyxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsUUFBUTtRQUVwQixJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtZQUMvQyxNQUFNLElBQUksZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdEM7UUFFRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUVELElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxTQUFTLENBQUMsSUFBSSxRQUFRLG9DQUFvQyxDQUFDLENBQUM7U0FDdkU7O2NBRUssS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUM7UUFFM0QsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE1BQU0sSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0QztRQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7WUExQ0YsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY2xhc3MgREZQRHVyYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoaW50ZXJ2YWwpIHtcbiAgICBzdXBlcihgSW52YWxpZCBpbnRlcnZhbDogJyR7aW50ZXJ2YWx9J2xzYCk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhcnNlRHVyYXRpb25TZXJ2aWNlIHtcblxuICBjb252ZXJ0VG9NaWxsaXNlY29uZHModGltZSwgdW5pdCkge1xuICAgIGNvbnNvbGUuYXNzZXJ0KC9eKG0/c3xtaW58aCkkL2cudGVzdCh1bml0KSk7XG5cbiAgICBpZiAodW5pdCA9PT0gJ21zJykgeyByZXR1cm4gdGltZTsgfVxuICAgIGlmICh1bml0ID09PSAncycpIHsgcmV0dXJuIHRpbWUgKiAxMDAwOyB9XG4gICAgaWYgKHVuaXQgPT09ICdtaW4nKSB7IHJldHVybiB0aW1lICogNjAgKiAxMDAwOyB9XG5cbiAgICByZXR1cm4gdGltZSAqIDYwICogNjAgKiAxMDAwO1xuICB9XG5cbiAgY29udmVydChtYXRjaCkge1xuICAgIGNvbnN0IHRpbWUgPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcblxuICAgIGlmIChtYXRjaC5sZW5ndGggPT09IDIpIHsgcmV0dXJuIHRpbWU7IH1cblxuICAgIHJldHVybiB0aGlzLmNvbnZlcnRUb01pbGxpc2Vjb25kcyh0aW1lLCBtYXRjaFsyXSk7XG4gIH1cblxuICBwYXJzZUR1cmF0aW9uKGludGVydmFsKSB7XG5cbiAgICBpZiAoaW50ZXJ2YWwgPT09IHVuZGVmaW5lZCB8fCBpbnRlcnZhbCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IERGUER1cmF0aW9uRXJyb3IoaW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgaW50ZXJ2YWwgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gaW50ZXJ2YWw7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBpbnRlcnZhbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCcke2ludGVydmFsfScgbXVzdCBiZSBvZiBudW1iZXIgb3Igc3RyaW5nIHR5cGVgKTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXRjaCA9IGludGVydmFsLm1hdGNoKC8oKD86XFxkKyk/Lj9cXGQrKShtP3N8bWlufGgpPy8pO1xuXG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgdGhyb3cgbmV3IERGUER1cmF0aW9uRXJyb3IoaW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvbnZlcnQobWF0Y2gpO1xuICB9XG5cbn1cbiJdfQ==