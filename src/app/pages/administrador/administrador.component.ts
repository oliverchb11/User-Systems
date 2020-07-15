import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Adminlogin } from '../../models/adminlogin';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
    email:string;
    nombre:string;

  

    
  constructor(private autService:AuthService) { }

  ngOnInit(): void {
    this.getDatosLocalstorage(); 
      
      
  }

  getDatosLocalstorage(){
  this.nombre =  localStorage.getItem('nombre')
  this.email =  localStorage.getItem('email')
   
    
    
    
    
  }




}