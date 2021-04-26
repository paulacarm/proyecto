import { Injectable } from '@angular/core';


const TOKEN_KEY= 'AuthToken';
const USERNAME_KEY='AuthUsername';
const AUTHORITIES_KEY='AuthAuthorities';

@Injectable({
  providedIn: 'root'
})

//Cuando hacemos login con Jwt en realidad mandamos un token en cada petición.
//El backend comprueba que es válido y en caso de que si nos devuelve la respuesta
export class TokenService {

  constructor() { }
//Métodos getters y setters.
  public setToken(token:string):void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }

  public getToken():string{
    return window.sessionStorage.getItem(TOKEN_KEY);
  }


  public setUsername(userName:string):void{
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY,userName);
   
  }
  public getUsername():string{
    return window.sessionStorage.getItem(USERNAME_KEY);
  }

  public setAuthorities(authorities:string[]):void{
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    //No se puede pasar directamente el String porque es un JSON y hay que pasarlo a String
    window.sessionStorage.setItem(AUTHORITIES_KEY,JSON.stringify(authorities));
  }  

  public getAuthorities(): string[]{
    const roles: string[]=[];
    //Si hay roles recorro el JSON y para ello lo convierto primero en un array.
    if(sessionStorage.getItem(AUTHORITIES_KEY)){
     //Se recorre y se guarda en el array
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(rol=>{
        roles.push(rol);
      })
    }
    return roles;
  }

  //Método para cerrar sesión. Se vacía todo.
  public logOut():void{
    window.sessionStorage.clear();
  }

  
}
