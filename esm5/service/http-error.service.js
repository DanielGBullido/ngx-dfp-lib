/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var HttpErrorService = /** @class */ (function () {
    function HttpErrorService() {
        this.isErrorCode = (/**
         * @param {?} code
         * @return {?}
         */
        function (code) {
            if (typeof code === 'number') {
                return !(code >= 200 && code < 300);
            }
            return code[0] !== '2';
        });
    }
    /**
     * @param {?} response
     * @param {?} message
     * @return {?}
     */
    HttpErrorService.prototype.httpError = /**
     * @param {?} response
     * @param {?} message
     * @return {?}
     */
    function (response, message) {
        console.log("Error (" + response.status + ") " + (message ? message : ''));
    };
    HttpErrorService.decorators = [
        { type: Injectable }
    ];
    return HttpErrorService;
}());
export { HttpErrorService };
if (false) {
    /** @type {?} */
    HttpErrorService.prototype.isErrorCode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1lcnJvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvaHR0cC1lcnJvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDO0lBQUE7UUFPRSxnQkFBVzs7OztRQUFHLFVBQVUsSUFBSTtZQUMxQixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDNUIsT0FBTyxDQUFDLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDckM7WUFDRCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7UUFDekIsQ0FBQyxFQUFDO0lBRUosQ0FBQzs7Ozs7O0lBWEMsb0NBQVM7Ozs7O0lBQVQsVUFBVSxRQUFRLEVBQUUsT0FBTztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVUsUUFBUSxDQUFDLE1BQU0sV0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFFLENBQUMsQ0FBQztJQUN0RSxDQUFDOztnQkFMRixVQUFVOztJQWNYLHVCQUFDO0NBQUEsQUFkRCxJQWNDO1NBYlksZ0JBQWdCOzs7SUFNM0IsdUNBS0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIdHRwRXJyb3JTZXJ2aWNlIHtcblxuICBodHRwRXJyb3IocmVzcG9uc2UsIG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmxvZyhgRXJyb3IgKCR7cmVzcG9uc2Uuc3RhdHVzfSkgJHttZXNzYWdlID8gbWVzc2FnZSA6ICcnfWApO1xuICB9XG5cbiAgaXNFcnJvckNvZGUgPSBmdW5jdGlvbiAoY29kZSkge1xuICAgIGlmICh0eXBlb2YgY29kZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiAhKGNvZGUgPj0gMjAwICYmIGNvZGUgPCAzMDApO1xuICAgIH1cbiAgICByZXR1cm4gY29kZVswXSAhPT0gJzInO1xuICB9O1xuXG59XG4iXX0=