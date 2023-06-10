import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordInputComponent } from './password-input.component';

describe('PasswordInputComponent', () => {
  let component: PasswordInputComponent;
  let fixture: ComponentFixture<PasswordInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordInputComponent],
      imports: [MatFormFieldModule, MatIconModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordInputComponent);
    component = fixture.componentInstance;
    component.label = 'Password';
    component.control = new FormControl('', Validators.required);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    const button = fixture.nativeElement.querySelector('button');
    const input = fixture.nativeElement.querySelector('input');

    expect(input.type).toBe('password'); // Password should be hidden by default
    expect(component.hide).toBe(true);

    button.click();
    fixture.detectChanges();

    expect(input.type).toBe('text'); // Password should be visible after clicking the button
    expect(component.hide).toBe(false);

    button.click();
    fixture.detectChanges();

    expect(input.type).toBe('password'); // Password should be hidden again after clicking the button again
    expect(component.hide).toBe(true);
  });

  it('should render label', () => {
    const label = fixture.nativeElement.querySelector('mat-label');
    expect(label.textContent).toContain('Password');
  });

  it('should bind control', () => {
    const input = fixture.nativeElement.querySelector('input');
    const control = component.control;

    expect(input.value).toBe(control.value);
    input.value = 'test';
    input.dispatchEvent(new Event('input'));

    expect(control.value).toBe('test');
  });
});
