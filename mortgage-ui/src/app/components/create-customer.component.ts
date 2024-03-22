import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})

export class CreateCustomerComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      customer: ['', Validators.required],
      totalLoanEuro: ['', [Validators.required, Validators.min(0), Validators.max(10000000)]],
      totalLoanCent: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
      interest: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      years: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.apiService.createCustomer(this.customerForm.value).subscribe({
        next: () => this.router.navigate(['/']),
        error: (e) => console.error(e)
      });
    }
  }

  cancelCreate(): void {
    this.router.navigate(['/']);
  }
}
