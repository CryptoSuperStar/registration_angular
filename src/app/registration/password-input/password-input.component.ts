import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators,  AbstractControl } from '@angular/forms';
// import ongini
@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent {
  @Input() label!: string;
  @Input() control! : any;
  hide = true;
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}
