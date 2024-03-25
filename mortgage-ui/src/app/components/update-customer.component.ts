import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})

export class UpdateCustomerComponent implements OnInit {
  customerId: number = 0;
  updateCustomerForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    customer: new FormControl(''),
    totalLoanEuro: new FormControl(0),
    totalLoanCent: new FormControl(0),
    interest: new FormControl(0),
    years: new FormControl(0)
  });

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.customerId = this.route.snapshot.params['id'];
    this.initForm();
    this.fetchCustomerDetails();
  }

  initForm() {
    this.updateCustomerForm = this.fb.group({
      id: [0, [Validators.required, Validators.min(0)]],
      customer: ['', Validators.required],
      totalLoanEuro: [0, [Validators.required, Validators.min(0), Validators.max(10000000)]],
      totalLoanCent: [0, [Validators.required, Validators.min(0), Validators.max(99)]],
      interest: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      years: [0, [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  fetchCustomerDetails() {
    this.apiService.getIndividualCustomerData(this.customerId).subscribe(
      data => {
        const totalLoan = data.totalLoan.toString().split(".");
        this.updateCustomerForm.patchValue({
          id: data.id,
          customer: data.customer,
          totalLoanEuro: +totalLoan[0],
          totalLoanCent: totalLoan[1] == undefined ? 0 : +totalLoan[1],
          interest: (data.interest*100),
          years: data.years
        });
      },
      error => console.error(error)
    );
  }

  onSubmit() {
    if (this.updateCustomerForm.valid) {
      this.apiService.updateCustomer(this.updateCustomerForm.value).subscribe({
        next: () => this.router.navigate(['/']),
        error: (e) => console.error(e)
      });
    }
  }

  cancelUpdate(): void {
    this.router.navigate(['/']);
  }
}
