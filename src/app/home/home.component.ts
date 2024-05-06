import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {MatTable, MatTableDataSource, MatTableModule} from "@angular/material/table";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectChange, MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatDrawerContainer} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../services/auth.service";
// @ts-ignore
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatDividerModule,
    MatCardContent,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatDrawerContainer,
    MatToolbar,
    NgIf,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  public apiResponse = [];
  public products : any;
  public dataSource: any;
  public categorieResponses:any
  public displayedColumns=['id','name','quantity','price',
                                'created_at','category_id'];

  //lien component html dans le TypeScripte
  @ViewChild(MatPaginator) paginator! : MatPaginator;

  @ViewChild(MatSort) sort! : MatSort ;
  constructor(private http:HttpClient,public authService : AuthService) {
  }
  ngOnInit(): void {
    this.products = [];
    this.http.get("http://127.0.0.1:8000/api/products").
    subscribe({
      next:data=>{
        this.products=data;
        this.apiResponse=this.products['data'].category_id;
        console.log(this.apiResponse);
        this.categorieResponses=data;
       /* recupération de la requete dans l'objet datasource matché avec
        la vue pour le foreache */
        this.dataSource=new MatTableDataSource(this.products['data']);

        console.log(this.dataSource);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error : err => {console.log(err)}
    })

  }

  //fonction pour effectuer une recherche
  filterProducts(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  onChange(event: MatSelectChange) {
    // @ts-ignore
    let filterData = this.apiResponse.filter(item => item.toLowerCase() === event.value.toLowerCase());
    console.log(this.apiResponse);
    this.dataSource=new MatTableDataSource(filterData);
    //console.log(this.dataSource);
  }
}

