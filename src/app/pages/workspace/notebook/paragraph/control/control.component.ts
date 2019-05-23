import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'zeppelin-notebook-paragraph-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookParagraphControlComponent implements OnInit {
  @Input() status: string;
  @Input() progress = 0;
  constructor() {}

  ngOnInit() {}
}
