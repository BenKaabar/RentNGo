// etape2.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VoitureService } from 'src/app/Services/Voiture/voiture.service';
import { ReservationService } from 'src/app/Services/Reservation/reservation.service';
import { Client } from 'src/app/models/Client';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ReservationDataService } from 'src/app/Services/ReservationDataService/reservation-data.service';

@Component({
  selector: 'app-etape2',
  templateUrl: './etape2.component.html',
  styleUrls: ['./etape2.component.css']
})
export class Etape2Component implements OnInit {
  voiture: any;
  reservationForm: FormGroup;
  photoVoitureBase64: string | undefined;
  carId: number | null = null;
  baseUrl: string = 'data:image/jpeg;base64,';
  currentClient?: Client | null = null;
  numberOfDays: number | null = null;
  totalPrice: number | null = null;
  constructor(
    private voitureService: VoitureService,
    private reservationService: ReservationService,
    private authService: AuthService,
    private router: Router,
    private reservationDataService: ReservationDataService,
    private fb: FormBuilder
  ) {
    this.reservationForm = this.fb.group({
      conditionsGenerales: [false, Validators.requiredTrue],
      conditionsAnnulation: [false, Validators.requiredTrue],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      Message: ['', Validators.required],
      Lieu: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.currentClient.subscribe(client => {
      this.currentClient = client;
      const navigation = history.state;
      // console.log("navigation " + navigation);
      if (navigation && navigation.carId) {
        this.carId = navigation.carId as number;
        this.loadVoitureById(this.carId); // Load the car data based on the carId
      } else {
        console.error('No carId found in navigation state');
      }
      // Subscribe to value changes to calculate days and total price dynamically
      this.reservationForm.valueChanges.subscribe(() => {
        this.calculateDaysDifference();
        this.calculateTotalPrice();
      });

    });

  }

  loadVoitureById(id: number): void {
    this.voitureService.getCarById(id).subscribe(data => {
      this.voiture = {
        ...data,
        photoVoiture: this.baseUrl + data.photoVoiture
      };
    });
  }

  createReservation(): void {
    if (this.reservationForm.valid && this.voiture && this.currentClient?.id != null) {
      const idVoiture: number = this.voiture.id;
      const dateDebut = new Date(this.reservationForm.get('dateDebut')?.value);
      const dateFin = new Date(this.reservationForm.get('dateFin')?.value);
      const timeDiff = Math.abs(dateFin.getTime() - dateDebut.getTime());
      const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const totalPrice = numberOfDays * this.voiture.prix;

      const newReservation = {
        id: 0,
        dateDebut: this.reservationForm.get('dateDebut')?.value,
        dateFin: this.reservationForm.get('dateFin')?.value,
        localisation: this.reservationForm.get('Lieu')?.value,
        message: this.reservationForm.get('Message')?.value,
        status: 'EN_ATTENTE',
        client: { id: this.currentClient?.id, nom: this.currentClient?.nom, prenom: this.currentClient?.prenom, email: this.currentClient?.email, telephone: this.currentClient?.telephone, motDePasse: '', address: '' },
        voiture: this.voiture
      };

      // Store the reservation details
      this.reservationDataService.setReservationDetails(newReservation);
      this.reservationDataService.setNumberOfDays(numberOfDays);
      this.reservationDataService.setTotalPrice(totalPrice);
      this.reservationService.addRental(newReservation, this.currentClient?.id, idVoiture).subscribe({
        next: () => {
          console.log('Reservation added successfully');
          this.router.navigate(['/Reservation/etape3']);
        },
        error: (err) => console.error('Error adding reservation:', err)
      });
    } else {
      console.error('Form is invalid or voiture is not defined.');
    }
  }


  convertUint8ArrayToBase64(uint8Array: Uint8Array): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const binaryString = Array.from(uint8Array).map(byte => String.fromCharCode(byte)).join('');
        const base64String = btoa(binaryString);
        resolve(base64String);
      } catch (error) {
        reject(error);
      }
    });
  }

  calculateDaysDifference(): void {
    const dateDebut = this.reservationForm.get('dateDebut')?.value;
    const dateFin = this.reservationForm.get('dateFin')?.value;

    if (dateDebut && dateFin) {
      const start = new Date(dateDebut);
      const end = new Date(dateFin);
      const timeDiff = end.getTime() - start.getTime();
      console.log("Time Difference (ms):", timeDiff);

      if (timeDiff < 0) {
        console.error('End date must be after start date.');
        this.numberOfDays = 0;
      } else {
        this.numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      }
    } else {
      this.numberOfDays = null;
    }
  }

  calculateTotalPrice(): void {
    const dateDebut = this.reservationForm.get('dateDebut')?.value;
    const dateFin = this.reservationForm.get('dateFin')?.value;

    console.log('Date Debut:', dateDebut);
    console.log('Date Fin:', dateFin);

    if (dateDebut && dateFin) {
      const startDate = new Date(dateDebut);
      const endDate = new Date(dateFin);

      // Ensure startDate is before endDate
      if (startDate <= endDate) {
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        this.numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        // Calculate total price
        this.totalPrice = this.numberOfDays * this.voiture.prix;
        console.log('Number of Days:', this.numberOfDays);
        console.log('Total Price:', this.totalPrice);
      } else {
        // If start date is after end date, set defaults or show error
        this.numberOfDays = 0;
        this.totalPrice = 0;
        console.error('End date must be after start date.');
      }
    } else {
      this.numberOfDays = null;
      this.totalPrice = null;
    }
  }

}
