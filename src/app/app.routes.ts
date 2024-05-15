import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProductRegisterComponent} from "./product-register/product-register.component";
import {ProductUpdateComponent} from "./product-update/product-update.component";

export const routes: Routes = [
  {path: "login",component: LoginComponent},
  {path: "home",component: HomeComponent,
    //pour verifier si le user est contenu dans l'url
    canActivate:[AuthGuard]},
  {path: "register",component: ProductRegisterComponent},
  {path: "update/:id/:name/:quantity/:price/:description/:category_id",component: ProductUpdateComponent}

];
