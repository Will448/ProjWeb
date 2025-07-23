import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  senha = '';
  erro = '';

  constructor(

    private authService : AuthService,
    private router : Router,
    private snackBar : MatSnackBar
  ) { }//variavel em branco para capturar esses dados

  logar() {
    if (!this.email || !this.senha) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    this.authService.login(this.email, this.senha).subscribe({
      next: (res) => {
        if (res) {
          this.snackBar.open('Login realizado com sucesso!', 'OK', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate(['/home']);//manda os dados para home 
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.snackBar.open(`Erro: ${err.error.mensagem}`, 'OK', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        } else {
          this.snackBar.open(`Erro ao realizar login: ${err.message}`, 'OK', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      },
    });


  }

}
