import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http:HttpClient) { }
  
  generateOTP(formData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/generateOTP`, formData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error.message;
    }
    console.error('Error:', errorMessage);
    return throwError(()=>new Error(errorMessage));
  }
}
