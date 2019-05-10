import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'zeppelin-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinComponent implements OnInit {
  @Input() transparent = false;
  constructor() {}

  ngOnInit() {}
}
