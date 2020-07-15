import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//rutas de mi aplicacion
import { AppRoutingModule } from './app-routing.module';
//componentes de mi aplicacion
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
//paginas de mi aplicacion
import { HomeComponent } from './pages/home/home.component';
import { AgregarUsuarioComponent } from './pages/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { TarjetasUsersComponent } from './pages/tarjetas-users/tarjetas-users.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { BuscarusuariosComponent } from './pages/buscarusuarios/buscarusuarios.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { ListadousuariosComponent } from './pages/listadousuarios/listadousuarios.component';
import { P404Component } from './pages/p404/p404.component';
//paginas de mi aplicacion de el login/registrer
import { LoginComponent } from './sign/login/login.component';
import { RegisterComponent } from './sign/register/register.component';
//modulo http para consumir apis
import {HttpClientModule} from '@angular/common/http';
//modulos para conectarme con firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
//modulo de rutas para navegacion entre componetes
import {RouterModule} from '@angular/router';
//modulos para los formularios reactivos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//pipe para filtrado y validacion de imagenes y buscador
import { NoImgPipe } from './pipes/no-img.pipe';
import { BuscadorPipe } from './pipes/buscador.pipe';
//modulo para las graficas de mi aplicacion
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AgregarUsuarioComponent,
    EditarUsuarioComponent,
    TarjetasUsersComponent,
    NoImgPipe,
    EstadisticasComponent,
    BuscarusuariosComponent,
    AdministradorComponent,
    LoginComponent,
    RegisterComponent,
    ListadousuariosComponent,
    BuscadorPipe,
    P404Component
  ],
  imports:[
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFirestoreModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
