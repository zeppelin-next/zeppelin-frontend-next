import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { MessageService, TicketService } from 'zeppelin-services';
export function AppInitializer(httpClient: HttpClient, ticketService: TicketService, messageService: MessageService): Function {
  return () => {
    return ticketService.getTicket()
    .pipe(tap(() => messageService.bootstrap()))
    .toPromise();
  };
}
