import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'zeppelin-interpreter',
  templateUrl: './interpreter.component.html',
  styleUrls: ['./interpreter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterpreterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
