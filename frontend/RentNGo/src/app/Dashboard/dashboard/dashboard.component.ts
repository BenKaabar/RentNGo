import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService) { }
  ngOnInit(): void { }

  currentdashboard: string = 'gestion-contact';

  navigateTo(dashboard: string) {
    this.currentdashboard = dashboard;
  }

  logout() {
    this.authService.logoutadmin();
    console.log("Admin logged out successfully");
  }

}
