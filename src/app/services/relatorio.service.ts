import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RelatorioLivroPorAutor } from '../models/relatorio-livro-por-autor';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private readonly API = environment.apiUrl;

  constructor(private http: HttpClient) { }


  buscarDadosRelatorio(): Observable<RelatorioLivroPorAutor[]> {
    return this.http.get<RelatorioLivroPorAutor[]>(`${this.API}/relatorios/livros-por-autor/dados`);
  }

  downloadPdfRelatorio(): void {
    const url = `${this.API}/relatorios/livros-por-autor`;
    
    
    this.http.get(url, { responseType: 'blob' })
      .subscribe({
        next: (blob) => {
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = 'relatorio-livros-por-autor.pdf'; 
          link.click();
          
          // Limpa a memória
          window.URL.revokeObjectURL(downloadUrl);
        },
        error: (erro) => {
          console.error('Erro ao baixar PDF', erro);
          alert('Erro ao gerar o PDF. Verifique o console.');
        }
      });
  }
}