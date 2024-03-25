import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Customer from '../interfaces/Customer.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customer-data-list',
  templateUrl: './customer-data-list.component.html',
  styleUrls: ['./customer-data-list.component.css']
})

export class CustomerDataListComponent implements OnInit {
  create_new_customer: string = "Create New Customer";
  allCustomers: Customer[] = [];

  constructor(private apiService: ApiService, private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.loadAllCustomers();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  loadAllCustomers() {
    this.apiService.retrieveAllCustomerData().subscribe(data => {
      this.allCustomers = data;
    });
  }

  deleteCustomer(id: number) {
    this.translate.get('delete_confirmation_prompt').subscribe((text: string) => {
      const confirmation = window.confirm(text);
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
    })
  }
}
