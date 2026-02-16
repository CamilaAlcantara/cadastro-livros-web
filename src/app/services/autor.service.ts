import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutorRequest, AutorResponse } from '../models/autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private readonly API = `${environment.apiUrl}/autores`;

  constructor(private http: HttpClient) { }

  listar(): Observable<AutorResponse[]> {
    return this.http.get<AutorResponse[]>(this.API);
  }

  buscarPorId(id: number): Observable<AutorResponse> {
    return this.http.get<AutorResponse>(`${this.API}/${id}`);
  }

  incluir(autor: AutorRequest): Observable<AutorResponse> {
    return this.http.post<AutorResponse>(this.API, autor);
  }

  atualizar(id: number, autor: AutorRequest): Observable<AutorResponse> {
    return this.http.put<AutorResponse>(`${this.API}/${id}`, autor);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}