import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  //condition en switch (oui vert et non )
  isChecked: boolean = false; 
  quantity: number = 1; 

  onSwitchChange() {  
    console.log(`Switch is now: ${this.isChecked ? 'On' : 'Off'}`);  
   
  }   
// les etapes
  currentreservation: string = 'etape2';
  navigateTo(reservation: string) {
    this.currentreservation =reservation;
  }

}
