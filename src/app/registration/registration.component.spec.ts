import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrationField } from '../types/registration-field';
import { RegService } from '../services/reg.service';
import { of } from 'rxjs';
import { RegistrationComponent } from './registration.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let mockRegService: jasmine.SpyObj<RegService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    // Create spies for the RegService and MatSnackBar dependencies
    mockRegService = jasmine.createSpyObj('RegService', ['getRegistrationField', 'submitRegistration']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [ReactiveFormsModule, RouterTestingModule,MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: RegService, useValue: mockRegService },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with controls based on the registration fields returned by the service', () => {
    const mockFields: RegistrationField[] = [
      { name: 'text', label: 'Text Field', type: 'text', required: true },
      { name: 'email', label: 'Email Field', type: 'email', required: true },
      { name: 'password', label: 'Password Field', type: 'password', required: true },
      { name: 'phone', label: 'Phone Field', type: 'phone', required: false },
    ];
  
    // Use and.callFake() instead of and.returnValue() to return an observable of the mock data
    mockRegService.getRegistrationField.and.callFake(() => of(mockFields));
  
    fixture.detectChanges();
  
    expect(component.registrationForm.controls['text']).toBeDefined();
    expect(component.registrationForm.controls['email']).toBeDefined();
    expect(component.registrationForm.controls['password']).toBeDefined();
    expect(component.registrationForm.controls['phone']).toBeDefined();
  });

  it('should show validation errors for required fields when the form is submitted with empty values', () => {
    const mockFields: RegistrationField[] = [ { name: 'text', label: 'Text Field', type: 'text', required: true },];
    mockRegService.getRegistrationField.and.returnValue(of(mockFields));

    fixture.detectChanges();

    component.submitRegistration();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.MuiFormControl-error');
    expect(errorElement).not.toBeNull();
    expect(errorElement.textContent).toContain('Field is required');
  });

  it('should show validation errors for fields that do not meet pattern requirements', () => {
    const mockFields: RegistrationField[] = [
      {
        name: 'password',
        label: 'Password Field',
        type: "password",
        required: true,
        validations: [
          {
            name: 'regex', 
            message: '1 or more lower case letters.', 
            value: '^.*[a-z].*$',             
          },
          { 
            name: 'regex', 
            message: '1 or more upper case letters.', 
            value: '^.*[A-Z].*$', 
          },             
        ]
      },
    ];
  
    // Return an observable of the mock data
    mockRegService.getRegistrationField.and.returnValue(of(mockFields));
  
    fixture.detectChanges();
  
    component.registrationForm.patchValue({ password: 'weakpass' });
    component.registrationForm.markAllAsTouched();
    fixture.detectChanges();
  
    const errorElement = fixture.nativeElement.querySelector('.MuiFormControl-error');
    expect(errorElement).not.toBeNull();
    expect(errorElement.textContent).toContain('Password must contain at least 1 or more lower case letters, 1 or more upper case letters, one number, and be at least 8 characters long.');
  });
  
  

  // it('should call the RegService submitRegistration method when the form is submitted with valid data', () => {
  //   const mockFields: RegistrationField[] = [
  //     { name: 'text', label: 'Text Field', required: true },
  //     { name: 'email', label: 'Email Field', required: true },
  //     { name: 'password', label: 'Password Field', required: true },
  //     { name: 'phone', label: 'Phone Field', required: true },
  //   ];
  //   mockRegService.getRegistrationField.and.returnValue(of(mockFields));

  //   fixture.detectChanges();

  //   component.registrationForm.patchValue({
  //     text: 'Test',
  //     email: 'test@test.com',
  //     password: 'StrongPassword123',
  //     phone: '555-555-5555',
  //   });
  //   component.registrationForm.markAllAsTouched();
  //   fixture.detectChanges();

  //   component.submitRegistration();

  //   expect(mockRegService.submitRegistration).toHaveBeenCalledWith({
  //     text: 'Test',
  //     email: 'test@test.com',
  //     password: 'StrongPassword123',
  //     phone: '555-555-5555',
  //   });
  // });
});
