/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpErrorService } from './http-error.service';
var ScriptInjectorService = /** @class */ (function () {
    function ScriptInjectorService(httpError) {
        this.httpError = httpError;
    }
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    ScriptInjectorService.prototype.completeURL = /**
     * @private
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var ssl = document.location.protocol === 'https:';
        return (ssl ? 'https:' : 'http:') + url;
    };
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    ScriptInjectorService.prototype.createScript = /**
     * @private
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.src = this.completeURL(url);
        return script;
    };
    /**
     * @private
     * @param {?} script
     * @param {?} url
     * @return {?}
     */
    ScriptInjectorService.prototype.promiseScript = /**
     * @private
     * @param {?} script
     * @param {?} url
     * @return {?}
     */
    function (script, url) {
        var _this = this;
        /** @type {?} */
        var promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            script.onload = (/**
             * @return {?}
             */
            function () {
                resolve(script);
            });
            script.onerror = (/**
             * @return {?}
             */
            function () {
                reject({
                    path: url,
                    loaded: false
                });
            });
        }));
        promise.catch((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            _this.httpError.httpError({ status: 400 }, "loading script \"" + url + "\"");
        }));
        return promise;
    };
    /**
     * @param {?} script
     * @return {?}
     */
    ScriptInjectorService.prototype.injectScript = /**
     * @param {?} script
     * @return {?}
     */
    function (script) {
        /** @type {?} */
        var head = document.head || document.querySelector('head');
        head.appendChild(script);
    };
    /**
     * @param {?} url
     * @return {?}
     */
    ScriptInjectorService.prototype.scriptInjector = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var script = this.createScript(url);
        this.injectScript(script);
        return this.promiseScript(script, url);
    };
    ScriptInjectorService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ScriptInjectorService.ctorParameters = function () { return [
        { type: HttpErrorService }
    ]; };
    return ScriptInjectorService;
}());
export { ScriptInjectorService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ScriptInjectorService.prototype.httpError;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LWluamVjdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsic2VydmljZS9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RDtJQUdFLCtCQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtJQUFJLENBQUM7Ozs7OztJQUU1QywyQ0FBVzs7Ozs7SUFBbkIsVUFBb0IsR0FBRzs7WUFDZixHQUFHLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssUUFBUTtRQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUMxQyxDQUFDOzs7Ozs7SUFFTyw0Q0FBWTs7Ozs7SUFBcEIsVUFBcUIsR0FBRzs7WUFDaEIsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBRS9DLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUM7UUFDaEMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5DLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Ozs7Ozs7SUFFTyw2Q0FBYTs7Ozs7O0lBQXJCLFVBQXNCLE1BQU0sRUFBRSxHQUFHO1FBQWpDLGlCQWtCQzs7WUFqQk8sT0FBTyxHQUFHLElBQUksT0FBTzs7Ozs7UUFBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQzFDLE1BQU0sQ0FBQyxNQUFNOzs7WUFBRztnQkFDZCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFBLENBQUM7WUFDRixNQUFNLENBQUMsT0FBTzs7O1lBQUc7Z0JBQ2YsTUFBTSxDQUFDO29CQUNMLElBQUksRUFBRSxHQUFHO29CQUNULE1BQU0sRUFBRSxLQUFLO2lCQUNkLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQSxDQUFDO1FBQ0osQ0FBQyxFQUFDO1FBRUYsT0FBTyxDQUFDLEtBQUs7Ozs7UUFBQyxVQUFBLFFBQVE7WUFDcEIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsc0JBQW1CLEdBQUcsT0FBRyxDQUFDLENBQUM7UUFDdkUsQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7OztJQUVELDRDQUFZOzs7O0lBQVosVUFBYSxNQUFNOztZQUNYLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQzVELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFRCw4Q0FBYzs7OztJQUFkLFVBQWUsR0FBRzs7WUFDVixNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7UUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7O2dCQWpERixVQUFVOzs7O2dCQUZGLGdCQUFnQjs7SUFxRHpCLDRCQUFDO0NBQUEsQUFuREQsSUFtREM7U0FsRFkscUJBQXFCOzs7Ozs7SUFFcEIsMENBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBIdHRwRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi9odHRwLWVycm9yLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBFcnJvcjogSHR0cEVycm9yU2VydmljZSkgeyB9XG5cbiAgcHJpdmF0ZSBjb21wbGV0ZVVSTCh1cmwpIHtcbiAgICBjb25zdCBzc2wgPSBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XG4gICAgcmV0dXJuIChzc2wgPyAnaHR0cHM6JyA6ICdodHRwOicpICsgdXJsO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVTY3JpcHQodXJsKSB7XG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgc2NyaXB0LnNyYyA9IHRoaXMuY29tcGxldGVVUkwodXJsKTtcblxuICAgIHJldHVybiBzY3JpcHQ7XG4gIH1cblxuICBwcml2YXRlIHByb21pc2VTY3JpcHQoc2NyaXB0LCB1cmwpIHtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZShzY3JpcHQpO1xuICAgICAgfTtcbiAgICAgIHNjcmlwdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICByZWplY3Qoe1xuICAgICAgICAgIHBhdGg6IHVybCxcbiAgICAgICAgICBsb2FkZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHByb21pc2UuY2F0Y2gocmVzcG9uc2UgPT4ge1xuICAgICAgdGhpcy5odHRwRXJyb3IuaHR0cEVycm9yKHsgc3RhdHVzOiA0MDAgfSwgYGxvYWRpbmcgc2NyaXB0IFwiJHt1cmx9XCJgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgaW5qZWN0U2NyaXB0KHNjcmlwdCkge1xuICAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKTtcbiAgICBoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gIH1cblxuICBzY3JpcHRJbmplY3Rvcih1cmwpIHtcbiAgICBjb25zdCBzY3JpcHQgPSB0aGlzLmNyZWF0ZVNjcmlwdCh1cmwpO1xuICAgIHRoaXMuaW5qZWN0U2NyaXB0KHNjcmlwdCk7XG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZVNjcmlwdChzY3JpcHQsIHVybCk7XG4gIH1cblxufVxuIl19