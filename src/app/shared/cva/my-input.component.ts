import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-my-input',
  template: `
    <div>
      <label>{{label}}</label>
      <input
        [formControl]="input"
        type="text"
        class="form-control"
        [placeholder]="placeholder"
        (blur)="onTouch()"
      >
    </div>
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MyInputComponent), multi: true},
  ]
})
export class MyInputComponent implements ControlValueAccessor {
  @Input() label: string = ''
  @Input() placeholder: string = ''
  input = new FormControl()
  onTouch!: () => void;

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

}
