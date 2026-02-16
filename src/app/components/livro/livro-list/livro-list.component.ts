import { Component, OnInit } from '@angular/core';
import { LivroService } from 'src/app/services/livro.service';
import { AlertaService } from 'src/app/services/alerta.service';
import { LivroResponse } from 'src/app/models/livro';
import { RelatorioService } from 'src/app/services/relatorio.service';

declare var bootstrap: any;

@Component({
  selector: 'app-livro-list',
  templateUrl: './livro-list.component.html',
  styleUrls: ['./livro-list.component.scss']
})
export class LivroListComponent implements OnInit {

  livros: LivroResponse[] = [];
  livroSelecionado: LivroResponse | null = null;
  private modalInstance: any;
  livroParaExcluir: LivroResponse | null = null;
  private modalConfirmacaoInstance: any;

  constructor(
    private service: LivroService,
     private serviceRelatorio: RelatorioService,
    public alerta: AlertaService 
  ) { }

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros() {
    this.service.listar().subscribe({
      next: (dados) => this.livros = dados,
      error: (err) => {
        console.error('Erro ao carregar livros', err);
        this.alerta.exibir('Erro ao carregar a lista de livros.', 'danger');
      }
    });
  }

  novoLivro() {
    this.livroSelecionado = null; 
    this.abrirModal();
  }

  editar(livro: LivroResponse) {
    this.livroSelecionado = livro;
    this.abrirModal();
  }

  private abrirModal() {
    const element = document.getElementById('modalLivro');
    this.modalInstance = new bootstrap.Modal(element);
    this.modalInstance.show();
  }

  fecharModalERecarregar() {
    this.modalInstance.hide();
    this.carregarLivros();
  }

  prepararExclusao(livro: LivroResponse) {
    this.livroParaExcluir = livro; 
    const element = document.getElementById('modalConfirmacaoLivro');
    this.modalConfirmacaoInstance = new bootstrap.Modal(element);
    this.modalConfirmacaoInstance.show();
  }

  confirmarExclusao() {
    if (this.livroParaExcluir) {
      this.service.deletar(this.livroParaExcluir.codl).subscribe({
        next: () => {
          this.modalConfirmacaoInstance.hide(); 
          this.carregarLivros(); 
          this.alerta.exibir('Livro excluído com sucesso!', 'success');
          this.livroParaExcluir = null;
        },
        error: () => {
          this.alerta.exibir('Erro ao tentar excluir o livro.', 'danger');
        }
      });
    }
  }

 
  imprimirRelatorio() {
    this.serviceRelatorio.downloadPdfRelatorio().subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'relatorio-livros-por-autor.pdf';
        link.click();
       
        window.URL.revokeObjectURL(url);
      },
      error: (erro) => {
        console.error('Erro ao gerar relatório:', erro);
        this.alerta.exibir('Erro ao baixar o relatório PDF.', 'danger');
      }
    });
  }
}