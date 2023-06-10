import { Component, OnInit } from '@angular/core';
import { RegService } from '../services/reg.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FieldValidation } from '../types/registration-field';
import { RegistrationField } from '../types/registration-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { validate } from 'class-validator';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [
    trigger('transitionMessages', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class RegistrationComponent {
  registrationForm: FormGroup = new FormGroup({
    text: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
  });

  registrationFields: RegistrationField[] = [];

  constructor(private regService: RegService, private fb: FormBuilder, private snackBar: MatSnackBar, public router: Router) { }

  ngOnInit() {
    this.regService.getRegistrationField().subscribe((response) => {
      this.registrationFields = response;
      const controlsConfig: { [key: string]: [string, Validators[]] } = {};
      for (const field of response) {
        const validationsArr = [];
        if (field.required) {
          validationsArr.push(Validators.required);
        }
        if (field.validations && field.validations.length > 0) {
          for (const validation of field.validations) {
            switch (validation.name) {
              case 'maxlength':
                validationsArr.push(Validators.maxLength(Number(validation.value)));
                break;
              case 'minlength':
                validationsArr.push(Validators.minLength(Number(validation.value)));
                break;
              case 'pattern':
                validationsArr.push((Validators.pattern((validation.value).toString())));
                break;
              default:
                break;
            }
          }
        }
        controlsConfig[field.name] = ['', validationsArr];
        console.log(controlsConfig)
      }
      this.registrationForm = this.fb.group(controlsConfig);
    });
  }
  async submitRegistration() {
    const validationErrors = await validate(this.registrationForm.value);
    if (validationErrors.length > 0) {
      this.snackBar.open('Please fix the errors before submitting the form', '', { duration: 3000, });
      return;
    }
    this.regService.submitRegistration(this.registrationForm.value).subscribe((res) => {
      this.router.navigate(['/welcome']);
    })
    
  }

  getErrorMessage(fieldName: string): string {
    const control = this.registrationForm.get(fieldName);
    if (!control || !control.errors) {
      return '';
    }
    
    const validationErrors: FieldValidation[] | undefined = this.registrationFields.find(field => field.name === fieldName)?.validations;
    
    if (!validationErrors) {
      return '';
    }

    for (const validation of validationErrors) {
      if (validation.name === 'maxlength' && control.errors['maxlength']) {
        return validation.message;
      }
      if (validation.name === 'minlength' && control.errors['minlength']) {
        return validation.message;
      }
      if (validation.name === 'pattern' && control.errors['pattern']) {
        const val : FieldValidation | undefined = validationErrors.find(field => field.value === (control?.errors && control.errors['pattern'].requiredPattern))
        return val ? val.message : "";
      }
    }
    
    return '';
  }
}
