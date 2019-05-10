import { Injectable } from '@angular/core';
import { ITicket, ITicketWrapped, IZeppelinVersion } from 'zeppelin-interfaces';
import { forkJoin, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BaseUrlService } from './base-url.service';
import { ConfigurationsInfo } from 'zeppelin-sdk';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  configuration: ConfigurationsInfo['configurations'];
  ticket = new ITicketWrapped();
  originTicket = new ITicket();
  ticket$ = new Subject<ITicketWrapped>();
  login$ = new Subject();
  logout$ = new Subject();
  version: string;

  setConfiguration(conf: ConfigurationsInfo) {
    this.configuration = conf.configurations;
  }

  getTicket() {
    return forkJoin(
      this.httpClient.get<ITicket>(`${this.baseUrlService.getRestApiBase()}/security/ticket`),
      this.getZeppelinVersion()
    ).pipe(
      tap(data => {
        const [ticket, version] = data;
        this.version = version;
        this.setTicket(ticket);
      })
    );
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
    this.originTicket = ticket;
    this.ticket = { ...ticket, screenUsername, ...{ init: true } };
    this.ticket$.next(this.ticket);
  }

  logout() {
    return this.httpClient.post(`${this.baseUrlService.getRestApiBase()}/login/logout`, {}).pipe(
      tap(() => {
        // TODO
        this.notifyLogout();
      })
    );
  }

  login(userName: string, password: string) {
    return this.httpClient
      .post<ITicket>(`${this.baseUrlService.getRestApiBase()}/login`, `password=${password}&userName=${userName}`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .pipe(tap(data => this.setTicket(data)));
  }

  notifyLogout() {
    this.logout$.next();
  }

  notifyLogin() {
    this.login$.next();
  }

  getZeppelinVersion() {
    return this.httpClient
      .get<IZeppelinVersion>(`${this.baseUrlService.getRestApiBase()}/version`)
      .pipe(map(data => data.version));
  }

  constructor(private httpClient: HttpClient, private baseUrlService: BaseUrlService) {}
}
