import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class RectResizeService {
  mouseEntered$ = new Subject<boolean>();
  mouseDowned$ = new Subject<boolean>();
  resizing$ = new Subject<MouseEvent>();

  constructor() {}
}
