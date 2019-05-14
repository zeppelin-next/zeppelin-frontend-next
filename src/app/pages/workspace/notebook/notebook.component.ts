import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'zeppelin-services';
import { Subject } from 'rxjs';
import { distinctUntilKeyChanged, takeUntil } from 'rxjs/operators';
import { NoteVarShareService } from '../../../services/note-var-share.service';
import { MessageListener, MessageListenersManager } from 'zeppelin-core';
import { MessageReceiveDataTypeMap, Note, OP } from 'zeppelin-sdk';
import { isNil } from 'lodash';

@Component({
  selector: 'zeppelin-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookComponent extends MessageListenersManager implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  note: Note['note'];

  @MessageListener(OP.NOTE)
  getNote(data: MessageReceiveDataTypeMap[OP.NOTE]) {
    const note = data.note;
    if (isNil(note)) {
      this.router.navigate(['/']).then();
    } else {
      this.note = note;
      this.cdr.markForCheck();
    }
  }

  @MessageListener(OP.LIST_REVISION_HISTORY)
  listRevisionHistory(data: MessageReceiveDataTypeMap[OP.LIST_REVISION_HISTORY]) {
    // TODO
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    public messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private noteVarShareService: NoteVarShareService,
    private router: Router
  ) {
    super(messageService);
  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilKeyChanged('noteId')
      )
      .subscribe(() => {
        // TODO noteVarShareService
        this.noteVarShareService.clear();
      });
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(param => {
      const { noteId, revisionId, paragraphId } = param;
      if (revisionId) {
        this.messageService.noteRevision(noteId, revisionId);
      } else {
        this.messageService.getNote(noteId);
      }
      this.messageService.listRevisionHistory(noteId);
      // TODO scroll to current paragraph
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
