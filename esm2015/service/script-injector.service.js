/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpErrorService } from './http-error.service';
export class ScriptInjectorService {
    /**
     * @param {?} httpError
     */
    constructor(httpError) {
        this.httpError = httpError;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    completeURL(url) {
        /** @type {?} */
        const ssl = document.location.protocol === 'https:';
        return (ssl ? 'https:' : 'http:') + url;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    createScript(url) {
        /** @type {?} */
        const script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.src = this.completeURL(url);
        return script;
    }
    /**
     * @param {?} script
     * @param {?} url
     * @return {?}
     */
    promiseScript(script, url) {
        /** @type {?} */
        const promise = new Promise((resolve, reject) => {
            script.onload = () => {
                resolve(script);
            };
            script.onerror = () => {
                reject({
                    path: url,
                    loaded: false
                });
            };
        });
        promise.catch(response => {
            this.httpError.httpError({ status: 400 }, `loading script "${url}"`);
        });
        return promise;
    }
    /**
     * @param {?} script
     * @return {?}
     */
    injectScript(script) {
        /** @type {?} */
        const head = document.head || document.querySelector('head');
        head.appendChild(script);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    scriptInjector(url) {
        /** @type {?} */
        const script = this.createScript(url);
        this.injectScript(script);
        return this.promiseScript(script, url);
    }
}
ScriptInjectorService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ScriptInjectorService.ctorParameters = () => [
    { type: HttpErrorService }
];
if (false) {
    /** @type {?} */
    ScriptInjectorService.prototype.httpError;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LWluamVjdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsic2VydmljZS9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd4RCxNQUFNOzs7O0lBRUosWUFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7S0FBSzs7Ozs7SUFFNUMsV0FBVyxDQUFDLEdBQUc7O1FBQ3JCLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQztRQUNwRCxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDOzs7Ozs7SUFHbEMsWUFBWSxDQUFDLEdBQUc7O1FBQ3RCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEQsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDcEIsTUFBTSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztRQUNoQyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7Ozs7OztJQUdSLGFBQWEsQ0FBQyxNQUFNLEVBQUUsR0FBRzs7UUFDL0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDOUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7Z0JBQ25CLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNqQixDQUFDO1lBQ0YsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUU7Z0JBQ3BCLE1BQU0sQ0FBQztvQkFDTCxJQUFJLEVBQUUsR0FBRztvQkFDVCxNQUFNLEVBQUUsS0FBSztpQkFDZCxDQUFDLENBQUM7YUFDSixDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxtQkFBbUIsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUN0RSxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsT0FBTyxDQUFDOzs7Ozs7SUFHakIsWUFBWSxDQUFDLE1BQU07O1FBQ2pCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFCOzs7OztJQUVELGNBQWMsQ0FBQyxHQUFHOztRQUNoQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ3hDOzs7WUFqREYsVUFBVTs7OztZQUZGLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSHR0cEVycm9yU2VydmljZSB9IGZyb20gJy4vaHR0cC1lcnJvci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNjcmlwdEluamVjdG9yU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwRXJyb3I6IEh0dHBFcnJvclNlcnZpY2UpIHsgfVxuXG4gIHByaXZhdGUgY29tcGxldGVVUkwodXJsKSB7XG4gICAgY29uc3Qgc3NsID0gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwczonO1xuICAgIHJldHVybiAoc3NsID8gJ2h0dHBzOicgOiAnaHR0cDonKSArIHVybDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU2NyaXB0KHVybCkge1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIHNjcmlwdC5zcmMgPSB0aGlzLmNvbXBsZXRlVVJMKHVybCk7XG5cbiAgICByZXR1cm4gc2NyaXB0O1xuICB9XG5cbiAgcHJpdmF0ZSBwcm9taXNlU2NyaXB0KHNjcmlwdCwgdXJsKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoc2NyaXB0KTtcbiAgICAgIH07XG4gICAgICBzY3JpcHQub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICBwYXRoOiB1cmwsXG4gICAgICAgICAgbG9hZGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBwcm9taXNlLmNhdGNoKHJlc3BvbnNlID0+IHtcbiAgICAgIHRoaXMuaHR0cEVycm9yLmh0dHBFcnJvcih7IHN0YXR1czogNDAwIH0sIGBsb2FkaW5nIHNjcmlwdCBcIiR7dXJsfVwiYCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGluamVjdFNjcmlwdChzY3JpcHQpIHtcbiAgICBjb25zdCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJyk7XG4gICAgaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICB9XG5cbiAgc2NyaXB0SW5qZWN0b3IodXJsKSB7XG4gICAgY29uc3Qgc2NyaXB0ID0gdGhpcy5jcmVhdGVTY3JpcHQodXJsKTtcbiAgICB0aGlzLmluamVjdFNjcmlwdChzY3JpcHQpO1xuICAgIHJldHVybiB0aGlzLnByb21pc2VTY3JpcHQoc2NyaXB0LCB1cmwpO1xuICB9XG5cbn1cbiJdfQ==