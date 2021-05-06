import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NumericValueAccessor } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UsuarioLogro } from '../modelo/UsuarioLogro';
import { UsuarioLogroId } from '../modelo/UsuarioLogroId';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogroService {
  url='http://localhost:8080/api/logrosusuario';
  
  constructor(private http: HttpClient) { }

  public postLogro(usuariologro:UsuarioLogro):Observable<any>{
    return this.http.post<any>(this.url,usuariologro);
  }

  public actualizarLogro(usuariologro:UsuarioLogro,id:UsuarioLogroId):Observable<any>{
    return this.http.post<any>(this.url+'/'+id,usuariologro);
  }
  public getLogrosUsuarios():Observable<UsuarioLogro[]>{
    return this.http.get<UsuarioLogro[]>(this.url);
  }

  public actualizar(puntos:number,idlogro:number,idusuario:number):void{
   
  }

 




 
}
