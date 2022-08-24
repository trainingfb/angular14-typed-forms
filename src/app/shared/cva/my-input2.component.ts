import { Component, forwardRef, Injector, Input, OnInit, Optional } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, NgControl, ValidationErrors,
  Validator
} from '@angular/forms';

// TODO / FIX
// validate does not work anymore since we have remvoed NG_VALIDATORS
// find alternative to provide: NG_VALIDATORS


const ALPHA_NUMERIC_REGEX = /^([A-Za-z]|[0-9]|_)+$/;

@Component({
  selector: 'app-my-input2',
  template: `
   <div>
     <div *ngIf="ngControl.errors?.['required'] ">this field is required</div>
     <div *ngIf="ngControl.errors?.['minlength'] ">this field is too short</div>
     <div *ngIf="ngControl.errors?.['alphaNumeric'] ">no symbols allowed</div>

     <label>{{label}}</label>
     <input
       [formControl]="input"
       type="text" 
       class="form-control"
       [ngClass]="{'is-invalid': ngControl.invalid}"
       [placeholder]="placeholder"
       (blur)="onTouch()"
     >
   </div>
   
   <!--<pre>{{ngControl?.errors | json}}</pre>-->
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MyInput2Component), multi: true},
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => MyInput2Component), multi: true}
  ]
})
export class MyInput2Component implements ControlValueAccessor, Validator {
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() alphaNumericOnly: boolean = false;
  input = new FormControl()
  onTouch!: () => void;
  ngControl!: NgControl;

  constructor( private inj: Injector) {}

  ngOnInit() {
    this.ngControl = this.inj.get(NgControl)
  }

  registerOnChange(fn: any): void {
    this.input.valueChanges.subscribe(fn)
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.input.disable()
    } else {
      this.input.enable();
    }
  }

  writeValue(text: string): void {
    this.input.setValue(text, { emitEvent: false })
  }

  validate(c: AbstractControl): ValidationErrors | null {
    console.log(c.value, this.alphaNumericOnly)
    if (
      this.alphaNumericOnly &&
      c.value &&
      !c.value.match(ALPHA_NUMERIC_REGEX)
    ) {
      return { alphaNumeric: true }
    }
    return null;
  }
}
