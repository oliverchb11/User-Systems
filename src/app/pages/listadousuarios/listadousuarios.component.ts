import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-listadousuarios',
  templateUrl: './listadousuarios.component.html',
  styleUrls: ['./listadousuarios.component.css']
})
export class ListadousuariosComponent implements OnInit {
  usuarios:Usuario[]=[];
  cargando:boolean;
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
}
