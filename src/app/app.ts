import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';     
import { Produto } from './shared/models/produto';
import { Navbar } from "./navbar/navbar";
import { Cards } from "./cards/cards";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, Navbar, Cards],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  title = 'prova-angular2';

  produtos: Produto[] = [
    new Produto('Galeões de Ouro', 50, 15.90, 0, 'galeoes.jpg'),
    new Produto('Espada Mata Serpentes de Gryffindor', 5, 899.90, 0, 'espada_mata_serpentes.webp'),
    new Produto('Varinha do Professor Snape', 15, 149.90, 0, 'varinha_snape.webp'),
    new Produto('Varinha das Varinhas (Elder Wand)', 8, 299.90, 0, 'varinha_elder_wand.webp'),
    new Produto('Varinha do inominável', 10, 189.90, 0, 'varinha_do_que_nao_pode_ser_nomeado.webp'),
    new Produto('Mapa do Maroto', 25, 79.90, 0, 'mapa_maroto.jpg'),
    new Produto('Chapéu Seletor', 12, 249.90, 0, 'chapeu_seletor.jpg'),
    new Produto('Caldeirão de Poções', 20, 129.90, 0, 'caldeirao.webp'),
    new Produto('Caixa de Ovos de Dragão', 30, 45.90, 0, 'caixa_ovos.webp'),
    new Produto('Livro de Poções Avançadas', 18, 89.90, 0, 'livro_pocoes.jpeg'),
    new Produto('Moto Voadora', 3, 1499.90, 0, 'moto_voadora.webp'),
    new Produto('Ticket Plataforma 9¾', 100, 12.90, 0, 'ticket_plataforma_934.jpg'),
    new Produto('Vassoura Nimbus 2000', 15, 599.90, 0, 'vassoura_nimbus_2k.webp'),
    new Produto('Vassoura Firebolt', 8, 1299.90, 0, 'vassoura_firebolt.webp')
  ];

 
  searchTerm: string = '';
  posicaoSelecionada: string = '';

  get produtosFiltrados(): Produto[] {
    if (!this.searchTerm.trim()) return this.produtos;

    const termo = this.searchTerm.toLowerCase();
    return this.produtos.filter(p =>
      p.nome.toLowerCase().includes(termo)
    );
  }

  onBuscar(termo: string) {
    this.searchTerm = termo;
  }

  produtosAdicionadosAoCarrinho: Produto[] = [];

  adicionarProdutoAocarrinho(produto: Produto) {

    const qtd = produto.adicionadoCarrinho ?? 0;
    if (!qtd || qtd <= 0) {
      produto.adicionadoCarrinho = 1;
    }
    if (produto.adicionadoCarrinho > produto.estoque) {
      produto.adicionadoCarrinho = produto.estoque;

    }
    if (!this.produtosAdicionadosAoCarrinho.includes(produto)) {
      this.produtosAdicionadosAoCarrinho.push(produto);
    }
  }
  removerProduto(produto: Produto) {
    produto.adicionadoCarrinho = 0;
    this.produtosAdicionadosAoCarrinho = this.produtosAdicionadosAoCarrinho.filter(p => p !== produto);
  }
  
  limparCarrinho() {
    this.produtosAdicionadosAoCarrinho.forEach(p => p.adicionadoCarrinho = 0);
    this.produtosAdicionadosAoCarrinho = [];
  }

  get carrinhoTotal(): number {
    return this.produtosAdicionadosAoCarrinho.reduce((sum, p) => sum + (p.valor * (p.adicionadoCarrinho || 0)), 0);
  }

  somenteInseridosNoCarrinho(): Produto[] {
    return this.produtos.filter(p => p.adicionadoCarrinho && p.adicionadoCarrinho > 0);
  }
}