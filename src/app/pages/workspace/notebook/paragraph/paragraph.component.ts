import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ParagraphItem } from 'zeppelin-sdk';

@Component({
  selector: 'zeppelin-notebook-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookParagraphComponent implements OnInit {
  @Input() paragraph: ParagraphItem;

  constructor() {}

  ngOnInit() {}
}
