import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorService } from 'src/app/services/autor.service';
import { AlertaService } from 'src/app/services/alerta.service'; // Novo Import
import { AutorRequest, AutorResponse } from 'src/app/models/autor';

@Component({
  selector: 'app-autor-form',
  templateUrl: './autor-form.component.html'
})
export class AutorFormComponent implements OnChanges {

  @Input() autorParaEditar: AutorResponse | null = null;
  @Output() aoSalvar = new EventEmitter<void>();
  
  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private service: AutorService,
    public alerta: AlertaService // Mantenha público para o Service funcionar globalmente
  ) {
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

  salvar() {
    if (this.form.invalid) return;
    const request: AutorRequest = this.form.value;

    if (this.autorParaEditar) {
      this.service.atualizar(this.autorParaEditar.codAu, request).subscribe({
        next: () => {
          this.alerta.exibir('Autor alterado com sucesso!', 'success'); 
          setTimeout(() => this.aoSalvar.emit(), 200); 
        },
        error: () => this.alerta.exibir('Erro ao atualizar autor.', 'danger')
      });
    } else {
      this.service.incluir(request).subscribe({
        next: () => {
          this.alerta.exibir('Autor cadastrado com sucesso!', 'success');
          this.form.reset();
          setTimeout(() => this.aoSalvar.emit(), 200);
        },
        error: () => this.alerta.exibir('Erro ao cadastrar autor.', 'danger')
      });
    }
  }
}