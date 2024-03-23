import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CustomerDataListComponent } from './components/customer-data-list.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateCustomerComponent } from './components/create-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateCustomerComponent } from './components/update-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerDataListComponent,
    CreateCustomerComponent,
    UpdateCustomerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
