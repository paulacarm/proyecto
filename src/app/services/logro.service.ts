import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Logro } from '../modelo/logro';

@Injectable({
  providedIn: 'root'
})
export class LogroService {
  
  url='http://localhost:8080/api/logros';
  
  constructor(private http: HttpClient) { }

  public getAllLogros():Observable<Logro[]>{
    return this.http.get<Logro[]>(this.url);
  }
}
