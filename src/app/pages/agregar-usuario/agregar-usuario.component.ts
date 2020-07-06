import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {
formulario:FormGroup;
usuario:Usuario;
nombre:string
apellido:string
correo:string
celular:number
pais:string;
ciudad:string;
imgUrl:string;
id:string;
paises={};
validacionForm:FormGroup;
  constructor(public usuarioServicio:UsuariosService, protected rutaActiva: ActivatedRoute, protected router:Router, private fb :FormBuilder) { }

  ngOnInit(): void {
    this.apiPisesCom();
    this.validacionForm =  this.fb.group({
      nombre:['',[Validators.required,Validators.minLength(4)]],
      apellido:['',[Validators.required,Validators.minLength(4)]],
      correo:['',  [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      celular:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      imgUrl:[''],
      fechanacimiento:['',Validators.required],
      pais:['',Validators.required],
      ciudad:['',Validators.required],
    })
    
  }

  agregarUsuario(formulario:FormGroup){
   
    console.log(formulario);
    this.usuarioServicio.addUsuario(formulario.value);
    Swal.fire({
      icon: 'success',
      title: 'Creado',
      text: `El Usuario ${formulario.value.nombre} Creado correctamente`,
    });
    formulario.reset();
    this.router.navigate(['/home']);
  }

  apiPisesCom(){
    this.usuarioServicio.getApiPaises$().subscribe(paises=>{
      this.paises = paises;
      console.log(this.paises);
    });
  }

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
  get getPaisNovalid(){
    return this.validacionForm.get('pais').invalid && this.validacionForm.get('pais').touched;
  }
  get getCiudadNovalid(){
    return this.validacionForm.get('ciudad').invalid && this.validacionForm.get('ciudad').touched;
  }
  get getFechaNovalid(){
    return this.validacionForm.get('fechanacimiento').invalid && this.validacionForm.get('fechanacimiento').touched;
  }


}
