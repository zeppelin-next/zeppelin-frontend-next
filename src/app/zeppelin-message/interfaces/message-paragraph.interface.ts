import { EditorCompletionKey, EditorLanguage, EditorMode } from './message-common.interface';

export interface ParagraphEditorSetting {
  language: EditorLanguage;
  editOnDblClick: boolean;
  completionKey: EditorCompletionKey;
  completionSupport: boolean;
}

// TODO
export interface ParagraphResults {
}

// TODO
export interface ParagraphParams {
}

export interface ParagraphConfig {
  editorSetting: ParagraphEditorSetting;
  colWidth: number;
  editorMode: EditorMode;
  fontSize: number;
  results: ParagraphResults;
  enabled: boolean;
  editorHide: boolean;
}

export interface Paragraph {
  id: string;
  title?: string;
  paragraph: string;
  config: ParagraphConfig;
  params: ParagraphParams;
}

export interface CopyParagraph {
  index: number;
  title?: string;
  paragraph: string;
  config: ParagraphConfig;
  params: ParagraphParams;
}

export interface RunParagraph extends Paragraph {
}

export interface CommitParagraph extends Paragraph {
  noteId: string;
}

export interface RunAllParagraphs {
  noteId: string;
  paragraphs: string;
}

export interface InsertParagraph {
  index: number;
}

export interface MoveParagraph {
  id: string;
  index: number;
}

export interface AngularObjectUpdated {
  noteId: string;
  paragraphId: string;
  name: string;
  value: string;
  interpreterGroupId: string;
}

export interface AngularObjectClientBind {
  noteId: string;
  name: string;
  value: string;
  paragraphId: string;
}

export interface AngularObjectClientUnbind {
  noteId: string;
  name: string;
  paragraphId: string;
}

export interface CancelParagraph {
  id: string;
}

export interface ParagraphRemove {
  id: string;
}

export interface ParagraphClearOutput {
  id: string;
}

export interface ParagraphClearAllOutput {
  id: string;
}

export interface Completion {
  id: string;
  buf: string;
  cursor: number;
}

export interface PatchParagraph {
  id: string;
  noteId: string;
  patch: string;
}

