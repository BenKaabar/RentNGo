import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent implements OnInit {
  currentClient?: Client | null = null;
  currentdashboard: string = 'client';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentClient.subscribe(client => {
      this.currentClient = client;
    });
  }

  navigateTo(dashboard: string) {
    this.currentdashboard = dashboard;
  }

  logout() {
    this.authService.logout();
    console.log("Client logged out successfully");
  }
}