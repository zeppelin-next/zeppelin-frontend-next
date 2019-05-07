import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MessageService, TicketService } from 'zeppelin-services';
import { NzModalService } from 'ng-zorro-antd';
import { AboutZeppelinComponent } from 'zeppelin-share/about-zeppelin/about-zeppelin.component';
import { DestroyHookComponent } from 'zeppelin-core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'zeppelin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends DestroyHookComponent implements OnInit, OnDestroy {
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

  constructor(
    public ticketService: TicketService,
    private nzModalService: NzModalService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.messageService.connectedStatus$.pipe(takeUntil(this.destroy$)).subscribe(status => {
      this.connectStatus = status ? 'success' : 'error';
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
