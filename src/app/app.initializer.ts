import { HttpClient } from '@angular/common/http';
import { BaseUrlService, TicketService } from 'zeppelin-services';
import { tap } from 'rxjs/operators';
import { ITicket } from 'zeppelin-interfaces';

export function AppInitializer(
  httpClient: HttpClient,
  baseUrlService: BaseUrlService,
  ticketService: TicketService
): Function {
  return () => {
    return httpClient
      .get<ITicket>(`${baseUrlService.getRestApiBase()}/security/ticket`)
      .pipe(tap(data => ticketService.setTicket(data)))
      .toPromise();
  };
}
