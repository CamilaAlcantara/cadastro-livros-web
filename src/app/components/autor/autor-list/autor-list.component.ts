import { Component, OnInit } from '@angular/core';
import { AutorService } from 'src/app/services/autor.service';
import { AlertaService } from 'src/app/services/alerta.service'; // Importe o serviço
import { AutorResponse } from 'src/app/models/autor';

declare var bootstrap: any;

@Component({
  selector: 'app-autor-list',
  templateUrl: './autor-list.component.html',
  styleUrls: ['./autor-list.component.scss']
})
export class AutorListComponent implements OnInit {

  autores: AutorResponse[] = [];
  autorSelecionado: AutorResponse | null = null;
  private modalInstance: any;
  autorParaExcluir: AutorResponse | null = null;
  private modalConfirmacaoInstance: any;

  constructor(
    private service: AutorService,
    public alerta: AlertaService 
  ) { }

  ngOnInit(): void {
    this.carregarAutores();
  }

  carregarAutores() {
    this.service.listar().subscribe({
      next: (dados) => this.autores = dados,
      error: (err) => {
        console.error('Erro ao carregar autores', err);
        this.alerta.exibir('Erro ao carregar a lista de autores.', 'danger');
      }
    });
  }

  novoAutor() {
    this.autorSelecionado = null; 
    this.abrirModal();
  }

  editar(autor: AutorResponse) {
    this.autorSelecionado = autor;
    this.abrirModal();
  }

  private abrirModal() {
    const element = document.getElementById('modalAutor');
    this.modalInstance = new bootstrap.Modal(element);
    this.modalInstance.show();
  }

  fecharModalERecarregar() {
    this.modalInstance.hide();
    this.carregarAutores();
  }

  prepararExclusao(autor: AutorResponse) {
    this.autorParaExcluir = autor; 
    const element = document.getElementById('modalConfirmacao');
    this.modalConfirmacaoInstance = new bootstrap.Modal(element);
    this.modalConfirmacaoInstance.show();
  }

  confirmarExclusao() {
    if (this.autorParaExcluir) {
      this.service.deletar(this.autorParaExcluir.codAu).subscribe({
        next: () => {
          this.modalConfirmacaoInstance.hide(); 
          this.carregarAutores(); 
          this.alerta.exibir('Autor excluído com sucesso!', 'success'); // Alerta colorido
          this.autorParaExcluir = null;
        },
        error: () => {
          this.alerta.exibir('Erro ao tentar excluir o autor.', 'danger');
        }
      });
    }
  }
}