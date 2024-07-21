import { Component, Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Produto } from '../produto.model';

@Inject({
    provideIn: 'root'
})
export class ProdutoServico{
    private apiUrl = 'http://localhost:5001/api/produtos'; //EndPoint Produtos

    constructor(private http: HttpClient) { }

    getProdutos(): Observable<Produto[]>{
        return this.http.get<Produto[]>(this.apiUrl);
    }

    getProduto(id: number): Observable<Produto> {
        return this.http.get<Produto>('${this.apiUrl}/${id}');
    }

    createProduto(produto: Produto): Observable<Produto> {

        return this.http.post<Produto>(this.apiUrl, produto);
    }

    updateProduto(id: number, produto: Produto): Observable<void> {

        return this.http.put<void>('${this.apiUrl}/${id}', produto);
    }

    deletarProduto(id: number): Observable<void>{
        return this.http.delete<void>('${this.apiUrl}/${id}');
    }
}