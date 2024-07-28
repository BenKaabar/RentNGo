import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etape3',
  templateUrl: './etape3.component.html',
  styleUrls: ['./etape3.component.css']
})
export class Etape3Component implements OnInit {
  reservationDetails: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Fetch the reservation details from localStorage or a service
    this.reservationDetails = JSON.parse(localStorage.getItem('reservationDetails') || '{}');
  }

  goToHomePage(): void {
    this.router.navigate(['/home']);
  }
}
