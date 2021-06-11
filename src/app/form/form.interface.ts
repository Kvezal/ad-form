import {FormGroup, ValidatorFn} from "@angular/forms";
import {ViewContainerRef} from "@angular/core";

export interface IFormConfig<T = any> {
  formName: string;
  controls: Array<IFormConfig<T> | IFormControl<T>>;
  environment?: string;
}

export interface IFormControl<T = any> {
  component: T;
  controlName: string;
  required?: boolean;
  disabled?: boolean;
  value?: any;
  validators?: ValidatorFn[];
  options?: any;
}

export interface ICreateControlsParams {
  form: FormGroup;
  fields: Array<IFormConfig | IFormControl>;
  controlContainerRef: ViewContainerRef;
  componentEnvironment?: string;
  formGroupName?: string[];
}

export interface ICreateControlParams {
  form: FormGroup;
  control: IFormControl;
  controlContainerRef: ViewContainerRef;
}

export interface ICreateInTemplate {
  controlContainerRef: ViewContainerRef;
  config: IFormConfig;
  componentEnvironment: string;
}
