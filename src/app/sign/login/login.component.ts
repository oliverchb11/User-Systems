import { Component, OnInit } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { Adminlogin } from '../../models/adminlogin';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  usuarioModelo: Adminlogin = new Adminlogin();
  errorInvalid: string;
  recordarUsuario = false;
  password='Contraseña incorrecta';
  email='Correo incorrecto';
  formularioLogin:FormGroup;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if(localStorage.getItem('email')){

      this.usuarioModelo.email = localStorage.getItem('email');
      this.recordarUsuario = true;
    }

  }
  loginForm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    //cargando
    Swal.fire({
      icon: 'info',
      title:'Espere Por favor',
      allowOutsideClick:false,
    });
    Swal.showLoading();
    //obteniendo datos del servicio para logear
    this.auth.login$(this.usuarioModelo).subscribe(
      (data) => {
        Swal.close();
        if (this.recordarUsuario) {
          localStorage.setItem("email", this.usuarioModelo.email);
        }else{
          localStorage.removeItem('email');
        }
       //redirencionando al home
       this.router.navigateByUrl("/home");
      },
      //si hay un error con los datos
      (error) => {
        Swal.close();
        this.errorInvalid = error.error.error.errors[0].message;
        if(this.errorInvalid==="EMAIL_NOT_FOUND"){
          Swal.fire({
            icon: 'error',
            title: "Error al autenticar",
            text: `${this.email}`,
          });
        }
        else if(this.errorInvalid==="INVALID_PASSWORD"){
          Swal.fire({
            icon: 'error',
            title: "Error al autenticar",
            text: `${this.password}`,
          });
        }
      }
    );
  }
}