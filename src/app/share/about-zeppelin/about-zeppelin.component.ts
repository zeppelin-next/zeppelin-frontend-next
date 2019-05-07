import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TicketService } from 'zeppelin-services';

@Component({
  selector: 'zeppelin-about-zeppelin',
  templateUrl: './about-zeppelin.component.html',
  styleUrls: ['./about-zeppelin.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutZeppelinComponent implements OnInit {
  zeppelinVersion = 'loading...';

  constructor(private ticketService: TicketService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.ticketService.getZeppelinVersion().subscribe(data => {
      this.zeppelinVersion = data.version;
      this.cdr.markForCheck();
    });
  }
}
