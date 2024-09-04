import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { Admin } from 'src/app/models/Admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:9798/admin'; // URL de l'API

  constructor(private http: HttpClient) { }



  // Add new client
  addAdmin(admin: Admin): Observable<string> {
    console.log('data ' + admin);
    return this.http.post<string>(`${this.baseUrl}/add`, admin, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'  // Indicate the response is plain text
    }).pipe(
      catchError(this.handleError)
    );
  }




  // Handle errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    // Customize the error handling here to return specific details
    return throwError(() => new Error(error.message || 'Something went wrong; please try again later.'));
  }
}
