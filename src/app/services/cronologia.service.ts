import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cronologia } from '../modelo/cronologia';

@Injectable({
  providedIn: 'root'
})
export class CronologiaService {

  url='http://localhost:8080/api/cronologia/';
  constructor(private http: HttpClient) { }


  public getAllCronologias():Observable<Cronologia[]>{
    return this.http.get<Cronologia[]>(this.url);
  }
}
