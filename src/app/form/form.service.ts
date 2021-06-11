import {ComponentFactoryResolver, Injectable} from '@angular/core';
import {
  ICreateControlParams,
  ICreateControlsParams,
  ICreateInTemplate,
  IFormConfig,
  IFormControl
} from "./form.interface";
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";


@Injectable()
export class FormService {
  private _formMap = new Map<string, FormGroup>();
  private _configMap = new Map<string, IFormConfig>();

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  public initFormFromFormConfig(config: IFormConfig): FormGroup {
    const formGroup = this._createFormGroupFromConfig(config);
    this._formMap.set(config.formName, formGroup);
    this._configMap.set(config.formName, config);
    return formGroup;
  }

  public createFormInTemplate(params: ICreateInTemplate): void {
    const {config, controlContainerRef, componentEnvironment} = params;
    const form = this.getFormByName(config.formName);
    this._createControls({
      form: form,
      fields: config.controls,
      controlContainerRef,
      componentEnvironment,
    });
  }

  public getFormByName(formName: string): FormGroup {
    const formGroup = this._formMap.get(formName);
    if (!formGroup) {
      throw new Error(`Формы с именем "${formName}" не существует`);
    }
    return formGroup as FormGroup;
  }

  private _createFormGroupFromConfig(config: IFormConfig): FormGroup {
    const formGroup = new FormGroup({});
    config.controls.forEach((field: IFormConfig | IFormControl) => {
      const subConfig = field as IFormConfig;
      if (subConfig.formName) {
        const subFormGroup = this._createFormGroupFromConfig(subConfig);
        formGroup.addControl(subConfig.formName, subFormGroup);
        return;
      }
      const controlParams = field as IFormControl;
      const control = this._getFormControl(controlParams);
      formGroup.addControl(controlParams.controlName, control);
    });
    return formGroup;
  }

  private _getFormControl(controlParams: IFormControl): FormControl {
    const validators = this._getControlValidators(controlParams);
    const control = new FormControl(controlParams.value, validators);
    controlParams.disabled ? control.disable() : control.enable();
    return control;
  }

  private _getControlValidators(controlParams: IFormControl): ValidatorFn[] {
    const customValidators = controlParams.validators || [];
    const validators = [...customValidators];
    if (controlParams.required) {
      validators.push(Validators.required);
    }
    return validators;
  }

  private _createControls(params: ICreateControlsParams): void {
    const {form, fields = [], formGroupName = [], controlContainerRef, componentEnvironment} = params;
    fields.forEach((field: IFormConfig | IFormControl) => {
      const config = field as IFormConfig;
      const canDisplay = this._checkEnvironment(config, componentEnvironment);
      if (!canDisplay) {
        return;
      }
      if (config.formName) {
        return this._createControls( {
          ...params,
          formGroupName: [...formGroupName, config.formName],
          fields: config.controls,
        });
      }
      const control = field as IFormControl;
      this._createControl({
        form: formGroupName.length === 0 ? form : form.get(formGroupName) as FormGroup,
        control,
        controlContainerRef,
      });
    })
  }

  private _checkEnvironment(config: IFormConfig, componentEnvironment: string = ''): boolean {
    return typeof config.environment === 'undefined'
      || config.environment === componentEnvironment
      || componentEnvironment === '';
  }

  private _createControl(params: ICreateControlParams): void {
    const {form, control, controlContainerRef} = params;
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory<any>(control.component);
    const componentRef = controlContainerRef.createComponent(componentFactory);
    componentRef.instance.formGroup = form;
    componentRef.instance.formControlName = control.controlName;
    componentRef.instance.options = control.options;
  }
}
