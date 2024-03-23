import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  retrieveAllCustomerData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-decimal-mortgages`);
  }

  getIndividualCustomerData(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/mortgage/${id}`);
  }

  createCustomer(customerData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/save-customer`, customerData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  updateCustomer(customerData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-mortgage/${customerData.id}`, customerData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  deleteCustomer(id: number) {
    return this.http.delete(`${this.baseUrl}/delete-customer/${id}`);
  }
}
