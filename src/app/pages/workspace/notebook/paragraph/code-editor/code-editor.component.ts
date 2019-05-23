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
  Output,
  SimpleChanges
} from '@angular/core';
import { InterpreterBindingItem } from 'zeppelin-sdk';
import { MessageService } from 'zeppelin-services';
import ICodeEditor = monaco.editor.ICodeEditor;
import IDisposable = monaco.IDisposable;

@Component({
  selector: 'zeppelin-notebook-paragraph-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookParagraphCodeEditorComponent implements OnChanges, OnDestroy {
  // TODO:
  //  1. cursor position
  @Input() readOnly = false;
  @Input() language = 'text';
  @Input() lineNumbers = false;
  @Input() focus = false;
  @Input() collaborativeMode = false;
  @Input() text: string;
  @Input() dirty = false;
  @Input() interpreterBindings: InterpreterBindingItem[] = [];
  @Input() pid: string;
  @Output() textChanged = new EventEmitter<string>();
  @Output() editorBlur = new EventEmitter<void>();
  private editor: ICodeEditor;
  private monacoDisposables: IDisposable[] = [];
  height = 0;
  interpreterName: string;

  autoAdjustEditorHeight() {
    if (this.editor) {
      this.ngZone.run(() => {
        this.height =
          this.editor.getTopForLineNumber(Number.MAX_SAFE_INTEGER) + this.editor.getConfiguration().lineHeight * 2;
        this.editor.layout();
        this.cdr.markForCheck();
      });
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
      }),
      this.editor.onDidChangeModelContent(() => {
        this.autoAdjustEditorHeight();
        const text = this.editor.getModel().getValue();
        this.textChanged.emit(text);
        this.text = text;
        this.setParagraphMode(true);
      })
    );
  }

  setEditorValue() {
    if (this.editor && this.editor.getModel().getValue() !== this.text) {
      this.editor.getModel().setValue(this.text);
    }
  }

  initializedEditor(editor: ICodeEditor) {
    this.editor = editor;
    this.updateEditorOptions();
    this.setParagraphMode();
    this.initEditorListener();
    this.initEditorFocus();
    this.setEditorValue();
    this.autoAdjustEditorHeight();
  }

  initEditorFocus() {
    if (this.focus) {
      this.editor.focus();
    }
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
    }
  }

  getInterpreterName(paragraphText: string) {
    const match = /^\s*%(.+?)(\s|\()/g.exec(paragraphText);
    if (match) {
      return match[1].trim();
      // get default interpreter name if paragraph text doesn't start with '%'
      // TODO(mina): dig into the cause what makes interpreterBindings to have no element
    } else if (this.interpreterBindings && this.interpreterBindings.length !== 0) {
      return this.interpreterBindings[0].name;
    }
    return '';
  }

  setParagraphMode(changed = false) {
    if (this.editor && !changed) {
      if (this.language) {
        const convertMap = {
          sh: 'shell'
        };
        monaco.editor.setModelLanguage(this.editor.getModel(), convertMap[this.language] || this.language);
      }
    } else {
      const interpreterName = this.getInterpreterName(this.text);
      if (this.interpreterName !== interpreterName) {
        this.interpreterName = interpreterName;
        this.getEditorSetting(interpreterName);
      }
    }
  }

  getEditorSetting(interpreterName: string) {
    this.messageService.editorSetting(this.pid, interpreterName);
  }

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone, private messageService: MessageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { text, interpreterBindings, language, readOnly, focus, lineNumbers } = changes;
    if (readOnly || focus || lineNumbers) {
      this.updateEditorOptions();
    }
    if (focus) {
      this.initEditorFocus();
    }
    if (text) {
      this.setEditorValue();
      this.autoAdjustEditorHeight();
    }
    if (interpreterBindings || language) {
      this.setParagraphMode();
    }
  }

  ngOnDestroy(): void {
    this.monacoDisposables.forEach(d => d.dispose());
  }
}
