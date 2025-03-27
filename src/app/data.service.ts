import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://770e-34-56-222-176.ngrok-free.app';

  constructor(private http: HttpClient) {}

  predict(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/predict', payload)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
