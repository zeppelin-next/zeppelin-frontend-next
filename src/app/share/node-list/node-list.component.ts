import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NoteListService } from '../../services/note-list.service';
import { MessageListener, MessageListenersManager } from 'zeppelin-core';
import { MessageReceiveDataTypeMap, OP } from 'zeppelin-sdk';
import { MessageService } from 'zeppelin-services';
import { NzFormatEmitEvent, NzModalService, NzTreeNode } from 'ng-zorro-antd';
import { NoteImportComponent } from 'zeppelin-share/note-import/note-import.component';
import { NoteCreateComponent } from 'zeppelin-share/note-create/note-create.component';

@Component({
  selector: 'zeppelin-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeListComponent extends MessageListenersManager implements OnInit {
  searchValue: string;
  nodes = [];
  activatedId: string;

  renameNote(id, path, name) {}

  renameFolder(path) {}

  toggleFolder(node: NzTreeNode) {
    node.isExpanded = !node.isExpanded;
    this.cdr.markForCheck();
  }

  openNote(node: NzTreeNode) {
    // TODO
  }

  importNote() {
    this.nzModalService.create({
      nzTitle: 'Import New Note',
      nzContent: NoteImportComponent,
      nzWidth: '800px',
      nzFooter: null
    });
  }

  createNote(path?) {
    this.nzModalService.create({
      nzTitle: 'Create New Note',
      nzContent: NoteCreateComponent,
      nzComponentParams: { path },
      nzWidth: '800px',
      nzFooter: null
    });
  }

  @MessageListener(OP.NOTES_INFO)
  getNotes(data: MessageReceiveDataTypeMap[OP.NOTES_INFO]) {
    this.noteListService.setNotes(data.notes);
    this.nodes = this.noteListService.notes.root.children.map(item => {
      return { ...item, key: item.id };
    });
    this.cdr.markForCheck();
  }

  constructor(
    private noteListService: NoteListService,
    public messageService: MessageService,
    private nzModalService: NzModalService,
    private cdr: ChangeDetectorRef
  ) {
    super(messageService);
  }

  ngOnInit() {
    this.messageService.listNodes();
  }
}
