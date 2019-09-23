import { Component, OnInit, ChangeDetectionStrategy, HostListener, NgZone, OnDestroy } from '@angular/core';
import { RectResizeDirective } from 'zeppelin-share/rect-resize/rect-resize.directive';
import { RectResizeService } from 'zeppelin-share/rect-resize/rect-resize.service';

@Component({
  selector: 'zeppelin-rect-resize-handle',
  templateUrl: './rect-resize-handle.component.html',
  styleUrls: ['./rect-resize-handle.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'resize-handle'
  }
})
export class RectResizeHandleComponent {
  constructor() {}
}
