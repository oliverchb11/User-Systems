import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-tarjetas-users',
  templateUrl: './tarjetas-users.component.html',
  styleUrls: ['./tarjetas-users.component.css']
})
export class TarjetasUsersComponent implements OnInit {
  @Input('conexion') usuarios:Usuario[]=[];
  @Input('conexion2') cargando:boolean;
  usuario:string;
  constructor(private usuarioService:UsuariosService , protected router:Router ) { }

  ngOnInit(): void {
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
}
