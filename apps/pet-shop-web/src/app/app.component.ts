import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';


@Component({
  imports: [ RouterModule,HeaderComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pet-shop-web';
  //pk_test_51RZUI3P0qFDfcI830WR0VtZgY5Jny9PizqEf6xSiDcIkbB5Mad21r9s0Vwf4f7uu93MoCjtj3mIU1cj6nGQxvyYO00ARBAn7K9
  //sk_test_51RZUI3P0qFDfcI83GYgwF594i2Jd67bGFO2ZQsl37F4cUp7UlXsfINXcHEUPADHAMyevYJVORNVTgB6pQ8brRQUk00t1SxKqud
}
