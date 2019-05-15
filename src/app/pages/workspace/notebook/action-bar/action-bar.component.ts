import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Note } from 'zeppelin-sdk';
import { MessageService } from 'zeppelin-services';
import { NzModalService } from 'ng-zorro-antd';
import { NoteCreateComponent } from 'zeppelin-share/note-create/note-create.component';

@Component({
  selector: 'zeppelin-notebook-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookActionBarComponent implements OnInit {
  @Input() note: Note['note'];
  editorToggled = false;
  tableToggled = false;

  updateNoteName(name: string) {
    const trimmedNewName = name.trim();
    if (trimmedNewName.length > 0 && this.note.name !== trimmedNewName) {
      this.note.name = trimmedNewName;
      this.messageService.noteRename(this.note.id, this.note.name, true);
    }
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
    // TODO
  }

  toggleAllEditor() {
    // TODO
    this.editorToggled = !this.editorToggled;
  }

  toggleAllTable() {
    // TODO
    this.tableToggled = !this.tableToggled;
  }

  constructor(private messageService: MessageService, private nzModalService: NzModalService) {}

  ngOnInit() {}
}
