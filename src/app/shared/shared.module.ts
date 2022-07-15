import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MyColorPickerComponent } from './cva/my-color-picker.component';
import { MyInputComponent } from './cva/my-input.component';
import { MyInput2Component } from './cva/my-input2.component';
import { MyLeafletComponent } from './cva/my-leaflet.component';
import { MyRateComponent } from './cva/my-rate.component';



@NgModule({
  declarations: [
    MyInputComponent, MyInput2Component,
    MyColorPickerComponent,
    MyRateComponent,
    MyLeafletComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    MyInputComponent, MyInput2Component,
    MyColorPickerComponent,
    MyRateComponent,
    MyLeafletComponent
  ]
})
export class SharedModule { }
