import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LivroRequest, LivroResponse } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = `${environment.apiUrl}/livros`;

  constructor(private http: HttpClient) { }

  listar(): Observable<LivroResponse[]> {
    return this.http.get<LivroResponse[]>(this.API);
  }

  buscarPorId(id: number): Observable<LivroResponse> {
    return this.http.get<LivroResponse>(`${this.API}/${id}`);
  }

  incluir(livro: LivroRequest): Observable<LivroResponse> {
    return this.http.post<LivroResponse>(this.API, livro);
  }

  atualizar(id: number, livro: LivroRequest): Observable<LivroResponse> {
    return this.http.put<LivroResponse>(`${this.API}/${id}`, livro);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}