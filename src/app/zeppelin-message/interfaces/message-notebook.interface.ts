import { ParagraphItem } from './message-paragraph.interface'

interface ID {
  id: string;
}

interface Name {
  name: string;
}

export type GetNode = ID;
export type MoveNoteToTrash = ID;
export type MoveFolderToTrash = ID;
export type RestoreNote = ID;
export type RestoreFolder = ID;
export type DeleteNote = ID;
export type RemoveFolder = ID;
export type CloneNote = ID & Name;
export type FolderRename = ID & Name;
export type PersonalizedMode = 'true' | 'false';

export interface NoteRename extends Name, ID {
  relative: boolean;
}

export interface SendNote {
  id: string;
  noteParams: NoteParams;
}

export interface Note {
  note?: {
    paragraphs: ParagraphItem[];
    name: string;
    id: string;
    defaultInterpreterGroup: string;
    noteParams: NoteParams;
    noteForms: NoteForms;
    angularObjects: NoteAngularObjects;
    config: NoteConfig;
    info: NoteInfo;
  }
}

export interface NoteAngularObjects {
}

export interface NoteInfo {

}

export interface NoteParams {

}

export interface NoteForms {
}

export interface RemoveNoteForms {
  noteId: string;
  formName: string;
}
export interface ListUpdateNoteJobs {
  lastUpdateUnixTime: number;
}

export interface SaveNoteForms {
  noteId: string;
  noteParams: NoteParams;
}

export interface GetInterpreterBindings {
  noteId: string;
}

export interface EditorSetting {
  paragraphId: string;
  magic: string;
}

export interface NoteRevisionForCompare {
  noteId: string;
  revisionId: string;
  position: string;
}

export interface NoteRevision {
  noteId: string;
  revisionId: string;
}

export interface ListRevisionHistory {
  noteId: string;
}

export interface SetNoteRevision {
  noteId: string;
  revisionId: string;
}

export interface CheckpointNote {
  noteId: string;
  commitMessage: string;
}

export interface NoteUpdate extends Name, ID {
  config: NoteConfig;
}

export interface NewNote extends Name {
  defaultInterpreterGroup: string;
}

export interface NotesInfo {
  notes: NotesInfoItem[];
}

export interface NotesInfoItem extends ID {
  path: string;
}

export interface NoteConfig {
  isZeppelinNotebookCronEnable: boolean;
  looknfeel: 'report' | 'default' | 'simple';
  personalizedMode: PersonalizedMode;
}

export interface UpdatePersonalizedMode extends ID {
  personalized: PersonalizedMode;
}
