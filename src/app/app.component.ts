import { Component } from '@angular/core';
import { MessageDataTypeMap } from './zeppelin-message/interfaces/message-data-type-map.interface';
import { OP } from './zeppelin-message/interfaces/message-operator.interface';
import { ParagraphItem } from './zeppelin-message/interfaces/message-paragraph.interface';
import { WebSocketMessage } from './zeppelin-message/interfaces/websocket-message.interface';
import { Message } from './zeppelin-message/message';

@Component({
  selector: 'zeppelin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  /** 它的值因该是初始化的时候从 api/security/ticket 接口获取 **/
  ticket = {
    principal: 'anonymous',
    roles: '',
    ticket: 'anonymous'
  };
  message: Message;

  status = false;
  logs: Array<{
    type: string;
    event: WebSocketMessage<keyof MessageDataTypeMap>;
  }> = [];

  logIndex = 0;
  showPing = false;
  noteId = '';
  paragraphs: ParagraphItem[] = [];
  paragraph: string;
  ops: string[] = Object.keys(OP);
  op: string;
  dataStr = '{}';
  constructor() {
    this.message = new Message(this.ticket);
    this.message.opened().subscribe(e => {
      this.status = true;
      this.message.listConfigurations();
      this.message.listNodes();
      this.message.getHomeNote();
    });

    this.message.closed().subscribe(e => {
      this.status = false;
    });

    this.message.sent().subscribe(e => {
      this.logs.push({
        type: 'send',
        event: e
      });
    });

    this.message.received().subscribe(e => {
      this.logs.push({
        type: 'receive',
        event: e
      });
    });

    this.message.receive<OP.CONFIGURATIONS_INFO>(OP.CONFIGURATIONS_INFO).subscribe(data => {
      console.log(data);
    });

    this.message.receive<OP.NOTES_INFO>(OP.NOTES_INFO).subscribe(data => {
      console.log(data.notes);
    });

    this.message.receive<OP.NOTE>(OP.NOTE).subscribe(data => {
      if (data && data.note) {
        this.paragraphs = data.note.paragraphs;
        if (this.paragraphs.length) {
          this.paragraph = this.paragraphs[0].id;
        } else {
          this.paragraph = null;
        }
      }
    });
  }

  getNotebook(id: string): void {
    this.message.getNote(id);
  }

  runParagraph(id: string) {
    const paragraph = this.paragraphs.find(e => e.id === id);
    this.message.runParagraph(paragraph.id, paragraph.title, paragraph.text, paragraph.config, {});
  }

  send(op: string, dataStr: string) {
    let data = null;
    try {
      data = JSON.parse(dataStr);
    } catch (e) {
      console.warn(e);
    }
    // tslint:disable-next-line no-any
    this.message.send<any>(op, data);
  }
}
