import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { copyTextToClipboard } from 'zeppelin-core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'zeppelin-notebook-paragraph-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookParagraphControlComponent implements OnInit {
  @Input() status: string;
  @Input() progress = 0;
  @Input() revisionView = false;
  @Input() enabled = true;
  @Input() pid: string;
  @Input() tableHide = false;
  @Input() editorHide = false;
  @Input() colWidth: number;
  @Input() fontSize: number;
  @Input() runOnSelectionChange = true;
  @Input() isEntireNoteRunning = true;
  @Input() colWidthOption = [];
  @Input() first = false;
  @Input() last = false;
  @Input() title = false;
  @Input() lineNumbers = false;
  @Input() paragraphLength: number;
  @Output() colWidthChange = new EventEmitter<number>();
  @Output() titleChange = new EventEmitter<boolean>();
  @Output() fontSizeChange = new EventEmitter<number>();
  @Output() tableHideChange = new EventEmitter<boolean>();
  @Output() runParagraph = new EventEmitter();
  @Output() lineNumbersChange = new EventEmitter<boolean>();
  @Output() cancelParagraph = new EventEmitter();
  @Output() editorHideChange = new EventEmitter<boolean>();
  @Output() runOnSelectionChangeChange = new EventEmitter<boolean>();
  @Output() moveUp = new EventEmitter<void>();
  @Output() moveDown = new EventEmitter<void>();
  @Output() insertNew = new EventEmitter<void>();
  @Output() runAllAbove = new EventEmitter<void>();
  @Output() runAllBelowAndCurrent = new EventEmitter<void>();
  @Output() cloneParagraph = new EventEmitter<void>();
  fontSizeOption = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  dropdownVisible = false;
  isMac = navigator.appVersion.indexOf('Mac') !== -1;

  toggleEditor() {
    this.editorHide = !this.editorHide;
    this.editorHideChange.emit(this.editorHide);
  }

  toggleOutput() {
    this.tableHide = !this.tableHide;
    this.tableHideChange.emit(this.tableHide);
  }

  toggleRunOnSelectionChange() {
    this.runOnSelectionChange = !this.runOnSelectionChange;
    this.runOnSelectionChangeChange.emit(this.runOnSelectionChange);
  }

  toggleTitle() {
    this.title = !this.title;
    this.titleChange.emit(this.title);
  }

  toggleLineNumbers() {
    this.lineNumbers = !this.lineNumbers;
    this.lineNumbersChange.emit(this.lineNumbers);
  }

  changeColWidth(colWidth: number) {
    this.colWidth = +colWidth;
    this.colWidthChange.emit(this.colWidth);
    this.dropdownVisible = false;
  }

  changeFontSize(fontSize: number) {
    this.fontSize = +fontSize;
    this.fontSizeChange.emit(this.fontSize);
  }

  copyClipboard(id: string) {
    copyTextToClipboard(id);
    this.nzMessageService.info('Paragraph id copied');
  }

  trigger(event: EventEmitter<void>) {
    if (!this.isEntireNoteRunning) {
      this.dropdownVisible = false;
      event.emit();
    }
  }

  constructor(private nzMessageService: NzMessageService) {}

  ngOnInit() {}
}
