import { Injectable } from '@angular/core';
import { MessageInterceptor } from 'zeppelin-interfaces';
import { MessageReceiveDataTypeMap, OP, WebSocketMessage } from 'zeppelin-sdk';
import { Router } from '@angular/router';

@Injectable()
export class AppMessageInterceptor implements MessageInterceptor {
  constructor(private router: Router) {}

  received(data: WebSocketMessage<keyof MessageReceiveDataTypeMap>): WebSocketMessage<keyof MessageReceiveDataTypeMap> {
    if (data.op === OP.NEW_NOTE) {
      const rData = data.data as MessageReceiveDataTypeMap[OP.NEW_NOTE];
      this.router.navigate(['/notebook', rData.note.id]).then();
    }
    return data;
  }
}
