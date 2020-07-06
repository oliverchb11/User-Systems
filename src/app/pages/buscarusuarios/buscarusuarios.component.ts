import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-buscarusuarios',
  templateUrl: './buscarusuarios.component.html',
  styleUrls: ['./buscarusuarios.component.css']
})
export class BuscarusuariosComponent implements OnInit {
  usuarios:Usuario[]=[];
  cargando:boolean;
  nombre:string;
  buscandoUser:Usuario[]=[];
  nombreInput:string;
  nombreRes:string
  constructor(private usuarioService: UsuariosService,protected router:Router) { }

  ngOnInit(): void {
    this.getUserCom();
  }
  getUserCom(){
    this.usuarioService.getUsuarios$().subscribe((data)=>{
      this.usuarios = data;
      console.log(data);
      this.cargando = true;
    })
  }

  buscarUsuario(nombre:string){
    
  }
}
