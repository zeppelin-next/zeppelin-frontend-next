import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TicketService } from 'zeppelin-services';
import { get } from 'lodash';

@Component({
  selector: 'zeppelin-note-import',
  templateUrl: './note-import.component.html',
  styleUrls: ['./note-import.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteImportComponent implements OnInit {
  noteImportName: string;
  maxLimit = get(this.ticketService.configuration, ['zeppelin.websocket.max.text.message.size'], null);

  constructor(private ticketService: TicketService) {}

  ngOnInit() {}
}
