import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componente/home/home.component';
import { ConsultaCepComponent } from './componente/consulta-cep/consulta-cep.component';
import { CadastroComponent } from './componente/cadastro/cadastro.component';
import { ListarUsuarioComponent } from './componente/listar-usuario/listar-usuario.component';
import { LoginComponent } from './componente/login/login.component';
import { AuthGuard } from './guarda/auth.guard';
import { MapaComponent } from './mapa/mapa.component';
import { AvaliacaoComponent } from './componente/avaliacao/avaliacao.component';
import { ListaPostosComponent } from './componente/lista-postos/lista-postos.component';
import { SobreComponent } from './componente/sobre/sobre.component';





const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'consulta', component: ConsultaCepComponent, canActivate: [AuthGuard] },
  { path: 'cadastro', component: CadastroComponent},
  { path: 'cadastro/:id', component: CadastroComponent, canActivate: [AuthGuard] },//mandamos uma informaçao de edição
  { path: 'listar', component: ListarUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'mapa', component: MapaComponent, canActivate:[AuthGuard] },
  { path: 'avaliacao', component: AvaliacaoComponent, canActivate:[AuthGuard] },
  { path: 'lista-postos', component: ListaPostosComponent, canActivate:[AuthGuard] },
  { path: 'sobre', component: SobreComponent, canActivate:[AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' }//caso não encontre as rotas anteriores ele direciona para o home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
