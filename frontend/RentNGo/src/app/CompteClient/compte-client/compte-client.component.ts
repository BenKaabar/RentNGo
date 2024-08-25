import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/Services/Client/client.service';

@Component({
  selector: 'app-compte-client',
  templateUrl: './compte-client.component.html',
  styleUrls: ['./compte-client.component.css']
})
export class CompteClientComponent implements OnInit {
  client: Client | null = null;
  newClient: Client = { id: 0, nom: '', prenom: '', email: '', telephone: '', motdepasse: '', address: '' };
  selectedClient: Client | null = null;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadClients();
  }
  //  ********************************************************************** load **********************************************************************
  loadClients(): void {
    this.clientService.getClientById(1).subscribe({
      next: (response) => {
        this.client = response;
        console.log('Reservations:', this.client); // Log data to check
      },
      error: (err) => console.error('Erreur lors de la récupération des reservations:', err)
    });
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

}
