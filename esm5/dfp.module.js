/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { DFP_CONFIG } from './service/injection_token';
import { IdleService } from './service/idle.service';
import { HttpErrorService } from './service/http-error.service';
import { ParseDurationService } from './service/parse-duration.service';
import { ScriptInjectorService } from './service/script-injector.service';
import { DfpService } from './service/dfp.service';
import { DfpIDGeneratorService } from './service/dfp-id-generator.service';
import { DfpRefreshService } from './service/dfp-refresh.service';
import { DfpAdDirective } from './directive/dfp-ad.directive';
import { DfpSizeDirective } from './directive/dfp-size.directive';
import { DfpResponsiveDirective } from './directive/dfp-responsive.directive';
import { DfpAdResponsiveDirective } from './directive/dfp-ad-responsive.directive';
import { DfpTargetingDirective } from './directive/dfp-targeting.directive';
import { DfpExclusionDirective } from './directive/dfp-exclusion.directive';
import { DfpValueDirective } from './directive/dfp-value.directive';
import { DfpAudiencePixelDirective } from './directive/dfp-audience-pixel.directive';
/** @type {?} */
var DIRECTIVES = [
    DfpAdDirective,
    DfpSizeDirective,
    DfpResponsiveDirective,
    DfpAdResponsiveDirective,
    DfpTargetingDirective, DfpExclusionDirective, DfpValueDirective,
    DfpAudiencePixelDirective
];
/** @type {?} */
var SERVICES = [
    HttpErrorService,
    ParseDurationService,
    ScriptInjectorService,
    DfpService, DfpIDGeneratorService, DfpRefreshService
];
var DfpModule = /** @class */ (function () {
    function DfpModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    DfpModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: DfpModule,
            providers: tslib_1.__spread((config && config.idleLoad === true ? [IdleService] : []), [
                { provide: DFP_CONFIG, useValue: config || {} }
            ])
        };
    };
    DfpModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: tslib_1.__spread(DIRECTIVES),
                    providers: tslib_1.__spread(SERVICES),
                    exports: tslib_1.__spread(DIRECTIVES)
                },] }
    ];
    return DfpModule;
}());
export { DfpModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkZnAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUl6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUVsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMENBQTBDLENBQUM7O0lBRS9FLFVBQVUsR0FBRztJQUNqQixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLHNCQUFzQjtJQUN0Qix3QkFBd0I7SUFDeEIscUJBQXFCLEVBQUUscUJBQXFCLEVBQUUsaUJBQWlCO0lBQy9ELHlCQUF5QjtDQUMxQjs7SUFFSyxRQUFRLEdBQUc7SUFDZixnQkFBZ0I7SUFDaEIsb0JBQW9CO0lBQ3BCLHFCQUFxQjtJQUNyQixVQUFVLEVBQUUscUJBQXFCLEVBQUUsaUJBQWlCO0NBQ3JEO0FBRUQ7SUFBQTtJQXdCQSxDQUFDOzs7OztJQVRRLGlCQUFPOzs7O0lBQWQsVUFBZSxNQUFrQjtRQUMvQixPQUFPO1lBQ0wsUUFBUSxFQUFFLFNBQVM7WUFDbkIsU0FBUyxtQkFDSixDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUM1RCxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sSUFBSSxFQUFFLEVBQUU7Y0FDaEQ7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0JBdkJGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsRUFFUjtvQkFDRCxZQUFZLG1CQUNQLFVBQVUsQ0FDZDtvQkFDRCxTQUFTLG1CQUNKLFFBQVEsQ0FDWjtvQkFDRCxPQUFPLG1CQUNGLFVBQVUsQ0FDZDtpQkFDRjs7SUFXRCxnQkFBQztDQUFBLEFBeEJELElBd0JDO1NBVlksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERmcENvbmZpZywgfSBmcm9tICcuL2NsYXNzJztcbmltcG9ydCB7IERGUF9DT05GSUcgfSBmcm9tICcuL3NlcnZpY2UvaW5qZWN0aW9uX3Rva2VuJztcblxuaW1wb3J0IHsgSWRsZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvaWRsZS5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBFcnJvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvaHR0cC1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IFBhcnNlRHVyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL3NjcmlwdC1pbmplY3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IERmcFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvZGZwLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGZwSURHZW5lcmF0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2RmcC1pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBEZnBSZWZyZXNoU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9kZnAtcmVmcmVzaC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtYWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcFNpemVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtc2l6ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1yZXNwb25zaXZlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZnBBZFJlc3BvbnNpdmVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtYWQtcmVzcG9uc2l2ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwVGFyZ2V0aW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLXRhcmdldGluZy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwRXhjbHVzaW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLWV4Y2x1c2lvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwVmFsdWVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtdmFsdWUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcEF1ZGllbmNlUGl4ZWxEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtYXVkaWVuY2UtcGl4ZWwuZGlyZWN0aXZlJztcblxuY29uc3QgRElSRUNUSVZFUyA9IFtcbiAgRGZwQWREaXJlY3RpdmUsXG4gIERmcFNpemVEaXJlY3RpdmUsXG4gIERmcFJlc3BvbnNpdmVEaXJlY3RpdmUsXG4gIERmcEFkUmVzcG9uc2l2ZURpcmVjdGl2ZSxcbiAgRGZwVGFyZ2V0aW5nRGlyZWN0aXZlLCBEZnBFeGNsdXNpb25EaXJlY3RpdmUsIERmcFZhbHVlRGlyZWN0aXZlLFxuICBEZnBBdWRpZW5jZVBpeGVsRGlyZWN0aXZlXG5dO1xuXG5jb25zdCBTRVJWSUNFUyA9IFtcbiAgSHR0cEVycm9yU2VydmljZSxcbiAgUGFyc2VEdXJhdGlvblNlcnZpY2UsXG4gIFNjcmlwdEluamVjdG9yU2VydmljZSxcbiAgRGZwU2VydmljZSwgRGZwSURHZW5lcmF0b3JTZXJ2aWNlLCBEZnBSZWZyZXNoU2VydmljZVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIC4uLkRJUkVDVElWRVNcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgLi4uU0VSVklDRVNcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIC4uLkRJUkVDVElWRVNcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZnBNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBEZnBDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IERmcE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAuLi4oY29uZmlnICYmIGNvbmZpZy5pZGxlTG9hZCA9PT0gdHJ1ZSA/IFtJZGxlU2VydmljZV0gOiBbXSksXG4gICAgICAgIHsgcHJvdmlkZTogREZQX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyB8fCB7fSB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19