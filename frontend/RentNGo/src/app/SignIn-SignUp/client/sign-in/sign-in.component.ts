import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public signinform!: FormGroup;
  public errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  newClient: Client = { id: 0, nom: '', prenom: '', email: '', telephone: '', motDePasse: '', address: '' };

  ngOnInit() {
    this.signinform = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      motDePasse: ['', [
        Validators.required,
      ]],
    });
  }

  getErrorsMessage(fieldName: string, error: any): string {
    if (error['required']) {
      return `${fieldName} est obligatoire`;
    } else if (error['email']) {
      return 'Email invalide';
    }
    return '';
  }


  onSubmit() {
    if (this.signinform.valid) {
      this.newClient = this.signinform.value;
      console.log("Email: ", this.newClient.email);

      // Call AuthService for client login
      this.authService.loginClient(this.newClient.email, this.newClient.motDePasse).subscribe({
        next: (response: any) => { // Explicitly type the response parameter
          console.log("Client logged in successfully");
          // Store client data in localStorage
          localStorage.setItem('currentClient', JSON.stringify(response));
          // Redirect to the client dashboard or homepage
          this.router.navigate(['/client']);
        },
        error: (err) => {
          console.error('Erreur lors de la connexion du client:', err);
          this.errorMessage = 'Échec de la connexion. Veuillez vérifier vos informations.';
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir correctement le formulaire.';
    }
  }

}