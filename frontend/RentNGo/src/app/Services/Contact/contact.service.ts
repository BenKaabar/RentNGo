import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://localhost:9798/contact'; 

  constructor(private http: HttpClient) { }

  getAllContact(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/all`);
  }

  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/by/${id}`);
  }

  addContact(idClient: number, contact: Contact): Observable<Contact> {
    let params = new HttpParams().set('idClient', idClient.toString());
    return this.http.post<Contact>(`${this.apiUrl}/add`, contact, { params });
  }


  updateContact(contact: { email: string; message: string }, id: number,  idClient: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/${id}?idClient=${idClient}`, contact);
  }
  

  deleteContact(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }
  
}
