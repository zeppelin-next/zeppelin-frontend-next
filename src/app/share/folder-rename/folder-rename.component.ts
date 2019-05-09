import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { NoteListService } from '../../services/note-list.service';
import { MessageService } from 'zeppelin-services';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'zeppelin-folder-rename',
  templateUrl: './folder-rename.component.html',
  styleUrls: ['./folder-rename.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FolderRenameComponent implements OnInit {
  @Input() newFolderPath: string;
  @Input() folderId: string;
  willMerged = false;

  checkMerged() {
    const newFolderPath = this.normalizeFolderId(this.newFolderPath);
    this.willMerged = this.folderId !== this.newFolderPath && !!this.noteListService.notes.flatFolderMap[newFolderPath];
    this.cdr.markForCheck();
  }

  rename() {
    this.messageService.folderRename(this.folderId, this.newFolderPath);
    this.nzModalRef.destroy();
  }

  normalizeFolderId(folderId) {
    folderId = folderId.trim();

    while (folderId.indexOf('\\') > -1) {
      folderId = folderId.replace('\\', '/');
    }

    while (folderId.indexOf('///') > -1) {
      folderId = folderId.replace('///', '/');
    }

    folderId = folderId.replace('//', '/');

    if (folderId === '/') {
      return '/';
    }

    if (folderId[0] === '/') {
      folderId = folderId.substring(1);
    }

    if (folderId.slice(-1) === '/') {
      folderId = folderId.slice(0, -1);
    }

    return folderId;
  }

  constructor(
    private noteListService: NoteListService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private nzModalRef: NzModalRef
  ) {}

  ngOnInit() {
    this.checkMerged();
  }
}
