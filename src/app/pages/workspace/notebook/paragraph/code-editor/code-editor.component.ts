/// <reference path="../../../../../../../node_modules/monaco-editor/monaco.d.ts" />
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
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
  // TODO:
  //  1. cursor position
  //  2. editor mode
  @Input() readOnly = false;
  @Input() language = 'text';
  @Input() lineNumbers = false;
  @Input() focus = false;
  @Input() collaborativeMode = false;
  @Input() text: string;
  @Input() dirty = false;
  @Output() textChange = new EventEmitter<string>();
  @Output() editorBlur = new EventEmitter<void>();
  private editor: ICodeEditor;
  private monacoDisposables: IDisposable[] = [];
  height = 0;

  autoAdjustEditorHeight() {
    if (this.editor) {
      this.height =
        this.editor.getTopForLineNumber(Number.MAX_SAFE_INTEGER) + this.editor.getConfiguration().lineHeight * 2;
      this.editor.layout();
      this.cdr.markForCheck();
    }
  }

  initEditorListener() {
    this.monacoDisposables.push(
      this.editor.onDidFocusEditorText(() => {
        this.ngZone.runOutsideAngular(() => {
          this.editor.updateOptions({ renderLineHighlight: 'all' });
        });
      }),
      this.editor.onDidBlurEditorText(() => {
        this.editorBlur.emit();
        this.ngZone.runOutsideAngular(() => {
          this.editor.updateOptions({ renderLineHighlight: 'none' });
        });
      })
    );
  }

  initEditor(editor: ICodeEditor) {
    this.editor = editor;
    this.updateEditorOptions();
    this.initEditorListener();
    this.initEditorFocus();
    this.autoAdjustEditorHeight();
  }

  initEditorFocus() {
    if (this.focus) {
      this.editor.focus();
    }
  }

  valueChange(text: string) {
    this.textChange.emit(text);
    this.autoAdjustEditorHeight();
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
    const { text } = changes;
    if (text) {
      this.autoAdjustEditorHeight();
    }
  }

  ngOnDestroy(): void {
    this.monacoDisposables.forEach(d => d.dispose());
  }
}
