import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";


@Component({
  selector: 'app-checkbox-control',
  templateUrl: './checkbox-control.component.html',
  styleUrls: ['./checkbox-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxControlComponent {
  @Input()
  public formGroup!: FormGroup;

  @Input()
  public formControlName!: string;

  @Input()
  public options?: any;

  constructor(public changeDetectorRef: ChangeDetectorRef) {
  }
}
