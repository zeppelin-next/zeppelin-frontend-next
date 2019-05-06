import { Injectable } from '@angular/core';
import { ITicket, ITicketWithName } from 'zeppelin-interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  ticket = new ITicketWithName();
  login$ = new Subject();
  logout$ = new Subject();

  setTicket(ticket: ITicket) {
    if (ticket.redirectURL) {
      window.location.href = ticket.redirectURL + window.location.href;
    }
    let screenUsername = ticket.principal;
    if (ticket.principal.indexOf('#Pac4j') === 0) {
      const re = ', name=(.*?),';
      screenUsername = ticket.principal.match(re)[1];
    }
    this.ticket = { ...ticket, screenUsername };
  }

  logout() {
    this.logout$.next();
  }

  login() {
    this.login$.next();
  }
}
