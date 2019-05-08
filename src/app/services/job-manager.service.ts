import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export class JobManagerService {
  constructor(private baseUrlService: BaseUrlService, private http: HttpClient) {}

  startJob(noteId: string) {
    return this.http.post(`${this.baseUrlService.getRestApiBase()}/notebook/job/${noteId}`, {});
  }

  stopJob(noteId: string) {
    return this.http.delete(`${this.baseUrlService.getRestApiBase()}/notebook/job/${noteId}`, {});
  }
}
