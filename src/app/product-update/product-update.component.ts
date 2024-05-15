import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/products.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatDivider,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule
  ],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css'
})
export class ProductUpdateComponent implements OnInit{
  productName! :string;
  productId! :string;
  productQuantity! : string;
  productPrice! : string;
  productDate! : string;
  productCategorie! : string;
  productFormGroup !: FormGroup;
  constructor(private activatedRoute : ActivatedRoute,private http : HttpClient,
              private fb : FormBuilder) {

  }
  ngOnInit(): void {

    this.productId = this.activatedRoute.snapshot.params['id'];
    this.productName = this.activatedRoute.snapshot.params['name'];
    this.productQuantity = this.activatedRoute.snapshot.params['quantity'];
    this.productPrice = this.activatedRoute.snapshot.params['price'];
    this.productDate = this.activatedRoute.snapshot.params['description'];
    this.productCategorie = this.activatedRoute.snapshot.params['category_id'];

    this.productFormGroup=this.fb.group({
      id:this.fb.control(this.productId),
      name : this.fb.control(this.productName),
      date : this.fb.control(this.productDate),
      price : this.fb.control(this.productPrice),
      quantity: this.fb.control(this.productQuantity),
      category_id: this.fb.control(this.productCategorie)
    });
  }

  Update() {
    let formData = new FormData();
    formData.set('id',this.productFormGroup.value.id);
    formData.set('name',this.productFormGroup.value.name);
    formData.set('description',this.productFormGroup.value.date);
    formData.set('price',this.productFormGroup.value.price);
    formData.set('quantity',this.productFormGroup.value.quantity);
    formData.set('category_id',this.productFormGroup.value.category_id);
    console.log(formData);
    this.http.put(`http://127.0.0.1:8000/api/product`,formData).subscribe({
      next:value=>{
        alert('produits bien Mise a jour')
      },
      error:err=>{
        console.log(err);
      }
    })
  }
}
