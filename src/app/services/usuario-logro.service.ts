import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioLogro } from '../modelo/UsuarioLogro';
import { service } from './service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioLogroService {
  url=service.URL_BASE+ 'api/logrosusuario';
  
  constructor(private http: HttpClient) { }

  public postLogro(usuariologro:UsuarioLogro):Observable<any>{
    return this.http.post<any>(this.url+'/insertar',usuariologro);
  }

  public actualizarLogro(usuariologro:UsuarioLogro,id1:number,id2:number):Observable<any>{
    return this.http.put<any>(this.url+'/'+id1+'/'+id2,usuariologro);
  }
  public getLogrosUsuarios():Observable<UsuarioLogro[]>{
    return this.http.get<UsuarioLogro[]>(this.url);
  }
  public getLogroUsuario(id1:number,id2:number):Observable<UsuarioLogro>{
    return this.http.get<UsuarioLogro>(this.url+'/'+id1+'/'+id2);
  }
  public getLogrosUsuario(id:number):Observable<UsuarioLogro[]>{
    return this.http.get<UsuarioLogro[]>(this.url+'/'+id);
  }



 




 
}
