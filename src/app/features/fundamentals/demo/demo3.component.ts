import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo3',
  template: `
    <h2>Form Group, Form Builder & Custom Validator</h2>
    <form [formGroup]="form" (submit)="save()">
      <small *ngIf="form.get('name')?.errors?.['required'] && form.dirty">required</small>
      <small *ngIf="form.get('name')?.errors?.['minlength'] && form.dirty">Too short</small>
      <input 
        formControlName="name" 
        class="form-control"
        [ngClass]="{'is-invalid': form.get('name')?.invalid && form.dirty}"
        type="text" placeholder="enter your name">

      <small *ngIf="form.get('vat')?.errors?.['alphaNumeric'] && form.dirty">You cannot use symbols </small>
      <input 
        formControlName="vat" 
        class="form-control"
        [ngClass]="{'is-invalid': form.get('vat')?.invalid && form.dirty}"
        type="text" placeholder="enter your VAT"
      >
      
      <button [disabled]="form.invalid">submit</button>
    </form>
    <pre>{{form.value | json}}</pre>
    <pre>Valid: {{form.valid}}</pre>
  `,
})
export class Demo3Component {
  // SOLUTION 1: Form Group and FormControl
  /*form = new FormGroup({
    name: new FormControl('', [
      Validators.required, Validators.minLength(3),
    ]),
    vat: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), alphaNumericValidator],
      nonNullable: true
    })
  })*/

  // SOLUTION 2: FOrm Builder
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)] ],
    vat: ['', [Validators.required, Validators.minLength(3), alphaNumericValidator] ],
  })

  constructor(private fb: FormBuilder) {}

  save() {
    console.log(this.form.value.vat)
  }
}

// custom validator (alpha numeric)
// const ALPHA_NUMERIC_REGEX = /^([A-Za-z]|[0-9]|_)+$/;
const ALPHA_NUMERIC_REGEX = /^\w+$/
export function alphaNumericValidator(c: FormControl): ValidationErrors | null {
  if (c.value && !c.value.match(ALPHA_NUMERIC_REGEX)) {
    return { alphaNumeric: true };
  }

  return null;
}
