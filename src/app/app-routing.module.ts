import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'autores' },
  { 
    path: 'autores', 
    loadChildren: () => import('./components/autor/autor.module').then(m => m.AutorModule) 
  },
  { 
    path: 'assuntos', 
    loadChildren: () => import('./components/assunto/assunto.module').then(m => m.AssuntoModule) 
  },
  { 
    path: 'livros', 
    loadChildren: () => import('./components/livro/livro.module').then(m => m.LivroModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
