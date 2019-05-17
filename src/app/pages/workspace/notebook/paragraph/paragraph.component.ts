import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { MessageReceiveDataTypeMap, Note, OP, ParagraphConfig, ParagraphItem } from 'zeppelin-sdk';
import { MessageService } from 'zeppelin-services';
import { NoteVarShareService } from '../../../../services/note-var-share.service';
import { MessageListener, MessageListenersManager } from 'zeppelin-core';

@Component({
  selector: 'zeppelin-notebook-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookParagraphComponent extends MessageListenersManager implements OnInit {
  @Input() paragraph: ParagraphItem;
  @Input() note: Note['note'];
  @Input() revisionView: boolean;
  @Input() viewOnly: boolean;
  @Input() last: boolean;
  @Input() first: boolean;
  originalText: string;
  isNoteRunning = false;
  chart = {};
  colWidthOption = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  fontSizeOption = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  paragraphFocused = false;

  @MessageListener(OP.NOTE_RUNNING_STATUS)
  noteRunningStatusChange(data: MessageReceiveDataTypeMap[OP.NOTE_RUNNING_STATUS]) {
    this.isNoteRunning = data.status;
    this.cdr.markForCheck();
    // TODO set editor readonly
  }

  insertParagraph(position: string) {
    if (this.revisionView === true) {
      return;
    }
    let newIndex = -1;
    for (let i = 0; i < this.note.paragraphs.length; i++) {
      if (this.note.paragraphs[i].id === this.paragraph.id) {
        // determine position of where to add new paragraph; default is below
        if (position === 'above') {
          newIndex = i;
        } else {
          newIndex = i + 1;
        }
        break;
      }
    }

    if (newIndex < 0 || newIndex > this.note.paragraphs.length) {
      return;
    }
    this.messageService.insertParagraph(newIndex);
  }

  commitParagraph() {
    const {
      id,
      title,
      text,
      config,
      settings: { params }
    } = this.paragraph;
    this.messageService.commitParagraph(id, title, text, config, params, this.note.id);
  }

  initializeDefault(config: ParagraphConfig) {
    // TODO
  }

  constructor(
    public messageService: MessageService,
    private noteVarShareService: NoteVarShareService,
    private cdr: ChangeDetectorRef
  ) {
    super(messageService);
  }

  ngOnInit() {
    this.originalText = this.paragraph.text;
    if (this.paragraph.focus) {
      this.paragraphFocused = true;
    }
    if (!this.paragraph.config) {
      this.paragraph.config = {};
    }
    this.isNoteRunning = !!(
      this.note &&
      this.note.info &&
      this.note.info.isRunning &&
      this.note.info.isRunning === true
    );
    this.noteVarShareService.set(this.paragraph.id + '_paragraphScope', this);
    this.initializeDefault(this.paragraph.config);
  }
}
