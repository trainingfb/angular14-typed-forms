import { Component, OnInit } from '@angular/core';
import { ControlConfig, FormControl } from '@angular/forms';

@Component({
  selector: 'app-demo1',
  template: `
    <h1>Form Control</h1>
    <input type="text" [formControl]="input1" placeholder="Input 1">
    <input type="text" [formControl]="input2" placeholder="Input 2">
    <input type="text" [formControl]="input3" placeholder="Input 3">
    <pre>Input1: {{input1.value | json}}</pre>
    <pre>Input2: {{input2.value | json}}</pre>
    <pre>Input3: {{input3.value | json}}</pre>
    <hr>
    <button (click)="setValues()">Set Values</button>
    <button (click)="reset()">Reset</button>
  `,
})
export class Demo1Component {
  // see ControlConfig
  input1 = new FormControl('abc');
  input2 = new FormControl(123, { nonNullable: true });
  input3 = new FormControl<string | null>(null);

  constructor() {
    console.log(this.input1.value)
    console.log(this.input2.value)
    console.log(this.input3.value)
    console.log('-----')


    this.input2.valueChanges
      .subscribe(res => {
        console.log('input 2 changed', res)
      })
  }

  reset() {
    this.input1.reset()
    this.input2.reset()
    this.input3.reset()
    console.log(this.input1.value)  // null
    console.log(this.input2.value); // 123
    // console.log(this.input2.getRawValue())
    console.log(this.input3.value) // null
  }

  setValues() {
    // this.input1.setValue(123)   // NO! it's a string
    this.input1.setValue('one')
    // this.input2.setValue(null)  // NO! it's nonNullable
    this.input2.setValue(2)
    this.input3.setValue('three')
    // console.log(this.input2.getRawValue())
  }
}
