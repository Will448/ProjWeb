// avaliacao.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Avaliacao {
  usuario: string;
  nota: number;
  comentario: string;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  private apiUrl = 'http://localhost:3000/api/avaliacoes';

  constructor(private http: HttpClient) { }

  // Buscar todas as avaliações
  getAvaliacoes(): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(this.apiUrl);
  }

  // Adicionar nova avaliação
  adicionarAvaliacao(avaliacao: Avaliacao): Observable<Avaliacao> {
    return this.http.post<Avaliacao>(this.apiUrl, avaliacao);
  }
}