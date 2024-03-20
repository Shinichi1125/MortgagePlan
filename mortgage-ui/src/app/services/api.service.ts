import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 
import Customer from '../interfaces/Customer.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-users`);
  }

  retrieveAllCustomerData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-decimal-mortgages`);
  }

  getMonthlyPayments(id: number) {
    return this.http.get(`${this.baseUrl}/monthly-payment/${id}`);
  }

  deleteCustomer(id: number) {
    return this.http.delete(`${this.baseUrl}/delete-customer/${id}`);
  }
}
