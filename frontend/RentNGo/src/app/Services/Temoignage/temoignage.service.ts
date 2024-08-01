import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Temoignage } from 'src/app/models/Temoignage';

@Injectable({
  providedIn: 'root'
})
export class TemoignageService {
  private baseUrl = 'http://localhost:9798/temoignage'; // URL de l'API

  constructor(private http: HttpClient) { }

  getAllTemoignage(): Observable<Temoignage[]> {
    return this.http.get<Temoignage[]>(`${this.baseUrl}/all`);
  }

  getTemoignageById(id: number): Observable<Temoignage> {
    return this.http.get<Temoignage>(`${this.baseUrl}/ById/${id}`);
  }

  createTemoignage(temoignage: Temoignage): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/add`, temoignage);
  }

  deleteTemoignage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
