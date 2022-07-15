import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Demo1Component } from './demo/demo1.component';
import { Demo2Component } from './demo/demo2.component';
import { Demo2bComponent } from './demo/demo2b.component';
import { Demo3Component } from './demo/demo3.component';
import { Demo4Component } from './demo/demo4.component';
import { Demo5Component } from './demo/demo5.component';
import { Demo6Component } from './demo/demo6.component';
import { Demo7Component } from './demo/demo7.component';
import { Demo8Component } from './demo/demo8.component';
import { FundamentalsComponent } from './fundamentals.component';

const routes: Routes = [
  {
    path: '',
    component: FundamentalsComponent,
    children: [
      { path: 'demo1', component: Demo1Component },
      { path: 'demo2', component: Demo2Component },
      { path: 'demo2b', component: Demo2bComponent},
      { path: 'demo3', component: Demo3Component },
      { path: 'demo4', component: Demo4Component },
      { path: 'demo5', component: Demo5Component },
      { path: 'demo6', component: Demo6Component },
      { path: 'demo7', component: Demo7Component },
      { path: 'demo8', component: Demo8Component },
      { path: '', redirectTo: 'demo1', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundamentalsRoutingModule { }
