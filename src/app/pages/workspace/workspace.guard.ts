import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TicketService } from 'zeppelin-services';
import { catchError, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceGuard implements CanActivate {
  constructor(private ticketService: TicketService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.ticketService.getTicket().pipe(
      mapTo(true),
      catchError(() => of(this.router.createUrlTree(['/login'])))
    );
  }
}
