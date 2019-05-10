import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityUserList } from 'zeppelin-interfaces';
import { BaseUrlService } from './base-url.service';
import { BaseRest } from './base-rest';

@Injectable({
  providedIn: 'root'
})
export class SecurityService extends BaseRest {
  constructor(baseUrlService: BaseUrlService, private http: HttpClient) {
    super(baseUrlService);
  }

  searchUsers(term: string) {
    return this.http.get<SecurityUserList>(this.restUrl`/security/userlist/${term}`);
  }
}
