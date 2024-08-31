import { Component } from '@angular/core';
import { Contact } from '../models/Contact';
import { ContactService } from '../Services/Contact/contact.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  newContact: Contact = { id: 0, email: '', message: '', client: { id: 0, nom: '', prenom: '', email: '', telephone: '', motdepasse: '', address: '' } };
  constructor(private contactService: ContactService) { }

  createContact(form: NgForm): void {
    if (form.valid) {
      const idClient: number = this.newContact.client.id;
      this.contactService.addContact(1, this.newContact).subscribe({
        next: () => {
          this.newContact.message = "";
        },
        error: (err) => console.error('Erreur lors de l\'ajout du contact:', err)
      });
    }
  }

}
