import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo5',
  template: `
    <h1>Nested Form Group</h1>
    
    <form [formGroup]="form" (submit)="save()">
      <input formControlName="orderNumber" type="text" class="form-control" placeholder="n° order"
             [ngClass]="{'is-invalid': form.get('orderNumber')?.invalid && form.dirty}"
      >

      <h1>
        <i class="fa fa-check" style="color: green" *ngIf="form.get('user')?.valid"></i>
        User Info
      </h1>
      <div formGroupName="user">
        <input formControlName="name" class="form-control" type="text" placeholder="name"
               [ngClass]="{'is-invalid': form.get('user.name')?.invalid && form.dirty}">
        <input formControlName="surname" class="form-control" type="text" placeholder="surname"
               [ngClass]="{'is-invalid': form.get('user.surname')?.invalid && form.dirty}">
      </div>
  
      <h1>
        <i class="fa fa-check" style="color: green" *ngIf="form.get('car')?.valid"></i>
        Car Info
      </h1>
      <div formGroupName="car" *ngIf="form.get('car') as car">
        <input formControlName="brand" class="form-control" type="text" placeholder="brand" 
               [ngClass]="{'is-invalid': car?.get('brand')?.invalid && form.dirty}"> 
        <input formControlName="name" class="form-control" type="text" placeholder="name"
               [ngClass]="{'is-invalid': car?.get('name')?.invalid && form.dirty}"
        >
      </div>
      
      <button (click)="resetForm()">Reset</button>
      <button type="submit" [disabled]="form.invalid">SEND</button>
    </form>
    <pre>{{form.value | json}}</pre>
  `,
})
export class Demo5Component  {
  form = this.fb.nonNullable.group({
    orderNumber: ['', Validators.required],
    user: this.fb.nonNullable.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
    }),
    car: this.fb.group({
      brand: ['', Validators.required],
      name: ['', Validators.required],
    }),

  })
  constructor(private fb: FormBuilder) { }

  save() {
    console.log(this.form.value)
  }

  resetForm() {
    this.form.reset()
  }
}
