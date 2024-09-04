import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/Contact';
import { Client } from 'src/app/models/Client';
import { ContactService } from 'src/app/Services/Contact/contact.service';
import { ClientService } from 'src/app/Services/Client/client.service';
import { NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-gestion-contact',
  templateUrl: './gestion-contact.component.html',
  styleUrls: ['./gestion-contact.component.css']
})
export class GestionContactComponent implements OnInit {
  contacts: Contact[] = [];
  clients: Client[] = [];
  newContact: Contact = { id: 0, email: '', message: '', client: { id: 0, nom: '', prenom: '', email: '', telephone: '', motDePasse: '', address: '' } };

  selectedContact: Contact | null = null;
  tempContact: Contact | null = null;
  page: number = 1;
  itemsPerPage: number = 5;

  constructor(private contactService: ContactService, private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadContacts();
    this.loadClients();
  }
  //  ********************************************************************** load **********************************************************************
  loadContacts(): void {
    this.contactService.getAllContact().subscribe((data: Contact[]) => {
      this.contacts = data;
      this.paginatedContacts;
    });
  }

  loadClients(): void {
    this.clientService.getAllClient().subscribe((data: Client[]) => {
      this.clients = data;
    });
  }

  //  ********************************************************************** consulting **********************************************************************
  openConsultModal(contact: Contact): void {
    this.selectedContact = contact;
    const consultModalElement = document.getElementById('consultingModal');
    if (consultModalElement) {
      const consultModal = new bootstrap.Modal(consultModalElement);
      consultModal.show();
    }
  }
  closeConsultModal(): void {
    const consultModalElement = document.getElementById('consultingModal');
    if (consultModalElement) {
      const consultModal = bootstrap.Modal.getInstance(consultModalElement);
      consultModal?.hide();
    }
  }

  //  ********************************************************************** deleting **********************************************************************
  openDeleteModal(contact: Contact): void {
    this.tempContact = contact;
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  closeDeleteModal(): void {
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }
  deleteContactbyid(id?: number): void {
    if (id != null) {
      this.contactService.deleteContact(id).subscribe({
        next: (response) => {
          this.loadContacts();
          this.loadClients();
          this.closeDeleteModal();
          console.log('Response:', response);
        }
      });
    } else {
      console.error('ID contact est undefined');
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

  createContact(form: NgForm): void {
    if (form.valid) {
      const idClient: number = this.newContact.client.id;
      this.contactService.addContact(idClient, this.newContact).subscribe({
        next: () => {
          this.loadContacts();
          this.closeCreateModal();
        },
        error: (err) => console.error('Erreur lors de l\'ajout du contact:', err)
      });
    }
  }

  //  ********************************************************************** update **********************************************************************
  openUpdateModal(contact: Contact): void {
    this.tempContact = { ...contact }; // Create a copy of the contact to avoid modifying the original
    const updateModalElement = document.getElementById('updateModal');
    if (updateModalElement) {
      const updateModal = new bootstrap.Modal(updateModalElement);
      updateModal.show();
    }
  }

  closeUpdateModal(): void {
    const updateModalElement = document.getElementById('updateModal');
    if (updateModalElement) {
      const updateModal = bootstrap.Modal.getInstance(updateModalElement);
      updateModal?.hide();
    }
  }

  updateContact(form: NgForm): void {
    if (form.valid && this.tempContact && this.tempContact.id) {
      this.contactService.updateContact(this.tempContact, this.tempContact.id, this.tempContact.client.id).subscribe({
        next: () => {
          this.loadContacts();
          this.loadClients();
          this.closeUpdateModal();
        },
        error: (err) => console.error('Erreur lors de la mise à jour du contact:', err)
      });
    } else {
      console.error('Form is invalid or contact ID is missing.');
    }
  }
  //  ********************************************************************** truncateMessage **********************************************************************
  truncateMessage(message: string, length: number = 50): string {
    return message.length > length ? message.substring(0, length) + '...' : message;
  }
  //  ********************************************************************** pagination **********************************************************************
  get paginatedContacts(): Contact[] {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.contacts.slice(startIndex, endIndex);
  }

  // Calculate total number of pages
  get totalPages(): number {
    return Math.ceil(this.contacts.length / this.itemsPerPage);
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
