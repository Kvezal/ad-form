import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {IFormConfig} from "../form.interface";
import {FormService} from "../form.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form-group',
  template: '<ng-template #controlContainer></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormGroupComponent implements OnInit {
  @Input()
  public config!: IFormConfig;

  @Input()
  public form!: FormGroup;

  @Input()
  public environment: string = '';

  @ViewChild('controlContainer', {
    static: true,
    read: ViewContainerRef,
  })
  public controlContainerRef!: ViewContainerRef;

  constructor(
    private _formService: FormService,
  ) { }

  public ngOnInit(): void {
    this._formService.createFormInTemplate({
      config: this.config,
      controlContainerRef: this.controlContainerRef,
      componentEnvironment: this.environment,
    });
  }
}
