import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MessageService, TicketService } from 'zeppelin-services';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { AboutZeppelinComponent } from 'zeppelin-share/about-zeppelin/about-zeppelin.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MessageListener, MessageListenersManager } from 'zeppelin-core';
import { MessageReceiveDataTypeMap, OP } from 'zeppelin-sdk';

@Component({
  selector: 'zeppelin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends MessageListenersManager implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  connectStatus = 'error';

  about() {
    this.nzModalService.create({
      nzTitle: 'About Zeppelin',
      nzWidth: '600px',
      nzContent: AboutZeppelinComponent,
      nzFooter: null
    });
  }

  logout() {
    this.ticketService.logout();
  }

  @MessageListener(OP.ERROR_INFO)
  getNotes(data: MessageReceiveDataTypeMap[OP.ERROR_INFO]) {
    this.nzNotificationService.warning('ERROR', data.info);
  }

  constructor(
    public ticketService: TicketService,
    private nzModalService: NzModalService,
    public messageService: MessageService,
    private nzNotificationService: NzNotificationService,
    private cdr: ChangeDetectorRef
  ) {
    super(messageService);
  }

  ngOnInit() {
    this.messageService.connectedStatus$.pipe(takeUntil(this.destroy$)).subscribe(status => {
      this.connectStatus = status ? 'success' : 'error';
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    super.ngOnDestroy();
  }
}
