import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Client } from 'src/app/models/Client';
import { Reservation } from 'src/app/models/Reservation';
import { ClientService } from 'src/app/Services/Client/client.service';
import { ReservationService } from 'src/app/Services/Reservation/reservation.service';

@Component({
  selector: 'app-gestion-reservations',
  templateUrl: './gestion-reservations.component.html',
  styleUrls: ['./gestion-reservations.component.css']
})
export class GestionReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  client: Client | null = null;
  newReservation: Reservation = {
    id: 0, dateDebut: '', dateFin: '', localisation: '', message: '', status: '',
    client: { id: 0, nom: '', prenom: '', email: '', telephone: '', motdepasse: '', address: '' },
    voiture: {
      id: 0,
      immatriculation: '',
      marque: '',
      prix: 0,
      couleur: '',
      categorie: '',
      garantie: 0,
      nomPhotoVoiture: '',
      estDisponible: false,
      typePhotoVoiture: '', // Ajoutez ceci
      photoVoiture: new Uint8Array() // Ajoutez ceci, ou utilisez une chaîne vide selon le type attendu
    }

  };

  tempReservation: Reservation | null = null;
  selectedReservation: Reservation | null = null;
  page: number = 1;
  itemsPerPage: number = 4;

  // updateform: Reservation;

  constructor(private reservationService: ReservationService, private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadReservation();
    this.loadClient();
  }

  //  ********************************************************************** load **********************************************************************

  loadClient(): void {
    this.clientService.getClientById(1).subscribe(
      data => {
        this.client = data;
      },
      error => {
        console.error('Error fetching reservations', error);
      }
    );
  }

  loadReservation(): void {
    this.reservationService.getAllRentals().subscribe({
      next: (response) => {
        // Filter reservations where client.id is 1
        this.reservations = response.filter(reservation => reservation.client.id === 1);
        console.log('Filtered Reservations for client 1:', this.reservations); // Log data to check
      },
      error: (err) => console.error('Erreur lors de la récupération des reservations:', err)
    });
  }


  //  ********************************************************************** consulting **********************************************************************
  consultingReservation(reservation: Reservation): void {
    this.selectedReservation = reservation;
    const consultModalElement = document.getElementById('consultingReservationModal');
    if (consultModalElement) {
      const consultModal = new bootstrap.Modal(consultModalElement);
      consultModal.show();
    }
  }
  closeConsultModal(): void {
    const consultModalElement = document.getElementById('consultingReservationModal');
    if (consultModalElement) {
      const consultModal = bootstrap.Modal.getInstance(consultModalElement);
      consultModal?.hide();
    }
  }

  //  ********************************************************************** deleting **********************************************************************
  openDeleteModal(reservation: Reservation): void {
    this.selectedReservation = reservation;
    const deleteModalElement = document.getElementById('deleteReservationModal');
    if (deleteModalElement) {
      const deleteModal = new bootstrap.Modal(deleteModalElement);
      deleteModal.show();
    }
  }
  closeDeleteModal(): void {
    const deleteModalElement = document.getElementById('deleteReservationModal');
    if (deleteModalElement) {
      const deleteModal = bootstrap.Modal.getInstance(deleteModalElement);
      deleteModal?.hide();
    }
  }
  deletevoiture(id?: number): void {
    if (id != null) {
      this.reservationService.deleteRental(id).subscribe({
        next: (response) => {
          console.log('Response from server:', response);
          this.loadReservation();
          this.closeDeleteModal();
        }
      });
    } else {
      console.error('ID témoignage est undefined');
    }
  }
  //  ********************************************************************** update **********************************************************************
  openUpdateModal(reservation: Reservation): void {
    this.selectedReservation = { ...reservation };
    const updateModalElement = document.getElementById('updateReservationModal');
    if (updateModalElement) {
      const updateModal = new bootstrap.Modal(updateModalElement);
      updateModal.show();
    }
  }

  closeUpdateModal(): void {
    const updateModalElement = document.getElementById('updateReservationModal');
    if (updateModalElement) {
      const updateModal = bootstrap.Modal.getInstance(updateModalElement);
      updateModal?.hide();
    }
  }

  updateReservation(form: NgForm): void {
    if (form.valid && this.selectedReservation) {
      const idClient: number = this.selectedReservation.client.id;
      const idVoiture: number = this.selectedReservation.voiture.id;
      console.log('Updating reservation with data:', this.selectedReservation);
      this.reservationService.updateRental(this.selectedReservation, idClient, idVoiture, this.selectedReservation.id)
        .subscribe({
          next: () => {
            this.loadReservation();
            this.loadClient();
            this.closeUpdateModal();
          },
          error: (err) => console.error('Erreur lors de la mise à jour de la réservation:', err)
        });
    }
  }
  //  ********************************************************************** pagination **********************************************************************
  get paginatedReservations(): Reservation[] {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.reservations.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.reservations.length / this.itemsPerPage);
  }

  get isPreviousPageDisabled(): boolean {
    return this.page === 1;
  }

  get isNextPageDisabled(): boolean {
    return this.page === this.totalPages;
  }

  goToNextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  goToPreviousPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }

}
