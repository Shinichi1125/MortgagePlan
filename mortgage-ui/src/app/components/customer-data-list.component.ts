import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Customer from '../interfaces/Customer.interface';

@Component({
  selector: 'app-customer-data-list',
  templateUrl: './customer-data-list.component.html'
})

export class CustomerDataListComponent implements OnInit {
  allCustomers: Customer[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.retrieveAllCustomerData().subscribe(data => {
      this.allCustomers = data;
    });
  }

  deleteCustomer(id: number) {
    return this.apiService.deleteCustomer(id);
  }
}
