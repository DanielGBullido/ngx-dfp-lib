/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class DfpIDGeneratorService {
    constructor() {
        this.generatedIDs = {};
    }
    /**
     * @param {?=} type
     * @return {?}
     */
    generateID(type = 'dfp-ad') {
        /** @type {?} */
        let id = null;
        do {
            /** @type {?} */
            const number = Math.random().toString().slice(2);
            id = type + '-' + number;
        } while (id in this.generatedIDs);
        this.generatedIDs[id] = true;
        return id;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    dfpIDGenerator(element) {
        if (element && element.id && !(element.id in this.generatedIDs)) {
            return element.id;
        }
        /** @type {?} */
        const id = this.generateID(element.tagName.toLowerCase());
        if (element) {
            element.id = id;
        }
        return id;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    isTaken(id) {
        return id in this.generatedIDs;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    isUnique(id) {
        return !this.isTaken(id);
    }
}
DfpIDGeneratorService.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    DfpIDGeneratorService.prototype.generatedIDs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE1BQU0sT0FBTyxxQkFBcUI7SUFEbEM7UUFHVSxpQkFBWSxHQUFHLEVBQUUsQ0FBQztJQWtDNUIsQ0FBQzs7Ozs7SUFoQ0MsVUFBVSxDQUFDLElBQUksR0FBRyxRQUFROztZQUNwQixFQUFFLEdBQUcsSUFBSTtRQUViLEdBQUc7O2tCQUNLLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNoRCxFQUFFLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7U0FDMUIsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtRQUVsQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUU3QixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLE9BQW9CO1FBQ2pDLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQy9ELE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQztTQUNuQjs7Y0FFSyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pELElBQUksT0FBTyxFQUFFO1lBQUUsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FBRTtRQUVqQyxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLEVBQUU7UUFDUixPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLEVBQUU7UUFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7WUFuQ0YsVUFBVTs7Ozs7OztJQUdULDZDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERmcElER2VuZXJhdG9yU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZWRJRHMgPSB7fTtcblxuICBnZW5lcmF0ZUlEKHR5cGUgPSAnZGZwLWFkJykge1xuICAgIGxldCBpZCA9IG51bGw7XG5cbiAgICBkbyB7XG4gICAgICBjb25zdCBudW1iZXIgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc2xpY2UoMik7XG4gICAgICBpZCA9IHR5cGUgKyAnLScgKyBudW1iZXI7XG4gICAgfSB3aGlsZSAoaWQgaW4gdGhpcy5nZW5lcmF0ZWRJRHMpO1xuXG4gICAgdGhpcy5nZW5lcmF0ZWRJRHNbaWRdID0gdHJ1ZTtcblxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIGRmcElER2VuZXJhdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5pZCAmJiAhKGVsZW1lbnQuaWQgaW4gdGhpcy5nZW5lcmF0ZWRJRHMpKSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5pZDtcbiAgICB9XG5cbiAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVJRChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgaWYgKGVsZW1lbnQpIHsgZWxlbWVudC5pZCA9IGlkOyB9XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICBpc1Rha2VuKGlkKSB7XG4gICAgcmV0dXJuIGlkIGluIHRoaXMuZ2VuZXJhdGVkSURzO1xuICB9XG5cbiAgaXNVbmlxdWUoaWQpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNUYWtlbihpZCk7XG4gIH1cblxufVxuIl19