import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'zeppelin-jobmanager',
  templateUrl: './jobmanager.component.html',
  styleUrls: ['./jobmanager.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobmanagerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
