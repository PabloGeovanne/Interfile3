import { Routes } from '@angular/router';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';

export const routes: Routes = [
  { path: 'produtos', component: ProdutoListaComponent },
  { path: '', redirectTo: '/produtos', pathMatch: 'full' }
];
