import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Route, Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
/*les guard pour gérer les url empecher l'acces direct*/

//pour que cela soit un service
@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private authService : AuthService, private router : Router) {
  }
  //verifie si l'utilisateur est authentifier si oui true
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authService.isAuthenticated){
      return true;
    }else {
      this.router.navigateByUrl('/login');
      return false
    }
  }

}
