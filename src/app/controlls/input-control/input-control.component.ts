import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputControlComponent {
  @Input()
  public formGroup!: FormGroup;

  @Input()
  public formControlName!: string;
}
