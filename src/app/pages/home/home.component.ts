import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <header>
    <h1>Herolo Cinema</h1>
    <h2>Your Personal Movie Library</h2>
  </header>
  <main>
    <app-movie-list></app-movie-list>
  </main>`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
