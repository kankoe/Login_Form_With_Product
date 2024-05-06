import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardHeader,
    MatDividerModule,
    MatCardContent,
    MatFormFieldModule,
    MatInputModule,
    MatCardActions,
    MatButtonModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  public loginForm !: FormGroup;

  constructor(private formBuilder : FormBuilder,
              private authService : AuthService,
              private router : Router) {
  }
  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      username : this.formBuilder.control(''),
      password : this.formBuilder.control('')
    });
  }

  login() {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    let auth:boolean =this.authService.login(username,password);
    if (auth==true){
        this.router.navigateByUrl("/home")
    }
  }
}
