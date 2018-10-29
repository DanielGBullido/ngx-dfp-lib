/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class HttpErrorService {
    constructor() {
        this.isErrorCode = function (code) {
            if (typeof code === 'number') {
                return !(code >= 200 && code < 300);
            }
            return code[0] !== '2';
        };
    }
    /**
     * @param {?} response
     * @param {?} message
     * @return {?}
     */
    httpError(response, message) {
        console.log(`Error (${response.status}) ${message ? message : ''}`);
    }
}
HttpErrorService.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    HttpErrorService.prototype.isErrorCode;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1lcnJvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvaHR0cC1lcnJvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE1BQU07OzJCQU1VLFVBQVUsSUFBSTtZQUMxQixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2FBQ3JDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7U0FDeEI7Ozs7Ozs7SUFURCxTQUFTLENBQUMsUUFBUSxFQUFFLE9BQU87UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLFFBQVEsQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDckU7OztZQUxGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIdHRwRXJyb3JTZXJ2aWNlIHtcblxuICBodHRwRXJyb3IocmVzcG9uc2UsIG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmxvZyhgRXJyb3IgKCR7cmVzcG9uc2Uuc3RhdHVzfSkgJHttZXNzYWdlID8gbWVzc2FnZSA6ICcnfWApO1xuICB9XG5cbiAgaXNFcnJvckNvZGUgPSBmdW5jdGlvbiAoY29kZSkge1xuICAgIGlmICh0eXBlb2YgY29kZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiAhKGNvZGUgPj0gMjAwICYmIGNvZGUgPCAzMDApO1xuICAgIH1cbiAgICByZXR1cm4gY29kZVswXSAhPT0gJzInO1xuICB9O1xuXG59XG4iXX0=