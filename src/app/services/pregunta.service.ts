import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pregunta } from '../modelo/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  
  url='http://localhost:8080/api/preguntas';
  
  constructor(private http: HttpClient) { }

  public getAllPreguntas():Observable<Pregunta[]>{
    return this.http.get<Pregunta[]>(this.url);
  }

  public getPreguntasTipoJuego(id:number):Observable<Pregunta[]>{
    return this.http.get<Pregunta[]>(this.url+'/tipo/'+id);
  }

  public getPregunta(id:number):Observable<Pregunta>{
    return this.http.get<Pregunta>(this.url+id);
  }
}
