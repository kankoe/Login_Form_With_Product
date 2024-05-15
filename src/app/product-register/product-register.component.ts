import {Component, OnInit} from '@angular/core';
import {JsonPipe, KeyValuePipe, NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import { MatCardActions, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-product-register',
  standalone: true,
  imports: [
    JsonPipe,
    MatButton,
    MatCardModule,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatDivider,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    NgForOf,
    KeyValuePipe
  ],
  templateUrl: './product-register.component.html',
  styleUrl: './product-register.component.css'
})
export class ProductRegisterComponent implements OnInit{
  productFormGroup !: FormGroup;

  constructor(private fb : FormBuilder,private http : HttpClient){

  }
  register() {
        let formData = new FormData();
        formData.set('name',this.productFormGroup.value.name);
        formData.set('description',this.productFormGroup.value.description);
        formData.set('price',this.productFormGroup.value.price);
        formData.set('quantity',this.productFormGroup.value.quantity);
        formData.set('category_id',this.productFormGroup.value.category_id);
        console.log(formData);
        this.http.post(`http://127.0.0.1:8000/api/product/create`,formData).subscribe({
          next:value=>{
            alert('produits bien enregistrer')
          },
          error:err=>{
            console.log(err);
          }
        })
  }

  ngOnInit(): void {

    this.productFormGroup=this.fb.group({
      name : this.fb.control(''),
      description : this.fb.control(''),
      price : this.fb.control(''),
      quantity: this.fb.control(''),
      category_id: this.fb.control('')
    });

  }
}
