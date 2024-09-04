import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { Admin } from 'src/app/models/Admin';

@Component({
  selector: 'app-sign-in-admin',
  templateUrl: './sign-in-admin.component.html',
  styleUrls: ['./sign-in-admin.component.css']
})
export class SignInAdminComponent implements OnInit {
  public errorMessage: string = '';
  signinform!: FormGroup;
  newAdmin: Admin = { id: 0, username: '', motdepasse: '', role: '' };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // Initialize the form with validation rules
    this.signinform = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ]],
      motdepasse: ['', Validators.required]
    });
  }

  // Helper function to return error messages for form fields
  getErrorsMessage(fieldName: string, error: any): string {
    if (error['required']) {
      return `${fieldName} obligatoire`;  // e.g. "Username obligatoire"
    } else if (error['pattern']) {
      return 'Le nom d\'utilisateur ne peut contenir que des lettres';
    }
    return '';
  }

  // Method to handle form submission
  onSubmit() {
    if (this.signinform.valid) {
      this.newAdmin = this.signinform.value;
      console.log("Admin: ", this.newAdmin.username);

      // Call AuthService for admin login
      this.authService.loginAdmin(this.newAdmin.username, this.newAdmin.motdepasse).subscribe({
        next: (response: any) => {
          console.log("Admin logged in successfully");
          // Optionally, handle successful login (e.g., store token, redirect)
          localStorage.setItem('currentAdmin', JSON.stringify(response));
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          console.error('Erreur lors de login de l\'admin:', err);
          this.errorMessage = 'Échec de la connexion. Veuillez vérifier vos informations.';
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir correctement le formulaire.';
    }
  }

}
