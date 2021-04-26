import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';






@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  isLogged:boolean;
  isAdmin: boolean;
  UserName:string;

  constructor(
    private tokenService:TokenService,
    public router:Router
    ) {
      
  
  }
  
  ionViewWillEnter(){
      this.testLogged();
  }
  testLogged():void{
    this.isLogged=this.tokenService.getToken()!=null;
    this.UserName=this.tokenService.getUsername();
    this.isAdmin=this.tokenService.getAuthorities().length>1;
  
    
  }
  
  logOut():void{
    this.tokenService.logOut();
    this.isLogged=false;
    this.isAdmin=false;
    this.router.navigate(['/login']);

  }

 


}
