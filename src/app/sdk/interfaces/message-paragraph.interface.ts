import { EditorCompletionKey, EditorLanguage, EditorMode } from './message-common.interface';

export interface ParagraphEditorSetting {
  language: EditorLanguage;
  editOnDblClick: boolean;
  completionKey: EditorCompletionKey;
  completionSupport: boolean;
}

// TODO
export interface ParagraphResults {
  // tslint:disable-next-line no-any
  [key: string]: any;
}

// TODO
export interface ParagraphParams {
  // tslint:disable-next-line no-any
  [key: string]: any;
}

export interface ParagraphConfig {
  editorSetting: ParagraphEditorSetting;
  colWidth: number;
  editorMode: EditorMode;
  fontSize: number;
  results: ParagraphResults;
  enabled: boolean;
  editorHide: boolean;
  title?: boolean;
  runOnSelectionChange?: boolean;
  isZeppelinNotebookCronEnable?: boolean;
}

export interface ParagraphResults {
  code?: string;
  msg?: ParagraphIResultsMsgItem[];
  [index: number]: {};
}

export interface ParagraphIResultsMsgItem {
  type: string;
  data: string;
}

export interface ParagraphItem {
  text: string;
  user: string;
  dateUpdated: string;
  config: ParagraphConfig;
  settings: ParagraphEditorSetting;
  results?: ParagraphResults;
  // tslint:disable-next-line no-any
  apps: any[];
  progressUpdateIntervalMs: number;
  jobName: string;
  id: string;
  dateCreated: string;
  dateStarted?: string;
  dateFinished?: string;
  status: string;
  title?: string;
}

export interface SendParagraph {
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

export interface RunParagraph extends SendParagraph {
  // tslint:disable-next-line no-any
  [key: string]: any;
}

export interface CommitParagraph extends SendParagraph {
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
