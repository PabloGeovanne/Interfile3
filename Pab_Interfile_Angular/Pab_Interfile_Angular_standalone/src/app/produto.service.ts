import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'https://localhost:5001/api/produtos'; // URL da sua API

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  getProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  criarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  atualizarProduto(id: number, produto: Produto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, produto);
  }

  deletarProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
