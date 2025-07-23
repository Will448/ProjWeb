import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { PostoService } from '../../services/posto.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  usuarioLogado: Usuario | null = null;
  isAdmin: boolean = false;

  postosVisitados: any[] = []; // Agora preenchido dinamicamente via backend
  currentSlideIndex = 0;

  slides = [
    {
      title: 'Rotas Inteligentes',
      description: 'Encontre sempre o melhor caminho para sua jornada',
      class: 'truck-road',
      image: 'rotas.jpg',
      alt: 'Caminhão na estrada'
    },
    {
      title: 'Promoção Especial',
      description: 'Até 15% de desconto em combustível nos postos parceiros',
      class: 'fuel-promo',
      image: 'desconto.webp',
      alt: 'Posto de combustível'
    },
    {
      title: 'Novidades',
      description: 'Agora com cobertura em todo o Sul do Brasil',
      class: 'platform-news',
      image: 'localizacao.jpg',
      alt: 'Aplicativo móvel'
    },
    {
      title: 'Rede de Postos',
      description: 'Mais de 500 postos cadastrados na plataforma',
      class: 'gas-station',
      image: 'redes_postos.png',
      alt: 'Rede de postos'
    }
  ];

  private autoSlideInterval: any;

  constructor(private authService: AuthService, private postoService: PostoService) {}

  ngOnInit() {
    const dadosUsuario = this.authService.getUsuarioLogado();
    if (dadosUsuario) {
      if ((dadosUsuario as any).usuario) {
        this.usuarioLogado = (dadosUsuario as any).usuario;
      } else if (dadosUsuario.nome || dadosUsuario.email) {
        this.usuarioLogado = dadosUsuario;
      } else if (typeof dadosUsuario === 'string') {
        try {
          const parsed = JSON.parse(dadosUsuario);
          this.usuarioLogado = parsed.usuario || parsed;
        } catch (e) {
          console.error('Erro ao fazer parse dos dados do usuário:', e);
          this.usuarioLogado = null;
        }
      }
    }

    // Carregar postos via serviço do backend
    this.postoService.listarPostos().subscribe({
      next: (dados) => {
        this.postosVisitados = dados;
        console.log('Postos carregados do backend:', this.postosVisitados);
      },
      error: (err) => {
        console.error('Erro ao carregar postos:', err);
      }
    });

    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  getSaudacao(): string {
    const agora = new Date();
    const hora = agora.getHours();
    if (hora >= 5 && hora < 12) return 'Bom dia';
    else if (hora >= 12 && hora < 18) return 'Boa tarde';
    else return 'Boa noite';
  }

  changeSlide(direction: number) {
    this.currentSlideIndex += direction;
    if (this.currentSlideIndex >= this.slides.length) {
      this.currentSlideIndex = 0;
    } else if (this.currentSlideIndex < 0) {
      this.currentSlideIndex = this.slides.length - 1;
    }
    this.updateSlideDisplay();
  }

  currentSlide(index: number) {
    this.currentSlideIndex = index - 1;
    this.updateSlideDisplay();
  }

  private updateSlideDisplay() {
    const slides = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicator');
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    if (slides[this.currentSlideIndex]) {
      slides[this.currentSlideIndex].classList.add('active');
    }
    if (indicators[this.currentSlideIndex]) {
      indicators[this.currentSlideIndex].classList.add('active');
    }
  }

  private startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.changeSlide(1);
    }, 5000);
  }

  getStarArray(count: number): number[] {
    return Array(count).fill(0);
  }

  onPostoClick(posto: any) {
    console.log('Posto clicado:', posto);
  }
  getImagemPosto(id: number): string {
  return `/posto${id}.png`;
}

}

