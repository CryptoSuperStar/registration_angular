import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationField } from '../types/registration-field';
import { RegistrationRequest } from '../types/registration-request';
import { registerLocaleData } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class RegService {

  constructor(private http: HttpClient) {}

  getRegistrationField() :  Observable<RegistrationField[]>{
    return this.http.get<RegistrationField[]>('http://localhost:3000/api/registration-fields');
  }

  submitRegistration(registrationRequest: RegistrationRequest[]) {
   return this.http.post('http://localhost:3000/api/register', registrationRequest)
  }
}
