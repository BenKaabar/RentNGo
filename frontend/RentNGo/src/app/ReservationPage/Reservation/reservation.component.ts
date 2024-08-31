import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoitureService } from 'src/app/Services/Voiture/voiture.service';
import { Voiture } from 'src/app/models/Voiture'; // Import your Voiture model

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  carId?: number;
  selectedCar: Voiture | null = null; // Ensure the type is Voiture

  // Switch state and quantity
  isChecked: boolean = false;
  quantity: number = 1;

  // Current reservation step
  currentreservation: string = 'etape2';

  constructor(
    private route: ActivatedRoute,
    private voitureService: VoitureService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get the car ID from the URL
    this.carId = +(this.route.snapshot.paramMap.get('id') || 0);

    // Load car details if ID is available
    if (this.carId) {
      this.loadCarDetails();
    }
  }

  loadCarDetails(): void {
    if (this.carId) {
      this.voitureService.getCarById(this.carId).subscribe({
        next: (car: Voiture) => {
          this.selectedCar = car;
        },
        error: (err) => {
          console.error('Error loading car details:', err);
        }
      });
    }
  }

  onSwitchChange(): void {
    console.log(`Switch is now: ${this.isChecked ? 'On' : 'Off'}`);
  }

  navigateTo(reservation: string): void {
    this.currentreservation = reservation;

    // Navigate to the respective step
    if (reservation === 'etape2') {
      this.router.navigate(['/Reservation/etape2', this.carId]);
    } else if (reservation === 'etape3') {
      this.router.navigate(['/Reservation/etape3']);
    }
  }
}
