import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../modelo/user';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  url='http://localhost:8080/api/users';

  constructor(public http: HttpClient) { }

  public getUsuarios():Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }
}
