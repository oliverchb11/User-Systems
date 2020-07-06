import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
usuarios:Usuario[]=[];
cargando:boolean;
  constructor(private usuarioService: UsuariosService,protected router:Router) { }

  ngOnInit(): void {
    
  }



}
