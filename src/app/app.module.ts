import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {InputComponent} from './controlls/input/input.component';
import {CheckboxComponent} from './controlls/checkbox/checkbox.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CheckboxControlComponent} from './controlls/checkbox-control/checkbox-control.component';
import {InputControlComponent} from './controlls/input-control/input-control.component';
import {FormModule} from "./form/form.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    CheckboxComponent,
    CheckboxControlComponent,
    InputControlComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
