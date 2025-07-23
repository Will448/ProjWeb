import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  standalone: false,
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {

   constructor (private router: Router){}

  sair(){
    localStorage.removeItem("usuarioLogado");
    this.router.navigate(["/login"]);
  }

}
