/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
    /** @type {?} */
    DfpIDGeneratorService.prototype.generatedIDs;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7NEJBS2xCLEVBQUU7Ozs7OztJQUV6QiwwQ0FBVTs7OztJQUFWLFVBQVcsSUFBZTtRQUFmLHFCQUFBLEVBQUEsZUFBZTs7UUFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBRWQsR0FBRyxDQUFDOztZQUNGLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsRUFBRSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO1NBQzFCLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFFbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7UUFFN0IsTUFBTSxDQUFDLEVBQUUsQ0FBQztLQUNYOzs7OztJQUVELDhDQUFjOzs7O0lBQWQsVUFBZSxPQUFvQjtRQUNqQyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1NBQ25COztRQUVELElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQzFELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUFFO1FBRWpDLE1BQU0sQ0FBQyxFQUFFLENBQUM7S0FDWDs7Ozs7SUFFRCx1Q0FBTzs7OztJQUFQLFVBQVEsRUFBRTtRQUNSLE1BQU0sQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQztLQUNoQzs7Ozs7SUFFRCx3Q0FBUTs7OztJQUFSLFVBQVMsRUFBRTtRQUNULE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDMUI7O2dCQW5DRixVQUFVOztnQ0FGWDs7U0FHYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZnBJREdlbmVyYXRvclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgZ2VuZXJhdGVkSURzID0ge307XG5cbiAgZ2VuZXJhdGVJRCh0eXBlID0gJ2RmcC1hZCcpIHtcbiAgICBsZXQgaWQgPSBudWxsO1xuXG4gICAgZG8ge1xuICAgICAgY29uc3QgbnVtYmVyID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnNsaWNlKDIpO1xuICAgICAgaWQgPSB0eXBlICsgJy0nICsgbnVtYmVyO1xuICAgIH0gd2hpbGUgKGlkIGluIHRoaXMuZ2VuZXJhdGVkSURzKTtcblxuICAgIHRoaXMuZ2VuZXJhdGVkSURzW2lkXSA9IHRydWU7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICBkZnBJREdlbmVyYXRvcihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuaWQgJiYgIShlbGVtZW50LmlkIGluIHRoaXMuZ2VuZXJhdGVkSURzKSkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuaWQ7XG4gICAgfVxuXG4gICAgY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlSUQoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgIGlmIChlbGVtZW50KSB7IGVsZW1lbnQuaWQgPSBpZDsgfVxuXG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgaXNUYWtlbihpZCkge1xuICAgIHJldHVybiBpZCBpbiB0aGlzLmdlbmVyYXRlZElEcztcbiAgfVxuXG4gIGlzVW5pcXVlKGlkKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzVGFrZW4oaWQpO1xuICB9XG5cbn1cbiJdfQ==