import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultacepService {

  private apiUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient ) {}

  getConsultar(cep: any): Observable<any>{

    return this.http.get<any>(`${this.apiUrl}/${cep}/json/`);  
    
  }
}
