import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { TicketService } from 'zeppelin-services';
import { EMPTY } from 'rxjs';

export function AppInitializer(httpClient: HttpClient, ticketService: TicketService): Function {
  return () =>
    ticketService
      .getTicket()
      .pipe(catchError(() => EMPTY))
      .toPromise();
}
