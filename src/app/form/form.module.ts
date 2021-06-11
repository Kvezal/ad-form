import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroupComponent} from "./form-group/form-group.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FormService} from "./form.service";

@NgModule({
  declarations: [FormGroupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [FormService],
  exports: [FormGroupComponent],
})
export class FormModule { }
