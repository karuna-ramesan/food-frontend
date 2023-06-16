import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-food-item',
  templateUrl: './view-food-item.component.html',
  styleUrls: ['./view-food-item.component.css']
})
export class ViewFoodItemComponent implements OnInit{

  productId:any
  viewProduct:any
  viewitems:any
  items:any=[]

  constructor(private api:ApiService,private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    // fetch path parameters from url
    this.activatedRoute.params.subscribe((data:any)=>{
      console.log(data['id']);
      this.productId=data['id']
      
    })
    // to get details of requested product
    this.api.viewProduct(this.productId).subscribe((result:any)=>{
      this.viewProduct=result.Product
      // console.log(this.viewProduct);
      // this.viewitems=result.items
     console.log(this.viewProduct);
     
      
      
    })
    
  }
  addtowishlist(product:any){
if(localStorage.getItem('name')){
  this.api.addtowishlist(product).subscribe((result:any)=>{
    console.log(result);
    alert(result.message)
    
  },
  (result:any)=>{
    alert(result.error.message)
  }
  )
}else{
  alert('please login')
}
  }
  // addtocart

  addtocart(product:any){
    if(localStorage.getItem('name')){
      this.api.addtocart(product).subscribe((result:any)=>{
        console.log(result);
        window.location.reload()
        alert(result.message)
         },
         (result:any)=>{
          alert(result.error.message)
         })
    }
    else{
      alert('please login')
    }
  }



}

