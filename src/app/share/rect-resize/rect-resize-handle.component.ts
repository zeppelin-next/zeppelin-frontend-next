import { Component, OnInit, ChangeDetectionStrategy, HostListener, NgZone, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { RectResizeDirective } from 'zeppelin-share/rect-resize/rect-resize.directive';
import { RectResizeService } from 'zeppelin-share/rect-resize/rect-resize.service';

@Component({
  selector: 'zeppelin-rect-resize-handle',
  templateUrl: './rect-resize-handle.component.html',
  styleUrls: ['./rect-resize-handle.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'resize-handle',
    '[style.opacity]': 'resizing ? "0" : entered ? "1" : ".28"',
    '(mousedown)': 'onMousedown()'
  }
})
export class RectResizeHandleComponent implements OnInit, OnDestroy {
  entered = false;
  resizing = false;

  constructor(
    private rectResizeDirective: RectResizeDirective,
    private ngZone: NgZone,
    private rectResizeService: RectResizeService
  ) {}

  ngOnInit() {
    this.rectResizeService.mouseEntered$.asObservable().subscribe(entered => {
      this.entered = entered;
    });
  }

  onMousedown(): void {
    this.rectResizeService.mouseDowned$.next(true);
    this.resizing = true;
  }

  @HostListener('document:mouseup')
  onMouseup(): void {
    if (!this.resizing) {
      return;
    }
    this.ngZone.runOutsideAngular(() => {
      this.rectResizeService.mouseDowned$.next(false);
      this.resizing = false;
    });
  }

  ngOnDestroy(): void {}
}
