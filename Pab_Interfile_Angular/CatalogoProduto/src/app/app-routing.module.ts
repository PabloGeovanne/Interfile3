import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProdutoListaComponent } from "./produto-lista/produto-lista.component";

const routes: Routes = [
    { path:'produtos', component: ProdutoListaComponent },
    { path: '', redirectTo: '/produtos', pathMatch: 'full' }
];


@NgModule({
    import: [RouteModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }