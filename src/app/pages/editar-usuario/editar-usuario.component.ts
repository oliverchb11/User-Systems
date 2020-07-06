import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
formulario:FormGroup
nombre:string
apellido:string
correo:string
celular:number
pais:string;
ciudad:string;
imgUrl:string;
id:string;
usuario:Usuario;
paises={};
validacionForm:FormGroup;
  constructor(public usuarioServicio:UsuariosService, protected rutaActiva: ActivatedRoute,protected router :Router ,public fb: FormBuilder) { }

  ngOnInit(): void {
    this.datosDelaUrl();
    this.apiPisesCom();
    //validaciones form
    this.validacionForm =  this.fb.group({
      nombre:['',[Validators.required,Validators.minLength(5)]],
      apellido:['',[Validators.required,Validators.minLength(5)]],
      correo:['',  [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      celular:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      imgUrl:['',Validators.required],
      pais:['',Validators.required],
      ciudad:['',Validators.required],
    })
  }
  editarUsuario(id:string){
    this.usuarioServicio.updateUsuario(id,this.usuario);
    Swal.fire({
      icon: 'success',
      title: 'Actualizado',
      text: `El Usuario con id ${id} fue actualizado correctamente`,
    });
    this.router.navigate(['/home']);
    console.log(this.usuario);
  }
  datosDelaUrl(){
    this.rutaActiva.params.subscribe((data)=>{
      this.id = data.id;
      this.usuarioServicio.getUsuario$(this.id).subscribe((res:Usuario)=>{
        this.usuario = res;
        this.usuario.id = this.id;
      });
    })
  }
  apiPisesCom(){
    this.usuarioServicio.getApiPaises$().subscribe(paises=>{
      this.paises = paises;
      console.log(this.paises);
    });
  }

  //validaciones para el template
  get getNombreNovalid(){
    return this.validacionForm.get('nombre').invalid && this.validacionForm.get('nombre').touched;
  }
  get getApellidoNovalid(){
    return this.validacionForm.get('apellido').invalid && this.validacionForm.get('apellido').touched;
  }
  get getCorreoNovalid(){
    return this.validacionForm.get('correo').invalid && this.validacionForm.get('correo').touched;
  }
  get getCelularNovalid(){
    return this.validacionForm.get('celular').invalid && this.validacionForm.get('celular').touched;
  }
  get getimgUrlNovalid(){
    return this.validacionForm.get('imgUrl').invalid && this.validacionForm.get('imgUrl').touched;
  }
  get getPaisNovalid(){
    return this.validacionForm.get('pais').invalid && this.validacionForm.get('pais').touched;
  }
  get getCiudadNovalid(){
    return this.validacionForm.get('ciudad').invalid && this.validacionForm.get('ciudad').touched;
  }
}
