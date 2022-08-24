import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo1',
  template: `
    <form [formGroup]="form">
      <br>
      Name:
      <input type="text" formControlName="name" class="form-control" placeholder="Your name">
      
      <app-my-input
        formControlName="surname"
        label="Surname"
        placeholder="Your surname"
      ></app-my-input>
      
      <br><br>
      <app-my-input2
        formControlName="city" 
        label="City" 
        placeholder="Your City"
        [alphaNumericOnly]="true"
      ></app-my-input2>
      <!--<div *ngIf="form.get('surname')?.errors?.['alphaNumeric'] ">no symbols allowed</div>-->

      <br><br>
      
      <app-my-color-picker formControlName="color" [colors]="['red', 'cyan', 'pink']"></app-my-color-picker>

      <br><br>
      
      <app-my-rate formControlName="rate"></app-my-rate>

      <br><br>

      <app-my-leaflet
        formControlName="location"
        [zoom]="5"
      ></app-my-leaflet>
      
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
    city: ['', [Validators.required, Validators.minLength(3)]],
    color: 'red',
    rate: 4,
    location: [[43, 13]]
  })

  constructor(private fb: FormBuilder) {
    setTimeout(() => {
      // Disable Field
      // this.form.get('surname')?.disable()

      // Populate part of the form
      /*this.form.patchValue({
        color: 'cyan',
        surname: 'pippo',
        location: [44, 13]
      })*/
    }, 1000)
  }
}
