import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-buscarusuarios',
  templateUrl: './buscarusuarios.component.html',
  styleUrls: ['./buscarusuarios.component.css']
})
export class BuscarusuariosComponent implements OnInit {
  usuarios:Usuario[]=[];
  cargando:boolean;
  filterPost = "";
  usuario:string;
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

  editarUsuario(id:string){
    this.router.navigate(['/editar-usuario',id])
  }
  eliminarUsuario(id:string){
    this.usuarioService.getUsuario$(id).subscribe((data:Usuario)=>{
      this.usuario = data.nombre
      Swal.fire({
        title:  `Esta seguro que desea eliminar a ${this.usuario} de los registros?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Eliminado!',
            `El usuario ${this.usuario} fue eliminado correctamente.`,
            'success'
          )
          this.usuarioService.deleteUsuario(id);
        }
      })
    })

  }

  BuscarClientes(clienteBuscar) {}

}
