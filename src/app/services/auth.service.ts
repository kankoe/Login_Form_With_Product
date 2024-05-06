import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
//service pour gerer le login
@Injectable({
  providedIn: 'root'
})
export class AuthService {
// creation des utilisateur par defaut bricolage sans backend
  public users:any = {
    admin : { password : '2345', roles : ['STUDENT','ADMIN']},
    user1 : { password : 'azerty', roles : ['STUDENT']},
  }
  //les attributs de l'utilisateur
  public username : any;
  public isAuthenticated : boolean=false;
  public roles : string[] = [];


  constructor(private router : Router) { }

  public login(username : string, password : string):boolean{
    if(this.users[username] && this.users[username]['password']==password){
      this.username=username;
      this.isAuthenticated=true;
      this.roles=this.users[username]['roles'];
      return true;
    }else {
      return false;
    }
  }

  logout() {
    this.isAuthenticated=false;
    this.roles=[];
    this.username=undefined;
    this.router.navigateByUrl("/login");
  }
}
