import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/Services/Client/client.service';

@Component({
  selector: 'app-gestion-client',
  templateUrl: './gestion-client.component.html',
  styleUrls: ['./gestion-client.component.css']
})
export class GestionClientComponent implements OnInit {
  clients: Client[] = [];
  newClient: Client = { id: 0, nom: '', prenom: '', email: '', telephone: '', motDePasse: '', address: '' };
  selectedClient: Client | null = null;

  paginatedClients: Client[] = [];
  page: number = 1;
  itemsPerPage: number = 5;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadClients();
  }
  //  ********************************************************************** load **********************************************************************
  loadClients(): void {
    this.clientService.getAllClient().subscribe({
      next: (response) => this.clients = response,
      error: (err) => console.error('Erreur lors de la récupération des clients:', err)
    });
  }

  //  ********************************************************************** consulting **********************************************************************
  openConsultModal(client: Client): void {
    this.selectedClient = client;
    const consultModalElement = document.getElementById('consultClientModal');
    if (consultModalElement) {
      const consultModal = new bootstrap.Modal(consultModalElement);
      consultModal.show();
    }
  }

  closeConsultClientModal(): void {
    const consultModalElement = document.getElementById('consultClientModal');
    if (consultModalElement) {
      const consultModal = bootstrap.Modal.getInstance(consultModalElement);
      consultModal?.hide();
    }
  }

  //  ********************************************************************** deleting **********************************************************************
  openDeleteModal(client: Client): void {
    this.selectedClient = client;
    const deleteModalElement = document.getElementById('deleteClientModal');
    if (deleteModalElement) {
      const deleteModal = new bootstrap.Modal(deleteModalElement);
      deleteModal.show();
    }
  }
  closeDeleteClientModal(): void {
    const deleteModalElement = document.getElementById('deleteClientModal');
    if (deleteModalElement) {
      const deleteModal = bootstrap.Modal.getInstance(deleteModalElement);
      deleteModal?.hide();
    }
  }
  deleteClient(id?: number): void {
    if (id != null) {
      console.log('id ' + id)
      this.clientService.deleteClientById(id).subscribe({
        next: (response) => {
          this.loadClients();
          this.closeDeleteClientModal();
        },
        error: (err) => console.error('Erreur lors de la suppression du client:', err)
      });
    } else {
      console.error('ID client est undefined');
    }
  }
  // **************************************************************** create ********************************************************************************
  openCreateModal(): void {
    this.newClient = { id: 0, nom: '', prenom: '', email: '', telephone: '', motDePasse: '', address: '' };
    const createModalElement = document.getElementById('createClientModal');
    if (createModalElement) {
      const createModal = new bootstrap.Modal(createModalElement);
      createModal.show();
    }
  }

  closeCreateClientModal(): void {
    const createModalElement = document.getElementById('createClientModal');
    if (createModalElement) {
      const createModal = bootstrap.Modal.getInstance(createModalElement);
      createModal?.hide();
    }
  }

  // Methods for CRUD operations
  createClient(form: NgForm): void {
    if (form.valid) {
      this.clientService.addClient(this.newClient).subscribe({
        next: () => {
          this.loadClients();
          this.closeCreateClientModal();
        },
        error: (err) => console.error('Erreur lors de l\'ajout du client:', err)
      });
    }
  }

  //  ********************************************************************** update **********************************************************************
  openUpdateModal(client: Client): void {
    this.selectedClient = { ...client };
    const updateModalElement = document.getElementById('updateClientModal');
    if (updateModalElement) {
      const updateModal = new bootstrap.Modal(updateModalElement);
      updateModal.show();
    }
  }

  closeUpdateClientModal(): void {
    const updateModalElement = document.getElementById('updateClientModal');
    if (updateModalElement) {
      const updateModal = bootstrap.Modal.getInstance(updateModalElement);
      updateModal?.hide();
    }
  }

  updateClient(form: NgForm): void {
    if (form.valid && this.selectedClient && this.selectedClient.id) {
      this.clientService.updateClient(this.selectedClient, this.selectedClient.id).subscribe({
        next: () => {
          this.loadClients();
          this.closeUpdateClientModal();
        },
        error: (err) => console.error('Erreur lors de la mise à jour du client:', err)
      });
    } else {
      console.error('Form is invalid or client ID is missing.');
    }
  }

  //  ********************************************************************** pagination **********************************************************************
  get paginatedClient(): Client[] {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.clients.slice(startIndex, endIndex);
  }

  // Calculate total number of pages
  get totalPages(): number {
    return Math.ceil(this.clients.length / this.itemsPerPage);
  }

  // Determine if the previous page button should be disabled
  get isPreviousPageDisabled(): boolean {
    return this.page === 1;
  }

  // Determine if the next page button should be disabled
  get isNextPageDisabled(): boolean {
    return this.page === this.totalPages;
  }

  // Go to the next page
  goToNextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  // Go to the previous page
  goToPreviousPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }
}
