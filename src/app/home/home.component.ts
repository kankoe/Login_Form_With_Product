import { Component, OnInit, ViewChild} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import { MatDividerModule} from "@angular/material/divider";
import { MatTableDataSource, MatTableModule} from "@angular/material/table";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import { MatInputModule} from "@angular/material/input";
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import { MatButtonModule} from "@angular/material/button";
import {MatDrawerContainer} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {NgIf} from "@angular/common";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Product} from "../model/products.model";

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
    HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  public apiResponse = [];
  public products !: Array<Product>;
  public dataSource: any;
  public dataValue!:any
  public displayedColumns=['id','name','quantity','price',
                                'created_at','category_id','modifier'];

  //lien component html dans le TypeScripte
  @ViewChild(MatPaginator) paginator! : MatPaginator;

  @ViewChild(MatSort) sort! : MatSort ;
  constructor(private http:HttpClient,public authService : AuthService,
              private router:Router
             ) {
  }
  ngOnInit(): void {
    this.http.get("http://127.0.0.1:8000/api/products").
    subscribe({
      next:data=>{
        this.dataValue=data;
        this.products=this.dataValue['data'];
       /* recupération de la requete dans l'objet datasource matché avec
        la vue pour le foreache */
        this.dataSource=new MatTableDataSource(this.products);

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


  newProducts() {
       this.router.navigateByUrl("/register")
  }

  updateProducts(product: Product) {
    this.router.navigateByUrl(`/update/${product.id}/${product.name}/${product.quantity}/${product.price}/${product.description}/${product.category_id}`);
  }
}

