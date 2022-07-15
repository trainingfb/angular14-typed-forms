import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';


@Component({
  selector: 'app-demo8',
  template: `
    <form [formGroup]="form">
      <div formArrayName="items">

        <div 
          [formGroupName]="i" class="d-flex align-items-center gap-3"  
          *ngFor="let item of items.controls; let i = index; let last = last"
        >
          <i class="fa fa-exclamation-circle fa-2x text-danger" *ngIf="item.invalid"></i>
          <i class="fa fa-check-circle fa-2x text-success" *ngIf="item.valid"></i>

          <input formControlName="name" placeholder="Item name *" class="form-control ml-2 mr-2">
          <input formControlName="price" placeholder="Item price *" class="form-control mr-2">

          <i class="fa fa-trash-o fa-2x mr-2" (click)="removeItem(item)" *ngIf="items.controls.length > 1"></i>
          <i class="fa fa-plus-circle fa-2x" (click)="addItem()" *ngIf="item?.valid && last"></i>
        </div>
      </div>

      <hr>
      <button
        class="btn btn-primary"
        (click)="submit()"
        [disabled]="form.invalid">Submit</button>
    </form>

    <pre>
      {{form.value | json}}
    </pre>

  `,
})
export class Demo8Component {

  form = this.fb.group({
    items: this.fb.array<Product>([])
  });
  items = this.form.get('items') as FormArray;

  constructor(private fb: FormBuilder) {
    // get value by index
    // this.form.get('items.0')?.value.
    this.addItem();
  }

  addItem(): void {
    this.items.push(
      // solution 1
      /*new FormGroup<Product>({
        name: new FormControl(''),
        price: new FormControl<number | null>(null)
      })*/
      // solution 2
      this.fb.group<Product>({
        name: this.fb.control('', { validators: [Validators.required]}),
        price: new FormControl(null, { validators: [Validators.required]})
      })
    )
  }

  removeItem(item: AbstractControl): void {
    const index = this.items.controls.indexOf(item);
    this.items.removeAt(index);
  }

  submit() {
    alert('ITEMS: ' + JSON.stringify(this.form.value.items));
  }
}

interface Product {
  name: FormControl<string | null>;
  price: FormControl<number | null>;
  // price: number | null;
}
