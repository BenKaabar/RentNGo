import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/Admin';
import { AdminService } from 'src/app/Services/admin/admin.service';

@Component({
  selector: 'app-sign-up-admin',
  templateUrl: './sign-up-admin.component.html',
  styleUrls: ['./sign-up-admin.component.css']
})
export class SignUpAdminComponent implements OnInit {
  signupform!: FormGroup;
  newAdmin: Admin = { id: 0, username: '', motdepasse: '', role: '' };



  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.signupform = this.formBuilder.group({
      username: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      motdepasse: this.formBuilder.control('', [
        Validators.required,
      ]),
    });
  }

  getErrorsMessage(fieldName: string, error: any): string {
    if (error['required']) {
      return fieldName + ' obligatoire';
    }
    return '';
  }

  createAdmin(): void {
    if (this.signupform.valid) {
      this.newAdmin = this.signupform.value; // Set newAdmin with form values
      console.log("admin " + this.newAdmin.username);
      console.log("admin " + this.newAdmin.motdepasse);
      this.adminService.addAdmin(this.newAdmin).subscribe({
        next: () => {
          this.router.navigate(['/SignInAdmin']);
          console.log("admin create !!");
        },
        error: (err) => console.error('Erreur lors de l\'ajout du admin:', err)
      });
    }
  }


}