import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorRoutingModule } from './autor-routing.module';
import { AutorListComponent } from './autor-list/autor-list.component';
import { AutorFormComponent } from './autor-form/autor-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AutorListComponent,
    AutorFormComponent
  ],
  imports: [
    CommonModule,
    AutorRoutingModule,
    ReactiveFormsModule 
  ]
})
export class AutorModule { }
