import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../modelo/jwt-dto';
import { LoginUsuario } from '../modelo/login-usuario';
import { NuevoUsuario } from '../modelo/nuevo-usuario';
import { Usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
authURL='http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient) { }
  
  public login(loginUsuario:LoginUsuario):Observable<JwtDto>{
    return this.httpClient.post<JwtDto>(this.authURL+'login',loginUsuario);
  }
  public registro(nuevoUsuario:NuevoUsuario):Observable<any>{
    console.log("entra en el método")
    console.log(nuevoUsuario.nombre )
    console.log(nuevoUsuario.nombreUsuario )
    console.log(nuevoUsuario.email)
    console.log(nuevoUsuario.password )
    return this.httpClient.post<any>(this.authURL+'nuevo',nuevoUsuario);

  }


  public  getUsuarioxNombre(nombreUsuario:String):Observable<any>{
    return this.httpClient.get<any>(this.authURL+nombreUsuario);
  }
  


}
