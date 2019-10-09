import { Component } from '@angular/core';

import { MessageListener, MessageListenersManager } from '@zeppelin/core';
import { MessageReceiveDataTypeMap, MixMessageDataTypeMap, OP, ParagraphItem, WebSocketMessage } from '@zeppelin/sdk';
import { MessageService } from '@zeppelin/services';

@Component({
  selector: 'zeppelin-message-debugger',
  templateUrl: `./debugger.component.html`,
  styleUrls: ['./debugger.component.less']
})
export class DebuggerComponent extends MessageListenersManager {
  status = false;
  logs: Array<{
    type: string;
    event: WebSocketMessage<keyof MixMessageDataTypeMap>;
  }> = [];

  logIndex = 0;
  showPing = false;
  noteId = '';
  paragraphs: ParagraphItem[] = [];
  paragraph: string;
  ops: string[] = Object.keys(OP);
  op: string;
  dataStr = '{}';
  constructor(public messageService: MessageService) {
    super(messageService);
    this.messageService.opened().subscribe(e => {
      this.status = true;
      this.messageService.listConfigurations();
      this.messageService.listNodes();
      this.messageService.getHomeNote();
    });

    this.messageService.closed().subscribe(e => {
      this.status = false;
    });

    this.messageService.sent().subscribe(e => {
      this.logs.push({
        type: 'send',
        event: e
      });
    });

    this.messageService.received().subscribe(e => {
      this.logs.push({
        type: 'receive',
        event: e
      });
    });
  }

  @MessageListener(OP.NOTE)
  updateNote(data: MessageReceiveDataTypeMap[OP.NOTE]) {
    if (data && data.note) {
      this.paragraphs = data.note.paragraphs;
      if (this.paragraphs.length) {
        this.paragraph = this.paragraphs[0].id;
      } else {
        this.paragraph = null;
      }
    }
  }

  @MessageListener(OP.NOTES_INFO)
  @MessageListener(OP.CONFIGURATIONS_INFO)
  updateConfigurations(data): void {
    console.log(data);
    console.log(this.logs.length);
  }

  getNotebook(id: string): void {
    this.messageService.getNote(id);
  }

  runParagraph(id: string) {
    const paragraph = this.paragraphs.find(e => e.id === id);
    this.messageService.runParagraph(paragraph.id, paragraph.title, paragraph.text, paragraph.config, {});
  }

  send(op: string, dataStr: string) {
    let data = null;
    try {
      data = JSON.parse(dataStr);
    } catch (e) {
      console.warn(e);
    }
    // tslint:disable-next-line no-any
    this.messageService.send<any>(op, data);
  }
}
