import { Component } from '@angular/core';
import { ProdutoServico } from '../produto.service';
import { Produto } from '../produto.model';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.css']
})
export class ProdutoListaComponent implements OnInit {

  produtos: Produto[] = [];

  constructor(private produtoServico: ProdutoServico) { }

  ngOnInit(): void {
      this.produtoServico.getProdutos().subscribe(data => {
          this.produtos = data;
      });
  }
  
  deletarProduto(id: number): void {
    this.produtoServico.deletarProduto(id).subscribe(() => {
      this.produtos = this.produtos.filter(produto => produto.Id !== id);
    });
    
  }
}

