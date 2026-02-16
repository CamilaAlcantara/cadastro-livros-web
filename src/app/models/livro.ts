import { AutorResponse } from "./autor";
import { AssuntoResponse } from "./assunto";

export interface LivroResponse {
  codl?: number;
  titulo?: string;
  editora?: string;
  edicao?: number;
  anoPublicacao?: string;
  valor?: number;
  autores?: AutorResponse[];
  assuntos?: AssuntoResponse[];
}

export interface LivroRequest {
  titulo?: string;
  editora?: string;
  edicao?: number;
  anoPublicacao?: string;
  valor?: number;
  autoresIds?: number[];
  assuntosIds?: number[];
}