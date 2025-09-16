import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EspnService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getScoreboard(week: number = 3, year: number = 2025): Observable<any> {
    const url = `${this.apiUrl}/scoreboard?week=${week}&year=${year}`;
    console.log('Making request to:', url);
    return this.http.get(url);
  }
}
