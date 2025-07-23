import { Component, AfterViewInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Posto {
  id: number;
  nome: string;
  cidade: string;
  endereco: string;
  lat: number;
  lng: number;
  preco: number;
  servicos: string[];
  distancia?: number;
}

@Component({
  selector: 'app-mapa',
  standalone: true,  // adicionado para componente standalone
  imports: [CommonModule, FormsModule, HttpClientModule],  // adicionados imports necessários
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {
  private map: any;
  private markersGroup: any;
  
  // Variáveis do formulário
  cep: string = '';
  logradouro: string = '';
  bairro: string = '';
  cidade: string = '';
  estado: string = '';
  endereco: any = null;
  mensagemErro: string = '';
  
  // Variáveis dos postos
  postosFiltrados: Posto[] = [];
  
  // Base de dados de postos com coordenadas
  postos: Posto[] = [
    { 
      id: 1, 
      nome: 'Posto Shell Central', 
      cidade: 'Curitiba', 
      endereco: 'Av. Brasil, 1000 - Centro',
      lat: -25.4284, 
      lng: -49.2733, 
      preco: 5.49, 
      servicos: ['Troca de óleo', 'Lanchonete', 'Banho'] 
    },
    { 
      id: 2, 
      nome: 'Posto Bauer Express', 
      cidade: 'Curitiba', 
      endereco: 'Rua das Flores, 500 - Batel',
      lat: -25.4372, 
      lng: -49.2844, 
      preco: 5.59, 
      servicos: ['Lavagem', 'Banheiros', 'Restaurante'] 
    },
    { 
      id: 3, 
      nome: 'Posto RodoRede', 
      cidade: 'São Paulo', 
      endereco: 'Av. Paulista, 1578 - Bela Vista',
      lat: -23.5613, 
      lng: -46.6565, 
      preco: 5.29, 
      servicos: ['Lanchonete', 'Wifi', 'Pneus'] 
    },
    { 
      id: 4, 
      nome: 'Posto Chapecó Center', 
      cidade: 'Chapecó', 
      endereco: 'Av. Getúlio Vargas, 123N - Centro',
      lat: -27.1007, 
      lng: -52.6152, 
      preco: 5.69, 
      servicos: ['Conveniência', 'Caixa 24h'] 
    },
    { 
      id: 5, 
      nome: 'Posto Xanxerê', 
      cidade: 'Xanxerê', 
      endereco: 'Rua Tiradentes, 456 - Centro',
      lat: -26.8762, 
      lng: -52.4043, 
      preco: 5.74, 
      servicos: ['Borracharia', 'Lanchonete'] 
    },
     { 
      id: 6, 
      nome: 'Posto Delta', 
      cidade: 'Palmas', 
      endereco: 'Rua Mullinari, 456 - Centro',
      lat: -26.493770858957166, 
      lng: -51.98812303465481, 
      preco: 6.74, 
      servicos: ['Patio fechado', 'Lanchonete'] 
    }
  ];

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private async initMap(): Promise<void> {
    if (typeof window !== 'undefined') {
      const L = await import('leaflet');

      // Ícone SVG personalizado para postos
      const postoIcon = L.icon({
        iconUrl: 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48">
            <path d="M16 0C8.27 0 2 6.27 2 14c0 10.5 14 34 14 34s14-23.5 14-34C30 6.27 23.73 0 16 0z" fill="#d00"/>
            <circle cx="16" cy="14" r="6" fill="#fff"/>
          </svg>
        `),
        iconSize: [28, 32],
        iconAnchor: [16, 48],
        popupAnchor: [0, -48]
      });

      // Ícone para localização do usuário
      const userIcon = L.icon({
        iconUrl: 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48">
            <path d="M16 0C8.27 0 2 6.27 2 14c0 10.5 14 34 14 34s14-23.5 14-34C30 6.27 23.73 0 16 0z" fill="#00d"/>
            <circle cx="16" cy="14" r="6" fill="#fff"/>
          </svg>
        `),
        iconSize: [28, 32],
        iconAnchor: [16, 48],
        popupAnchor: [0, -48]
      });

      // Inicializa o mapa centrado no Brasil
      this.map = L.map('mapa').setView([-15.7942, -47.8822], 4);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      // Grupo de marcadores para facilitar limpeza
      this.markersGroup = L.layerGroup().addTo(this.map);

      // Carrega todos os postos inicialmente
      this.carregarTodosPostos(L, postoIcon);
    }
  }

  private carregarTodosPostos(L?: any, icon?: any): void {
    if (!L) {
      // Se não foi passado L, buscar do window
      L = (window as any).L;
      icon = L.icon({
        iconUrl: 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48">
            <path d="M16 0C8.27 0 2 6.27 2 14c0 10.5 14 34 14 34s14-23.5 14-34C30 6.27 23.73 0 16 0z" fill="#d00"/>
            <circle cx="16" cy="14" r="6" fill="#fff"/>
          </svg>
        `),
        iconSize: [28, 32],
        iconAnchor: [16, 48],
        popupAnchor: [0, -48]
      });
    }
    
    this.postos.forEach(posto => {
      const marker = L.marker([posto.lat, posto.lng], { icon })
        .bindPopup(`
          <div>
            <h6><b>${posto.nome}</b></h6>
            <p><strong>Endereço:</strong> ${posto.endereco}</p>
            <p><strong>Preço:</strong> R$ ${posto.preco.toFixed(2)}</p>
            <p><strong>Serviços:</strong> ${posto.servicos.join(', ')}</p>
          </div>
        `);
      this.markersGroup.addLayer(marker);
    });
  }

  buscarEndereco(): void {
    if (!this.cep || this.cep.length !== 8) {
      this.mensagemErro = 'Por favor, digite um CEP válido com 8 dígitos.';
      return;
    }

    this.mensagemErro = '';
    
    this.http.get(`https://viacep.com.br/ws/${this.cep}/json/`).subscribe({
      next: (data: any) => {
        if (data.erro) {
          this.mensagemErro = 'CEP não encontrado.';
          this.limparDadosEndereco();
          return;
        }
        
        // Preencher os campos do formulário
        this.endereco = data;
        this.logradouro = data.logradouro || '';
        this.bairro = data.bairro || '';
        this.cidade = data.localidade || '';
        this.estado = data.uf || '';
        
        this.buscarCoordenadasEPostos(data);
      },
      error: (err) => {
        this.mensagemErro = 'Erro ao buscar CEP. Tente novamente.';
        console.error(err);
        this.limparDadosEndereco();
      }
    });
  }

  limparFormulario(): void {
    this.cep = '';
    this.logradouro = '';
    this.bairro = '';
    this.cidade = '';
    this.estado = '';
    this.endereco = null;
    this.mensagemErro = '';
    this.postosFiltrados = [];
    
    // Resetar mapa para visualização inicial
    if (this.map) {
      this.map.setView([-15.7942, -47.8822], 4);
      this.markersGroup.clearLayers();
      this.carregarTodosPostos();
    }
  }

  private limparDadosEndereco(): void {
    this.endereco = null;
    this.logradouro = '';
    this.bairro = '';
    this.cidade = '';
    this.estado = '';
    this.postosFiltrados = [];
  }

  private async buscarCoordenadasEPostos(endereco: any): Promise<void> {
    try {
      // Buscar coordenadas usando Nominatim (OpenStreetMap)
      const query = `${endereco.logradouro}, ${endereco.bairro}, ${endereco.localidade}, ${endereco.uf}, Brazil`;
      const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
      
      this.http.get(geoUrl).subscribe({
        next: (geoData: any) => {
          if (geoData && geoData.length > 0) {
            const lat = parseFloat(geoData[0].lat);
            const lng = parseFloat(geoData[0].lon);
            
            // Centralizar mapa na localização
            this.map.setView([lat, lng], 12);
            
            // Adicionar marcador da localização do usuário
            const L = (window as any).L;
            const userIcon = L.icon({
              iconUrl: 'data:image/svg+xml;base64,' + btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48">
                  <path d="M16 0C8.27 0 2 6.27 2 14c0 10.5 14 34 14 34s14-23.5 14-34C30 6.27 23.73 0 16 0z" fill="#00d"/>
                  <circle cx="16" cy="14" r="6" fill="#fff"/>
                </svg>
              `),
              iconSize: [28, 32],
              iconAnchor: [16, 48],
              popupAnchor: [0, -48]
            });
            
            // Limpar marcadores anteriores
            this.markersGroup.clearLayers();
            
            // Adicionar marcador da localização do usuário
            const userMarker = L.marker([lat, lng], { icon: userIcon })
              .bindPopup(`
                <div>
                  <h6><b>Sua Localização</b></h6>
                  <p>${endereco.logradouro}, ${endereco.bairro}</p>
                  <p>${endereco.localidade}/${endereco.uf}</p>
                </div>
              `);
            this.markersGroup.addLayer(userMarker);
            
            // Filtrar e mostrar postos próximos
            this.filtrarPostosProximos(lat, lng, L);
          } else {
            // Se não encontrar coordenadas, filtrar apenas por cidade
            this.filtrarPostosPorCidade(endereco.localidade);
          }
        },
        error: (err) => {
          console.error('Erro ao buscar coordenadas:', err);
          // Fallback: filtrar apenas por cidade
          this.filtrarPostosPorCidade(endereco.localidade);
        }
      });
    } catch (error) {
      console.error('Erro na busca de coordenadas:', error);
      this.filtrarPostosPorCidade(endereco.localidade);
    }
  }

  private filtrarPostosProximos(userLat: number, userLng: number, L: any): void {
    // Calcular distância e filtrar postos num raio de 50km
    const raioKm = 50;
    
    this.postosFiltrados = this.postos.map(posto => {
      const distancia = this.calcularDistancia(userLat, userLng, posto.lat, posto.lng);
      return { ...posto, distancia };
    })
    .filter(posto => posto.distancia! <= raioKm)
    .sort((a, b) => a.distancia! - b.distancia!);

    // Adicionar marcadores dos postos filtrados
    const postoIcon = L.icon({
      iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48">
          <path d="M16 0C8.27 0 2 6.27 2 14c0 10.5 14 34 14 34s14-23.5 14-34C30 6.27 23.73 0 16 0z" fill="#d00"/>
          <circle cx="16" cy="14" r="6" fill="#fff"/>
        </svg>
      `),
      iconSize: [28, 32],
      iconAnchor: [16, 48],
      popupAnchor: [0, -48]
    });

    this.postosFiltrados.forEach(posto => {
      const marker = L.marker([posto.lat, posto.lng], { icon: postoIcon })
        .bindPopup(`
          <div>
            <h6><b>${posto.nome}</b></h6>
            <p><strong>Endereço:</strong> ${posto.endereco}</p>
            <p><strong>Distância:</strong> ${posto.distancia?.toFixed(1)} km</p>
            <p><strong>Preço:</strong> R$ ${posto.preco.toFixed(2)}</p>
            <p><strong>Serviços:</strong> ${posto.servicos.join(', ')}</p>
          </div>
        `);
      this.markersGroup.addLayer(marker);
    });
  }

  private filtrarPostosPorCidade(cidade: string): void {
    this.postosFiltrados = this.postos.filter(posto => 
      posto.cidade.toLowerCase() === cidade.toLowerCase()
    );
  }

  private calcularDistancia(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Raio da Terra em km
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private toRad(value: number): number {
    return value * Math.PI / 180;
  }
}


