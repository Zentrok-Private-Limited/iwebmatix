import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VisitService {
  private baseURL = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Log visit (called once per session)
  logVisit(): Observable<any> {
    return this.http.post(`${this.baseURL}/visit`, { ip: 'auto' });
  }

  subscribeEmail(email: string): Observable<any> {
    return this.http.post(`${this.baseURL}/subscribe`, { email });
  }
}
