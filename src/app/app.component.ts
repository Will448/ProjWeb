import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProjWeb';

  constructor(private router: Router) { }

  get exibirLayoutCompleto(): boolean {
    // Adicione aqui todas as rotas que não devem mostrar cabeçalho/rodapé
    const rotasOcultas = ['/login', '/cadastro'];
    
    return !rotasOcultas.includes(this.router.url);
  }
}
