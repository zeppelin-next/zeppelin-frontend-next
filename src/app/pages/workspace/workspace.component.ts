import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MessageService } from 'zeppelin-services';

@Component({
  selector: 'zeppelin-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceComponent implements OnInit {
  constructor(public messageService: MessageService) {}

  ngOnInit() {
    this.messageService.bootstrap();
  }
}
