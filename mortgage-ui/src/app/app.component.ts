import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mortgage-ui';

  greeting = '';
  users = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers(): void {
    this.apiService.getAllUsers().subscribe(
      data => {
        this.users = JSON.stringify(data, null, 2); 
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
}
