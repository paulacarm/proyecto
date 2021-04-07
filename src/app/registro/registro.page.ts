import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  results:any;
  url:'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.results= this.http.get(this.url).pipe(
      map(results => {
        return results;
      })
    )
  }

}
