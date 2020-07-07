import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from 'angularfire2/firestore';
import { Usuario } from '../models/usuario';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  info = {};
  constructor(private firestore: AngularFirestore, protected http: HttpClient) { }
  //TODO: buscador en proceso
  getUsuarioBuscar$(nombre:string,id:string){
    return this.firestore.collection<Usuario>('usuarios');
  }
  // traer todos los usuarios de firestore cloud
  getUsuarios$(){
    return this.firestore.collection<Usuario>('usuarios').valueChanges({idField: 'id'});
  }
   // traer un usuario de firestore cloud
  getUsuario$(id:string){
    return this.firestore.collection<Usuario>('usuarios').doc(id).valueChanges();
  }
  //agregar usario a firestore cloud
  addUsuario(data:Usuario){
    return this.firestore.collection<Usuario>('usuarios').add(data)
  }
 //eliminar traer un usuario de firestore cloud
  deleteUsuario(id:string){
   return this.firestore.collection<Usuario>('usuarios').doc(id).delete();
    
  }
  //actualizar traer un usuario de firestore cloud
  updateUsuario(id:string, usuario:Usuario){
    return this.firestore.collection<Usuario>('usuarios').doc(id).set(usuario);
  }
//api para taer paises y ciudades
  getApiPaises$(){
   return this.http.get('https://restcountries.eu/rest/v2/lang/es');
  }
//fitrado de datos para graficar
  getDatosParaGrafica(){
    return this.firestore.collection<Usuario>('usuarios').valueChanges().pipe(map((res:Usuario[])=>{
     return  res.map(({pais,fechanacimiento})=>{
       let fecha = new Date(fechanacimiento);
       let date = fecha.getFullYear();
        return this.info = {
          name:pais,
          value:date
        }
        
     })

    }));
  }

}
