import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  title = 'user';
  display = false;

  constructor(private router: Router) {}

  ngDoCheck(): void {
    if (this.router.url == '/login' || this.router.url == '/signup') {
      this.display = false;
    } else {
      this.display = true;
    }
  }
}
