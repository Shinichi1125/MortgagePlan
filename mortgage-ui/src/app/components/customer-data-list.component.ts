import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Customer from '../interfaces/Customer.interface';

@Component({
  selector: 'app-customer-data-list',
  templateUrl: './customer-data-list.component.html',
  styleUrls: ['./customer-data-list.component.css']
})

export class CustomerDataListComponent implements OnInit {
  allCustomers: Customer[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadAllCustomers();
  }

  loadAllCustomers() {
    this.apiService.retrieveAllCustomerData().subscribe(data => {
      this.allCustomers = data;
    });
  }

  deleteCustomer(id: number) {
    const confirmation = window.confirm("Are you really sure you want to delete this user?");
    if (confirmation) {
      this.apiService.deleteCustomer(id).subscribe({
        next: (response) => {
          this.loadAllCustomers();
        },
        error: (error) => {
          console.error('Delete failed: ', error);
        }
      });
    }
  }

}
