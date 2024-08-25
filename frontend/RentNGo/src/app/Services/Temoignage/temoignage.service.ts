import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Temoignage } from 'src/app/models/Temoignage';

@Injectable({
  providedIn: 'root'
})
export class TemoignageService {
  private apiUrl = 'http://localhost:9798/temoignage'; // URL de l'API

  constructor(private http: HttpClient) { }

  getAllTemoignages(): Observable<Temoignage[]> {
    return this.http.get<Temoignage[]>(`${this.apiUrl}/all`);
  }

  getTemoignageById(id: number): Observable<Temoignage> {
    return this.http.get<Temoignage>(`${this.apiUrl}/ById/${id}`);
  }
  
  addTemoignage(idClient: number, temoignageRequestDTO: any): Observable<Temoignage> {
    let params = new HttpParams().set('idClient', idClient.toString());
    return this.http.post<Temoignage>(`${this.apiUrl}/add`, temoignageRequestDTO, { params });
  }
  

  deleteTemoignage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  
}