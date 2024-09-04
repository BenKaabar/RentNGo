// sign-in.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ClientService } from 'src/app/Services/Client/client.service';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public signinform!: FormGroup;
  public errorMessage: string = '';
  public currentClient?: Client;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signinform = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required]
    });
  }

  getErrorsMessage(fieldName: string, error: any): string {
    if (error['required']) {
      return `${fieldName} obligatoire`;
    } else if (error['email']) {
      return 'Email invalide';
    }
    return '';
  }

  onSubmit() {
    if (this.signinform.valid) {
      const email = this.signinform.get('mail')?.value;
      const motDePasse = this.signinform.get('motDePasse')?.value;
      console.log("Client details: ", email + " " + motDePasse);

      this.authService.loginClient(email, motDePasse).subscribe(
        response => {
          if (response) {
            this.clientService.getClientByEmail(email).subscribe(
              client => {
                this.currentClient = client;
                this.authService.setClient(this.currentClient); // Store the client data
                this.router.navigate(['/client']);
              },
              error => {
                this.errorMessage = 'Échec de la récupération des détails du client.';
                console.error('Erreur de récupération des détails du client', error);
              }
            );
          } else {
            this.errorMessage = 'Réponse de connexion invalide.';
            console.error('Réponse de connexion invalide', response);
          }
        },
        error => {
          this.errorMessage = 'Échec de la connexion. Veuillez vérifier vos informations.';
          console.error('Erreur de connexion', error);
        }
      );
    }
  }
}
