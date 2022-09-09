import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service : AuthService,private router : Router){}
  canActivate(){
    if(this.service.getToken()){
      return true;
    }
    else{
      this.router.navigateByUrl('login');
      return false;
    }
  }
  
  
}
