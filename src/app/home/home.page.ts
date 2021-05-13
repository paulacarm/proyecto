import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../modelo/usuario';
import { UsuarioLogro } from '../modelo/UsuarioLogro';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { UsuarioLogroService } from '../services/usuario-logro.service';






@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  isLogged:boolean;
  isAdmin: boolean;
  UserName:string;
  usuarios:Usuario[]=[];
  usuario:Usuario;
  email:string;

  logrosusuarios:UsuarioLogro[]=[];

 nombreusuario:string;
  constructor(
    private tokenService:TokenService,
    private usuarioService:AuthService,
    private usuarioLogroService: UsuarioLogroService,
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
    this.usuarioService.getUsuarioxNombre(this.UserName).subscribe(
      data=>{
        this.usuario=data;
      console.log(this.usuario)
      } );

   
   
    
  }

  
  logOut():void{
    this.tokenService.logOut();
    this.isLogged=false;
    this.isAdmin=false;
    this.router.navigate(['/login']);

  }
}
