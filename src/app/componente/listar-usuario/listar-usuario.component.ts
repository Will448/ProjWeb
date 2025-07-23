import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { error } from 'console';
import {Router} from '@angular/router';


@Component({
  selector: 'app-listar-usuario',
  standalone: false,
  templateUrl: './listar-usuario.component.html',
  styleUrl: './listar-usuario.component.css'
})
export class ListarUsuarioComponent {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ){}
  
ngOnInit(){

  //roda ao carregar a página/componente
  
  this.listarUsuarios();
}
usuarios: Usuario[] = [];

listarUsuarios(){
  this.usuarioService.getListar().subscribe({
    next: (resposta) => this.usuarios = resposta,
    error: (err) => console.error(err)
  });
}
editar(usuario: Usuario){
  this.router.navigate(['/cadastro', usuario.id]); //rota para o cadastro
}

deletar(id:number){
  this.usuarioService.deletar(id).subscribe(() => {
    this.listarUsuarios();//recarrega 
  })
}

}
