import {IFormConfig} from "./form/form.interface";
import {InputControlComponent} from "./controlls/input-control/input-control.component";
import {CheckboxControlComponent} from "./controlls/checkbox-control/checkbox-control.component";

export const APP_FORM_CONFIG: IFormConfig = {
  formName: 'test',
  controls: [
    {
      formName: 'test2',
      environment: 'environment1',
      controls: [
        {
          component: InputControlComponent,
          controlName: 'control1',
          value: 'control1',
        },
        {
          component: InputControlComponent,
          controlName: 'control2',
          value: 'control2',
        },
        {
          component: CheckboxControlComponent,
          controlName: 'control3',
          value: false,
          options: {
            label: 'label',
          }
        },
        {
          formName: 'test',
          controls: [
            {
              component: InputControlComponent,
              controlName: 'subcontrol1',
              value: 'subcontrol1',
            },
            {
              component: InputControlComponent,
              controlName: 'subcontrol2',
              value: 'subcontrol2',
            },
            {
              component: CheckboxControlComponent,
              controlName: 'subcontrol3',
              value: false,
            },
          ]
        }
      ]
    },
    {
      formName: 'test4',
      environment: 'environment2',
      controls: [
        {
          component: InputControlComponent,
          controlName: 'other control 1',
          value: 'other control 1',
        },
        {
          component: CheckboxControlComponent,
          controlName: 'other control 2',
          value: false,
        },
      ]
    }
  ],
};
