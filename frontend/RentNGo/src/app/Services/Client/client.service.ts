import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Client } from 'src/app/models/Client';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:9798/client'; // URL de l'API

  constructor(private http: HttpClient) { }

  // Get all clients
  getAllClient(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/all`).pipe(
      catchError(this.handleError)
    );
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/by/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  

  // Update client
  updateClient(client: Client, id: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/update/${id}`, client, {
      responseType: 'text' as 'json'  // Indicate that the response is plain text
    }).pipe(
      catchError(this.handleError)
    );
  }


  // Add new client
  addClient(client: Client): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/add`, client, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'  // Indicate the response is plain text
    }).pipe(
      catchError(this.handleError)
    );
  }


  // Delete client by ID
  deleteClientById(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`, { responseType: 'text' as 'json' }).pipe(
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
