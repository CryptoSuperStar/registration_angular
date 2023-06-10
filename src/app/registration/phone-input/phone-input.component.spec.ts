import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PhoneInputComponent } from './phone-input.component';
import { ReactiveFormsModule } from '@angular/forms';
describe('PhoneInputComponent', () => {
  let component: PhoneInputComponent;
  let fixture: ComponentFixture<PhoneInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhoneInputComponent],
      imports: [MatFormFieldModule,ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(PhoneInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
