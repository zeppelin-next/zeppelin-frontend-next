import { OnDestroy } from '@angular/core';
import { Subscriber } from 'rxjs';
import { MessageReceiveDataTypeMap } from 'zeppelin-sdk';
import { MessageService } from 'zeppelin-services';

export class MessageListenersManager implements OnDestroy {
  __zeppelinMessageListeners__: Function[];
  __zeppelinMessageListeners$__ = new Subscriber();
  constructor(public messageService: MessageService) {
    if (this.__zeppelinMessageListeners__) {
      this.__zeppelinMessageListeners__.forEach(fn => fn.apply(this));
    }
  }

  ngOnDestroy(): void {
    this.__zeppelinMessageListeners$__.unsubscribe();
    this.__zeppelinMessageListeners$__ = null;
  }
}

export function MessageListener<K extends keyof MessageReceiveDataTypeMap>(op: K) {
  return function(
    target: MessageListenersManager,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(data?: Record<K, MessageReceiveDataTypeMap[K]>[K]) => void>
  ) {
    const oldValue = descriptor.value as (o: Record<K, MessageReceiveDataTypeMap[K]>[K]) => void;

    const fn = function() {
      this.__zeppelinMessageListeners$__.add(
        this.messageService.receive(op).subscribe(data => {
          oldValue.apply(this, [data as MessageReceiveDataTypeMap[K]]);
        })
      );
    };

    if (!target.__zeppelinMessageListeners__) {
      target.__zeppelinMessageListeners__ = [fn];
    } else {
      target.__zeppelinMessageListeners__.push(fn);
    }

    return descriptor;
  };
}
