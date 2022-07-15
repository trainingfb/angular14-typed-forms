import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cva',
  template: `
    <button routerLink="demo1">demo1</button>
    <button routerLink="demo2">demo2</button>
    <button routerLink="demo3">demo3</button>
    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class CvaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
