import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvaliacaoService, Avaliacao } from '../../services/avaliacao.service';

@Component({
  selector: 'app-avaliacao',
  standalone: false,
 templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {
  avaliacoes: Avaliacao[] = [];
  notas: number[] = [1, 2, 3, 4, 5];
  postoSelecionado: any = null;

  novaAvaliacao = {
    usuario: '',
    nota: 1,
    comentario: ''
  };

  constructor(
    private avaliacaoService: AvaliacaoService,
    private router: Router
  ) { 
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.postoSelecionado = navigation.extras.state['postoSelecionado'];
    }
  }

  ngOnInit() {
    this.carregarAvaliacoes();
  }

  carregarAvaliacoes() {
    this.avaliacaoService.getAvaliacoes().subscribe({
      next: (avaliacoes) => {
        this.avaliacoes = avaliacoes;
      },
      error: (error) => {
        console.error('Erro ao carregar avaliações:', error);
      }
    });
  }

  enviarAvaliacao() {
    const nova: Avaliacao = {
      ...this.novaAvaliacao,
      data: new Date().toISOString().split('T')[0]
    };

    this.avaliacaoService.adicionarAvaliacao(nova).subscribe({
      next: (avaliacaoSalva) => {
        this.avaliacoes.unshift(avaliacaoSalva);
        this.novaAvaliacao = { usuario: '', nota: 1, comentario: '' };
        console.log('Avaliação salva com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao salvar avaliação:', error);
      }
    });
  }

  getImagemPosto(id: number): string {
    return `/posto${id}.png`;
  }
}