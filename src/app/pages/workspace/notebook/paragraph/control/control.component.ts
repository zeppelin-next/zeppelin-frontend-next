import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'zeppelin-notebook-paragraph-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookParagraphControlComponent implements OnInit {
  @Input() status: string;
  @Input() progress = 0;
  @Input() enabled = true;
  @Input() tableHide = false;
  @Input() editorHide = false;
  @Output() tableHideChange = new EventEmitter<boolean>();
  @Output() runParagraph = new EventEmitter();
  @Output() cancelParagraph = new EventEmitter();
  @Output() editorHideChange = new EventEmitter<boolean>();

  toggleEditor() {
    this.editorHide = !this.editorHide;
    this.editorHideChange.emit(this.editorHide);
  }

  toggleOutput() {
    this.tableHide = !this.tableHide;
    this.tableHideChange.emit(this.tableHide);
  }

  constructor() {}

  ngOnInit() {}
}
