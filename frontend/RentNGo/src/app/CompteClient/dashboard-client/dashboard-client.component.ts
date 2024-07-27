import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent {

  currentdashboard: string = 'compte-client';

  navigateTo(dashboard: string) {
    this.currentdashboard = dashboard;
  }
}