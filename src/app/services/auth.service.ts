import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Adminlogin } from '../models/adminlogin';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'https://identitytoolkit.googleapis.com/v1/accounts:'
  private API_KEY = 'AIzaSyCNQ0ylU124hzrcxMqEG2WVDecBQrpYJZw'
  userToken:string;
//crear nuevo usuario https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

//login https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  constructor(private http : HttpClient) {
    this.leerToken();
   }

  //Cerrar session
  logout(){
   localStorage.removeItem('idToken');
  }
  //ingresar session
  login$(admin:Adminlogin){
    const authData = {
      ...admin,
      returnSecureToken:true
    };
    return this.http.post<Adminlogin>(`${this.URL}signInWithPassword?key=${this.API_KEY}`,authData).pipe(map(logintoken=>{
      const loginT = logintoken.idToken;
      const nombreT = logintoken.nombre;
      this.guardarToken(loginT);
      return logintoken;  
    }));
  }
//registrar usuario admin
  registarAdmin$(admin:Adminlogin){

    const authData = {
      ...admin,
      returnSecureToken:true
    };
    return this.http.post<Adminlogin>(`${this.URL}signUp?key=${this.API_KEY}`,authData).pipe(map(idtoken=>{
      const idtokens = idtoken.idToken;
      const nombre = idtoken.nombre;
      this.guardarToken(idtokens);
      return idtoken;
    }));
  };
//guardamos el token en el localstorage
  private guardarToken(idToken:string){
    this.userToken = idToken;
    localStorage.setItem('idToken',idToken)
    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expiraEn', JSON.stringify (hoy.getTime()))
  }
//leemos token del localstorage
  private leerToken(){
    if(localStorage.getItem('idToekn')){
      this.userToken = localStorage.getItem('idToekn');
    }else{
      this.userToken = '';
    }
    return this.userToken;
  }
//validar si hay toquen para mostrar la informacion
  guardValidate():boolean{
    if(this.userToken.length<2){
      return false;
    }
    const expire = Number(localStorage.getItem('expiraEn'));
    const expriracion = new Date();
    expriracion.setTime(expire);
    if(expriracion > new Date()){
      return true;
    }
    else{
      return false;
    }
  }
}
