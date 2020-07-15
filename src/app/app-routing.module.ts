import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AgregarUsuarioComponent } from './pages/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { BuscarusuariosComponent } from './pages/buscarusuarios/buscarusuarios.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { LoginComponent } from './sign/login/login.component';
import { RegisterComponent } from './sign/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ListadousuariosComponent } from './pages/listadousuarios/listadousuarios.component';
import { P404Component } from './pages/p404/p404.component';



const routes: Routes = [
  
  {path:'', component:HomeComponent},
  {path:'agregar-usuario', component:AgregarUsuarioComponent,canActivate:[AuthGuard]},
  {path:'lista-usuarios', component:ListadousuariosComponent,canActivate:[AuthGuard]},
  {path:'editar-usuario/:id', component:EditarUsuarioComponent , canActivate:[AuthGuard]},
  {path:'estadisticas', component:EstadisticasComponent , canActivate:[AuthGuard]},
  {path:'buscar-usuarios', component:BuscarusuariosComponent , canActivate:[AuthGuard]},
  {path:'administrador', component:AdministradorComponent , canActivate:[AuthGuard]},
  //login y register
  {path:'login', component:LoginComponent},
  {path:'registro', component:RegisterComponent},
  {path:'**', component:P404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
