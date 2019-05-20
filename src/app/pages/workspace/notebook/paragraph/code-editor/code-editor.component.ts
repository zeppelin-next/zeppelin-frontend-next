import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, ElementRef } from '@angular/core';
/// <reference path="../../../../../../../node_modules/monaco-editor/monaco.d.ts" />
import ICodeEditor = monaco.editor.ICodeEditor;

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
  private editor: ICodeEditor;
  height = 0;

  updateHeight() {
    this.editor.layout();
    this.height =
      this.editor.getTopForLineNumber(Number.MAX_SAFE_INTEGER) + this.editor.getConfiguration().lineHeight * 2;
    this.cdr.markForCheck();
  }

  initEditor(editor: ICodeEditor) {
    this.editor = editor;
    this.updateHeight();
  }

  updateValue(value: string) {
    this.updateHeight();
  }

  constructor(private cdr: ChangeDetectorRef, private el: ElementRef) {}

  ngOnInit() {}
}
