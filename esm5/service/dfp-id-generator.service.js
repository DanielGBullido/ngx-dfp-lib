/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var DfpIDGeneratorService = /** @class */ (function () {
    function DfpIDGeneratorService() {
        this.generatedIDs = {};
    }
    /**
     * @param {?=} type
     * @return {?}
     */
    DfpIDGeneratorService.prototype.generateID = /**
     * @param {?=} type
     * @return {?}
     */
    function (type) {
        if (type === void 0) { type = 'dfp-ad'; }
        /** @type {?} */
        var id = null;
        do {
            /** @type {?} */
            var number = Math.random().toString().slice(2);
            id = type + '-' + number;
        } while (id in this.generatedIDs);
        this.generatedIDs[id] = true;
        return id;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DfpIDGeneratorService.prototype.dfpIDGenerator = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        if (element && element.id && !(element.id in this.generatedIDs)) {
            return element.id;
        }
        /** @type {?} */
        var id = this.generateID(element.tagName.toLowerCase());
        if (element) {
            element.id = id;
        }
        return id;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    DfpIDGeneratorService.prototype.isTaken = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return id in this.generatedIDs;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    DfpIDGeneratorService.prototype.isUnique = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return !this.isTaken(id);
    };
    DfpIDGeneratorService.decorators = [
        { type: Injectable }
    ];
    return DfpIDGeneratorService;
}());
export { DfpIDGeneratorService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DfpIDGeneratorService.prototype.generatedIDs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDO0lBQUE7UUFHVSxpQkFBWSxHQUFHLEVBQUUsQ0FBQztJQWtDNUIsQ0FBQzs7Ozs7SUFoQ0MsMENBQVU7Ozs7SUFBVixVQUFXLElBQWU7UUFBZixxQkFBQSxFQUFBLGVBQWU7O1lBQ3BCLEVBQUUsR0FBRyxJQUFJO1FBRWIsR0FBRzs7Z0JBQ0ssTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2hELEVBQUUsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQztTQUMxQixRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1FBRWxDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRTdCLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQzs7Ozs7SUFFRCw4Q0FBYzs7OztJQUFkLFVBQWUsT0FBb0I7UUFDakMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDL0QsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDO1NBQ25COztZQUVLLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekQsSUFBSSxPQUFPLEVBQUU7WUFBRSxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUFFO1FBRWpDLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQzs7Ozs7SUFFRCx1Q0FBTzs7OztJQUFQLFVBQVEsRUFBRTtRQUNSLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDakMsQ0FBQzs7Ozs7SUFFRCx3Q0FBUTs7OztJQUFSLFVBQVMsRUFBRTtRQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLENBQUM7O2dCQW5DRixVQUFVOztJQXFDWCw0QkFBQztDQUFBLEFBckNELElBcUNDO1NBcENZLHFCQUFxQjs7Ozs7O0lBRWhDLDZDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERmcElER2VuZXJhdG9yU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZWRJRHMgPSB7fTtcblxuICBnZW5lcmF0ZUlEKHR5cGUgPSAnZGZwLWFkJykge1xuICAgIGxldCBpZCA9IG51bGw7XG5cbiAgICBkbyB7XG4gICAgICBjb25zdCBudW1iZXIgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc2xpY2UoMik7XG4gICAgICBpZCA9IHR5cGUgKyAnLScgKyBudW1iZXI7XG4gICAgfSB3aGlsZSAoaWQgaW4gdGhpcy5nZW5lcmF0ZWRJRHMpO1xuXG4gICAgdGhpcy5nZW5lcmF0ZWRJRHNbaWRdID0gdHJ1ZTtcblxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIGRmcElER2VuZXJhdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5pZCAmJiAhKGVsZW1lbnQuaWQgaW4gdGhpcy5nZW5lcmF0ZWRJRHMpKSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5pZDtcbiAgICB9XG5cbiAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVJRChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgaWYgKGVsZW1lbnQpIHsgZWxlbWVudC5pZCA9IGlkOyB9XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICBpc1Rha2VuKGlkKSB7XG4gICAgcmV0dXJuIGlkIGluIHRoaXMuZ2VuZXJhdGVkSURzO1xuICB9XG5cbiAgaXNVbmlxdWUoaWQpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNUYWtlbihpZCk7XG4gIH1cblxufVxuIl19