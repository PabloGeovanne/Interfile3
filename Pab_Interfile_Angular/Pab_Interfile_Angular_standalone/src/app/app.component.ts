import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>Interfile - Catalogo Lista de Produtos</h1>
    <nav>
      <a routerLink="/produtos">Lista de Produto</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }
