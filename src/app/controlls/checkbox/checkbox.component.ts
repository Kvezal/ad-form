import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export interface IOptions {
  label: string;
}

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements ControlValueAccessor {
  private _options: any;
  @Input()
  public set options(value: any) {
    console.log(value);
    this._options = value;
  }
  public get options(): any {
    return this._options;
  }

  public value: boolean = false;

  public onChange!: (value: any) => void;
  public onTouched!: () => void;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: boolean): void {
    this.value = value;
    this._changeDetectorRef.markForCheck();
  }

  public updateValue(event: Event): void {
    const value = (event.target as HTMLInputElement).checked;
    this.onChange(value);
  }

}
