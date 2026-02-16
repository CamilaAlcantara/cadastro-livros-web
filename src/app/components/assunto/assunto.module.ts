import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssuntoRoutingModule } from './assunto-routing.module';
import { AssuntoFormComponent } from './assunto-form/assunto-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AssuntoFormComponent
  ],
  imports: [
    CommonModule,
    AssuntoRoutingModule,
    ReactiveFormsModule
  ]
})
export class AssuntoModule { }
