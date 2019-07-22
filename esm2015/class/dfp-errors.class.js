/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            parents = parents.map((/**
             * @param {?} p
             * @return {?}
             */
            p => `'${p}'`));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWVycm9ycy5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJjbGFzcy9kZnAtZXJyb3JzLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsS0FBSzs7Ozs7O0lBQ3pDLFlBQVksYUFBYSxFQUFFLFdBQVcsRUFBRSxXQUFZO1FBQ2hELEtBQUssQ0FBQyw2QkFBNkIsYUFBYSxLQUFLO1lBQ2pELFdBQVcsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixHQUFHO1lBQzNELElBQUksV0FBVyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0o7QUFFRCxNQUFNLE9BQU8sWUFBYSxTQUFRLEtBQUs7Ozs7Ozs7SUFDbkMsWUFBWSxhQUFhLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxZQUFZO1FBQzlELEtBQUssQ0FDRCw2QkFBNkIsYUFBYSxPQUFPO1lBQ2pELGNBQWMsYUFBYSxlQUFlLFlBQVksRUFBRTtZQUN4RCxTQUFTLE9BQU8sVUFBVSxFQUFFLENBQy9CLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxNQUFNLE9BQU8scUJBQXNCLFNBQVEsS0FBSzs7Ozs7SUFDNUMsWUFBWSxhQUFhLEVBQUUsR0FBRyxPQUFPO1FBQ2pDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzNCLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEI7O1lBRUcsYUFBYTtRQUNqQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRzs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxDQUFDO1lBQ3JDLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQztZQUNuQyxhQUFhLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsYUFBYSxJQUFJLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUN6RDthQUFNO1lBQ0gsYUFBYSxHQUFHLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDdEM7UUFFRCxLQUFLLENBQ0QsbUJBQW1CLGFBQWEsZUFBZTtZQUMvQywyQkFBMkIsYUFBYSxHQUFHLENBQzlDLENBQUM7SUFDTixDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuZXhwb3J0IGNsYXNzIERGUEluY29tcGxldGVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihkaXJlY3RpdmVOYW1lLCBtaXNzaW5nTmFtZSwgaXNBdHRyaWJ1dGU/KSB7XG4gICAgICAgIHN1cGVyKGBJbmNvbXBsZXRlIGRlZmluaXRpb24gb2YgJyR7ZGlyZWN0aXZlTmFtZX0nOiBgICtcbiAgICAgICAgICAgIGBNaXNzaW5nICR7aXNBdHRyaWJ1dGUgPyAnYXR0cmlidXRlJyA6ICdjaGlsZCBkaXJlY3RpdmUnfSBgICtcbiAgICAgICAgICAgIGAnJHttaXNzaW5nTmFtZX0nLmApO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERGUFR5cGVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihkaXJlY3RpdmVOYW1lLCBhdHRyaWJ1dGVOYW1lLCB3cm9uZ1ZhbHVlLCBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgV3JvbmcgdHlwZSBmb3IgYXR0cmlidXRlICcke2F0dHJpYnV0ZU5hbWV9JyBvbiBgICtcbiAgICAgICAgICAgIGBkaXJlY3RpdmUgJyR7ZGlyZWN0aXZlTmFtZX0nOiBFeHBlY3RlZCAke2V4cGVjdGVkVHlwZX1gICtcbiAgICAgICAgICAgIGAsIGdvdCAke3R5cGVvZiB3cm9uZ1ZhbHVlfWBcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBERlBNaXNzaW5nUGFyZW50RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoZGlyZWN0aXZlTmFtZSwgLi4ucGFyZW50cykge1xuICAgICAgICBjb25zb2xlLmFzc2VydChwYXJlbnRzICYmIHBhcmVudHMubGVuZ3RoID4gMCk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmVudHNbMF0pKSB7XG4gICAgICAgICAgICBwYXJlbnRzID0gcGFyZW50c1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJlbnRNZXNzYWdlO1xuICAgICAgICBpZiAocGFyZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBwYXJlbnRzID0gcGFyZW50cy5tYXAocCA9PiBgJyR7cH0nYCk7XG4gICAgICAgICAgICBwYXJlbnRNZXNzYWdlID0gJywgd2hpY2ggbXVzdCBiZSAnO1xuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSArPSBwYXJlbnRzLnNsaWNlKDAsIC0xKS5qb2luKCcsICcpO1xuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSArPSBgIG9yICR7cGFyZW50c1twYXJlbnRzLmxlbmd0aCAtIDFdfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnRNZXNzYWdlID0gYCAnJHtwYXJlbnRzWzBdfSdgO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgSW52YWxpZCB1c2Ugb2YgJyR7ZGlyZWN0aXZlTmFtZX0nIGRpcmVjdGl2ZS4gYCArXG4gICAgICAgICAgICBgTWlzc2luZyBwYXJlbnQgZGlyZWN0aXZlJHtwYXJlbnRNZXNzYWdlfS5gXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19