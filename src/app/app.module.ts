import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RodapeComponent } from './componente/rodape/rodape.component';
import { CabecalhoComponent } from './componente/cabecalho/cabecalho.component';
import { NavbarComponent } from './componente/navbar/navbar.component';
import { HomeComponent } from './componente/home/home.component';
import { ConsultaCepComponent } from './componente/consulta-cep/consulta-cep.component';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { CadastroComponent } from './componente/cadastro/cadastro.component';
import { ListarUsuarioComponent } from './componente/listar-usuario/listar-usuario.component';
import { LoginComponent } from './componente/login/login.component';
import { AvaliacaoComponent } from './componente/avaliacao/avaliacao.component';
import { ListaPostosComponent } from './componente/lista-postos/lista-postos.component';
import { SobreComponent } from './componente/sobre/sobre.component';




@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
    CabecalhoComponent,
    NavbarComponent,
    HomeComponent,
    ConsultaCepComponent,
    CadastroComponent,
    AvaliacaoComponent,
    ListarUsuarioComponent,
    LoginComponent,
    ListaPostosComponent,
    SobreComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
