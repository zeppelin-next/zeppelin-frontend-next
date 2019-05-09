import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NoteListService } from '../../services/note-list.service';
import { MessageListener, MessageListenersManager } from 'zeppelin-core';
import { FolderRename, MessageReceiveDataTypeMap, OP } from 'zeppelin-sdk';
import { MessageService } from 'zeppelin-services';
import { NzFormatEmitEvent, NzModalService, NzTreeNode } from 'ng-zorro-antd';
import { NoteImportComponent } from 'zeppelin-share/note-import/note-import.component';
import { NoteCreateComponent } from 'zeppelin-share/note-create/note-create.component';
import { NoteRenameComponent } from 'zeppelin-share/note-rename/note-rename.component';
import { FolderRenameComponent } from 'zeppelin-share/folder-rename/folder-rename.component';
import { NoteActionService } from '../../services/note-action.service';

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

  activeNote(id: string) {
    this.activatedId = id;
  }

  moveFolderToTrash(id: string) {
    return this.messageService.moveFolderToTrash(id);
  }

  restoreFolder(id: string) {
    return this.messageService.restoreFolder(id);
  }

  removeFolder(id: string) {
    return this.messageService.removeFolder(id);
  }

  paragraphClearAllOutput(id: string) {
    return this.messageService.paragraphClearAllOutput(id);
  }

  moveNoteToTrash(id: string) {
    return this.messageService.moveNoteToTrash(id);
  }

  restoreNote(id: string) {
    return this.messageService.restoreNote(id);
  }

  deleteNote(id: string) {
    return this.messageService.deleteNote(id);
  }

  restoreAll() {
    return this.messageService.restoreAll();
  }

  emptyTrash() {
    return this.messageService.emptyTrash();
  }

  toggleFolder(node: NzTreeNode) {
    node.isExpanded = !node.isExpanded;
    this.cdr.markForCheck();
  }

  openNote(node: NzTreeNode) {
    // TODO
  }

  renameNote(id: string, path: string, name: string) {
    this.noteActionService.renameNote(id, path, name);
  }

  renameFolder(path) {
    this.noteActionService.renameFolder(path);
  }

  importNote() {
    this.noteActionService.importNote();
  }

  createNote(path?: string) {
    this.noteActionService.createNote(path);
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
    private noteActionService: NoteActionService,
    private cdr: ChangeDetectorRef
  ) {
    super(messageService);
  }

  ngOnInit() {
    this.messageService.listNodes();
  }
}
