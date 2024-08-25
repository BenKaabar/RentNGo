import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reservation } from 'src/app/models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:9798/reservation';

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer toutes les réservations
  getAllRentals(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/all`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Méthode pour récupérer une réservation par ID
  getRentalById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/by/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Méthode pour ajouter une nouvelle réservation
  // addRental(reservation: Reservation, idClient: number, idVoiture: number): Observable<Reservation> {
  //   // Ajoutez les paramètres à l'URL
  //   const params = new HttpParams()
  //     .set('idClient', idClient.toString())
  //     .set('idVoiture', idVoiture.toString());

  //   // Envoyez la requête POST avec les paramètres
  //   return this.http.post<Reservation>(`${this.apiUrl}/add`, reservation, { params });
  // }
  addRental(reservation: Reservation, idClient: number, idVoiture: number): Observable<any> {
    // Create the query parameters
    let params = new HttpParams()
      .set('idClient', idClient.toString())
      .set('idVoiture', idVoiture.toString());

    // Use backticks for the URL and send reservation as the body
    return this.http.post(`${this.apiUrl}/add`, reservation, { params, responseType: 'text' });
  }



  updateRental(reservation: Reservation, idClient: number, idVoiture: number, id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}?id_client=${idClient}&id_voiture=${idVoiture}`, reservation);
  }



  // Méthode pour supprimer une réservation par ID
  deleteRental(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Méthode de gestion des erreurs
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
