import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { CvaRoutingModule } from './cva-routing.module';
import { CvaComponent } from './cva.component';
import { Demo1Component } from './demo/demo1.component';
import { Demo2Component } from './demo/demo2.component';
import { Demo3Component } from './demo/demo3.component';


@NgModule({
  declarations: [
    CvaComponent,
    Demo1Component,
    Demo2Component,
    Demo3Component
  ],
  imports: [
    CommonModule,
    CvaRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CvaModule { }
