import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  addContact(contact: Contact): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/add`, contact);
  }

  updateContact(id: number, contact: Contact): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/${id}`, contact);
  }

  deleteContact(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`);
  }
}
