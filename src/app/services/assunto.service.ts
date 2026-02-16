import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AssuntoRequest, AssuntoResponse } from '../models/assunto';

@Injectable({
  providedIn: 'root'
})
export class AssuntoService {

  private readonly API = `${environment.apiUrl}/assuntos`;

  constructor(private http: HttpClient) { }

  listar(): Observable<AssuntoResponse[]> {
    return this.http.get<AssuntoResponse[]>(this.API);
  }

  buscarPorId(id: number): Observable<AssuntoResponse> {
    return this.http.get<AssuntoResponse>(`${this.API}/${id}`);
  }

  incluir(assunto: AssuntoRequest): Observable<AssuntoResponse> {
    return this.http.post<AssuntoResponse>(this.API, assunto);
  }

  atualizar(id: number, assunto: AssuntoRequest): Observable<AssuntoResponse> {
    return this.http.put<AssuntoResponse>(`${this.API}/${id}`, assunto);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}