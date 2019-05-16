import { Component, OnInit, ChangeDetectionStrategy, Input, Inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Note, RevisionListItem } from 'zeppelin-sdk';
import { MessageService, TicketService, SaveAsService, NoteStatusService } from 'zeppelin-services';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { NoteCreateComponent } from 'zeppelin-share/note-create/note-create.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TRASH_FOLDER_ID_TOKEN } from 'zeppelin-interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NoteActionService } from '../../../../services/note-action.service';

@Component({
  selector: 'zeppelin-notebook-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookActionBarComponent implements OnInit, OnDestroy {
  @Input() note: Note['note'];
  @Input() isOwner = true;
  @Input() noteRevisions: RevisionListItem[] = [];
  @Input() currentRevision: string;
  @Input() collaborativeMode = false;
  @Input() collaborativeModeUsers = [];
  private destroy$ = new Subject();
  lfOption: Array<'report' | 'default' | 'simple'> = ['default', 'simple', 'report'];
  principal = this.ticketService.ticket.principal;
  editorToggled = false;
  commitVisible = false;
  showSetting = false;
  showPermissions = false;
  tableToggled = false;
  showRevisionsComparator = false;
  isRevisionSupported = JSON.parse(this.ticketService.configuration.isRevisionSupported);
  revisionView = false;

  updateNoteName(name: string) {
    const trimmedNewName = name.trim();
    if (trimmedNewName.length > 0 && this.note.name !== trimmedNewName) {
      this.note.name = trimmedNewName;
      this.messageService.noteRename(this.note.id, this.note.name, true);
    }
  }

  visitRevision(revision: RevisionListItem) {
    if (revision.id) {
      if (revision.id === 'Head') {
        this.router.navigate(['/notebook', this.activatedRoute.snapshot.params.noteId]).then();
      } else {
        this.router.navigate(['/notebook', this.activatedRoute.snapshot.params.noteId, 'revision', revision.id]).then();
      }
    } else {
      this.nzMessageService.warning('There is a problem with this Revision');
    }
  }

  checkpointNote(value: string, e: MouseEvent) {
    e.preventDefault();
    this.commitVisible = false;
    this.messageService.checkpointNote(this.note.id, value);
  }

  setNoteRevision() {
    const { revisionId } = this.activatedRoute.snapshot.params;
    if (revisionId) {
      this.nzModalService.confirm({
        nzTitle: 'Set revision',
        nzContent: 'Set notebook head to current revision?',
        nzOnOk: () => {
          this.messageService.setNoteRevision(this.note.id, revisionId);
        }
      });
    }
  }

  toggleRevisionsComparator() {
    this.showRevisionsComparator = !this.showRevisionsComparator;
  }

  runAllParagraphs() {
    this.messageService.runAllParagraphs(
      this.note.id,
      this.note.paragraphs.map(p => {
        return {
          id: p.id,
          title: p.title,
          paragraph: p.text,
          config: p.config,
          params: p.settings.params
        };
      })
    );
  }

  clearAllParagraphOutput() {
    this.messageService.paragraphClearAllOutput(this.note.id);
  }

  cloneNote() {
    this.nzModalService.create({
      nzTitle: 'Clone Note',
      nzContent: NoteCreateComponent,
      nzComponentParams: {
        cloneNote: this.note
      },
      nzFooter: null
    });
  }

  exportNote() {
    const sizeLimit = +this.ticketService.configuration['zeppelin.websocket.max.text.message.size'];
    const jsonContent = JSON.stringify(this.note);
    if (jsonContent.length > sizeLimit) {
      this.nzModalService.confirm({
        nzTitle: `Note size exceeds importable limit (${sizeLimit})`,
        nzContent: 'Do you still want to export this note?',
        nzOnOk: () => {
          this.saveAsService.saveAs(jsonContent, this.note.name, 'json');
        }
      });
    } else {
      this.saveAsService.saveAs(jsonContent, this.note.name, 'json');
    }
  }

  toggleAllEditor() {
    // TODO
    this.editorToggled = !this.editorToggled;
  }

  toggleAllTable() {
    // TODO
    this.tableToggled = !this.tableToggled;
  }

  searchCode() {
    // TODO
  }

  deleteNote() {
    this.messageService.deleteNote(this.note.id);
  }

  moveNoteToTrash() {
    this.messageService.moveNoteToTrash(this.note.id);
  }

  get isTrash() {
    return this.noteStatusService.isTrash(this.note);
  }

  get viewOnly(): boolean {
    return this.noteStatusService.viewOnly(this.note);
  }

  get isNoteRunning(): boolean {
    return this.noteStatusService.isNoteRunning(this.note);
  }

  showShortCut() {
    // TODO
  }

  toggleSetting() {
    this.showSetting = !this.showSetting;
    // TODO
  }

  togglePermissions() {
    const principal = this.ticketService.ticket.principal;
    const isAnonymous = principal === 'anonymous';
    if (!!principal && isAnonymous) {
      this.blockAnonUsers();
    } else {
      this.showPermissions = !this.showPermissions;
    }
    // TODO
  }

  blockAnonUsers() {
    // TODO
  }

  setLookAndFeel(lf: 'report' | 'default' | 'simple') {
    this.note.config.looknfeel = lf;
    if (this.activatedRoute.snapshot.params.revisionId) {
      // TODO
    } else {
    }
  }

  toggleNotePersonalizedMode() {
    const modeText = this.note.config.personalizedMode === 'true' ? 'collaborate' : 'personalize';
    if (this.isOwner) {
      this.nzModalService.confirm({
        nzTitle: 'Setting the result display',
        nzContent: `Do you want to ${modeText} your analysis?`,
        nzOnOk: () => {
          if (this.note.config.personalizedMode === undefined || this.note.config.personalizedMode === 'true') {
            this.note.config.personalizedMode = 'false';
          } else {
            this.note.config.personalizedMode = 'true';
          }
          this.messageService.updatePersonalizedMode(this.note.id, this.note.config.personalizedMode);
        }
      });
    }
  }

  constructor(
    private messageService: MessageService,
    private nzModalService: NzModalService,
    private ticketService: TicketService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private noteActionService: NoteActionService,
    private noteStatusService: NoteStatusService,
    @Inject(TRASH_FOLDER_ID_TOKEN) public TRASH_FOLDER_ID: string,
    private activatedRoute: ActivatedRoute,
    private saveAsService: SaveAsService
  ) {}

  ngOnInit() {
    this.revisionView = !!this.activatedRoute.snapshot.params.revisionId;
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.revisionView = !!params.revisionId;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
