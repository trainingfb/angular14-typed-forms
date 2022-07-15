import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvaComponent } from './cva.component';
import { Demo1Component } from './demo/demo1.component';
import { Demo2Component } from './demo/demo2.component';
import { Demo3Component } from './demo/demo3.component';

const routes: Routes = [
  {
    path: '', component: CvaComponent,
    children: [
      { path: 'demo1', component: Demo1Component },
      { path: 'demo2', component: Demo2Component },
      { path: 'demo3', component: Demo3Component },
      { path: '', redirectTo: 'demo1', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvaRoutingModule { }
