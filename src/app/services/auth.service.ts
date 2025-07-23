// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private chave = 'usuarioLogado';//metodo de verificar se o usuario esta logado e logout
  private api = 'http://localhost:3000/api/auth/login';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<Usuario | null> {
    return this.http.post<Usuario | null>(this.api, { email, senha }).pipe(
      map(usuario => {
        if (usuario) {
          localStorage.setItem(this.chave, JSON.stringify(usuario));
          return usuario;
        }
        return null;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.chave);//são servicos que utilizamos, para evitar chamar várias vezes, e assim chamo ele quantas vezes for necessario
  }

  estaLogado(): boolean {
    return localStorage.getItem(this.chave) !== null;
  }

  getUsuarioLogado(): Usuario | null {
    const dados = localStorage.getItem(this.chave);
    return dados ? JSON.parse(dados) : null;
  }
}
