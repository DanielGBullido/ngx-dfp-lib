/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
var DFPIncompleteError = /** @class */ (function (_super) {
    tslib_1.__extends(DFPIncompleteError, _super);
    function DFPIncompleteError(directiveName, missingName, isAttribute) {
        return _super.call(this, "Incomplete definition of '" + directiveName + "': " +
            ("Missing " + (isAttribute ? 'attribute' : 'child directive') + " ") +
            ("'" + missingName + "'.")) || this;
    }
    return DFPIncompleteError;
}(Error));
export { DFPIncompleteError };
var DFPTypeError = /** @class */ (function (_super) {
    tslib_1.__extends(DFPTypeError, _super);
    function DFPTypeError(directiveName, attributeName, wrongValue, expectedType) {
        return _super.call(this, "Wrong type for attribute '" + attributeName + "' on " +
            ("directive '" + directiveName + "': Expected " + expectedType) +
            (", got " + typeof wrongValue)) || this;
    }
    return DFPTypeError;
}(Error));
export { DFPTypeError };
var DFPMissingParentError = /** @class */ (function (_super) {
    tslib_1.__extends(DFPMissingParentError, _super);
    function DFPMissingParentError(directiveName) {
        var parents = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parents[_i - 1] = arguments[_i];
        }
        var _this = this;
        console.assert(parents && parents.length > 0);
        if (Array.isArray(parents[0])) {
            parents = parents[0];
        }
        /** @type {?} */
        var parentMessage;
        if (parents.length > 1) {
            parents = parents.map((/**
             * @param {?} p
             * @return {?}
             */
            function (p) { return "'" + p + "'"; }));
            parentMessage = ', which must be ';
            parentMessage += parents.slice(0, -1).join(', ');
            parentMessage += " or " + parents[parents.length - 1];
        }
        else {
            parentMessage = " '" + parents[0] + "'";
        }
        _this = _super.call(this, "Invalid use of '" + directiveName + "' directive. " +
            ("Missing parent directive" + parentMessage + ".")) || this;
        return _this;
    }
    return DFPMissingParentError;
}(Error));
export { DFPMissingParentError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWVycm9ycy5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJjbGFzcy9kZnAtZXJyb3JzLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUE7SUFBd0MsOENBQUs7SUFDekMsNEJBQVksYUFBYSxFQUFFLFdBQVcsRUFBRSxXQUFZO2VBQ2hELGtCQUFNLCtCQUE2QixhQUFhLFFBQUs7YUFDakQsY0FBVyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLE9BQUcsQ0FBQTthQUMzRCxNQUFJLFdBQVcsT0FBSSxDQUFBLENBQUM7SUFDNUIsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FBQyxBQU5ELENBQXdDLEtBQUssR0FNNUM7O0FBRUQ7SUFBa0Msd0NBQUs7SUFDbkMsc0JBQVksYUFBYSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsWUFBWTtlQUM5RCxrQkFDSSwrQkFBNkIsYUFBYSxVQUFPO2FBQ2pELGdCQUFjLGFBQWEsb0JBQWUsWUFBYyxDQUFBO2FBQ3hELFdBQVMsT0FBTyxVQUFZLENBQUEsQ0FDL0I7SUFDTCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBUkQsQ0FBa0MsS0FBSyxHQVF0Qzs7QUFFRDtJQUEyQyxpREFBSztJQUM1QywrQkFBWSxhQUFhO1FBQUUsaUJBQVU7YUFBVixVQUFVLEVBQVYscUJBQVUsRUFBVixJQUFVO1lBQVYsZ0NBQVU7O1FBQXJDLGlCQW9CQztRQW5CRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMzQixPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hCOztZQUVHLGFBQWE7UUFDakIsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNwQixPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUc7Ozs7WUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLE1BQUksQ0FBQyxNQUFHLEVBQVIsQ0FBUSxFQUFDLENBQUM7WUFDckMsYUFBYSxHQUFHLGtCQUFrQixDQUFDO1lBQ25DLGFBQWEsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxhQUFhLElBQUksU0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUcsQ0FBQztTQUN6RDthQUFNO1lBQ0gsYUFBYSxHQUFHLE9BQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFHLENBQUM7U0FDdEM7UUFFRCxRQUFBLGtCQUNJLHFCQUFtQixhQUFhLGtCQUFlO2FBQy9DLDZCQUEyQixhQUFhLE1BQUcsQ0FBQSxDQUM5QyxTQUFDOztJQUNOLENBQUM7SUFDTCw0QkFBQztBQUFELENBQUMsQUF0QkQsQ0FBMkMsS0FBSyxHQXNCL0MiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuZXhwb3J0IGNsYXNzIERGUEluY29tcGxldGVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihkaXJlY3RpdmVOYW1lLCBtaXNzaW5nTmFtZSwgaXNBdHRyaWJ1dGU/KSB7XG4gICAgICAgIHN1cGVyKGBJbmNvbXBsZXRlIGRlZmluaXRpb24gb2YgJyR7ZGlyZWN0aXZlTmFtZX0nOiBgICtcbiAgICAgICAgICAgIGBNaXNzaW5nICR7aXNBdHRyaWJ1dGUgPyAnYXR0cmlidXRlJyA6ICdjaGlsZCBkaXJlY3RpdmUnfSBgICtcbiAgICAgICAgICAgIGAnJHttaXNzaW5nTmFtZX0nLmApO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERGUFR5cGVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihkaXJlY3RpdmVOYW1lLCBhdHRyaWJ1dGVOYW1lLCB3cm9uZ1ZhbHVlLCBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgV3JvbmcgdHlwZSBmb3IgYXR0cmlidXRlICcke2F0dHJpYnV0ZU5hbWV9JyBvbiBgICtcbiAgICAgICAgICAgIGBkaXJlY3RpdmUgJyR7ZGlyZWN0aXZlTmFtZX0nOiBFeHBlY3RlZCAke2V4cGVjdGVkVHlwZX1gICtcbiAgICAgICAgICAgIGAsIGdvdCAke3R5cGVvZiB3cm9uZ1ZhbHVlfWBcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBERlBNaXNzaW5nUGFyZW50RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoZGlyZWN0aXZlTmFtZSwgLi4ucGFyZW50cykge1xuICAgICAgICBjb25zb2xlLmFzc2VydChwYXJlbnRzICYmIHBhcmVudHMubGVuZ3RoID4gMCk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmVudHNbMF0pKSB7XG4gICAgICAgICAgICBwYXJlbnRzID0gcGFyZW50c1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJlbnRNZXNzYWdlO1xuICAgICAgICBpZiAocGFyZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBwYXJlbnRzID0gcGFyZW50cy5tYXAocCA9PiBgJyR7cH0nYCk7XG4gICAgICAgICAgICBwYXJlbnRNZXNzYWdlID0gJywgd2hpY2ggbXVzdCBiZSAnO1xuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSArPSBwYXJlbnRzLnNsaWNlKDAsIC0xKS5qb2luKCcsICcpO1xuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSArPSBgIG9yICR7cGFyZW50c1twYXJlbnRzLmxlbmd0aCAtIDFdfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnRNZXNzYWdlID0gYCAnJHtwYXJlbnRzWzBdfSdgO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgSW52YWxpZCB1c2Ugb2YgJyR7ZGlyZWN0aXZlTmFtZX0nIGRpcmVjdGl2ZS4gYCArXG4gICAgICAgICAgICBgTWlzc2luZyBwYXJlbnQgZGlyZWN0aXZlJHtwYXJlbnRNZXNzYWdlfS5gXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19