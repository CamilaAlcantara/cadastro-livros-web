import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorService } from 'src/app/services/autor.service';
import { AutorRequest, AutorResponse } from 'src/app/models/autor';

@Component({
  selector: 'app-autor-form',
  templateUrl: './autor-form.component.html'
})
export class AutorFormComponent implements OnChanges {

  @Input() autorParaEditar: AutorResponse | null = null;
  @Output() aoSalvar = new EventEmitter<void>();
  
  form: FormGroup;
  
  mensagem: string | null = null;
  tipoAlert: 'success' | 'danger' | 'warning' = 'success';

  constructor(private fb: FormBuilder, private service: AutorService) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.autorParaEditar) {
      this.form.patchValue({ nome: this.autorParaEditar.nome });
    } else {
      this.form.reset();
    }
  }

  private exibirMensagem(msg: string, tipo: 'success' | 'danger' | 'warning') {
    this.mensagem = msg;
    this.tipoAlert = tipo;
    
    setTimeout(() => {
      this.mensagem = null;
    }, 3000);
  }

  salvar() {
    if (this.form.invalid) return;
    const request: AutorRequest = this.form.value;

    if (this.autorParaEditar) {
      this.service.atualizar(this.autorParaEditar.codAu, request).subscribe({
        next: () => {
          this.exibirMensagem('Autor alterado com sucesso!', 'success');
          setTimeout(() => this.aoSalvar.emit(), 3500); // Aguarda um pouco para fechar
        },
        error: () => this.exibirMensagem('Erro ao atualizar autor.', 'danger')
      });
    } else {
      this.service.incluir(request).subscribe({
        next: () => {
          this.exibirMensagem('Autor cadastrado com sucesso!', 'success');
          this.form.reset();
          setTimeout(() => this.aoSalvar.emit(), 1500);
        },
        error: () => this.exibirMensagem('Erro ao cadastrar autor.', 'danger')
      });
    }
  }
}