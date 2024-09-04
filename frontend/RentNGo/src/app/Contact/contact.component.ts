import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/Contact';
import { ContactService } from '../Services/Contact/contact.service';
import { NgForm } from '@angular/forms';
import { Client } from '../models/Client';
import { AuthService } from '../Services/Auth/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  currentClient?: Client | null = null;
  newContact: Contact = { id: 0, email: '', message: '', client: { id: 0, nom: '', prenom: '', email: '', telephone: '', motDePasse: '', address: '' } };
  constructor(private contactService: ContactService, private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.currentClient.subscribe(client => {
      this.currentClient = client;
    });
  }

  createContact(form: NgForm): void {
    if (form.valid && this.currentClient?.id != null) {
      const idClient: number = this.newContact.client.id;
      this.contactService.addContact(this.currentClient?.id, this.newContact).subscribe({
        next: () => {
          this.newContact.message = "";
        },
        error: (err) => console.error('Erreur lors de l\'ajout du contact:', err)
      });
    }
  }

}
