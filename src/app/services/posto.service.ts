import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostoService {
  private apiUrl = 'http://localhost:3000/api/postos';

  constructor(private http: HttpClient) {}

  listarPostos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
