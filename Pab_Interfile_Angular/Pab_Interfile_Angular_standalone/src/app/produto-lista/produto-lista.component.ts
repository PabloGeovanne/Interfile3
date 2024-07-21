import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.scss']
})
export class ProdutoListaComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.getProdutos();
  }

  getProdutos(): void {
    this.produtoService.getProdutos().subscribe((produtos) => {
      this.produtos = produtos;
    });
  }

  deletarProduto(Id: number): void {
    this.produtoService.deletarProduto(Id).subscribe(() => {
      this.produtos = this.produtos.filter(produto => produto.Id !== Id);
    });
  }
}
