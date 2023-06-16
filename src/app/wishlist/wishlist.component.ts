import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  wishlist:any
  wishliststatusmsg=''

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getwishlist().subscribe((result:any)=>{

      this.wishlist=result.wishlist
      console.log(this.wishlist);
      if(this.wishlist.length==0){
        this.wishliststatusmsg='wishlist empty'

      }
      

      },
      (result:any)=>{
        if(result.error.message){
          this.wishliststatusmsg='wishlist empty'

        }
      }
      )
    
  }

  // removeitem
  removeitem(productId:any){
    this.api.deletewishlist(productId).subscribe((result:any)=>{
      this.wishlist=result.wishlist
      if(this.wishlist.length==0){
        this.wishliststatusmsg='wishlist empty'

      }
      
    },
    (result:any)=>{
      alert(result.error.message)
    })
    
  }
  addtocart(product:any){
    if(localStorage.getItem('name')){
      this.api.addtocart(product).subscribe((result:any)=>{
        console.log(result);
        alert(result.message)
        window.location.reload()
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
