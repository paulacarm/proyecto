import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cronologia } from '../modelo/cronologia';
import { service } from './service';

@Injectable({
  providedIn: 'root'
})
export class CronologiaService {

  url=service.URL_BASE+'api/cronologia/';
  constructor(private http: HttpClient) { }


  public getAllCronologias():Observable<Cronologia[]>{
    return this.http.get<Cronologia[]>(this.url);
  }
}
