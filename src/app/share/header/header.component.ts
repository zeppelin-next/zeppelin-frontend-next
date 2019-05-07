import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TicketService } from 'zeppelin-services';
import { NzModalService } from 'ng-zorro-antd';
import { AboutZeppelinComponent } from 'zeppelin-share/about-zeppelin/about-zeppelin.component';

@Component({
  selector: 'zeppelin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
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

  constructor(public ticketService: TicketService, private nzModalService: NzModalService) {}

  ngOnInit() {}
}
