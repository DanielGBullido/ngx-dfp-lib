/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
var DfpAudiencePixelDirective = /** @class */ (function () {
    function DfpAudiencePixelDirective(platformId, elementRef) {
        this.platformId = platformId;
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    DfpAudiencePixelDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            var axel = Math.random();
            /** @type {?} */
            var random = axel * 10000000000000;
            /** @type {?} */
            var adUnit = '';
            if (this.adUnit) {
                adUnit = "dc_iu=" + this.adUnit;
            }
            /** @type {?} */
            var ppid = '';
            if (this.ppid) {
                ppid = "ppid=" + this.ppid;
            }
            /** @type {?} */
            var pixel = document.createElement('img');
            pixel.src = 'https://pubads.g.doubleclick.net/activity;ord=';
            pixel.src += random + ";dc_seg=" + this.segmentId + ";" + adUnit + ppid;
            pixel.width = 1;
            pixel.height = 1;
            pixel.border = '0';
            pixel.style.visibility = 'hidden';
            this.elementRef.nativeElement.append(pixel);
        }
    };
    DfpAudiencePixelDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-audience-pixel'
                },] }
    ];
    /** @nocollapse */
    DfpAudiencePixelDirective.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ElementRef }
    ]; };
    DfpAudiencePixelDirective.propDecorators = {
        adUnit: [{ type: Input }],
        segmentId: [{ type: Input }],
        ppid: [{ type: Input }]
    };
    return DfpAudiencePixelDirective;
}());
export { DfpAudiencePixelDirective };
if (false) {
    /** @type {?} */
    DfpAudiencePixelDirective.prototype.adUnit;
    /** @type {?} */
    DfpAudiencePixelDirective.prototype.segmentId;
    /** @type {?} */
    DfpAudiencePixelDirective.prototype.ppid;
    /**
     * @type {?}
     * @private
     */
    DfpAudiencePixelDirective.prototype.platformId;
    /**
     * @type {?}
     * @private
     */
    DfpAudiencePixelDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxVQUFVLEVBQ3JCLEtBQUssRUFFTCxNQUFNLEVBQ04sV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBEO0lBU0UsbUNBQytCLFVBQWtCLEVBQ3ZDLFVBQXNCO1FBREQsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQzVCLENBQUM7Ozs7SUFFTCw0Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTs7Z0JBQ2hDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFOztnQkFDeEIsTUFBTSxHQUFHLElBQUksR0FBRyxjQUFjOztnQkFFNUIsTUFBTSxHQUFHLEVBQUU7WUFDZixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsTUFBTSxHQUFHLFdBQVMsSUFBSSxDQUFDLE1BQVEsQ0FBQzthQUNqQzs7Z0JBRUcsSUFBSSxHQUFHLEVBQUU7WUFDYixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsSUFBSSxHQUFHLFVBQVEsSUFBSSxDQUFDLElBQU0sQ0FBQzthQUM1Qjs7Z0JBRUssS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1lBRTNDLEtBQUssQ0FBQyxHQUFHLEdBQUcsZ0RBQWdELENBQUM7WUFDN0QsS0FBSyxDQUFDLEdBQUcsSUFBTyxNQUFNLGdCQUFXLElBQUksQ0FBQyxTQUFTLFNBQUksTUFBTSxHQUFHLElBQU0sQ0FBQztZQUVuRSxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNoQixLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNqQixLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUVuQixLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7WUFFbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQzs7Z0JBMUNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2lCQUMvQjs7OztnQkFRNEMsTUFBTSx1QkFBOUMsTUFBTSxTQUFDLFdBQVc7Z0JBbEJWLFVBQVU7Ozt5QkFhcEIsS0FBSzs0QkFDTCxLQUFLO3VCQUNMLEtBQUs7O0lBb0NSLGdDQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7U0F4Q1kseUJBQXlCOzs7SUFFcEMsMkNBQXdCOztJQUN4Qiw4Q0FBMkI7O0lBQzNCLHlDQUFzQjs7Ozs7SUFHcEIsK0NBQStDOzs7OztJQUMvQywrQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIEluamVjdCxcbiAgUExBVEZPUk1fSURcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2RmcC1hdWRpZW5jZS1waXhlbCdcbn0pXG5leHBvcnQgY2xhc3MgRGZwQXVkaWVuY2VQaXhlbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgYWRVbml0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNlZ21lbnRJZDogbnVtYmVyO1xuICBASW5wdXQoKSBwcGlkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNvbnN0IGF4ZWwgPSBNYXRoLnJhbmRvbSgpLFxuICAgICAgICByYW5kb20gPSBheGVsICogMTAwMDAwMDAwMDAwMDA7XG5cbiAgICAgIGxldCBhZFVuaXQgPSAnJztcbiAgICAgIGlmICh0aGlzLmFkVW5pdCkge1xuICAgICAgICBhZFVuaXQgPSBgZGNfaXU9JHt0aGlzLmFkVW5pdH1gO1xuICAgICAgfVxuXG4gICAgICBsZXQgcHBpZCA9ICcnO1xuICAgICAgaWYgKHRoaXMucHBpZCkge1xuICAgICAgICBwcGlkID0gYHBwaWQ9JHt0aGlzLnBwaWR9YDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGl4ZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgcGl4ZWwuc3JjID0gJ2h0dHBzOi8vcHViYWRzLmcuZG91YmxlY2xpY2submV0L2FjdGl2aXR5O29yZD0nO1xuICAgICAgcGl4ZWwuc3JjICs9IGAke3JhbmRvbX07ZGNfc2VnPSR7dGhpcy5zZWdtZW50SWR9OyR7YWRVbml0fSR7cHBpZH1gO1xuXG4gICAgICBwaXhlbC53aWR0aCA9IDE7XG4gICAgICBwaXhlbC5oZWlnaHQgPSAxO1xuICAgICAgcGl4ZWwuYm9yZGVyID0gJzAnO1xuXG4gICAgICBwaXhlbC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG5cbiAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFwcGVuZChwaXhlbCk7XG4gICAgfVxuICB9XG59XG4iXX0=