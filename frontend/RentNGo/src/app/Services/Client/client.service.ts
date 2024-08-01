import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:9798/client'; // URL de l'API

  constructor(private http: HttpClient) { }

  getAllClient(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/all`);
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/ById/${id}`);
  }

  updateClient(client: Client, id: number): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/update/${id}`, client);
  }

  addClient(client: Client): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/add`, client);
  }

  deleteClientById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
