import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { MessageListener, MessageListenersManager } from 'zeppelin-core';
import { MessageService } from 'zeppelin-services';
import { MessageReceiveDataTypeMap, OP } from 'zeppelin-sdk';

@Component({
  selector: 'zeppelin-notebook-paragraph-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookParagraphProgressComponent extends MessageListenersManager implements OnInit {
  @Input() pid: string;
  progress = 0;

  @MessageListener(OP.PROGRESS)
  onProgress(data: MessageReceiveDataTypeMap[OP.PROGRESS]) {
    if (data.id === this.pid) {
      if (data.progress > 0 && data.progress < 100) {
        this.progress = data.progress;
      } else {
        this.progress = 100;
      }
      this.cdr.markForCheck();
    }
  }

  constructor(public messageService: MessageService, private cdr: ChangeDetectorRef) {
    super(messageService);
  }

  ngOnInit() {}
}
