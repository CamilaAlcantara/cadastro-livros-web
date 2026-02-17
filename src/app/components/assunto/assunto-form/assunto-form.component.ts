import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssuntoService } from 'src/app/services/assunto.service';
import { AlertaService } from 'src/app/services/alerta.service';
import { AssuntoResponse } from 'src/app/models/assunto';

@Component({
  selector: 'app-assunto-form',
  templateUrl: './assunto-form.component.html'
})
export class AssuntoFormComponent implements OnChanges {
  @Input() assuntoParaEditar: AssuntoResponse | null = null;
  @Output() aoSalvar = new EventEmitter<void>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: AssuntoService, public alerta: AlertaService) {
    this.form = this.fb.group({ descricao: ['', [Validators.required, Validators.minLength(3)]] });
  }

  ngOnChanges(): void {
    if (this.assuntoParaEditar) this.form.patchValue(this.assuntoParaEditar);
    else this.form.reset();
  }

  salvar() {
    if (this.form.invalid) return;
    const op = this.assuntoParaEditar 
      ? this.service.atualizar(this.assuntoParaEditar.codAs, this.form.value)
      : this.service.incluir(this.form.value);

    op.subscribe({
      next: () => {
        this.alerta.exibir('Sucesso!', 'success');
        this.form.reset();
        setTimeout(() => this.aoSalvar.emit(), 200);
      },
      error: () => this.alerta.exibir('Erro ao salvar.', 'danger')
    });
  }
}