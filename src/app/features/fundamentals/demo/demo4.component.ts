import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo4',
  template: `
    <h2>Conditional Validator</h2>
    <form [formGroup]="form" (submit)="save()">
      <input type="checkbox" formControlName="isCompany"> Are you a Company?
      
      <input
        formControlName="name"
        class="form-control"
        [ngClass]="{'is-invalid': form.get('name')?.invalid && form.dirty}"
        type="text" placeholder="enter your company name"
      >

      <small *ngIf="form.get('vatCF')?.errors?.['vatCF']">Wrong PI / CF</small>
      <input
        formControlName="vatCF"
        class="form-control"
        [ngClass]="{'is-invalid': form.get('vatCF')?.invalid && form.dirty}"
        type="text" [placeholder]="form.get('isCompany')?.value ? 'enter your VAT' : 'enter your CF'"
      >
      <!--<small>{{}}</small>-->

      <button [disabled]="form.invalid">submit</button>
    </form>
    <pre>{{form.value | json}}</pre>
    <pre>Valid: {{form.valid}}</pre>
    
    {{render()}}
  `,
})
export class Demo4Component  {
  // SOLUTION 2: FOrm Builder
  form = this.fb.nonNullable.group({
    isCompany: true,
    name: ['', [Validators.required, Validators.minLength(3)] ],
    vatCF: ['' ],
  })

  constructor(private fb: FormBuilder) {
    this.form.get('isCompany')?.valueChanges
      .subscribe(isCompany => {
        if (isCompany) {
          this.setCompany()
        } else {
          this.setUser()
        }
        this.form.get('vatCF')?.updateValueAndValidity();
      })
    this.setCompany();
  }

  setCompany() {
    this.form.get('name')?.enable();
    this.form.get('vatCF')?.setValidators([Validators.required, Validators.minLength(3), c => vatCFValidator(c, 11)])
  }

  setUser() {
    this.form.get('name')?.disable();
    this.form.get('vatCF')?.setValidators([Validators.required, Validators.minLength(3), c => vatCFValidator(c, 16)])
  }

  save() {
    console.log(this.form.value)
  }


  render() {
    console.log('render')
  }
}
// custom validator (alpha numeric)
// const ALPHA_NUMERIC_REGEX = /^([A-Za-z]|[0-9]|_)+$/;

export function vatCFValidator(c: AbstractControl, requiredLength = 11): ValidationErrors | null {
  if (c.value && c.value.length !== requiredLength) {
    return { vatCF: true };
  }

  return null;
}
