import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import {
  MessageReceiveDataTypeMap,
  Note,
  OP,
  ParagraphConfig,
  ParagraphEditorSetting,
  ParagraphConfigResult,
  ParagraphItem
} from 'zeppelin-sdk';
import { MessageService, NoteStatusService, ParagraphStatus } from 'zeppelin-services';
import { NoteVarShareService } from '../../../../services/note-var-share.service';
import { MessageListener, MessageListenersManager } from 'zeppelin-core';
import { isEmpty, isEqual } from 'lodash';
import DiffMatchPatch from 'diff-match-patch';

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
  @Input() collaborativeMode = false;
  @Input() first: boolean;
  dirtyText: string;
  originalText: string;
  isNoteRunning = false;
  diffMatchPatch = new DiffMatchPatch();
  isParagraphRunning = false;
  results = [];
  configs = {};
  editorSetting: ParagraphEditorSetting = {};

  @MessageListener(OP.NOTE_RUNNING_STATUS)
  noteRunningStatusChange(data: MessageReceiveDataTypeMap[OP.NOTE_RUNNING_STATUS]) {
    this.isNoteRunning = data.status;
    this.cdr.markForCheck();
  }

  @MessageListener(OP.PARAGRAPH)
  paragraphData(data: MessageReceiveDataTypeMap[OP.PARAGRAPH]) {
    const oldPara = this.paragraph;
    const newPara = data.paragraph;
    if (this.isUpdateRequired(oldPara, newPara)) {
      this.updateParagraph(oldPara, newPara, () => {
        if (newPara.results && newPara.results.msg) {
          for (const i in newPara.results.msg) {
            if (newPara.results.msg.hasOwnProperty(i)) {
              const newResult = newPara.results.msg ? newPara.results.msg[i] : {};
              const oldResult = oldPara.results && oldPara.results.msg ? oldPara.results.msg[i] : {};
              const newConfig = newPara.config.results ? newPara.config.results[i] : {};
              const oldConfig = oldPara.config.results ? oldPara.config.results[i] : {};
              if (!isEqual(newResult, oldResult) || !isEqual(newConfig, oldConfig)) {
                // TODO updateResult
              }
            }
          }
        }
      });
      this.cdr.markForCheck();
    }
  }

  @MessageListener(OP.PATCH_PARAGRAPH)
  patchParagraph(data: MessageReceiveDataTypeMap[OP.PATCH_PARAGRAPH]) {
    if (data.paragraphId === this.paragraph.id) {
      let patch = data.patch;
      patch = this.diffMatchPatch.patch_fromText(patch);
      if (!this.paragraph.text) {
        this.paragraph.text = '';
      }
      this.paragraph.text = this.diffMatchPatch.patch_apply(patch, this.paragraph.text)[0];
      this.originalText = this.paragraph.text;
      this.cdr.markForCheck();
    }
  }

  updateParagraph(oldPara: ParagraphItem, newPara: ParagraphItem, updateCallback: Function) {
    // 1. can't update on revision view
    if (!this.revisionView) {
      // 2. get status, refreshed
      const statusChanged = newPara.status !== oldPara.status;
      const resultRefreshed =
        newPara.dateFinished !== oldPara.dateFinished ||
        isEmpty(newPara.results) !== isEmpty(oldPara.results) ||
        newPara.status === ParagraphStatus.ERROR ||
        (newPara.status === ParagraphStatus.FINISHED && statusChanged);

      // 3. update texts managed by paragraph
      this.updateAllScopeTexts(newPara, oldPara);
      // 4. execute callback to update result
      updateCallback();

      // 5. update remaining paragraph objects
      this.updateParagraphObjectWhenUpdated(newPara);

      // 6. handle scroll down by key properly if new paragraph is added
      if (statusChanged || resultRefreshed) {
        // when last paragraph runs, zeppelin automatically appends new paragraph.
        // this broadcast will focus to the newly inserted paragraph
        // TODO
      }
    }
  }

  textChange(text: string) {
    this.dirtyText = text;
    this.paragraph.text = text;
    if (this.dirtyText !== this.originalText) {
      if (this.collaborativeMode) {
        this.sendPatch();
      } else {
        this.startSaveTimer();
      }
    }
  }

  sendPatch() {
    this.originalText = this.originalText ? this.originalText : '';
    const patch = this.diffMatchPatch.patch_make(this.originalText, this.dirtyText).toString();
    this.originalText = this.dirtyText;
    this.messageService.patchParagraph(this.paragraph.id, this.note.id, patch);
  }

  startSaveTimer() {}

  saveParagraph() {
    const dirtyText = this.paragraph.text;
    if (dirtyText === undefined || dirtyText === this.originalText) {
      return;
    }
    this.commitParagraph();
    this.originalText = dirtyText;
    this.dirtyText = undefined;
  }

  updateAllScopeTexts(oldPara: ParagraphItem, newPara: ParagraphItem) {
    if (oldPara.text !== newPara.text) {
      if (this.dirtyText) {
        // check if editor has local update
        if (this.dirtyText === newPara.text) {
          // when local update is the same from remote, clear local update
          this.paragraph.text = newPara.text;
          this.dirtyText = undefined;
          this.originalText = newPara.text;
        } else {
          // if there're local update, keep it.
          this.paragraph.text = newPara.text;
        }
      } else {
        this.paragraph.text = newPara.text;
        this.originalText = newPara.text;
      }
    }
  }

  updateParagraphObjectWhenUpdated(newPara: ParagraphItem) {
    // TODO: resize col width
    // TODO: update font size
    this.paragraph.aborted = newPara.aborted;
    this.paragraph.user = newPara.user;
    this.paragraph.dateUpdated = newPara.dateUpdated;
    this.paragraph.dateCreated = newPara.dateCreated;
    this.paragraph.dateFinished = newPara.dateFinished;
    this.paragraph.dateStarted = newPara.dateStarted;
    this.paragraph.errorMessage = newPara.errorMessage;
    this.paragraph.jobName = newPara.jobName;
    this.paragraph.title = newPara.title;
    this.paragraph.lineNumbers = newPara.lineNumbers;
    this.paragraph.status = newPara.status;
    this.paragraph.fontSize = newPara.fontSize;
    if (newPara.status !== ParagraphStatus.RUNNING) {
      this.paragraph.results = newPara.results;
    }
    this.paragraph.settings = newPara.settings;
    this.paragraph.runtimeInfos = newPara.runtimeInfos;
    this.isParagraphRunning = this.noteStatusService.isParagraphRunning(newPara);
    this.paragraph.config = newPara.config;
    this.initializeDefault(this.paragraph.config);
    this.cdr.markForCheck();
  }

  isUpdateRequired(oldPara: ParagraphItem, newPara: ParagraphItem): boolean {
    return (
      newPara.id === oldPara.id &&
      (newPara.dateCreated !== oldPara.dateCreated ||
        newPara.text !== oldPara.text ||
        newPara.dateFinished !== oldPara.dateFinished ||
        newPara.dateStarted !== oldPara.dateStarted ||
        newPara.dateUpdated !== oldPara.dateUpdated ||
        newPara.status !== oldPara.status ||
        newPara.jobName !== oldPara.jobName ||
        newPara.title !== oldPara.title ||
        isEmpty(newPara.results) !== isEmpty(oldPara.results) ||
        newPara.errorMessage !== oldPara.errorMessage ||
        !isEqual(newPara.settings, oldPara.settings) ||
        !isEqual(newPara.config, oldPara.config) ||
        !isEqual(newPara.runtimeInfos, oldPara.runtimeInfos))
    );
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

  setTitle(title: string) {
    this.paragraph.title = title;
    this.commitParagraph();
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
    const forms = this.paragraph.settings.forms;

    if (!config.colWidth) {
      config.colWidth = 12;
    }

    if (!config.fontSize) {
      config.fontSize = 9;
    }

    if (config.enabled === undefined) {
      config.enabled = true;
    }

    for (const idx in forms) {
      if (forms[idx]) {
        if (forms[idx].options) {
          if (config.runOnSelectionChange === undefined) {
            config.runOnSelectionChange = true;
          }
        }
      }
    }

    if (!config.results) {
      config.results = {};
    }

    if (!config.editorSetting) {
      config.editorSetting = {};
    } else if (config.editorSetting.editOnDblClick) {
      this.editorSetting.isOutputHidden = config.editorSetting.editOnDblClick;
    }
  }

  onConfigChange(configResult: ParagraphConfigResult, index: number) {
    this.paragraph.config.results[index] = configResult;
    this.commitParagraph();
  }
  constructor(
    private noteStatusService: NoteStatusService,
    public messageService: MessageService,
    private noteVarShareService: NoteVarShareService,
    private cdr: ChangeDetectorRef
  ) {
    super(messageService);
  }

  ngOnInit() {
    if (this.paragraph.results && this.paragraph.results.code === 'SUCCESS') {
      this.results = this.paragraph.results.msg;
      this.configs = this.paragraph.config.results;
    }
    if (!this.paragraph.config) {
      this.paragraph.config = {};
    }
    this.originalText = this.paragraph.text;
    this.isNoteRunning = this.noteStatusService.isNoteRunning(this.note);
    this.isParagraphRunning = this.noteStatusService.isParagraphRunning(this.paragraph);
    this.noteVarShareService.set(this.paragraph.id + '_paragraphScope', this);
    this.initializeDefault(this.paragraph.config);
  }
}
