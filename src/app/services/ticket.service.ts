import { Injectable } from '@angular/core';
import { ITicket, ITicketWithName, IZeppelinVersion } from 'zeppelin-interfaces';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BaseUrlService } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  ticket = new ITicketWithName();
  login$ = new Subject();
  logout$ = new Subject();

  getTicket() {
    return this.httpClient
      .get<ITicket>(`${this.baseUrlService.getRestApiBase()}/security/ticket`)
      .pipe(tap(data => this.setTicket(data)));
  }

  setTicket(ticket: ITicket) {
    if (ticket.redirectURL) {
      window.location.href = ticket.redirectURL + window.location.href;
    }
    let screenUsername = ticket.principal;
    if (ticket.principal.indexOf('#Pac4j') === 0) {
      const re = ', name=(.*?),';
      screenUsername = ticket.principal.match(re)[1];
    }
    this.ticket = { ...ticket, screenUsername, ...{ init: true } };
  }

  logout() {
    this.httpClient.post(`${this.baseUrlService.getRestApiBase()}/login/logout`, {}).subscribe(() => {
      // TODO
      this.notifyLogout();
    });
  }

  notifyLogout() {
    this.logout$.next();
  }

  notifyLogin() {
    this.login$.next();
  }

  getZeppelinVersion() {
    return this.httpClient.get<IZeppelinVersion>(`${this.baseUrlService.getRestApiBase()}/version`);
  }

  constructor(private httpClient: HttpClient, private baseUrlService: BaseUrlService) {}
}
