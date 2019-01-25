import { Component } from '@angular/core';
import { OP } from './zeppelin-message/interfaces/message-operator.interface';
import { Message } from './zeppelin-message/message';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : [ './app.component.less' ]
})
export class AppComponent {

  /** 它的值因该是初始化的时候从 api/security/ticket 接口获取 **/
  ticket = {
    principal: 'anonymous',
    roles    : '',
    ticket   : 'anonymous'
  };
  message: Message;

  constructor() {
    this.message = new Message(this.ticket);

    this.message.opened().subscribe(e => {
      this.message.listConfigurations();
      this.message.listNodes();
      this.message.getHomeNote();
    });

    this.message.closed().subscribe(e => {
      console.log(e);
    });

    this.message.receive<OP.CONFIGURATIONS_INFO>(OP.CONFIGURATIONS_INFO).subscribe(data => {
      console.log(data);
    });

    this.message.receive<OP.NOTES_INFO>(OP.NOTES_INFO).subscribe(data => {
      console.log(data);
    });

    this.message.send(OP.GET_NOTE, { id: '2E1Z1DUH6' });

  }
}
