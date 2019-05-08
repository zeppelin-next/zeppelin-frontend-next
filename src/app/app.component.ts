import { Component, OnInit } from '@angular/core';
import { MessageListener, MessageListenersManager } from 'zeppelin-core';
import { MessageService, TicketService } from 'zeppelin-services';
import { MessageReceiveDataTypeMap, OP } from 'zeppelin-sdk';

@Component({
  selector: 'zeppelin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent extends MessageListenersManager implements OnInit {
  @MessageListener(OP.CONFIGURATIONS_INFO)
  getNotes(data: MessageReceiveDataTypeMap[OP.CONFIGURATIONS_INFO]) {
    this.ticketService.setConfiguration(data);
  }

  constructor(public messageService: MessageService, private ticketService: TicketService) {
    super(messageService);
  }

  ngOnInit(): void {
    this.messageService.listConfigurations();
  }
}
