import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'zeppelin-notebook-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookCodeEditorComponent implements OnInit {
  // TODO: dirtyText & originalText & focus when patch & auto height
  @Input() value: string;
  @Input() readOnly = false;
  @Input() language = 'text';

  initEditor(e) {
    console.log(e);
  }

  constructor() {}

  ngOnInit() {}
}
