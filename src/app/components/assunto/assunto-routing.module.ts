import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssuntoListComponent } from './assunto-list/assunto-list.component';

const routes: Routes = [
  { path: '', component: AssuntoListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssuntoRoutingModule { }
