import { HttpErrorService } from './http-error.service';
export declare class ScriptInjectorService {
    private httpError;
    constructor(httpError: HttpErrorService);
    private completeURL;
    private createScript;
    private promiseScript;
    injectScript(script: any): void;
    scriptInjector(url: any): Promise<{}>;
}
