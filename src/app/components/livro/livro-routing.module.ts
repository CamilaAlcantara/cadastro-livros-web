import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivroListComponent } from './livro-list/livro-list.component';

const routes: Routes = [
   { 
    path: '', 
    component: LivroListComponent,
    title: 'Catálogo de Livros - Gestão de Cadastro de Livros' 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivroRoutingModule { }
