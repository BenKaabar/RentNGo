import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/Services/Client/client.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  newClient: Client = { id: 0, nom: '', prenom: '', email: '', telephone: '', motDePasse: '', address: '' };
  signupform!: FormGroup;
  constructor(private formBuilder: FormBuilder, private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    this.signupform = this.formBuilder.group({
      nom: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      prenom: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
      motDePasse: this.formBuilder.control('', [
        Validators.required,
      ]),
      telephone: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^[0-9]{8}$'),
      ]),
      address: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9\s]+$'),
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

  submit(): void {
    console.log(this.signupform.valid);
    if (this.signupform.valid != null) {
      this.newClient = this.signupform.value; // Set newAdmin with form values
      console.log("client " + this.newClient.prenom);
      console.log("motdepasse " + this.newClient.motDePasse);
      this.clientService.addClient(this.newClient).subscribe({
        next: () => {
          this.router.navigate(['/SignIn']);
          console.log("client create !!!!!!!!!!!!!!!!!!!!!!!!");
        },
        error: (err) => console.error('Erreur lors de l\'ajout du client:', err)
      });
    }
  }
}