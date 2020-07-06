import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from 'angularfire2/firestore';
import { Usuario } from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(private firestore: AngularFirestore, protected http: HttpClient) { }
  //TODO: buscador en proceso
  getUsuarioBuscar$(nombre:string,id:string){
    return this.firestore.collection<Usuario>('usuarios');
  }
  getUsuarios$(){
    return this.firestore.collection<Usuario>('usuarios').valueChanges({idField: 'id'});
  }
  getUsuario$(id:string){
    return this.firestore.collection<Usuario>('usuarios').doc(id).valueChanges();
  }
  addUsuario(data:Usuario){
    return this.firestore.collection<Usuario>('usuarios').add(data)
  }
  deleteUsuario(id:string){
   return this.firestore.collection<Usuario>('usuarios').doc(id).delete();
    
  }
  updateUsuario(id:string, usuario:Usuario){
    return this.firestore.collection<Usuario>('usuarios').doc(id).set(usuario);
  }

  getApiPaises$(){
   return this.http.get('https://restcountries.eu/rest/v2/lang/es');
  }
}
