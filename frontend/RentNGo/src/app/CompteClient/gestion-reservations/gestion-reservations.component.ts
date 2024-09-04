import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Client } from 'src/app/models/Client';
import { Reservation } from 'src/app/models/Reservation';
import { Voiture } from 'src/app/models/Voiture';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ClientService } from 'src/app/Services/Client/client.service';
import { ReservationService } from 'src/app/Services/Reservation/reservation.service';
import { VoitureService } from 'src/app/Services/Voiture/voiture.service';

@Component({
  selector: 'app-gestion-reservations',
  templateUrl: './gestion-reservations.component.html',
  styleUrls: ['./gestion-reservations.component.css']
})
export class GestionReservationsComponent implements OnInit {
  reservations: any[] = [];
  client: Client | null = null;
  errorMessage: string = '';
  voitures: any;
  baseUrl: string = 'data:image/jpeg;base64,';
  selectedFile: File | null = null;
  currentClient?: Client | null = null;
  newReservation: Reservation = {
    id: 0, dateDebut: '', dateFin: '', localisation: '', message: '', status: '',
    client: { id: 0, nom: '', prenom: '', email: '', telephone: '', motDePasse: '', address: '' },
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

  constructor(private reservationService: ReservationService, private authService: AuthService, private clientService: ClientService, private voitureService: VoitureService) { }

  ngOnInit(): void {
    this.authService.currentClient.subscribe(client => {
      this.currentClient = client;
      this.loadVoiture();// Ensure client data is loaded after the current client is set
      this.loadReservation();
      this.loadClient();

    });

  }

  //  ********************************************************************** load **********************************************************************

  loadClient(): void {
    if (this.currentClient && this.currentClient.id !== undefined) {
      this.clientService.getClientById(this.currentClient.id).subscribe({
        next: (response) => {
          this.client = response;
          console.log('Client:', this.client); // Log data to check
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la récupération des informations du client.';
          console.error('Erreur lors de la récupération des informations du client:', err);
        }
      });
    } else {
      this.errorMessage = 'Client ID is not available.';
      console.error('Client ID is not available.');
    }
  }

  loadVoiture(): void {
    this.voitureService.getAllCars().subscribe(
      (response: Voiture[]) => {
        this.voitures = response.map(voiture => ({
          ...voiture,
          photoVoiture: this.baseUrl + voiture.photoVoiture // Prepend the base URL to the base64 string
        }));
        console.log('Voitures loaded:', this.voitures);
      },
      (error) => {
        console.error('Error loading voitures:', error);
      }
    );
  }

  // loadReservation(): void {
  //   this.reservationService.getAllRentals().subscribe(
  //     (response: Reservation[]) => {
  //       this.reservations = response.map(reservation => ({
  //         ...reservation,
  //         voiture: {
  //           ...reservation.voiture,
  //           photoVoiture: this.baseUrl + reservation.voiture.photoVoiture // Prepend the base URL to the base64 string for voiture images
  //         }
  //       }));
  //       console.log('Reservations loaded:', this.reservations);
  //     },
  //     (error) => {
  //       console.error('Error loading reservations:', error);
  //     }
  //   );
  // }
  loadReservation(): void {
    this.reservationService.getAllRentals().subscribe(
      (response: Reservation[]) => {
        // Filter the reservations by the current client's ID
        this.reservations = response
          .filter(reservation => reservation.client.id === this.currentClient?.id) // Filter by current client ID
          .map(reservation => ({
            ...reservation,
            voiture: {
              ...reservation.voiture,
              photoVoiture: this.baseUrl + reservation.voiture.photoVoiture // Prepend the base URL to the photo
            }
          }));

        console.log('Filtered reservations for current client:', this.reservations);
      },
      (error) => {
        console.error('Error loading reservations:', error);
      }
    );
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
    if (form.valid && this.selectedReservation && this.currentClient?.id != null) {
      const idVoiture: number = this.selectedReservation.voiture.id;
      console.log('Updating reservation with data:', this.selectedReservation);
      this.reservationService.updateRental(this.selectedReservation, this.currentClient?.id, idVoiture, this.selectedReservation.id)
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
