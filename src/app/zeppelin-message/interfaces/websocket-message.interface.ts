import { MessageDataTypeMap } from './message-data-type-map.interface';

export interface WebSocketMessage<K extends keyof MessageDataTypeMap> {
  op: K;
  data?: MessageDataTypeMap[K];
  ticket?: string;    // default 'anonymous'
  principal?: string; // default 'anonymous'
  roles?: string;     // default '[]'
}
