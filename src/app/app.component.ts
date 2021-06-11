import {AfterViewInit, Component, OnInit} from '@angular/core';
import {IFormConfig} from "./form/form.interface";
import {FormService} from "./form/form.service";
import {FormGroup} from "@angular/forms";
import {APP_FORM_CONFIG} from "./app-form-config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public config: IFormConfig = APP_FORM_CONFIG;

  public form: FormGroup = this._formService.initFormFromFormConfig(this.config);

  constructor(private _formService: FormService) {}

  ngOnInit() {
    // setTimeout(() => {
    //   this.form.patchValue({
    //     test2: {
    //       control1: 'Max',
    //       control2: 'Voropay',
    //       control3: true,
    //     },
    //   })
    // }, 2000);
    const form = this._formService.getFormByName('test');
    form.valueChanges.subscribe((value) => {
      console.log(value);
    });
    form.patchValue({
      test2: {
        test: {
          subcontrol1: 'Pavel',
        }
      }
    });
  }

  submit(): void {
    const form = this._formService.getFormByName('test').get([
      'test2',
      'control1',
    ]);
    console.log(form?.value);
  }
}

