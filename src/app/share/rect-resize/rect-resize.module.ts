import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RectResizeHandleComponent } from 'zeppelin-share/rect-resize/rect-resize-handle.component';
import { RectResizeDirective } from 'zeppelin-share/rect-resize/rect-resize.directive';

@NgModule({
  declarations: [RectResizeDirective, RectResizeHandleComponent],
  exports: [RectResizeDirective, RectResizeHandleComponent],
  imports: [CommonModule]
})
export class RectResizeModule {}
