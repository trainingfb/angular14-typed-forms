import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <button routerLink="fundamentals">fundamentals</button>
    <button routerLink="cva">cva</button>
    <hr>
  `,
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
