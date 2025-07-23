import { Component, OnInit } from '@angular/core';
import { PostoService } from '../../services/posto.service';
import { Router } from '@angular/router';

@Component({
    standalone: false,
  selector: 'app-busca-postos',
  templateUrl: './lista-postos.component.html',
  styleUrls: ['./lista-postos.component.css']
})
export class ListaPostosComponent implements OnInit {
  postos: any[] = [];

  constructor(private router: Router, private postoService: PostoService) {}

ngOnInit(): void {
  this.postoService.listarPostos().subscribe({
    next: dados => {
      console.log('POSTOS RECEBIDOS DO BACKEND:', dados);
      this.postos = dados;
    },
    error: err => {
      console.error('Erro ao carregar postos', err);
    }
  });
}


  avaliarPosto(posto: any) {
    this.router.navigate(['/avaliacao'], {
      state: { postoSelecionado: posto }
    });
  }

  getImagemPosto(id: number): string {
    return `/posto${id}.png`;
  }
}
