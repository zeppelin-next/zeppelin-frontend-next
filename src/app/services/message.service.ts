import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MessageDataTypeMap,
  MessageReceiveDataTypeMap,
  NoteConfig,
  PersonalizedMode,
  SendNote,
  ParagraphConfig,
  ParagraphParams,
  SendParagraph,
  WebSocketMessage,
  Message,
  SendArgumentsType
} from 'zeppelin-sdk';
import { TicketService } from './ticket.service';
import { BaseUrlService } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends Message implements OnDestroy {
  constructor(private baseUrlService: BaseUrlService, private ticketService: TicketService) {
    super();
  }

  bootstrap(): void {
    super.bootstrap(this.ticketService.rawTicket, this.baseUrlService.getWebsocketUrl());
  }

  ping() {
    super.ping();
  }

  closed(): Observable<CloseEvent> {
    return super.closed();
  }

  sent(): Observable<WebSocketMessage<keyof MessageDataTypeMap>> {
    return super.sent();
  }

  received(): Observable<WebSocketMessage<keyof MessageReceiveDataTypeMap>> {
    return super.received();
  }

  send<K extends keyof MessageDataTypeMap>(...args: SendArgumentsType<K>): void {
    super.send(...args);
  }

  receive<K extends keyof MessageReceiveDataTypeMap>(op: K): Observable<Record<K, MessageReceiveDataTypeMap[K]>[K]> {
    return super.receive(op);
  }

  opened(): Observable<Event> {
    return super.opened();
  }

  ngOnDestroy(): void {
    super.destroy();
  }

  getHomeNote(): void {
    super.getHomeNote();
  }

  newNote(noteName: string, defaultInterpreterGroup: string): void {
    super.newNote(noteName, defaultInterpreterGroup);
  }

  moveNoteToTrash(noteId: string): void {
    super.moveNoteToTrash(noteId);
  }

  restoreNote(noteId: string): void {
    super.restoreNote(noteId);
  }

  deleteNote(noteId): void {
    super.deleteNote(noteId);
  }

  restoreFolder(folderPath: string): void {
    super.restoreFolder(folderPath);
  }

  removeFolder(folderPath: string): void {
    super.removeFolder(folderPath);
  }

  moveFolderToTrash(folderPath: string): void {
    super.moveFolderToTrash(folderPath);
  }

  restoreAll(): void {
    super.restoreAll();
  }

  emptyTrash(): void {
    super.emptyTrash();
  }

  cloneNote(noteIdToClone, newNoteName): void {
    super.cloneNote(noteIdToClone, newNoteName);
  }

  listNodes(): void {
    super.listNodes();
  }

  reloadAllNotesFromRepo(): void {
    super.reloadAllNotesFromRepo();
  }

  getNote(noteId: string): void {
    super.getNote(noteId);
  }

  updateNote(noteId: string, noteName: string, noteConfig: NoteConfig): void {
    super.updateNote(noteId, noteName, noteConfig);
  }

  updatePersonalizedMode(noteId: string, modeValue: PersonalizedMode): void {
    super.updatePersonalizedMode(noteId, modeValue);
  }

  noteRename(noteId: string, noteName: string, relative: boolean): void {
    super.noteRename(noteId, noteName, relative);
  }

  folderRename(folderId: string, folderPath: string): void {
    super.folderRename(folderId, folderPath);
  }

  moveParagraph(paragraphId: string, newIndex: number): void {
    super.moveParagraph(paragraphId, newIndex);
  }

  insertParagraph(newIndex: number): void {
    super.insertParagraph(newIndex);
  }

  copyParagraph(
    newIndex: number,
    paragraphTitle: string,
    paragraphData: string,
    paragraphConfig: ParagraphConfig,
    paragraphParams: ParagraphParams
  ): void {
    super.copyParagraph(newIndex, paragraphTitle, paragraphData, paragraphConfig, paragraphParams);
  }

  angularObjectUpdate(
    noteId: string,
    paragraphId: string,
    name: string,
    value: string,
    interpreterGroupId: string
  ): void {
    super.angularObjectUpdate(noteId, paragraphId, name, value, interpreterGroupId);
  }

  angularObjectClientBind(noteId: string, name: string, value: string, paragraphId: string): void {
    super.angularObjectClientBind(noteId, name, value, paragraphId);
  }

  angularObjectClientUnbind(noteId: string, name: string, paragraphId: string): void {
    super.angularObjectClientUnbind(noteId, name, paragraphId);
  }

  cancelParagraph(paragraphId): void {
    super.cancelParagraph(paragraphId);
  }

  paragraphExecutedBySpell(
    paragraphId,
    paragraphTitle,
    paragraphText,
    paragraphResultsMsg,
    paragraphStatus,
    paragraphErrorMessage,
    paragraphConfig,
    paragraphParams,
    paragraphDateStarted,
    paragraphDateFinished
  ): void {
    super.paragraphExecutedBySpell(
      paragraphId,
      paragraphTitle,
      paragraphText,
      paragraphResultsMsg,
      paragraphStatus,
      paragraphErrorMessage,
      paragraphConfig,
      paragraphParams,
      paragraphDateStarted,
      paragraphDateFinished
    );
  }

  runParagraph(
    paragraphId: string,
    paragraphTitle: string,
    paragraphData: string,
    paragraphConfig: ParagraphConfig,
    paragraphParams: ParagraphParams
  ): void {
    super.runParagraph(paragraphId, paragraphTitle, paragraphData, paragraphConfig, paragraphParams);
  }

  runAllParagraphs(noteId: string, paragraphs: SendParagraph[]): void {
    super.runAllParagraphs(noteId, paragraphs);
  }

  paragraphRemove(paragraphId: string): void {
    super.paragraphRemove(paragraphId);
  }

  paragraphClearOutput(paragraphId: string): void {
    super.paragraphClearOutput(paragraphId);
  }

  paragraphClearAllOutput(noteId: string): void {
    super.paragraphClearAllOutput(noteId);
  }

  completion(paragraphId: string, buf: string, cursor: number): void {
    super.completion(paragraphId, buf, cursor);
  }

  commitParagraph(
    paragraphId: string,
    paragraphTitle: string,
    paragraphData: string,
    paragraphConfig: ParagraphConfig,
    paragraphParams: ParagraphConfig,
    noteId: string
  ): void {
    super.commitParagraph(paragraphId, paragraphTitle, paragraphData, paragraphConfig, paragraphParams, noteId);
  }

  patchParagraph(paragraphId: string, noteId: string, patch: string): void {
    super.patchParagraph(paragraphId, noteId, patch);
  }

  importNote(note: SendNote): void {
    super.importNote(note);
  }

  checkpointNote(noteId: string, commitMessage: string): void {
    super.checkpointNote(noteId, commitMessage);
  }

  setNoteRevision(noteId: string, revisionId: string): void {
    super.setNoteRevision(noteId, revisionId);
  }

  listRevisionHistory(noteId: string): void {
    super.listRevisionHistory(noteId);
  }

  noteRevision(noteId: string, revisionId: string): void {
    super.noteRevision(noteId, revisionId);
  }

  noteRevisionForCompare(noteId: string, revisionId: string, position: string): void {
    super.noteRevisionForCompare(noteId, revisionId, position);
  }

  editorSetting(paragraphId: string, replName: string): void {
    super.editorSetting(paragraphId, replName);
  }

  listNoteJobs(): void {
    super.listNoteJobs();
  }

  unsubscribeUpdateNoteJobs(): void {
    super.unsubscribeUpdateNoteJobs();
  }

  getInterpreterBindings(noteId: string): void {
    super.getInterpreterBindings(noteId);
  }

  saveInterpreterBindings(noteId, selectedSettingIds): void {
    super.saveInterpreterBindings(noteId, selectedSettingIds);
  }

  listConfigurations(): void {
    super.listConfigurations();
  }

  getInterpreterSettings(): void {
    super.getInterpreterSettings();
  }

  saveNoteForms(note: SendNote): void {
    super.saveNoteForms(note);
  }

  removeNoteForms(note, formName): void {
    super.removeNoteForms(note, formName);
  }
}
