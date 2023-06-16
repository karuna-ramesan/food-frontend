import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  errorMsg: string = '';
  successMsg: any = false;
  islogin:string='';
  name:string=''
  cartitemcount=0


  // search
  search(event:any){
    // console.log(event.target.value);
    // to assign new value to behaviour subject use next method
    this.api.searchTerm.next(event.target.value)
    
  }






  // login
  loginForm = this.fb.group({
    // form array
    email:['',
    [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ],],
    password:['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]]
  })







// register

  // formgroup
  registerForm = this.fb.group({
    // form array
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    email:['',
    [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ],],
    password:['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]]
  })
  constructor(private fb:FormBuilder, private api:ApiService,private router:Router){
    
  }
  ngOnInit(): void {
    if(localStorage.getItem('name')){
this.name=localStorage.getItem('name') || ''
this.islogin='login'

    }
    // cartcount
    this.api.getcart().subscribe((result:any)=>{
      this.cartitemcount=result.cart.length


    })
  }

  // login
  login(){
    if(this.loginForm.valid){
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    // api call for login
    this.api.login(email,password)
    .subscribe(
      // response 200
      (result:any)=>{
        // console.log(result);
        this.successMsg = true;
        localStorage.setItem('name',result.name)
        localStorage.setItem('email',result.email)
        this.islogin='login'
        setTimeout(() => {
          window.location.reload();
          this.router.navigateByUrl('')

        }, 2000);


      },
      // error msg response 400
      (result:any)=>{
        this.errorMsg=result.error.message
        setTimeout(() => {
          this.loginForm.reset()
          this.errorMsg=""
          
        },3000);


      }
    )

    
    // alert('login clicked')

    }
    else{
      alert('invalid form')
    }
    
  }
  register(){
    if(this.registerForm.valid){
      let username = this.registerForm.value.username;
    let email = this.registerForm.value.email;
    let password = this.registerForm.value.password;
    // api call for register
    this.api.register(username,email,password)
    .subscribe(
      // response 200
      (result:any)=>{
      alert(result.message)

      // this.registerForm.reset();
      // window.location.reload();
      // redirect to login
    },
    // response 400
    (result:any)=>{
      this.errorMsg=result.error.message
      setTimeout(()=>{
        this.registerForm.reset()
        this.errorMsg=""

      },3000)
      
    }
    )

    

    }
    else{
      alert('invalid form')
    }
    
  }
  // logout
  logout(){
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    setTimeout(() => {
      this.router.navigateByUrl('')
      window.location.reload()
      
    },1000 );
  }

  // refresh(){
  //   window.location.reload()
  // }

}







  
