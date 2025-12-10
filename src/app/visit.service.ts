import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VisitService {

  private baseURL = 'https://digital-backend-seven.vercel.app/api';

  constructor(private http: HttpClient) {}

  // Visiting user
  logVisit(): Observable<any> {
    return this.http.post(`${this.baseURL}/visitor`, { ip: 'auto' });
  }

  // Correct subscriber API (FIXED)
  subscribeEmail(email: string): Observable<any> {
    return this.http.post(`${this.baseURL}/subscribers`, { email });
  }
}
