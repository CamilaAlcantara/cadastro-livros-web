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


downloadPdfRelatorio(): Observable<Blob> {
    const url = `${this.API}/relatorios/livros-por-autor`;
   return this.http.get(url, { responseType: 'blob' });
  }
}