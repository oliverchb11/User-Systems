import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private autService:AuthService, protected router:Router){
}
  canActivate():  boolean {
    if(this.autService.guardValidate()){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  // otras caracteristicas de guard canactive:    
  // next: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot
}
