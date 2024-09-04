import { Reservation } from './../../models/Reservation';
import { VoitureService } from 'src/app/Services/Voiture/voiture.service';
import { ClientService } from 'src/app/Services/Client/client.service';
import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/Services/Reservation/reservation.service';
import { Client } from 'src/app/models/Client';
import { Voiture } from 'src/app/models/Voiture';
import * as bootstrap from 'bootstrap';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-gestion-reservation',
  templateUrl: './gestion-reservation.component.html',
  styleUrls: ['./gestion-reservation.component.css']
})
export class GestionReservationComponent implements OnInit {
  reservations: any[] = [];
  clients: Client[] = [];
  voitures: any;
  baseUrl: string = 'data:image/jpeg;base64,';
  selectedFile: File | null = null;
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
  selectedVoiture: Voiture | null = null;
  page: number = 1;
  itemsPerPage: number = 5;

  constructor(private reservationService: ReservationService, private clientService: ClientService, private voitureService: VoitureService) { }

  ngOnInit(): void {
    this.loadReservation();
    this.loadClient();
    this.loadVoiture();
  }

  //  ********************************************************************** load **********************************************************************

  loadClient(): void {
    this.clientService.getAllClient().subscribe(
      data => {
        this.clients = data;
      },
      error => {
        console.error('Error fetching reservations', error);
      }
    );
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

  loadReservation(): void {
    this.reservationService.getAllRentals().subscribe(
      (response: Reservation[]) => {
        this.reservations = response.map(reservation => ({
          ...reservation,
          voiture: {
            ...reservation.voiture,
            photoVoiture: this.baseUrl + reservation.voiture.photoVoiture // Prepend the base URL to the base64 string for voiture images
          }
        }));
        console.log('Reservations loaded:', this.reservations);
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

  // **************************************************************** create ********************************************************************************
  openCreateModal(): void {
    const addModalElement = document.getElementById('createModal');
    if (addModalElement) {
      const addModal = new bootstrap.Modal(addModalElement);
      addModal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  closeCreateModal(): void {
    const addModalElement = document.getElementById('createModal');
    if (addModalElement) {
      const addModal = bootstrap.Modal.getInstance(addModalElement);
      addModal?.hide();
    }
  }
  createReservation(form: NgForm): void {
    if (form.valid) {
      const idClient: number = this.newReservation.client.id;
      const idVoiture: number = this.newReservation.voiture.id;
      this.newReservation.status = 'EN_ATTENTE';
      this.reservationService.addRental(this.newReservation, idClient, idVoiture).subscribe({
        next: () => {
          this.loadReservation();
          this.closeCreateModal();
        },
        error: (err) => console.error('Erreur lors de l\'ajout de la réservation:', err)
      });
    } else {
      console.error('Formulaire invalide ou données manquantes.');
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
            this.loadVoiture();
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

  //  ********************************************************************** pagination **********************************************************************
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        console.error('Ce fichier n\'est pas une image.');
        return;
      }
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1];
        if (base64String) {
          const byteArray = this.base64ToUint8Array(base64String);
          this.voitures.photoVoiture = byteArray;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  base64ToUint8Array(base64: string): Uint8Array {
    const byteCharacters = atob(base64);
    const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
    return new Uint8Array(byteNumbers);
  }

}
