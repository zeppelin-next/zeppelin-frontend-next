import { ConfigurationsInfo, ErrorInfo } from './message-common.interface';
import {
  CheckpointNote,
  CloneNote,
  CollaborativeModeStatus,
  DeleteNote,
  EditorSettingReceived,
  EditorSettingSend,
  FolderRename,
  GetInterpreterBindings,
  GetNode,
  ListRevision,
  ListRevisionHistory,
  MoveFolderToTrash,
  MoveNoteToTrash,
  NewNote,
  Note,
  NoteRename,
  NoteRevision,
  NoteRevisionForCompare,
  NoteRunningStatus,
  NotesInfo,
  NoteUpdate,
  ParagraphAdded,
  RemoveFolder,
  RemoveNoteForms,
  RestoreFolder,
  RestoreNote,
  SaveNoteFormsReceived,
  SaveNoteFormsSend,
  SetNoteRevision,
  SetNoteRevisionStatus,
  UpdateParagraph,
  UpdatePersonalizedMode
} from './message-notebook.interface';
import {
  AngularObjectClientBind,
  AngularObjectClientUnbind,
  AngularObjectUpdated,
  CancelParagraph,
  CommitParagraph,
  Completion,
  CopyParagraph,
  InsertParagraph,
  MoveParagraph,
  ParagraphClearAllOutput,
  ParagraphClearOutput,
  ParagraphRemove,
  ParagraphRemoved,
  PatchParagraphReceived,
  PatchParagraphSend,
  RunAllParagraphs,
  RunParagraph
} from './message-paragraph.interface';

import { ListNoteJobs, ListUpdateNoteJobs } from './message-job.interface';

import { OP } from './message-operator.interface';
import { InterpreterBindings, InterpreterSetting } from './message-interpreter.interface';

export interface MessageReceiveDataTypeMap {
  [OP.NOTES_INFO]: NotesInfo;
  [OP.CONFIGURATIONS_INFO]: ConfigurationsInfo;
  [OP.NOTE]: Note;
  [OP.NOTE_REVISION]: NoteRevision;
  [OP.ERROR_INFO]: ErrorInfo;
  [OP.LIST_NOTE_JOBS]: ListNoteJobs;
  [OP.LIST_UPDATE_NOTE_JOBS]: ListUpdateNoteJobs;
  [OP.INTERPRETER_SETTINGS]: InterpreterSetting;
  [OP.LIST_REVISION_HISTORY]: ListRevision;
  [OP.INTERPRETER_BINDINGS]: InterpreterBindings;
  [OP.COLLABORATIVE_MODE_STATUS]: CollaborativeModeStatus;
  [OP.SET_NOTE_REVISION]: SetNoteRevisionStatus;
  [OP.PARAGRAPH_ADDED]: ParagraphAdded;
  [OP.NOTE_RUNNING_STATUS]: NoteRunningStatus;
  [OP.NEW_NOTE]: NoteRevision;
  [OP.SAVE_NOTE_FORMS]: SaveNoteFormsSend;
  [OP.PARAGRAPH]: UpdateParagraph;
  [OP.PATCH_PARAGRAPH]: PatchParagraphSend;
  [OP.PARAGRAPH_REMOVED]: ParagraphRemoved;
  [OP.EDITOR_SETTING]: EditorSettingReceived;
}

export interface MessageDataTypeMap {
  [OP.NOTES_INFO]: never;
  [OP.CONFIGURATIONS_INFO]: never;
  [OP.NOTE]: never;
  [OP.ERROR_INFO]: never;
  [OP.INTERPRETER_SETTINGS]: never;
  [OP.INTERPRETER_BINDINGS]: never;
  [OP.COLLABORATIVE_MODE_STATUS]: never;
  [OP.PARAGRAPH_ADDED]: never;
  [OP.NOTE_RUNNING_STATUS]: never;
  [OP.PARAGRAPH]: never;
  [OP.PARAGRAPH_REMOVED]: never;

  [OP.PING]: undefined;
  [OP.LIST_CONFIGURATIONS]: undefined;
  [OP.LIST_NOTES]: undefined;
  [OP.GET_HOME_NOTE]: undefined;
  [OP.RESTORE_ALL]: undefined;
  [OP.EMPTY_TRASH]: undefined;
  [OP.RELOAD_NOTES_FROM_REPO]: undefined;
  [OP.GET_NOTE]: GetNode;
  [OP.NEW_NOTE]: NewNote;
  [OP.MOVE_NOTE_TO_TRASH]: MoveNoteToTrash;
  [OP.MOVE_FOLDER_TO_TRASH]: MoveFolderToTrash;
  [OP.RESTORE_NOTE]: RestoreNote;
  [OP.RESTORE_FOLDER]: RestoreFolder;
  [OP.REMOVE_FOLDER]: RemoveFolder;
  [OP.DEL_NOTE]: DeleteNote;
  [OP.CLONE_NOTE]: CloneNote;
  [OP.NOTE_UPDATE]: NoteUpdate;
  [OP.UPDATE_PERSONALIZED_MODE]: UpdatePersonalizedMode;
  [OP.NOTE_RENAME]: NoteRename;
  [OP.FOLDER_RENAME]: FolderRename;
  [OP.MOVE_PARAGRAPH]: MoveParagraph;
  [OP.INSERT_PARAGRAPH]: InsertParagraph;
  [OP.COPY_PARAGRAPH]: CopyParagraph;
  [OP.ANGULAR_OBJECT_UPDATED]: AngularObjectUpdated;
  [OP.ANGULAR_OBJECT_CLIENT_BIND]: AngularObjectClientBind;
  [OP.ANGULAR_OBJECT_CLIENT_UNBIND]: AngularObjectClientUnbind;
  [OP.CANCEL_PARAGRAPH]: CancelParagraph;
  [OP.PARAGRAPH_EXECUTED_BY_SPELL]: {}; // TODO
  [OP.RUN_PARAGRAPH]: RunParagraph;
  [OP.RUN_ALL_PARAGRAPHS]: RunAllParagraphs;
  [OP.PARAGRAPH_REMOVE]: ParagraphRemove;
  [OP.PARAGRAPH_CLEAR_OUTPUT]: ParagraphClearOutput;
  [OP.PARAGRAPH_CLEAR_ALL_OUTPUT]: ParagraphClearAllOutput;
  [OP.COMPLETION]: Completion;
  [OP.COMMIT_PARAGRAPH]: CommitParagraph;
  [OP.PATCH_PARAGRAPH]: PatchParagraphReceived;
  [OP.IMPORT_NOTE]: {}; // TODO
  [OP.CHECKPOINT_NOTE]: CheckpointNote;
  [OP.SET_NOTE_REVISION]: SetNoteRevision;
  [OP.LIST_REVISION_HISTORY]: ListRevisionHistory;
  [OP.NOTE_REVISION]: NoteRevision;
  [OP.NOTE_REVISION_FOR_COMPARE]: NoteRevisionForCompare;
  [OP.EDITOR_SETTING]: EditorSettingSend;
  [OP.LIST_NOTE_JOBS]: undefined;
  [OP.UNSUBSCRIBE_UPDATE_NOTE_JOBS]: undefined;
  [OP.LIST_UPDATE_NOTE_JOBS]: undefined;
  [OP.GET_INTERPRETER_BINDINGS]: GetInterpreterBindings;
  [OP.GET_INTERPRETER_SETTINGS]: undefined;
  [OP.SAVE_NOTE_FORMS]: SaveNoteFormsReceived;
  [OP.REMOVE_NOTE_FORMS]: RemoveNoteForms;
}
