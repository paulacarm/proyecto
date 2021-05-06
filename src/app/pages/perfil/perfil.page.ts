import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelo/usuario';
import { UsuarioLogro } from 'src/app/modelo/UsuarioLogro';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioLogroService } from 'src/app/services/usuario-logro.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  isLogged:boolean;
  isAdmin: boolean;
  UserName:string;
  usuarios:Usuario[]=[];
  usuario:Usuario;
  email:string;
  logrosusuarios:UsuarioLogro[]=[];
  nombreusuario:string;
  constructor(  private tokenService:TokenService,
    private usuarioService:AuthService,
    private usuarioLogroService: UsuarioLogroService,) { }

  ngOnInit() {
   
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

      this.usuarioLogroService.getLogrosUsuarios().subscribe(
        data=>{
          this.logrosusuarios=data;
          console.log(this.logrosusuarios);
        }
      )
}
}
