/// <reference path="../../../../../../../node_modules/monaco-editor/monaco.d.ts" />
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import ICodeEditor = monaco.editor.ICodeEditor;
import IDisposable = monaco.IDisposable;
import { ParagraphItem } from 'zeppelin-sdk';

@Component({
  selector: 'zeppelin-notebook-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookCodeEditorComponent implements OnInit, OnChanges, OnDestroy {
  // TODO: dirtyText & originalText & focus when patch & auto height
  @Input() paragraph: ParagraphItem;
  @Input() readOnly = false;
  @Input() language = 'text';
  @Input() lineNumbers = false;
  @Input() focus = false;
  @Input() collaborativeMode = false;
  private editor: ICodeEditor;
  private monacoDisposables: IDisposable[] = [];
  height = 0;

  autoAdjustEditorHeight() {
    this.height =
      this.editor.getTopForLineNumber(Number.MAX_SAFE_INTEGER) + this.editor.getConfiguration().lineHeight * 2;
    this.editor.layout();
    this.cdr.markForCheck();
  }

  initEditorListener() {
    this.monacoDisposables.push(
      this.editor.onDidFocusEditorText(() => {
        this.ngZone.runOutsideAngular(() => {
          this.editor.updateOptions({ renderLineHighlight: 'all' });
        });
      }),
      this.editor.onDidBlurEditorText(() => {
        this.ngZone.runOutsideAngular(() => {
          this.editor.updateOptions({ renderLineHighlight: 'none' });
        });
      })
    );
  }

  initEditor(editor: ICodeEditor) {
    this.editor = editor;
    this.updateEditorOptions();
    this.autoAdjustEditorHeight();
    this.initEditorListener();
    this.initEditorFocus();
  }

  initEditorFocus() {
    if (this.focus) {
      this.editor.focus();
    }
  }

  updateValue(value: string) {
    this.autoAdjustEditorHeight();
    if (this.collaborativeMode) {
      this.sendPatch();
    } else {
      this.startSaveTimer();
    }
    // TODO
  }

  sendPatch() {
    // TODO
  }

  startSaveTimer() {
    // TODO
  }

  updateEditorOptions() {
    if (this.editor) {
      this.editor.updateOptions({
        readOnly: this.readOnly,
        renderLineHighlight: this.focus ? 'all' : 'none',
        minimap: { enabled: false },
        lineNumbers: this.lineNumbers ? 'on' : 'off',
        glyphMargin: false,
        folding: false
      });
      monaco.editor.setModelLanguage(this.editor.getModel(), this.language);
    }
  }

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateEditorOptions();
  }

  ngOnDestroy(): void {
    this.monacoDisposables.forEach(d => d.dispose());
  }
}
