import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationDataService } from 'src/app/Services/ReservationDataService/reservation-data.service';

@Component({
  selector: 'app-etape3',
  templateUrl: './etape3.component.html',
  styleUrls: ['./etape3.component.css']
})
export class Etape3Component implements OnInit {
  reservationDetails: any = {};  // Initialize with an empty object
  numberOfDays: number | null = null;
  totalPrice: number | null = null;

  constructor(private router: Router, private reservationDataService: ReservationDataService) { }

  ngOnInit(): void {
    // Retrieve reservation details, number of days, and total price from the service
    this.reservationDetails = this.reservationDataService.getReservationDetails();
    this.numberOfDays = this.reservationDataService.getNumberOfDays();
    this.totalPrice = this.reservationDataService.getTotalPrice();

    if (!this.reservationDetails) {
      console.error('No reservation details found');
    }
  }


  goToHomePage(): void {
    this.reservationDataService.clearReservationDetails();
    this.router.navigate(['/Accueil']);
  }
}
