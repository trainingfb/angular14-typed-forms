import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo1',
  template: `
    <form [formGroup]="form">
      <input type="text" formControlName="name">

      <app-my-leaflet 
        formControlName="location"
        [zoom]="5"
      ></app-my-leaflet>
      
      <app-my-input2
        formControlName="surname" 
        label="Surname" 
        placeholder="Your surname"
        [alphaNumericOnly]="true"
      ></app-my-input2>
<!--      <div *ngIf="form.get('surname')?.errors?.['alphaNumeric'] ">no symbols allowed</div>-->
      
      <app-my-color-picker formControlName="color" [colors]="['red', 'cyan', 'pink']"></app-my-color-picker>
      <app-my-rate formControlName="rate"></app-my-rate>
      
    </form>
    <pre>{{form.value | json}}</pre>
    <pre>Valid {{form.valid | json}}</pre>
    <pre>Dirty {{form.dirty | json}}</pre>
    <pre>Touched {{form.touched | json}}</pre>
    <pre>Error Surname {{form.get('surname')?.errors | json}}</pre>

  `,
})
export class Demo1Component {
  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    surname: ['', [Validators.required, Validators.minLength(3)]],
    color: 'red',
    rate: 4,
    location: [[43, 13]]
  })

  constructor(private fb: FormBuilder) {
    setTimeout(() => {
      this.form.patchValue({
        color: 'cyan',
        surname: 'pippo',
        location: [44, 13]
      })
      // this.form.get('surname')?.disable();
    }, 1000)
  }
}
