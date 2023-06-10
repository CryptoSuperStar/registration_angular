import { Component,Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss']
})
export class PhoneInputComponent {
  @Input() label!: string;
  @Input() control! : any;
}
