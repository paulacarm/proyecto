import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pregunta } from '../modelo/pregunta';
import { service } from './service';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  
  url=service.URL_BASE+ 'api/preguntas';
  
  constructor(private http: HttpClient) { }

  public getAllPreguntas():Observable<Pregunta[]>{
    return this.http.get<Pregunta[]>(this.url);
  }

  public getPreguntasTipoJuego(id:number):Observable<Pregunta[]>{
    return this.http.get<Pregunta[]>(this.url+'/tipo/'+id);
  }
  public getPreguntasLogro(id:number):Observable<Pregunta[]>{
    return this.http.get<Pregunta[]>(this.url+'/logro/'+id);
  }

  public getPregunta(id:number):Observable<Pregunta>{
    return this.http.get<Pregunta>(this.url+'/'+id);
  }

  public modificarPregunta(pregunta:Pregunta,id:number):Observable<Pregunta>{
    return this.http.put<Pregunta>(this.url+'/'+id,pregunta);
  }
  public eliminarPregunta(id:number):Observable<Pregunta>{
    return this.http.delete<Pregunta>(this.url+'/'+id);
  }


}
