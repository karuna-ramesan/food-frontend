import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-food-items',
  templateUrl: './all-food-items.component.html',
  styleUrls: ['./all-food-items.component.css']
})
export class AllFoodItemsComponent implements OnInit {
  products:any=[];
  searchTerm:string=''
  name:string=''
  isname:string=''

  constructor(private api:ApiService){}

  ngOnInit(): void {
    if(localStorage.getItem('name')){
      this.name=localStorage.getItem('name') || ''
      this.isname='name'

          }
    


   this.api.getAllproducts().subscribe((result:any)=>{
    console.log(result);
    this.products=result.products
    
   })
  //  to get search  term from api service
  this.api.searchTerm.subscribe((result:any)=>{
    this.searchTerm = result
    console.log(this.searchTerm);
    
  })
  
  console.log(this.searchTerm);
  
    
  }


}
