import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'zeppelin-notebook-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookPermissionsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
