import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'zeppelin-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
