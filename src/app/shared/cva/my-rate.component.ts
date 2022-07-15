import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type Rate = 0 | 1 | 2 | 3 | 4 | 5;

@Component({
  selector: 'app-my-rate',
  template: `
    <i
      *ngFor="let star of [null,null,null, null, null]; let i = index"
      style="cursor: pointer"
      class="fa"
      (click)="onClickStarHandler(i+1)"
      [ngClass]="{
          'fa-star': i <= value-1,
          'fa-star-o': i > value-1
        }"
    ></i>
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: MyRateComponent, multi: true}
  ]
})
export class MyRateComponent implements ControlValueAccessor {
  value: Rate = 0;
  onChanged!: (val: Rate) => void;
  onTouched!: () => void;

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(val: Rate): void {
    this.value = val;
  }

  onClickStarHandler(newRate: number) {
    this.value = newRate as Rate;     // update UI
    this.onChanged(this.value);  // update Model / Dirty State
    this.onTouched();       // update Touch State
  }

}
