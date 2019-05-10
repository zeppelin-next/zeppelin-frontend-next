import { Component } from '@angular/core';
import { MessageService } from 'zeppelin-services';

@Component({
  selector: 'zeppelin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(public messageService: MessageService) {}
}
