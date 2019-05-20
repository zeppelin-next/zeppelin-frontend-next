import { Injectable } from '@angular/core';
import { MessageInterceptor } from 'zeppelin-interfaces';
import { MessageReceiveDataTypeMap, OP, WebSocketMessage } from 'zeppelin-sdk';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable()
export class AppMessageInterceptor implements MessageInterceptor {
  constructor(private router: Router, private nzNotificationService: NzNotificationService) {}

  received(data: WebSocketMessage<keyof MessageReceiveDataTypeMap>): WebSocketMessage<keyof MessageReceiveDataTypeMap> {
    if (data.op === OP.NEW_NOTE) {
      const rData = data.data as MessageReceiveDataTypeMap[OP.NEW_NOTE];
      this.router.navigate(['/notebook', rData.note.id]).then();
    } else if (data.op === OP.ERROR_INFO) {
      // tslint:disable-next-line:no-any
      const rData = (data.data as any) as MessageReceiveDataTypeMap[OP.ERROR_INFO];
      if (rData.info) {
        this.nzNotificationService.warning('ERROR', rData.info);
      }
    }
    return data;
  }
}
