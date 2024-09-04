import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Client } from 'src/app/models/Client';
import { Admin } from 'src/app/models/Admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:9798';
  private admin: any;
  // Client behavior subject and observable
  private currentClientSubject: BehaviorSubject<Client | null> = new BehaviorSubject<Client | null>(null);
  public currentClient: Observable<Client | null> = this.currentClientSubject.asObservable();

  // Admin behavior subject and observable
  private currentAdminSubject: BehaviorSubject<Admin | null> = new BehaviorSubject<Admin | null>(null);
  public currentAdmin: Observable<Admin | null> = this.currentAdminSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Initialize subjects from local storage
    this.initializeSubjects();
  }

  private initializeSubjects(): void {
    const adminFromStorage = localStorage.getItem('currentAdmin');
    if (adminFromStorage) {
      this.currentAdminSubject.next(JSON.parse(adminFromStorage) as Admin);
    }

    const clientFromStorage = localStorage.getItem('currentClient') || sessionStorage.getItem('currentClient');
    if (clientFromStorage) {
      this.currentClientSubject.next(JSON.parse(clientFromStorage) as Client);
    }
  }

  // **************************************************** admin ****************************************************
  loginAdmin(username: string, motdepasse: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/admin/login`, { username, motdepasse }, { responseType: 'text' as 'json' })
      .pipe(
        tap((response: string) => {
          try {
            // Log raw response for debugging
            console.log('Raw response:', response);

            // Check if response is a JSON string or a simple message
            if (response.startsWith("{") && response.endsWith("}")) {
              console.log("reponseeeee " + response);
              const admin: Admin = JSON.parse(response);
              console.log("adminnnnnn " + admin.username);
              this.setAdmin(admin); // Store admin data

              console.log("adminzzzz " + this.getAdmin);
            } else {
              console.log('Response is not JSON, message:', response);
              // Handle the case where response is a message
            }
          } catch (e) {
            console.error('Error parsing admin data:', e);
          }
        })
      );
  }




  // setAdmin(admin: Admin): void {
  //   this.currentAdminSubject.next(admin);
  //   localStorage.setItem('currentAdmin', JSON.stringify(admin)); // Store admin in localStorage
  // }
  setAdmin(admin: Admin) {
    this.currentAdminSubject.next(admin);
    localStorage.setItem('admin', JSON.stringify(admin));
  }


  getAdmin(): Admin | null {
    return this.currentAdminSubject.value;
  }

  logoutadmin(): void {
    this.http.get(`${this.baseUrl}/admin/logout`, { responseType: 'text' })
      .subscribe(
        () => {
          localStorage.removeItem('currentAdmin');
          sessionStorage.removeItem('currentAdmin');
          this.currentAdminSubject.next(null); // Clear currentAdmin
          this.router.navigate(['/SignInAdmin']);
        },
        (error) => {
          console.error('Error during logout:', error);
        }
      );
  }

  // **************************************************** client ****************************************************
  loginClient(email: string, motDePasse: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/client/login`, { email, motDePasse }, { responseType: 'text' as 'json' })
      .pipe(
        tap((response: string) => {
          try {
            const client: Client = JSON.parse(response); // Assuming response is Client data in JSON format
            this.setClient(client); // Store client data
          } catch (e) {
            console.error('Error parsing client data:', e);
          }
        })
      );
  }

  setClient(client: Client): void {
    this.currentClientSubject.next(client);
    localStorage.setItem('currentClient', JSON.stringify(client)); // Store client in localStorage
  }

  getClient(): Client | null {
    return this.currentClientSubject.value;
  }

  logout(): void {
    this.http.get(`${this.baseUrl}/client/logout`, { responseType: 'text' })
      .subscribe(
        () => {
          localStorage.removeItem('currentClient');
          sessionStorage.removeItem('currentClient');
          this.currentClientSubject.next(null); // Clear currentClient
          this.router.navigate(['/SignIn']);
        },
        (error) => {
          console.error('Error during logout:', error);
        }
      );
  }

  // **************************************************** Common Methods ****************************************************

  // Check if the admin is logged in
  isAdminLoggedIn(): boolean {
    return !!this.currentAdminSubject.value;
  }

  // Check if the client is logged in
  isClientLoggedIn(): boolean {
    return !!this.currentClientSubject.value;
  }
}
