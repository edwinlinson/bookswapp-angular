import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgorService {

  constructor(private http:HttpClient) { }
  private baseUrl = 'http://localhost:8080/auth';

  fetchUserDetails(email: string): Observable<any> {
    console.log('email id is: ',email);
    const payload = { email: email };
    return this.http.post(`${this.baseUrl}/fetchUserDetails`, payload);
  }

  generateOTP(email: string): Observable<any> {
    console.log('in generate otp method of service')
    return this.http.post<any>(`${this.baseUrl}/generateOTPF`, email);
  }

}
