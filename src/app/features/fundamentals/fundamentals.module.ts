import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Demo2bComponent } from './demo/demo2b.component';
import { Demo4Component } from './demo/demo4.component';
import { Demo5Component } from './demo/demo5.component';

import { FundamentalsRoutingModule } from './fundamentals-routing.module';
import { FundamentalsComponent } from './fundamentals.component';
import { Demo1Component } from './demo/demo1.component';
import { Demo2Component } from './demo/demo2.component';
import { Demo3Component } from './demo/demo3.component';
import { Demo6Component } from './demo/demo6.component';
import { Demo7Component } from './demo/demo7.component';
import { Demo8Component } from './demo/demo8.component';


@NgModule({
  declarations: [
    FundamentalsComponent,
    Demo1Component,
    Demo2Component, Demo2bComponent,
    Demo3Component,
    Demo4Component,
    Demo5Component,
    Demo6Component,
    Demo7Component,
    Demo8Component
  ],
  imports: [
    CommonModule,
    FundamentalsRoutingModule,
    ReactiveFormsModule
  ]
})
export class FundamentalsModule { }
