import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'zeppelin-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
