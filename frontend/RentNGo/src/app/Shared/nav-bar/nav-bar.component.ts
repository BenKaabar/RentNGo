import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { Admin } from 'src/app/models/Admin';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentClient: Client | null = null;
  currentAdmin: Admin | null = null;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Subscribe to the current client observable
    this.authService.currentClient.subscribe((client) => {
      if (client != null) {
        this.currentClient = client;
        console.log('client ' + client + " " + this.currentClient);
      }
    });

    // Subscribe to the current admin observable
    this.authService.currentAdmin.subscribe((admin) => {
      if (admin != null) {
        this.currentAdmin = admin;
        console.log('admin ' + admin + " " + this.currentAdmin);
      }
    });

    // Fetch the current admin from localStorage if the app is reloaded or a session exists
    const newadmin = this.authService.getAdmin();
    if (newadmin != null) {
      this.currentAdmin = newadmin;
    } else {
      console.log('newadmin null');
    }

    // Fetch the current client from localStorage if the app is reloaded or a session exists
    if (!this.currentClient) {
      const clientFromStorage = this.authService.getClient();
      console.log('clientFromStorage ' + clientFromStorage);
      if (clientFromStorage) {
        this.currentClient = clientFromStorage;
      } else {
        console.log('No client found in storage');
      }
    }
  }

  dashboardClient(): void {
    this.router.navigate(['/client']);
  }

  dashboardAdmin(): void {
    this.router.navigate(['/admin']);
  }
}
