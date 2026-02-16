import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  mensagem: string | null = null;
  tipo: 'success' | 'danger' | 'warning' = 'success';

  exibir(msg: string, tipo: 'success' | 'danger' | 'warning' = 'success') {
    this.mensagem = msg;
    this.tipo = tipo;

    setTimeout(() => {
      this.mensagem = null;
    }, 3500);
  }
}