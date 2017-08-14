import { Component, Input, Output, forwardRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface INg2Selection {
  id: string;
  text: string;
}

@Component({
  selector: 'my-select',
  templateUrl: './my-select.component.html',
  styleUrls: ['./my-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MySelectComponent),
      multi: true
    }
  ]
})

// Wrapper component for ng2-select which has support for ngModel
export class MySelectComponent implements ControlValueAccessor {

  // inner property storing the selection as ng2-select expects to get it => { id: "someId", text: "someName"}
  formattedSelection: INg2Selection[];

  // Options for the select box
  @Input() 	options: INg2Selection[];

  // Placeholder when no selection
  @Input() 	placeholder: string;

  // The selected option (key only) - input and output propegated to the ngModel
  @Input() 	selectedValue: string;

  // select event - fires when a new value is selected
  @Output() select = new EventEmitter();

  constructor() { }

  writeValue(value: any) {
    if (value) {
      this.selectedValue = value;
      this.formattedSelection = [this.options.find((o) => o.id === this.selectedValue)];
      this.select.emit(this.selectedValue);
    } else {
      this.selectedValue = null;
      this.formattedSelection = [];
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  onSelect(event) {
    if (this.selectedValue === event.id) { return; }
    this.selectedValue = event.id;
    this.propagateChange(this.selectedValue);
    this.select.emit(this.selectedValue);
  }

}
