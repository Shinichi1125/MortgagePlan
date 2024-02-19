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

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getGreeting().subscribe(data => {
      this.greeting = data;
    }, error => {
      console.error('Error fetching greeting:', error);
    });
  }
}
