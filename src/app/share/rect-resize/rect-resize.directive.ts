import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  Output,
  Renderer2
} from '@angular/core';
import { auditTime, filter } from 'rxjs/operators';
import { RectResizeService } from 'zeppelin-share/rect-resize/rect-resize.service';
import { measureScrollbar } from 'ng-zorro-antd/core';

interface ResizeRect {
  width: number;
  height: number;
  left: number;
  top: number;
  maxWidth: number;
  minWidth: number;
  minHeight: number;
  widthStep: number;
}

export interface ResizeResult {
  width: number;
  height: number;
  col: number;
}

const gcd = function(a, b) {
  if (!b) {
    return a;
  }
  return gcd(b, a % b);
};

@Directive({
  providers: [RectResizeService],
  selector: '[zeppelinRectResize]',
  host: {
    '(mouseenter)': 'onMouseenter()',
    '(mouseleave)': 'onMouseleave()'
  }
})
export class RectResizeDirective implements AfterViewInit {
  el: HTMLElement;
  ghostElement: HTMLDivElement;
  mouseDowned = false;
  ghostWidth = -1;
  ghostHeight = -1;
  ghostCol = 12;

  @Input() currentCol = 12;
  @Output() resize = new EventEmitter<ResizeResult>();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private ngZone: NgZone,
    private rectResizeService: RectResizeService
  ) {
    this.el = this.elementRef.nativeElement;
    this.renderer.setStyle(this.el, 'position', 'relative');

    this.rectResizeService.mouseDowned$.asObservable().subscribe(mouseDowned => {
      this.mouseDowned = mouseDowned;
      this.endResize();
    });

    this.rectResizeService.resizing$
      .pipe(
        auditTime(100),
        filter(() => this.mouseDowned)
      )
      .subscribe(e => this.startResize(e));
  }

  @HostListener('document:mousemove', ['$event'])
  onMousemove($event: MouseEvent): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.mouseDowned) {
        this.rectResizeService.resizing$.next($event);
      }
    });
  }

  onMouseenter() {
    this.rectResizeService.mouseEntered$.next(true);
  }

  onMouseleave() {
    this.rectResizeService.mouseEntered$.next(false);
  }

  startResize($event: MouseEvent): void {
    this.renderer.setStyle(document.body, 'cursor', 'nwse-resize');
    this.renderer.setStyle(document.body, 'user-select', 'none');
    this.previewResize($event);
  }

  endResize(): void {
    this.renderer.setStyle(document.body, 'cursor', '');
    this.renderer.setStyle(document.body, 'user-select', '');
    if (!this.mouseDowned) {
      this.removeGhostElement();
      const visToolEles = this.el.querySelectorAll('.vis-tools');
      let toolsWidth = 0;
      visToolEles.forEach(e => {
        toolsWidth += e.getBoundingClientRect().height;
      });
      this.resize.emit({
        width: this.ghostWidth,
        height: this.ghostHeight - toolsWidth,
        col: this.ghostCol
      });
    }
  }

  previewResize($event: MouseEvent): void {
    this.createGhostElement();
    this.resizeGhostElement($event);
  }

  removeGhostElement(): void {
    if (this.ghostElement) {
      this.renderer.removeChild(this.el, this.ghostElement);
    }
  }

  createGhostElement(): void {
    if (!this.ghostElement) {
      this.ghostElement = this.renderer.createElement('div');

      this.renderer.setStyle(this.ghostElement, 'position', 'absolute');
      this.renderer.setStyle(this.ghostElement, 'top', '0');
      this.renderer.setStyle(this.ghostElement, 'left', '-13px');
      this.renderer.setStyle(this.ghostElement, 'z-index', '8');
      this.renderer.setStyle(this.ghostElement, 'border', '1px dashed #d1d1d1');
    }

    this.renderer.appendChild(this.el, this.ghostElement);
  }

  resizeGhostElement($event: MouseEvent) {
    const elRect = this.getResizeRect();

    const width = Math.min(Math.max($event.clientX - elRect.left, elRect.minWidth), elRect.maxWidth);
    this.ghostHeight = Math.max($event.clientY - elRect.top, elRect.minHeight);
    this.ghostCol = Math.round(width / elRect.widthStep);
    this.ghostWidth = this.ghostCol * elRect.widthStep - 8;

    this.renderer.setStyle(this.ghostElement, 'width', `${this.ghostWidth}px`);
    this.renderer.setStyle(this.ghostElement, 'height', `${this.ghostHeight}px`);
  }

  getResizeRect(): ResizeRect {
    const elRect = this.el.getBoundingClientRect();
    const scrollbarWidth = measureScrollbar('vertical');
    const widthStep = (window.innerWidth - scrollbarWidth) / 12;
    return {
      widthStep,
      width: elRect.width,
      height: elRect.height,
      left: elRect.left,
      top: elRect.top,
      maxWidth: widthStep * 12,
      minWidth: widthStep,
      minHeight: 64
    };
  }

  ngAfterViewInit(): void {}
}
