import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssuntoRoutingModule } from './assunto-routing.module';
import { AssuntoFormComponent } from './assunto-form/assunto-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AssuntoListComponent } from './assunto-list/assunto-list.component';


@NgModule({
  declarations: [
    AssuntoFormComponent,
    AssuntoListComponent
  ],
  imports: [
    CommonModule,
    AssuntoRoutingModule,
    ReactiveFormsModule
  ]
})
export class AssuntoModule { }
