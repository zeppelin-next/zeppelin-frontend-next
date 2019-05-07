import { HttpClient } from '@angular/common/http';
import { TicketService } from 'zeppelin-services';
export function AppInitializer(httpClient: HttpClient, ticketService: TicketService): Function {
  return () => {
    return ticketService.getTicket().toPromise();
  };
}
