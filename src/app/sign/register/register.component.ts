import { Component, OnInit } from '@angular/core';
import { Adminlogin } from '../../models/adminlogin';
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usuario: Adminlogin = new Adminlogin() ;
  errorInvalid: string;
  recordarUsuario = false;
  emailexiste:string;
  nombreAdmin:string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
   
  }
  onSubmit(formulario: NgForm) {
    this.nombreAdmin = formulario.value.nombre;
    localStorage.setItem('nombre',this.nombreAdmin);
    if (formulario.invalid) {
      return;
    }
    this.authService.registarAdmin$(this.usuario).subscribe(res=>{
      if (this.recordarUsuario) {
        localStorage.setItem("email", this.usuario.email);
      }else{
        localStorage.removeItem('email');
      }
      Swal.fire({
        icon: 'success',
        title: 'Creado',
        text: `El Admin ${this.nombreAdmin} Registrado correctamente`,
      });
      this.router.navigate(['/login']);
    },(error)=>{
      this.emailexiste = error.error.error.message;
      Swal.fire({
        icon: 'error',
        title: `${this.emailexiste}`,
      });
    })
  }
}
