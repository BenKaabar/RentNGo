import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Voiture } from 'src/app/models/Voiture';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {
  private baseUrl = 'http://localhost:9798/voiture';

  constructor(private http: HttpClient) { }

  getAllCars(): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(`${this.baseUrl}/all`).pipe(
      catchError(error => {
        console.error('Une erreur est survenue', error);
        return throwError(error);
      })
    );
  }

  getCarById(id: number): Observable<Voiture> {
    return this.http.get<Voiture>(`${this.baseUrl}/${id}`);
  }



  addCar(voiture: Voiture, photoVoiture: File): Observable<any> {
    const formData = new FormData();

    // Append voitureDTO as a JSON string
    formData.append('voitureDTO', JSON.stringify(voiture));
    // Append the file
    formData.append('photoVoiture', photoVoiture);
    formData.forEach((value, key) => {
      if (value instanceof File) {
        console.log(`Key: ${key}, File Name: ${value.name}, Size: ${value.size}`);
      } else {
        console.log(`Key: ${key}, Value:`, value);
      }
    });
    return this.http.post(`${this.baseUrl}/add`, formData);

  }



  updateCar(voiture: Voiture, photoVoiture: File, id: number): Observable<any> {  // Utilisez Observable<any> si la réponse n'est pas un Voiture
    const formData = new FormData();
    // Append voitureDTO as a JSON string
    formData.append('voitureDTO', JSON.stringify(voiture));
    // Append the file
    formData.append('photoVoiture', photoVoiture);
    formData.forEach((value, key) => {
      if (value instanceof File) {
        console.log(`Key: ${key}, File Name: ${value.name}, Size: ${value.size}`);
      } else {
        console.log(`Key: ${key}, Value:`, value);
      }
    });
    return this.http.put(`${this.baseUrl}/update/${id}`, formData, {
      headers: { 'Accept': 'text/plain' },  // Accepter le texte si le backend ne renvoie pas de JSON
      responseType: 'text'  // Indiquez à Angular d'attendre une réponse texte
    });
  }


  deleteCar(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Une erreur est survenue:', error.message);
    return throwError(() => new Error('Erreur lors de la demande de données.'));
  }
}
