import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioLogro } from '../modelo/UsuarioLogro';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogroService {
  url='http://localhost:8080/api/logrosusuario';
  
  constructor(private http: HttpClient) { }

  public postLogro(usuariologro:UsuarioLogro):Observable<any>{
    console.log("metodo post")
    let a:any= this.http.post<any>(this.url,usuariologro);
    console.log(a);
    return this.http.post<any>(this.url,usuariologro);
  }

  public getLogrosUsuarios():Observable<UsuarioLogro[]>{
    return this.http.get<UsuarioLogro[]>(this.url);
  }




 
}
