import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  validadorS:boolean;
  constructor(private authServices:AuthService , protected router:Router) { }

  ngOnInit(): void {
    this.validadorSession();

  }

  cerrarSession(){
    this.authServices.logout();
    this.router.navigateByUrl('/home');
    location.reload();
  }
  login(){
    this.router.navigateByUrl('/login');
  }
  validadorSession(){
   if( localStorage.getItem('idToken')){
      this.validadorS = true;
      console.log(this.validadorS);
   }
   else{
     this.validadorS = false
     console.log(this.validadorS);
     
   }
  }
}
