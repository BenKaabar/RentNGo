import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/Contact';
import * as bootstrap from 'bootstrap';
import { ContactService } from 'src/app/Services/Contact/contact.service';

@Component({
  selector: 'app-gestion-contact',
  templateUrl: './gestion-contact.component.html',
  styleUrls: ['./gestion-contact.component.css']
})
export class GestionContactComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;
  isDeleteModalOpen: boolean = false;
  isConsultModalOpen: boolean = false;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getAllContact().subscribe(response => {
      this.contacts = response.map(item => ({
        id: item.id,
        email: item.email,
        message: item.message,
        client: item.client
      }));
    });
  }

  openConsultModal(contact: Contact): void {
    if (!this.isDeleteModalOpen) {
      this.selectedContact = contact;
      this.isConsultModalOpen = true; // Ouvre le modal de consultation
    }
  }

  closeConsultModal(): void {
    this.isConsultModalOpen = false; // Ferme le modal de consultation
    this.selectedContact = null;
  }

  openDeleteModal(contact: Contact): void {
    this.selectedContact = contact;
    this.isDeleteModalOpen = true; // Ouvre le modal de suppression
    const deleteModalElement = document.getElementById('staticBackdropsupprimer');
    if (deleteModalElement) {
      const deleteModal = new bootstrap.Modal(deleteModalElement);
      deleteModal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false; // Ferme le modal de suppression
  }

  deleteContact(id?: number): void {
    if (id !== undefined) {
      this.contactService.deleteContact(id).subscribe({
        next: () => {
          this.loadContacts();
          this.closeDeleteModal();
        },
        error: (err) => {
          this.isDeleteModalOpen = false;
          console.error('Erreur lors de la suppression du contact:', err);
          // alert('Une erreur est survenue lors de la suppression du contact.');
          // Fermer le modal même en cas d'erreur
        }
      });
    } else {
      console.error('ID contact est undefined');
    }
  }

}
