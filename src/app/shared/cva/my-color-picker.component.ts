import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-my-color-picker',
  template: `
    <div class="d-flex">
      <div 
        class="cell"
        [ngClass]="{'active': c === selectedColor}"
        *ngFor="let c of colors"
        [style.background-color]="c"
        (click)="onSelectColorHandler(c)"
      ></div>
    </div>
  `,
  styles: [`
    .cell {width: 30px;height: 30px;}
    .active { border: 2px solid black}
  `],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: MyColorPickerComponent, multi: true }
  ]
})
export class MyColorPickerComponent implements ControlValueAccessor {
  @Input() colors = [
    '#F44336', '#90CAF9', '#FFCDD2', '#69F0AE', '#AED581', '#FFE082'
  ];
  selectedColor: string | null = null;
  onChanged!: (value: string | null) => void
  onTouched!: () => void

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(color: string): void {
    this.selectedColor = color;
  }

  onSelectColorHandler(color: string): void {
    this.selectedColor = color;
    this.onChanged(this.selectedColor);
    this.onTouched();
  }

}
