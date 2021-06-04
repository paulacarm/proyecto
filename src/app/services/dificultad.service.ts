import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dificultad } from '../modelo/Dificultad';
import { service } from './service';

@Injectable({
  providedIn: 'root'
})
export class DificultadService {
  url=service.URL_BASE+ 'api/dificultad/';
  constructor(private http: HttpClient) { }


  public getAllDificultades():Observable<Dificultad[]>{
    return this.http.get<Dificultad[]>(this.url);
  }
}
