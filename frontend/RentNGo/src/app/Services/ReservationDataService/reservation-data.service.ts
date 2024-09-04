import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationDataService {
  private reservationDetails: any;
  private numberOfDays: number | null = null;
  private totalPrice: number | null = null;

  setReservationDetails(details: any) {
    this.reservationDetails = details;
  }

  getReservationDetails() {
    return this.reservationDetails;
  }

  setNumberOfDays(days: number) {
    this.numberOfDays = days;
  }

  getNumberOfDays() {
    return this.numberOfDays;
  }

  setTotalPrice(price: number) {
    this.totalPrice = price;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  clearReservationDetails() {
    this.reservationDetails = null;
    this.numberOfDays = null;
    this.totalPrice = null;
  }
}
