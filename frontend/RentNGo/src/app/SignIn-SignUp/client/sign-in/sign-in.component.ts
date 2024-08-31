import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
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
  ) {}

  ngOnInit() {
    this.signinform = this.formBuilder.group({
      mail: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.formBuilder.control('', [
        Validators.required,
      ]),
    });
  }

  getErrorsMessage(fieldName: string, error: any): string {
    if (error['required']) {
      return fieldName + ' obligatoire';
    } else if (error['email']) {
      return 'mail invalide';
    }
    return '';
  }

  onSubmit() {
    if (this.signinform.valid) {
      const email = this.signinform.get('mail')?.value;
      const password = this.signinform.get('password')?.value;

      // Appel au service AuthService pour se connecter
      this.authService.loginAsClient(email, password).subscribe(
        response => {
          // En cas de succès, rediriger vers le tableau de bord client
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.router.navigate(['/client/dashboard']);
        },
        error => {
          // En cas d'échec, afficher un message d'erreur
          this.errorMessage = 'Échec de la connexion. Veuillez vérifier vos informations.';
          console.error('Erreur de connexion', error);
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir correctement le formulaire.';
    }
  }
}