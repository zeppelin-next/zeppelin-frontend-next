import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'zeppelin-environment';
import { catchError, map } from 'rxjs/operators';
import { TicketService } from 'zeppelin-services';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private ticketService: TicketService) {}

  // tslint:disable-next-line:no-any
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let httpRequestUpdated = httpRequest.clone({ withCredentials: true });
    if (environment.production) {
      httpRequestUpdated = httpRequest.clone({ setHeaders: { 'X-Requested-With': 'XMLHttpRequest' } });
    }
    return next.handle(httpRequestUpdated).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          return event.clone({ body: event.body.body });
        } else {
          return event;
        }
      }),
      catchError(event => {
        const redirect = event.headers.get('Location');
        if (event.status === 401 && redirect !== undefined) {
          // Handle page redirect
          window.location.href = redirect;
        } else if (event.status === 405) {
          this.ticketService.logout();
        }
        return throwError(event);
      })
    );
  }
}
