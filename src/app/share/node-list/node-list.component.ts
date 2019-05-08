import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NoteListService } from '../../services/note-list.service';
import { MessageListener, MessageListenersManager } from 'zeppelin-core';
import { MessageReceiveDataTypeMap, OP } from 'zeppelin-sdk';
import { MessageService } from 'zeppelin-services';

@Component({
  selector: 'zeppelin-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeListComponent extends MessageListenersManager implements OnInit {
  @MessageListener(OP.NOTES_INFO)
  getNotes(data: MessageReceiveDataTypeMap[OP.NOTES_INFO]) {
    this.noteListService.setNotes(data.notes);
    console.log(this.noteListService.notes);
    this.cdr.markForCheck();
  }

  constructor(
    private noteListService: NoteListService,
    public messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {
    super(messageService);
  }

  ngOnInit() {}
}
