import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre',
  standalone: false,
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent {
  
  funcionalidades = [
    {
      icone: '🗺️',
      titulo: 'Mapeamento e Navegação',
      descricao: 'Visualize postos de combustível próximos e ao longo de suas rotas planejadas.'
    },
    {
      icone: '💰',
      titulo: 'Comparação de Preços',
      descricao: 'Informações em tempo real sobre os preços dos combustíveis para escolher a melhor opção.'
    },
    {
      icone: '🏪',
      titulo: 'Serviços Adicionais',
      descricao: 'Detalhes sobre formas de pagamento, alimentação, áreas de descanso e chuveiros.'
    },
    {
      icone: '⭐',
      titulo: 'Avaliações e Recomendações',
      descricao: 'Sistema de avaliação dos postos criando uma comunidade de confiança.'
    },
    {
      icone: '🔔',
      titulo: 'Notificações Personalizadas',
      descricao: 'Alertas sobre promoções, mudanças de preço e eventos especiais nos postos.'
    }
  ];

  beneficios = {
    caminhoneiros: [
      'Economia de tempo e dinheiro',
      'Localização rápida de postos com melhores preços',
      'Informações centralizadas e confiáveis',
      'Melhoria na experiência de viagem',
      'Segurança e assertividade no descanso'
    ],
    postos: [
      'Aumento no fluxo de clientes',
      'Maior visibilidade e fidelização',
      'Feedback contínuo dos usuários',
      'Marketing direcionado',
      'Competitividade no mercado'
    ]
  };

  constructor() { }
}