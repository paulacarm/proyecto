import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'
import { WebserviceService } from '../services/webservice.service';
import { User } from '../modelo/user';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  
  usuarios:User[];
  constructor(public service:WebserviceService) { }

  ngOnInit() {
    this.cargar();
  }
  
  cargar():void{
    this.service.getUsuarios().subscribe(
      data=>{
        this.usuarios=data;
      },
      err=>{
        console.log(err);
      }
    )
  }
}
