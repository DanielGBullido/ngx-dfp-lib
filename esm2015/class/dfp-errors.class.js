/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
export class DFPIncompleteError extends Error {
    /**
     * @param {?} directiveName
     * @param {?} missingName
     * @param {?=} isAttribute
     */
    constructor(directiveName, missingName, isAttribute) {
        super(`Incomplete definition of '${directiveName}': ` +
            `Missing ${isAttribute ? 'attribute' : 'child directive'} ` +
            `'${missingName}'.`);
    }
}
export class DFPTypeError extends Error {
    /**
     * @param {?} directiveName
     * @param {?} attributeName
     * @param {?} wrongValue
     * @param {?} expectedType
     */
    constructor(directiveName, attributeName, wrongValue, expectedType) {
        super(`Wrong type for attribute '${attributeName}' on ` +
            `directive '${directiveName}': Expected ${expectedType}` +
            `, got ${typeof wrongValue}`);
    }
}
export class DFPMissingParentError extends Error {
    /**
     * @param {?} directiveName
     * @param {...?} parents
     */
    constructor(directiveName, ...parents) {
        console.assert(parents && parents.length > 0);
        if (Array.isArray(parents[0])) {
            parents = parents[0];
        }
        /** @type {?} */
        let parentMessage;
        if (parents.length > 1) {
            parents = parents.map(p => `'${p}'`);
            parentMessage = ', which must be ';
            parentMessage += parents.slice(0, -1).join(', ');
            parentMessage += ` or ${parents[parents.length - 1]}`;
        }
        else {
            parentMessage = ` '${parents[0]}'`;
        }
        super(`Invalid use of '${directiveName}' directive. ` +
            `Missing parent directive${parentMessage}.`);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWVycm9ycy5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJjbGFzcy9kZnAtZXJyb3JzLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNLHlCQUEwQixTQUFRLEtBQUs7Ozs7OztJQUN6QyxZQUFZLGFBQWEsRUFBRSxXQUFXLEVBQUUsV0FBWTtRQUNoRCxLQUFLLENBQUMsNkJBQTZCLGFBQWEsS0FBSztZQUNqRCxXQUFXLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsR0FBRztZQUMzRCxJQUFJLFdBQVcsSUFBSSxDQUFDLENBQUM7S0FDNUI7Q0FDSjtBQUVELE1BQU0sbUJBQW9CLFNBQVEsS0FBSzs7Ozs7OztJQUNuQyxZQUFZLGFBQWEsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLFlBQVk7UUFDOUQsS0FBSyxDQUNELDZCQUE2QixhQUFhLE9BQU87WUFDakQsY0FBYyxhQUFhLGVBQWUsWUFBWSxFQUFFO1lBQ3hELFNBQVMsT0FBTyxVQUFVLEVBQUUsQ0FDL0IsQ0FBQztLQUNMO0NBQ0o7QUFFRCxNQUFNLDRCQUE2QixTQUFRLEtBQUs7Ozs7O0lBQzVDLFlBQVksYUFBYSxFQUFFLEdBQUcsT0FBTztRQUNqQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEI7O1FBRUQsSUFBSSxhQUFhLENBQUM7UUFDbEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQztZQUNuQyxhQUFhLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsYUFBYSxJQUFJLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUN6RDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osYUFBYSxHQUFHLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDdEM7UUFFRCxLQUFLLENBQ0QsbUJBQW1CLGFBQWEsZUFBZTtZQUMvQywyQkFBMkIsYUFBYSxHQUFHLENBQzlDLENBQUM7S0FDTDtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmV4cG9ydCBjbGFzcyBERlBJbmNvbXBsZXRlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoZGlyZWN0aXZlTmFtZSwgbWlzc2luZ05hbWUsIGlzQXR0cmlidXRlPykge1xuICAgICAgICBzdXBlcihgSW5jb21wbGV0ZSBkZWZpbml0aW9uIG9mICcke2RpcmVjdGl2ZU5hbWV9JzogYCArXG4gICAgICAgICAgICBgTWlzc2luZyAke2lzQXR0cmlidXRlID8gJ2F0dHJpYnV0ZScgOiAnY2hpbGQgZGlyZWN0aXZlJ30gYCArXG4gICAgICAgICAgICBgJyR7bWlzc2luZ05hbWV9Jy5gKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBERlBUeXBlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoZGlyZWN0aXZlTmFtZSwgYXR0cmlidXRlTmFtZSwgd3JvbmdWYWx1ZSwgZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgYFdyb25nIHR5cGUgZm9yIGF0dHJpYnV0ZSAnJHthdHRyaWJ1dGVOYW1lfScgb24gYCArXG4gICAgICAgICAgICBgZGlyZWN0aXZlICcke2RpcmVjdGl2ZU5hbWV9JzogRXhwZWN0ZWQgJHtleHBlY3RlZFR5cGV9YCArXG4gICAgICAgICAgICBgLCBnb3QgJHt0eXBlb2Ygd3JvbmdWYWx1ZX1gXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgREZQTWlzc2luZ1BhcmVudEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGRpcmVjdGl2ZU5hbWUsIC4uLnBhcmVudHMpIHtcbiAgICAgICAgY29uc29sZS5hc3NlcnQocGFyZW50cyAmJiBwYXJlbnRzLmxlbmd0aCA+IDApO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJlbnRzWzBdKSkge1xuICAgICAgICAgICAgcGFyZW50cyA9IHBhcmVudHNbMF07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFyZW50TWVzc2FnZTtcbiAgICAgICAgaWYgKHBhcmVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgcGFyZW50cyA9IHBhcmVudHMubWFwKHAgPT4gYCcke3B9J2ApO1xuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSA9ICcsIHdoaWNoIG11c3QgYmUgJztcbiAgICAgICAgICAgIHBhcmVudE1lc3NhZ2UgKz0gcGFyZW50cy5zbGljZSgwLCAtMSkuam9pbignLCAnKTtcbiAgICAgICAgICAgIHBhcmVudE1lc3NhZ2UgKz0gYCBvciAke3BhcmVudHNbcGFyZW50cy5sZW5ndGggLSAxXX1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSA9IGAgJyR7cGFyZW50c1swXX0nYDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgYEludmFsaWQgdXNlIG9mICcke2RpcmVjdGl2ZU5hbWV9JyBkaXJlY3RpdmUuIGAgK1xuICAgICAgICAgICAgYE1pc3NpbmcgcGFyZW50IGRpcmVjdGl2ZSR7cGFyZW50TWVzc2FnZX0uYFxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==