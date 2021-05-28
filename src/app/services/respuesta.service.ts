import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Respuesta } from '../modelo/respuesta';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  url='http://localhost:8080/api/respuestas';
  
  constructor(private http: HttpClient) { }

  public getAllRespuestas():Observable<Respuesta[]>{
    return this.http.get<Respuesta[]>(this.url);
  }

  
  public getRespuestasDePregunta (id:number):Observable<Respuesta[]>{
    return this.http.get<Respuesta[]>(this.url+'/pregunta/'+id);
  }

  public getRespuestaVerdaderaDePregunta (id:number):Observable<Respuesta>{
    return this.http.get<Respuesta>(this.url+'/pregunta/'+'/respuestaVerdadera/'+id);
  }

  public modificarRespuesta(respuesta:Respuesta,id:number):Observable<Respuesta>{
    return this.http.put<Respuesta>(this.url+'/'+id,respuesta);
  }


}
