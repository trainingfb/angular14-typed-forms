import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fundamentals',
  template: `
    <button routerLink="demo1">1</button>
    <button routerLink="demo2">2</button>
    <button routerLink="demo2b">2b</button>
    <button routerLink="demo3">3</button>
    <button routerLink="demo4">4</button>
    <button routerLink="demo5">5</button>
    <button routerLink="demo6">6</button>
    <button routerLink="demo7">7</button>
    <button routerLink="demo8">8</button>
    <hr>
    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class FundamentalsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
