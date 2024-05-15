import {Component, OnInit} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatList, MatListItem} from "@angular/material/list";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {NgIf} from "@angular/common";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-user-template',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    MatDrawerContainer,
    RouterOutlet,
    MatList,
    MatListItem,
    RouterLink,
    MatDrawer,
    MatTable,
    NgIf,
    HttpClientModule,
  ],
  templateUrl: './user-template.component.html',
  styleUrl: './user-template.component.css'
})
export class UserTemplateComponent {
  constructor(public authService : AuthService) {
  }
  logout() {
    this.authService.logout();
  }

}
