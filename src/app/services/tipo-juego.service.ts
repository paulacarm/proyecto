import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TiposJuego } from '../modelo/tipoJuego';
import { service } from './service';

@Injectable({
  providedIn: 'root'
})
export class TipoJuegoService {
  url=service.URL_BASE+ 'api/tiposdejuego';
  constructor(private http: HttpClient) { }

  public getAlltiposJuego():Observable<TiposJuego[]>{
    return this.http.get<TiposJuego[]>(this.url);
  }
}
