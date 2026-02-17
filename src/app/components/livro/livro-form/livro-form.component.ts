import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LivroService } from 'src/app/services/livro.service';
import { AutorService } from 'src/app/services/autor.service';
import { AssuntoService } from 'src/app/services/assunto.service';
import { AlertaService } from 'src/app/services/alerta.service';
import { LivroResponse, LivroRequest } from 'src/app/models/livro';
import { AutorResponse } from 'src/app/models/autor';
import { AssuntoResponse } from 'src/app/models/assunto';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-livro-form',
  templateUrl: './livro-form.component.html',
  styleUrls: ['./livro-form.component.scss']
})
export class LivroFormComponent implements OnInit, OnChanges {
  @Input() livroParaEditar: LivroResponse | null = null;
  @Output() aoSalvar = new EventEmitter<void>();

  form: FormGroup;
  listaAutores: AutorResponse[] = [];
  listaAssuntos: AssuntoResponse[] = [];
  

  constructor(
    private fb: FormBuilder,
    private service: LivroService,
    private autorService: AutorService,
    private assuntoService: AssuntoService,
    private router: Router,
    public alerta: AlertaService
  ) {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      editora: ['', [Validators.required]],
      edicao: [1, [Validators.required, Validators.min(1)]],
      anoPublicacao: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      valor: [null, [Validators.required, Validators.min(0)]],
      autoresIds: [[], [Validators.required]],
      assuntosIds: [[], [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.carregarAuxiliares();
  }

  navegarParaAutores() {
    this.limparModalEIrPara('/autores');
  }

  navegarParaAssuntos() {
    this.limparModalEIrPara('/assuntos');
  }

  private limparModalEIrPara(rota: string) {
  const modalElement = document.getElementById('modalLivro');
  
  if (modalElement) {
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance?.hide();
  }
  this.router.navigate([rota]);
}

  carregarAuxiliares() {
    this.autorService.listar().subscribe(res => this.listaAutores = res);
    this.assuntoService.listar().subscribe(res => this.listaAssuntos = res);
  }

  ngOnChanges(): void {
    if (this.livroParaEditar) {
      this.form.patchValue({
        ...this.livroParaEditar,
        autoresIds: this.livroParaEditar.autores.map(a => a.codAu),
        assuntosIds: this.livroParaEditar.assuntos.map(as => as.codAs)
      });
    } else {
      this.form.reset({ edicao: 1 });
    }
  }

  salvar() {
    if (this.form.invalid) return;

    const request: LivroRequest = this.form.value;
    const operacao = this.livroParaEditar
      ? this.service.atualizar(this.livroParaEditar.codL, request)
      : this.service.incluir(request);

    operacao.subscribe({
      next: () => {
        this.alerta.exibir('Livro salvo com sucesso!', 'success');
        setTimeout(() => this.aoSalvar.emit(), 200); 
      },
      error: () => this.alerta.exibir('Erro ao salvar livro.', 'danger')
    });
  }
}