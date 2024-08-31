import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit  {
  public signupform!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

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
      mail: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.formBuilder.control('', [
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
}