/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
    /** @type {?} */
    DfpIDGeneratorService.prototype.generatedIDs;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE1BQU07OzRCQUVtQixFQUFFOzs7Ozs7SUFFekIsVUFBVSxDQUFDLElBQUksR0FBRyxRQUFROztRQUN4QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFZCxHQUFHLENBQUM7O1lBQ0YsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxFQUFFLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7U0FDMUIsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtRQUVsQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUU3QixNQUFNLENBQUMsRUFBRSxDQUFDO0tBQ1g7Ozs7O0lBRUQsY0FBYyxDQUFDLE9BQW9CO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FDbkI7O1FBRUQsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDMUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQUU7UUFFakMsTUFBTSxDQUFDLEVBQUUsQ0FBQztLQUNYOzs7OztJQUVELE9BQU8sQ0FBQyxFQUFFO1FBQ1IsTUFBTSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO0tBQ2hDOzs7OztJQUVELFFBQVEsQ0FBQyxFQUFFO1FBQ1QsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMxQjs7O1lBbkNGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZnBJREdlbmVyYXRvclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgZ2VuZXJhdGVkSURzID0ge307XG5cbiAgZ2VuZXJhdGVJRCh0eXBlID0gJ2RmcC1hZCcpIHtcbiAgICBsZXQgaWQgPSBudWxsO1xuXG4gICAgZG8ge1xuICAgICAgY29uc3QgbnVtYmVyID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnNsaWNlKDIpO1xuICAgICAgaWQgPSB0eXBlICsgJy0nICsgbnVtYmVyO1xuICAgIH0gd2hpbGUgKGlkIGluIHRoaXMuZ2VuZXJhdGVkSURzKTtcblxuICAgIHRoaXMuZ2VuZXJhdGVkSURzW2lkXSA9IHRydWU7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICBkZnBJREdlbmVyYXRvcihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuaWQgJiYgIShlbGVtZW50LmlkIGluIHRoaXMuZ2VuZXJhdGVkSURzKSkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuaWQ7XG4gICAgfVxuXG4gICAgY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlSUQoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgIGlmIChlbGVtZW50KSB7IGVsZW1lbnQuaWQgPSBpZDsgfVxuXG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgaXNUYWtlbihpZCkge1xuICAgIHJldHVybiBpZCBpbiB0aGlzLmdlbmVyYXRlZElEcztcbiAgfVxuXG4gIGlzVW5pcXVlKGlkKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzVGFrZW4oaWQpO1xuICB9XG5cbn1cbiJdfQ==