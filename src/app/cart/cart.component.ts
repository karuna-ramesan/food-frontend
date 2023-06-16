import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

public payPalConfig?: IPayPalConfig;

  cart:any
  cartstatusmsg=''
  total:number=0
  granttotal:number=0
  topay:number=0
  productQuantity:any=1
  paymentbtnclicked:boolean=false
  showSuccess:boolean=false
  showCancel:boolean=false
  showError:boolean=false
  showPaypal:boolean=false
  items:any
  

  // address form

  addressForm= this.fb.group({
    name:[''],
    email:[''],
    mobile:[''],
    address:['']
  })


  constructor(private api:ApiService,private fb:FormBuilder,private router:Router){}

  ngOnInit(): void {

    this.api.getcart().subscribe((result:any)=>{
      this.cart=result.cart
      // console.log(this.cart);
      if(this.cart.length==0){

        this.cartstatusmsg='empty cart'
      }

      this.cart.map((item:any)=>{
        this.total += (item.price)
        this.granttotal=this.total
       this.topay=Math.ceil(this.total+57)
      })
    },
    (result:any)=>{
      if(result.error.message){
        this.cartstatusmsg='empty cart'
      }
    }
    
    )
    // paypal config
    this.initConfig()
    
  }

  // removecart
  removeitem(productId:any){
    this.api.deletecart(productId).subscribe((result:any)=>{
      this.cart=result.cart
      window.location.reload()
     
      
    },
    (result:any)=>{
      alert(result.error.message)
    })
    
  }

  // quantity
  
  quantity(val:string){
    this.api.getcart()
    .subscribe((result:any)=>{
      console.log(result);
      this.cart=result.cart
    })
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1
      this.cart.map((item:any)=>{
        this.total = (item.price*this.productQuantity)
        console.log(this.total);
        this.granttotal=this.total
        this.topay=this.total+57
        console.log(this.topay);
      })

    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1
      this.cart.map((item:any)=>{
        this.total = (item.price*this.productQuantity)
        console.log(this.total);
        this.granttotal=this.total
        this.topay=this.total+57
        console.log(this.topay);
      })
      
    }
  }

  // incrementquantity(id:any){
  //   this.api.increment(id).subscribe((result:any)=>{
  //     this.cart=result
  //   },
  //   (result:any)=>{
  //     // alert(result.error.message)
  //   })
  // }

  // decrementquantity(id:any){

  // }
 

  
  // deleteitems

  deleteAllitem(){
    this.api.removeAllcart()
    .subscribe((result:any)=>{
      window.location.reload()
      console.log(result);
      
    })
  }


  // submitBtnClicked
  submitBtnClicked(){
    if(this.addressForm.valid){
      this.paymentbtnclicked=true

    }
    else{
      alert('please enter details...')
    }
  }

  // makepaypal
  makepayment(){
    this.showPaypal=true
  }
  // address save
  delivery(){
    if(this.addressForm.valid){
      console.log(this.addressForm);
      let email=this.addressForm.value.email
      let name=this.addressForm.value.name
      let mobile=this.addressForm.value.mobile
      let address=this.addressForm.value.address
      this.api.saveaddress(email,name,mobile,address).subscribe((result:any)=>{
        // alert(result.message)

      },
      (result:any)=>{
        alert(result.error.message)
      }
      )
       }
       else{
        alert('invalid form')
       }
  }

  // paypal
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
      setTimeout(() => {
        this.deleteAllitem()
        this.router.navigateByUrl('/checkout')
        // window.location.reload()

      },1000);

    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
      this.showCancel=true
    },
    onError: err => {
      console.log('OnError', err);
      this.showError=true
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
      if(localStorage.getItem('email')){
        var randomid=''
        var i=0
        var characters='1234567890'
        for(i;i<10;i++){
          randomid+=characters.charAt(Math.floor(Math.random()*characters.length))
        }
        let email=localStorage.getItem('email')
        this.items=this.cart
        console.log(email);
        console.log(this.items);

        this.items.map((data:any)=>{
          console.log(data.id);
          let title = data.title
          let image=data.image
          let price=data.price
          console.log(title,image,price);
          this.api.orders(email,title,image,price,randomid)
          .subscribe((result:any)=>{
            // alert(result.message)
          },
          (result:any)=>{
            // alert(result.error.message)
          }
          )
        })
    }
    else{
      alert('invalid form')
    }

  }
  }

  
}
}

