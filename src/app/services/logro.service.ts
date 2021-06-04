import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Logro } from '../modelo/logro';
import { service } from './service';

@Injectable({
  providedIn: 'root'
})
export class LogroService {
  
  url=service.URL_BASE+ 'api/logros';
  
  constructor(private http: HttpClient) { }

  public getAllLogros():Observable<Logro[]>{
    return this.http.get<Logro[]>(this.url);
  }
}
