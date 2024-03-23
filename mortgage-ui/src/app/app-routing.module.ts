import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDataListComponent } from './components/customer-data-list.component';
import { CreateCustomerComponent } from './components/create-customer.component';
import { UpdateCustomerComponent } from './components/update-customer.component';

const routes: Routes = [
  { path: '', component: CustomerDataListComponent },
  { path: 'customer/create', component: CreateCustomerComponent },
  { path: 'customer/update/:id', component: UpdateCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
