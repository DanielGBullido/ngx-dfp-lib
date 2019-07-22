/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class HttpErrorService {
    constructor() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1lcnJvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvaHR0cC1lcnJvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFEN0I7UUFPRSxnQkFBVzs7OztRQUFHLFVBQVUsSUFBSTtZQUMxQixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDNUIsT0FBTyxDQUFDLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDckM7WUFDRCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7UUFDekIsQ0FBQyxFQUFDO0lBRUosQ0FBQzs7Ozs7O0lBWEMsU0FBUyxDQUFDLFFBQVEsRUFBRSxPQUFPO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxRQUFRLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7OztZQUxGLFVBQVU7Ozs7SUFPVCx1Q0FLRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEh0dHBFcnJvclNlcnZpY2Uge1xuXG4gIGh0dHBFcnJvcihyZXNwb25zZSwgbWVzc2FnZSkge1xuICAgIGNvbnNvbGUubG9nKGBFcnJvciAoJHtyZXNwb25zZS5zdGF0dXN9KSAke21lc3NhZ2UgPyBtZXNzYWdlIDogJyd9YCk7XG4gIH1cblxuICBpc0Vycm9yQ29kZSA9IGZ1bmN0aW9uIChjb2RlKSB7XG4gICAgaWYgKHR5cGVvZiBjb2RlID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuICEoY29kZSA+PSAyMDAgJiYgY29kZSA8IDMwMCk7XG4gICAgfVxuICAgIHJldHVybiBjb2RlWzBdICE9PSAnMic7XG4gIH07XG5cbn1cbiJdfQ==