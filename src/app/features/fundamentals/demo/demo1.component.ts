import { Component, OnInit } from '@angular/core';
import { ControlConfig, FormControl } from '@angular/forms';

@Component({
  selector: 'app-demo1',
  template: `
    <h1>Form Control</h1>
    <input type="text" [formControl]="input1" placeholder="Input 1">
    <input type="text" [formControl]="input2" placeholder="Input 2">
    <input type="text" [formControl]="input3" placeholder="Input 3">
    
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
    this.input3.setValue('ciao')
    this.input3.setValue(null)
    this.input1.reset()
    this.input2.reset()
    console.log(this.input1.value)
    console.log(this.input2.value)
    console.log(this.input2.getRawValue())

    this.input2.valueChanges
      .subscribe(res => {
        console.log(res)
      })
  }

}
