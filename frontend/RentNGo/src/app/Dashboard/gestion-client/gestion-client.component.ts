import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/Services/Client/client.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-gestion-client',
  templateUrl: './gestion-client.component.html',
  styleUrls: ['./gestion-client.component.css']
})
export class GestionClientComponent implements OnInit {

  clients: Client[] = [];
  selectedClient: Client | null = null;
  isDeleteModalOpen: boolean = false;
  isConsultModalOpen: boolean = false;
  isUpdateModalOpen: boolean = false;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAllClient().subscribe(response => {
      this.clients = response.map(item => ({
        id: item.id,
        nom: item.nom,
        prenom: item.prenom,
        email: item.email,
        telephone: item.telephone,
        motdepasse: item.motdepasse,
        address: item.address,
      }));
    });
  }

  openConsultModal(client: Client): void {
    this.selectedClient = client;
    this.isConsultModalOpen = true;
    const consultModalElement = document.getElementById('consultModal');
    if (consultModalElement) {
      const consultModal = new bootstrap.Modal(consultModalElement);
      consultModal.show();
    }
  }

  closeConsultModal(): void {
    this.isConsultModalOpen = false;
    this.selectedClient = null;
    const consultModalElement = document.getElementById('consultModal');
    if (consultModalElement) {
      const consultModal = bootstrap.Modal.getInstance(consultModalElement);
      consultModal?.hide();
    }
  }

  openUpdateModal(client: Client): void {
    this.selectedClient = client; // create a copy to avoid modifying original client
    this.isUpdateModalOpen = true;
    const updateModalElement = document.getElementById('updateModal');
    if (updateModalElement) {
      const updateModal = new bootstrap.Modal(updateModalElement);
      updateModal.show();
    }
  }

  closeUpdateModal(): void {
    this.isUpdateModalOpen = false;
    this.selectedClient = null;
    const updateModalElement = document.getElementById('updateModal');
    if (updateModalElement) {
      const updateModal = bootstrap.Modal.getInstance(updateModalElement);
      updateModal?.hide();
    }
  }

  updateClient(): void {
    if (this.selectedClient) {
      this.clientService.updateClient(this.selectedClient, this.selectedClient.id).subscribe(() => {
        this.loadClients();
        this.closeUpdateModal();
      }, error => {
        console.error('Error updating client:', error);
      });
    }
  }

  openDeleteModal(client: Client): void {
    this.selectedClient = client;
    this.isDeleteModalOpen = true;
    const deleteModalElement = document.getElementById('deleteModal');
    if (deleteModalElement) {
      const deleteModal = new bootstrap.Modal(deleteModalElement);
      deleteModal.show();
    }
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.selectedClient = null;
    const deleteModalElement = document.getElementById('deleteModal');
    if (deleteModalElement) {
      const deleteModal = bootstrap.Modal.getInstance(deleteModalElement);
      deleteModal?.hide();
    }
  }

  deleteClient(id?: number): void {
    if (id !== undefined) {
      this.clientService.deleteClientById(id).subscribe(() => {
        this.loadClients();
        this.closeDeleteModal();
      }, error => {
        console.error('Error deleting client:', error);
        this.closeDeleteModal();
      });
    } else {
      console.error('Client ID is undefined');
    }
  }
}
