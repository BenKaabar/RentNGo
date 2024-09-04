import { Temoignage } from './../../models/Temoignage';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Client } from 'src/app/models/Client';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ClientService } from 'src/app/Services/Client/client.service';
import { TemoignageService } from 'src/app/Services/Temoignage/temoignage.service';

@Component({
  selector: 'app-gestion-temoignage',
  templateUrl: './gestion-temoignage.component.html',
  styleUrls: ['./gestion-temoignage.component.css']
})
export class GestionTemoignageComponent {
  temoignages: Temoignage[] = [];
  client: Client | null = null;
  selectedTemoignage: Temoignage | null = null;
  currentClient?: Client | null = null;
  errorMessage: string = '';
  newTemoignage: Temoignage = {
    id: 0,
    messageTemoignage: '',
    dateTemoignage: '',
    client: { id: 0, nom: '', prenom: '', email: '', telephone: '', motDePasse: '', address: '' }
  };
  page: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private temoignageService: TemoignageService,
    private clientService: ClientService, private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentClient.subscribe(client => {
      this.currentClient = client;
      this.loadTemoignages();
      this.loadClients();

    });
  }

  //  ********************************************************************** load **********************************************************************
  loadTemoignages(): void {
    if (this.currentClient && this.currentClient.id !== undefined) {
      this.temoignageService.getAllTemoignages().subscribe({
        next: (response) => {
          // Assuming response is an array of testimonials
          this.temoignages = response.filter(temoignage => temoignage.client.id === this.currentClient?.id);
          console.log('Filtered Témoignages for current client:', this.temoignages); // Log data to check
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la récupération des témoignages.';
          console.error('Erreur lors de la récupération des témoignages:', err);
        }
      });
    } else {
      this.errorMessage = 'Client ID is not available.';
      console.error('Client ID is not available.');
    }
  }


  // loadClients(): void {
  //   this.clientService.getClientById(1).subscribe({
  //     next: (response) => this.client = response,
  //     error: (err) => console.error('Erreur lors de la récupération des clients:', err)
  //   });
  // }
  loadClients(): void {
    // Assuming you want to load the current client or all clients
    if (this.currentClient) {
      this.clientService.getClientById(this.currentClient.id).subscribe({
        next: (response) => this.client = response,
        error: (err) => console.error('Erreur lors de la récupération des clients:', err)
      });
    }
  }

  //  ********************************************************************** consulting **********************************************************************
  openConsultModal(temoignage: Temoignage): void {
    this.selectedTemoignage = temoignage;
    const consultModalElement = document.getElementById('staticBackdropconsulter');
    if (consultModalElement) {
      const consultModal = new bootstrap.Modal(consultModalElement);
      consultModal.show();
    }
  }

  closeConsultModal(): void {
    const consultModalElement = document.getElementById('staticBackdropconsulter');
    if (consultModalElement) {
      const consultModal = bootstrap.Modal.getInstance(consultModalElement);
      consultModal?.hide();
    }
  }
  //  ********************************************************************** add **********************************************************************
  openAddModal(): void {
    const addModalElement = document.getElementById('staticBackdropajouter');
    if (addModalElement) {
      const addModal = new bootstrap.Modal(addModalElement);
      addModal.show();
    }
  }

  closeAddModal(): void {
    const addModalElement = document.getElementById('staticBackdropajouter');
    if (addModalElement) {
      const addModal = bootstrap.Modal.getInstance(addModalElement);
      addModal?.hide();
    }
  }

  addTemoignage(form: NgForm): void {
    if (form.valid && this.currentClient != null) {
      this.temoignageService.addTemoignage(this.currentClient?.id, this.newTemoignage).subscribe({
        next: (response: Temoignage) => {
          this.newTemoignage.id = response.id; // Met à jour l'ID après la réponse
          this.loadTemoignages(); // Rafraîchir la liste après l'ajout
          this.closeAddModal(); // Fermer le modal après l'ajout
          console.log('Témoignage ajouté avec succès', response);
        },
        error: (err) => console.error('Erreur lors de l\'ajout du témoignage:', err)
      });
    }
  }

  //  ********************************************************************** delete **********************************************************************
  openDeleteModal(temoignage: Temoignage): void {
    this.selectedTemoignage = temoignage;
    const deleteModalElement = document.getElementById('staticBackdropsupprimer');
    if (deleteModalElement) {
      const deleteModal = new bootstrap.Modal(deleteModalElement);
      deleteModal.show();
    }
  }

  closeDeleteModal(): void {
    const deleteModalElement = document.getElementById('staticBackdropsupprimer');
    if (deleteModalElement) {
      const deleteModal = bootstrap.Modal.getInstance(deleteModalElement);
      deleteModal?.hide();
    }
  }

  deleteTemoignage(id?: number): void {
    if (id != null) {
      this.temoignageService.deleteTemoignage(id).subscribe({
        next: () => {
          this.loadTemoignages();
          this.closeDeleteModal();
        }
      });
    } else {
      console.error('ID témoignage est undefined');
    }
  }
  //  ********************************************************************** truncateMessage **********************************************************************
  truncateMessage(message: string, length: number = 50): string {
    return message.length > length ? message.substring(0, length) + '...' : message;
  }
  //  ********************************************************************** pagination **********************************************************************
  get paginatedtemoignages(): Temoignage[] {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.temoignages.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.temoignages.length / this.itemsPerPage);
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
