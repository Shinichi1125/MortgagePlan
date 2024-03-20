import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDataListComponent } from './components/customer-data-list.component';
import { CreateCustomerComponent } from './components/create-customer.component';

const routes: Routes = [
  { path: '', component: CustomerDataListComponent },
  { path: 'customer/create', component: CreateCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
