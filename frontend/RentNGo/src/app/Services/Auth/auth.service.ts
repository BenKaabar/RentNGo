import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:9798';

  constructor(private http: HttpClient, private router: Router) { }


  loginAsAdmin(username: string, motDePasse: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/login`, { username, motDePasse });
  }

  loginAsClient(email: string, motDePasse: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/client/login `, { email, motDePasse });
  }

  // Déconnexion (sans utiliser Spring Security)
  logout(): void {
    // Supprimer les données de session ou localStorage
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
  }
}
