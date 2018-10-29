/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export class DfpAudiencePixelDirective {
    /**
     * @param {?} platformId
     * @param {?} elementRef
     */
    constructor(platformId, elementRef) {
        this.platformId = platformId;
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            const axel = Math.random();
            /** @type {?} */
            const random = axel * 10000000000000;
            /** @type {?} */
            let adUnit = '';
            if (this.adUnit) {
                adUnit = `dc_iu=${this.adUnit}`;
            }
            /** @type {?} */
            let ppid = '';
            if (this.ppid) {
                ppid = `ppid=${this.ppid}`;
            }
            /** @type {?} */
            const pixel = document.createElement('img');
            pixel.src = 'https://pubads.g.doubleclick.net/activity;ord=';
            pixel.src += `${random};dc_seg=${this.segmentId};${adUnit}${ppid}`;
            pixel.width = 1;
            pixel.height = 1;
            pixel.border = '0';
            pixel.style.visibility = 'hidden';
            this.elementRef.nativeElement.append(pixel);
        }
    }
}
DfpAudiencePixelDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-audience-pixel'
            },] }
];
/** @nocollapse */
DfpAudiencePixelDirective.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ElementRef }
];
DfpAudiencePixelDirective.propDecorators = {
    adUnit: [{ type: Input }],
    segmentId: [{ type: Input }],
    ppid: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DfpAudiencePixelDirective.prototype.adUnit;
    /** @type {?} */
    DfpAudiencePixelDirective.prototype.segmentId;
    /** @type {?} */
    DfpAudiencePixelDirective.prototype.ppid;
    /** @type {?} */
    DfpAudiencePixelDirective.prototype.platformId;
    /** @type {?} */
    DfpAudiencePixelDirective.prototype.elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxVQUFVLEVBQ3JCLEtBQUssRUFFTCxNQUFNLEVBQ04sV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBS3BELE1BQU07Ozs7O0lBTUosWUFDK0IsVUFBa0IsRUFDdkM7UUFEcUIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxlQUFVLEdBQVYsVUFBVTtLQUNmOzs7O0lBRUwsUUFBUTtRQUNOLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ3ZDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FDTzs7WUFEakMsTUFDRSxNQUFNLEdBQUcsSUFBSSxHQUFHLGNBQWMsQ0FBQzs7WUFFakMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixNQUFNLEdBQUcsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDakM7O1lBRUQsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxHQUFHLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQzVCOztZQUVELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFNUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztZQUM3RCxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsTUFBTSxXQUFXLElBQUksQ0FBQyxTQUFTLElBQUksTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDO1lBRW5FLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBRW5CLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztZQUVsQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0M7S0FDRjs7O1lBMUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2FBQy9COzs7O1lBUTRDLE1BQU0sdUJBQTlDLE1BQU0sU0FBQyxXQUFXO1lBbEJWLFVBQVU7OztxQkFhcEIsS0FBSzt3QkFDTCxLQUFLO21CQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIEluamVjdCxcbiAgUExBVEZPUk1fSURcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2RmcC1hdWRpZW5jZS1waXhlbCdcbn0pXG5leHBvcnQgY2xhc3MgRGZwQXVkaWVuY2VQaXhlbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgYWRVbml0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNlZ21lbnRJZDogbnVtYmVyO1xuICBASW5wdXQoKSBwcGlkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNvbnN0IGF4ZWwgPSBNYXRoLnJhbmRvbSgpLFxuICAgICAgICByYW5kb20gPSBheGVsICogMTAwMDAwMDAwMDAwMDA7XG5cbiAgICAgIGxldCBhZFVuaXQgPSAnJztcbiAgICAgIGlmICh0aGlzLmFkVW5pdCkge1xuICAgICAgICBhZFVuaXQgPSBgZGNfaXU9JHt0aGlzLmFkVW5pdH1gO1xuICAgICAgfVxuXG4gICAgICBsZXQgcHBpZCA9ICcnO1xuICAgICAgaWYgKHRoaXMucHBpZCkge1xuICAgICAgICBwcGlkID0gYHBwaWQ9JHt0aGlzLnBwaWR9YDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGl4ZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgcGl4ZWwuc3JjID0gJ2h0dHBzOi8vcHViYWRzLmcuZG91YmxlY2xpY2submV0L2FjdGl2aXR5O29yZD0nO1xuICAgICAgcGl4ZWwuc3JjICs9IGAke3JhbmRvbX07ZGNfc2VnPSR7dGhpcy5zZWdtZW50SWR9OyR7YWRVbml0fSR7cHBpZH1gO1xuXG4gICAgICBwaXhlbC53aWR0aCA9IDE7XG4gICAgICBwaXhlbC5oZWlnaHQgPSAxO1xuICAgICAgcGl4ZWwuYm9yZGVyID0gJzAnO1xuXG4gICAgICBwaXhlbC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG5cbiAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFwcGVuZChwaXhlbCk7XG4gICAgfVxuICB9XG59XG4iXX0=