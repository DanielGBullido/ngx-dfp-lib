/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Inject, forwardRef, HostListener } from '@angular/core';
import { DfpAdDirective } from './dfp-ad.directive';
import { DfpRefreshService } from '../service/dfp-refresh.service';
export class DfpAdResponsiveDirective {
    /**
     * @param {?} elementRef
     * @param {?} ad
     * @param {?} dfpRefresh
     */
    constructor(elementRef, ad, dfpRefresh) {
        this.elementRef = elementRef;
        this.ad = ad;
        this.dfpRefresh = dfpRefresh;
        this.ad.afterRefresh.subscribe(event => {
            this.slot = event.slot;
        });
    }
    /**
     * @return {?}
     */
    normalizeIframe() {
        if (this.ad.isHidden) {
            return false;
        }
        this.iframe = this.iframe || this.getIframe();
        if (!this.iframe) {
            return false;
        }
        this.iframeWidth = this.iframeWidth || +this.iframe.width;
        /** @type {?} */
        const winWidth = window.innerWidth;
        /** @type {?} */
        let state = this.ad.getState();
        /** @type {?} */
        let width = 0;
        state.sizes.forEach(size => {
            if (size[0] < winWidth) {
                width = Math.max(width, size[0]);
            }
        });
        if (state.sizes.length > 1 && width !== this.iframeWidth) {
            state = this.ad.getState();
            this.iframeWidth = width;
            this.iframe.setAttribute('width', width + '');
            this.dfpRefresh.slotRefresh(this.slot, state.refresh).then(slot => {
                this.ad.afterRefresh.emit({ type: 'resize', slot: slot });
                this.iframe = this.getIframe();
            });
        }
    }
    /**
     * @return {?}
     */
    getIframe() {
        /** @type {?} */
        const ad = this.elementRef.nativeElement;
        /** @type {?} */
        const iframe = ad.querySelector('iframe');
        if (iframe && +iframe.width > 0) {
            return iframe;
        }
    }
}
DfpAdResponsiveDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-ad[responsive]'
            },] }
];
/** @nocollapse */
DfpAdResponsiveDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpAdDirective),] }] },
    { type: DfpRefreshService }
];
DfpAdResponsiveDirective.propDecorators = {
    normalizeIframe: [{ type: HostListener, args: ['window:resize',] }]
};
if (false) {
    /** @type {?} */
    DfpAdResponsiveDirective.prototype.iframe;
    /** @type {?} */
    DfpAdResponsiveDirective.prototype.iframeWidth;
    /** @type {?} */
    DfpAdResponsiveDirective.prototype.slot;
    /** @type {?} */
    DfpAdResponsiveDirective.prototype.elementRef;
    /** @type {?} */
    DfpAdResponsiveDirective.prototype.ad;
    /** @type {?} */
    DfpAdResponsiveDirective.prototype.dfpRefresh;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWFkLXJlc3BvbnNpdmUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZS9kZnAtYWQtcmVzcG9uc2l2ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQUUsVUFBVSxFQUNyQixNQUFNLEVBQUUsVUFBVSxFQUNsQixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBS25FLE1BQU07Ozs7OztJQU1GLFlBQ1ksWUFFQSxFQUFrQixFQUNsQjtRQUhBLGVBQVUsR0FBVixVQUFVO1FBRVYsT0FBRSxHQUFGLEVBQUUsQ0FBZ0I7UUFDbEIsZUFBVSxHQUFWLFVBQVU7UUFFbEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztTQUMxQixDQUFDLENBQUM7S0FDTjs7OztJQUdELGVBQWU7UUFDWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDOUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FBRTtRQUVuQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7UUFFMUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7UUFFbkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FDaEI7O1FBRGQsSUFDSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRWQsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwQztTQUNKLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdkQsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzlELElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzFELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xDLENBQUMsQ0FBQztTQUNOO0tBQ0o7Ozs7SUFFRCxTQUFTOztRQUNMLE1BQU0sRUFBRSxHQUFZLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUNUOztRQUR4QyxNQUNJLE1BQU0sR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2pCO0tBQ0o7OztZQTFESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjthQUNqQzs7OztZQVZjLFVBQVU7WUFLaEIsY0FBYyx1QkFjZCxNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQWJ2QyxpQkFBaUI7Ozs4QkFzQnJCLFlBQVksU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXG4gICAgSW5qZWN0LCBmb3J3YXJkUmVmLFxuICAgIEhvc3RMaXN0ZW5lclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1hZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwUmVmcmVzaFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2RmcC1hZFtyZXNwb25zaXZlXSdcbn0pXG5leHBvcnQgY2xhc3MgRGZwQWRSZXNwb25zaXZlRGlyZWN0aXZlIHtcblxuICAgIHByaXZhdGUgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudDtcbiAgICBwcml2YXRlIGlmcmFtZVdpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzbG90OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwQWREaXJlY3RpdmUpKVxuICAgICAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZSxcbiAgICAgICAgcHJpdmF0ZSBkZnBSZWZyZXNoOiBEZnBSZWZyZXNoU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLmFkLmFmdGVyUmVmcmVzaC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5zbG90ID0gZXZlbnQuc2xvdDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gICAgbm9ybWFsaXplSWZyYW1lKCkge1xuICAgICAgICBpZiAodGhpcy5hZC5pc0hpZGRlbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaWZyYW1lID0gdGhpcy5pZnJhbWUgfHwgdGhpcy5nZXRJZnJhbWUoKTtcbiAgICAgICAgaWYgKCF0aGlzLmlmcmFtZSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICB0aGlzLmlmcmFtZVdpZHRoID0gdGhpcy5pZnJhbWVXaWR0aCB8fCArdGhpcy5pZnJhbWUud2lkdGg7XG5cbiAgICAgICAgY29uc3Qgd2luV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLmFkLmdldFN0YXRlKCksXG4gICAgICAgICAgICB3aWR0aCA9IDA7XG5cbiAgICAgICAgc3RhdGUuc2l6ZXMuZm9yRWFjaChzaXplID0+IHtcbiAgICAgICAgICAgIGlmIChzaXplWzBdIDwgd2luV2lkdGgpIHtcbiAgICAgICAgICAgICAgICB3aWR0aCA9IE1hdGgubWF4KHdpZHRoLCBzaXplWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHN0YXRlLnNpemVzLmxlbmd0aCA+IDEgJiYgd2lkdGggIT09IHRoaXMuaWZyYW1lV2lkdGgpIHtcbiAgICAgICAgICAgIHN0YXRlID0gdGhpcy5hZC5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5pZnJhbWVXaWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5pZnJhbWUuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHdpZHRoICsgJycpO1xuICAgICAgICAgICAgdGhpcy5kZnBSZWZyZXNoLnNsb3RSZWZyZXNoKHRoaXMuc2xvdCwgc3RhdGUucmVmcmVzaCkudGhlbihzbG90ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkLmFmdGVyUmVmcmVzaC5lbWl0KHsgdHlwZTogJ3Jlc2l6ZScsIHNsb3Q6IHNsb3QgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pZnJhbWUgPSB0aGlzLmdldElmcmFtZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRJZnJhbWUoKSB7XG4gICAgICAgIGNvbnN0IGFkOiBFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICBpZnJhbWUgPSBhZC5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKTtcbiAgICAgICAgaWYgKGlmcmFtZSAmJiAraWZyYW1lLndpZHRoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGlmcmFtZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==