import { AuthService } from './../../Services/Auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/Services/Client/client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-compte-client',
  templateUrl: './compte-client.component.html',
  styleUrls: ['./compte-client.component.css']
})
export class CompteClientComponent implements OnInit {
  client: Client | null = null;
  selectedClient: Client | null = null;
  clientId: number | null = null;
  errorMessage: string = '';
  currentClient?: Client | null = null;
  constructor(
    private clientService: ClientService,
    private authService: AuthService,
    private route: ActivatedRoute // Inject ActivatedRoute to access route parameters
  ) { }

  ngOnInit(): void {
    this.authService.currentClient.subscribe(client => {
      this.currentClient = client;
      this.loadClient(); // Ensure client data is loaded after the current client is set
    });
  }

  // Method to load client data based on clientId
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


  // Open the update modal with the selected client
  openUpdateModal(client: Client): void {
    this.selectedClient = { ...client };
    const updateModalElement = document.getElementById('updateClientModal');
    if (updateModalElement) {
      const updateModal = new bootstrap.Modal(updateModalElement);
      updateModal.show();
    }
  }

  // Close the update modal
  closeUpdateClientModal(): void {
    const updateModalElement = document.getElementById('updateClientModal');
    if (updateModalElement) {
      const updateModal = bootstrap.Modal.getInstance(updateModalElement);
      updateModal?.hide();
    }
  }

  // Update client information
  updateClient(form: NgForm): void {
    if (form.valid && this.selectedClient && this.selectedClient.id) {
      this.clientService.updateClient(this.selectedClient, this.selectedClient.id).subscribe({
        next: () => {
          this.loadClient(); // Reload the client data after update
          this.closeUpdateClientModal();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la mise à jour du client.';
          console.error('Erreur lors de la mise à jour du client:', err);
        }
      });
    } else {
      this.errorMessage = 'Formulaire invalide ou ID du client manquant.';
      console.error('Formulaire invalide ou ID du client manquant.');
    }
  }
}
