import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/Services/Client/client.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signupform!: FormGroup;
  newClient: Client = { id: 0, nom: '', prenom: '', email: '', telephone: '', motDePasse: '', address: '' };

  constructor(private formBuilder: FormBuilder, private clientService: ClientService) { }

  ngOnInit() {
    this.signupform = this.formBuilder.group({
      nom: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$')
      ]),
      prenom: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$')
      ]),
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
      motdepasse: this.formBuilder.control('', [
        Validators.required,
      ]),
      telephone: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^[0-9]{8}$'),
      ]),
      address: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9\\s]+$'),
      ]),
    });
  }
  getErrorsMessage(fieldName: string, error: any): string {
    if (error['required']) {
      return fieldName + ' obligatoire';
    } else if (error['pattern']) {
      if (fieldName === 'telephone') {
        return 'Téléphone doit contenir exactement 8 chiffres';
      }
      return fieldName + ' invalide';
    } else if (error['email']) {
      return 'mail invalide';
    }
    return '';
  }

  createClient(): void {
    if (this.signupform.valid) {
      const newClient: Client = this.signupform.value;
      this.clientService.addClient(newClient).subscribe({
        next: () => {
          console.log("Client ajouté avec succès");
        },
        error: (err) => console.error('Erreur lors de l\'ajout du client:', err)
      });
    }
  }

}