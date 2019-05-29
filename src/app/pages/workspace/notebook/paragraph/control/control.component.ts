import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { copyTextToClipboard } from 'zeppelin-core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'zeppelin-services';

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
  @Output() enabledChange = new EventEmitter<boolean>();
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

  toggleEnabled() {
    this.enabled = !this.enabled;
    this.enabledChange.emit(this.enabled);
  }

  goToSingleParagraph() {
    // TODO asIframe
    const { noteId } = this.activatedRoute.snapshot.params;
    const redirectToUrl =
      location.protocol + '//' + location.host + location.pathname + '#/notebook/' + noteId + '/paragraph/' + this.pid;
    window.open(redirectToUrl);
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

  clearParagraphOutput() {
    this.messageService.paragraphClearOutput(this.pid);
  }

  removeParagraph() {
    if (!this.isEntireNoteRunning) {
      if (this.paragraphLength === 1) {
        this.nzModalService.warning({
          nzTitle: `Warning`,
          nzContent: `All the paragraphs can't be deleted`
        });
      } else {
        this.nzModalService.confirm({
          nzTitle: 'Delete Paragraph',
          nzContent: 'Do you want to delete this paragraph?',
          nzOnOk: () => {
            this.messageService.paragraphRemove(this.pid);
            // TODO moveFocusToNextParagraph
          }
        });
      }
    }
  }

  trigger(event: EventEmitter<void>) {
    if (!this.isEntireNoteRunning) {
      this.dropdownVisible = false;
      event.emit();
    }
  }

  constructor(
    private nzMessageService: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private nzModalService: NzModalService
  ) {}

  ngOnInit() {}
}
