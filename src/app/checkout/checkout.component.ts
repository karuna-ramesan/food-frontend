import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  orders:any
  viewaddress:any
  address:any
  total:any
  grandtotal:any
  topay:any
  date:any

  constructor(private api:ApiService){}

  ngOnInit(): void {
    let email = localStorage.getItem('email')
  this.api.getOrders(email)
  .subscribe((result:any)=>{
    this.orders=result.orders
    console.log(this.orders);
    this.orders.map((item:any)=>{
      this.total=item.price
      console.log(this.total);
      this.grandtotal=this.total
      this.topay=Math.ceil(this.total+57)
      console.log(this.topay);    
    })
  })
    
  }

  getAddress(){
    let email = localStorage.getItem('email')
    this.api.getAddress(email)
    .subscribe((result:any)=>{
      this.viewaddress=result.address
      console.log(this.viewaddress);
      this.viewaddress.map((item:any)=>{
        this.address=item.address
        console.log(this.address);
        
      })
      
    })
  }

}
