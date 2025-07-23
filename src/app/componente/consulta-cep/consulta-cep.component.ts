import { Component, OnInit } from '@angular/core';
import { ConsultacepService } from '../../services/consultacep.service';
import { error } from 'console';

@Component({
  selector: 'app-consulta-cep',
  standalone: false,
  templateUrl: './consulta-cep.component.html',
  styleUrl: './consulta-cep.component.css'
})
export class ConsultaCepComponent implements OnInit {
ngOnInit(){
  console.log('Componente consulta cep iniciado');
};


cep: any;
logradouro: any;
bairro: any;
cidade: any;
estado: any;

constructor(private consultaCep: ConsultacepService){

}

buscar () {

  this.consultaCep.getConsultar(this.cep).subscribe(res =>{
    console.log(res.uf);

    this.cidade = res.localidade;
    this.bairro = res.bairro;
    this.logradouro = res.logradouro;
    this.estado = res.uf;
  }, error=>{
    console.log(error)
    
    this.cep = '';
    this.logradouro = '';
    this.estado = '';
    this.bairro = '';
    this.cidade = '';

  }

)
  
}

}
