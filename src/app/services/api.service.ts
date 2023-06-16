import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // to hold searchterm
  searchTerm = new BehaviorSubject('')

  constructor(private http:HttpClient) { }

  // register
  register(username:any,email:any,password:any){
    const body={
      username,
      email,
      password

    }
    // make api call to server for register
   return this.http.post('http://localhost:3000/register',body)
  
  }
  // login
  login(email:any,password:any){
    const body={
      email,
      password
    }
    // make api call to server for login
    return this.http.post('http://localhost:3000/login',body)


  }
  // all products api
  getAllproducts(){
        return this.http.get('http://localhost:3000/all-products')


  }
  // view product
  viewProduct(productId:any){
    return this.http.get('http://localhost:3000/view-product/'+productId)

  }
  // addto wishlist
  addtowishlist(product:any){
    return this.http.post('http://localhost:3000/add-to-wishlist',product)

  }
  // get wishlist
  getwishlist(){
    return this.http.get('http://localhost:3000/get-wishlist')

  }
  // delete wishlist
  deletewishlist(productId:any){
    return this.http.delete('http://localhost:3000/delete-wishlist/'+productId)

  }
  // addtocart
  addtocart(product:any){
    return this.http.post('http://localhost:3000/add-to-cart',product)


  }
  // getcart
  getcart(){
    return this.http.get('http://localhost:3000/get-cart')
}
// removecart
deletecart(productId:any){
  return this.http.delete('http://localhost:3000/delete-cart/'+productId)

}
// address save
saveaddress(name:any,email:any,mobile:any,address:any){
  const body={
    name,
    email,
    mobile,
    address
  }
return this.http.post('http://localhost:3000/save-address',body)
}
// increment
// increment(id:any){
//   return this.http.get('http://localhost:3000/increment-count/'+id)

// }

orders(email:any,title:any,image:any,price:any,randomid:any){
  const body={
    email,
    title,
    image,
    price,
    randomid
  }
  return this.http.post('http://localhost:3000/orders',body)

}

removeAllcart(){
  return this.http.delete('http://localhost:3000/delete-all-cart')
}
// getorders
getOrders(email:any){
  const body={
    email
  }
  return this.http.post('http://localhost:3000/get-orders',body)

}

getAddress(email:any){
  const body={
    email
  }
  return this.http.post('http://localhost:3000/get-address',body)

}
}

