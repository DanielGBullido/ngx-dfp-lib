/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
const DIRECTIVES = [
    DfpAdDirective,
    DfpSizeDirective,
    DfpResponsiveDirective,
    DfpAdResponsiveDirective,
    DfpTargetingDirective, DfpExclusionDirective, DfpValueDirective,
    DfpAudiencePixelDirective
];
/** @type {?} */
const SERVICES = [
    HttpErrorService,
    ParseDurationService,
    ScriptInjectorService,
    DfpService, DfpIDGeneratorService, DfpRefreshService
];
export class DfpModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: DfpModule,
            providers: [
                ...(config && config.idleLoad === true ? [IdleService] : []),
                { provide: DFP_CONFIG, useValue: config || {} }
            ]
        };
    }
}
DfpModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    ...DIRECTIVES
                ],
                providers: [
                    ...SERVICES
                ],
                exports: [
                    ...DIRECTIVES
                ]
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkZnAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSXpDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNuRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7QUFFckYsTUFBTSxVQUFVLEdBQUc7SUFDakIsY0FBYztJQUNkLGdCQUFnQjtJQUNoQixzQkFBc0I7SUFDdEIsd0JBQXdCO0lBQ3hCLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLGlCQUFpQjtJQUMvRCx5QkFBeUI7Q0FDMUIsQ0FBQzs7QUFFRixNQUFNLFFBQVEsR0FBRztJQUNmLGdCQUFnQjtJQUNoQixvQkFBb0I7SUFDcEIscUJBQXFCO0lBQ3JCLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxpQkFBaUI7Q0FDckQsQ0FBQztBQWdCRixNQUFNOzs7OztJQUNKLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBa0I7UUFDL0IsTUFBTSxDQUFDO1lBQ0wsUUFBUSxFQUFFLFNBQVM7WUFDbkIsU0FBUyxFQUFFO2dCQUNULEdBQUcsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDNUQsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLElBQUksRUFBRSxFQUFFO2FBQ2hEO1NBQ0YsQ0FBQztLQUNIOzs7WUF2QkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxFQUVSO2dCQUNELFlBQVksRUFBRTtvQkFDWixHQUFHLFVBQVU7aUJBQ2Q7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULEdBQUcsUUFBUTtpQkFDWjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsR0FBRyxVQUFVO2lCQUNkO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEZnBDb25maWcsIH0gZnJvbSAnLi9jbGFzcyc7XG5pbXBvcnQgeyBERlBfQ09ORklHIH0gZnJvbSAnLi9zZXJ2aWNlL2luamVjdGlvbl90b2tlbic7XG5cbmltcG9ydCB7IElkbGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2lkbGUuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2h0dHAtZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBQYXJzZUR1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9wYXJzZS1kdXJhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFNjcmlwdEluamVjdG9yU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBEZnBTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2RmcC5zZXJ2aWNlJztcbmltcG9ydCB7IERmcElER2VuZXJhdG9yU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9kZnAtaWQtZ2VuZXJhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGZwUmVmcmVzaFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvZGZwLXJlZnJlc2guc2VydmljZSc7XG5cbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLWFkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZnBTaXplRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLXNpemUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcFJlc3BvbnNpdmVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtcmVzcG9uc2l2ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwQWRSZXNwb25zaXZlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLWFkLXJlc3BvbnNpdmUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcFRhcmdldGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC10YXJnZXRpbmcuZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcEV4Y2x1c2lvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1leGNsdXNpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcFZhbHVlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLXZhbHVlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZnBBdWRpZW5jZVBpeGVsRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZSc7XG5cbmNvbnN0IERJUkVDVElWRVMgPSBbXG4gIERmcEFkRGlyZWN0aXZlLFxuICBEZnBTaXplRGlyZWN0aXZlLFxuICBEZnBSZXNwb25zaXZlRGlyZWN0aXZlLFxuICBEZnBBZFJlc3BvbnNpdmVEaXJlY3RpdmUsXG4gIERmcFRhcmdldGluZ0RpcmVjdGl2ZSwgRGZwRXhjbHVzaW9uRGlyZWN0aXZlLCBEZnBWYWx1ZURpcmVjdGl2ZSxcbiAgRGZwQXVkaWVuY2VQaXhlbERpcmVjdGl2ZVxuXTtcblxuY29uc3QgU0VSVklDRVMgPSBbXG4gIEh0dHBFcnJvclNlcnZpY2UsXG4gIFBhcnNlRHVyYXRpb25TZXJ2aWNlLFxuICBTY3JpcHRJbmplY3RvclNlcnZpY2UsXG4gIERmcFNlcnZpY2UsIERmcElER2VuZXJhdG9yU2VydmljZSwgRGZwUmVmcmVzaFNlcnZpY2Vcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcblxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICAuLi5ESVJFQ1RJVkVTXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIC4uLlNFUlZJQ0VTXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICAuLi5ESVJFQ1RJVkVTXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGZwTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogRGZwQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBEZnBNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgLi4uKGNvbmZpZyAmJiBjb25maWcuaWRsZUxvYWQgPT09IHRydWUgPyBbSWRsZVNlcnZpY2VdIDogW10pLFxuICAgICAgICB7IHByb3ZpZGU6IERGUF9DT05GSUcsIHVzZVZhbHVlOiBjb25maWcgfHwge30gfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==