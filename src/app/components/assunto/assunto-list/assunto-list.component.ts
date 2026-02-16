import { Component, OnInit } from '@angular/core';
import { AssuntoService } from 'src/app/services/assunto.service';
import { AlertaService } from 'src/app/services/alerta.service';
import { AssuntoResponse } from 'src/app/models/assunto';

declare var bootstrap: any;

@Component({
  selector: 'app-assunto-list',
  templateUrl: './assunto-list.component.html'
})
export class AssuntoListComponent implements OnInit {

  assuntos: AssuntoResponse[] = [];
  assuntoSelecionado: AssuntoResponse | null = null;
  private modalInstance: any; // Padronizado com Autor
  assuntoParaExcluir: AssuntoResponse | null = null;
  private modalConfirmacaoInstance: any; // Padronizado com Autor

  constructor(
    private service: AssuntoService,
    public alerta: AlertaService
  ) { }

  ngOnInit(): void {
    this.carregarAssuntos();
  }

  carregarAssuntos() {
    this.service.listar().subscribe({
      next: (dados) => this.assuntos = dados,
      error: (err) => {
        console.error('Erro ao carregar assuntos', err);
        this.alerta.exibir('Erro ao carregar a lista de assuntos.', 'danger');
      }
    });
  }

  novoAssunto() {
    this.assuntoSelecionado = null;
    this.abrirModal();
  }

  editar(assunto: AssuntoResponse) {
    this.assuntoSelecionado = assunto;
    this.abrirModal();
  }

  private abrirModal() {
    const element = document.getElementById('modalAssunto');
    this.modalInstance = new bootstrap.Modal(element);
    this.modalInstance.show();
  }

  fecharModalERecarregar() {
    this.modalInstance.hide();
    this.carregarAssuntos();
  }

  prepararExclusao(assunto: AssuntoResponse) {
    this.assuntoParaExcluir = assunto;
    const element = document.getElementById('modalConfirmacaoAs');
    this.modalConfirmacaoInstance = new bootstrap.Modal(element);
    this.modalConfirmacaoInstance.show();
  }

  confirmarExclusao() {
    if (this.assuntoParaExcluir) {
      this.service.deletar(this.assuntoParaExcluir.codAs).subscribe({
        next: () => {
          this.modalConfirmacaoInstance.hide();
          this.carregarAssuntos();
          this.alerta.exibir('Assunto excluído com sucesso!', 'success');
          this.assuntoParaExcluir = null;
        },
        error: () => {
          this.alerta.exibir('Erro ao tentar excluir o assunto.', 'danger');
        }
      });
    }
  }
}