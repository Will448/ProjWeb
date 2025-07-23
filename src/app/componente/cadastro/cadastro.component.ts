import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';  // Adicionei Router aqui


@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = {
    nome: '',
    email: '',
    senha: ''
  };

  IsAtualiza = false;

  isNome: any;
  isEmail: any;
  isSenha: any;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router  // Injeção do Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioService.getListarPorId(id).subscribe({
        next: (res) => this.usuario = res,
        error: (err) => console.error('Erro ao buscar usuário:', err)
      });
      this.IsAtualiza = true;
    }
  }

  salvar() {
    if (this.IsAtualiza) { // Atualizar usuário
      this.usuarioService.atualizar(this.usuario.id, this.usuario).subscribe({
        next: (res) => {
          console.log('usuario atualizado com sucesso');
          alert('Uauuu, atualizado com sucesso!');
        },
        error: (err) => {
          console.error('erro ao atualizar o usuario', err);
          alert('erro ao atualizar o usuario');
        }
      });
    } else { // Criar usuário
      this.usuarioService.postCriar(this.usuario).subscribe({
        next: (res) => {
          console.log('usuario criado com sucesso');
          alert('Uauuu, Criado com sucesso!');
          this.usuario = { nome: '', email: '', senha: '' };
          this.router.navigate(['/login']);  // Redireciona para login após cadastro
        },
        error: (err) => {
          console.error('erro ao criar o usuario', err);
          alert('erro ao criar o usuario');
        }
      });
    }
  }

  validaEmail() {
    if (this.usuario.email == "" || this.usuario.email.indexOf('@') == -1 ||
      this.usuario.email.indexOf(".") == -1) {

      document.getElementById('email')!.style.borderColor = 'red';
      this.usuario.email = ""; // limpa o campo
      this.isEmail = true;
    } else {
      document.getElementById('email')!.style.borderColor = '';
      this.isEmail = false;
    }
  }

  validaNome() {
    if (this.usuario.nome.length < 10) {
      this.usuario.nome = "";
      document.getElementById("nome")!.style.borderColor = "red";
      this.isNome = true;
    } else {
      document.getElementById("nome")!.style.borderColor = "";
      this.isNome = false;
    }
  }

  validaSenha() {
    if (this.usuario.senha == "" || this.usuario.senha.length < 8) {
      document.getElementById('senha')!.style.borderColor = 'red';
      this.usuario.senha = ""; // limpa o campo
      this.isSenha = true;
    } else {
      document.getElementById('senha')!.style.borderColor = 'green';
      this.isSenha = false;
    }
  }
}
