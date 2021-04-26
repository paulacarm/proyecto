import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/modelo/pregunta';
import { User } from 'src/app/modelo/user';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { WebserviceService } from 'src/app/services/webservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  preguntas: Pregunta[]=[];
  constructor(private preguntaService:PreguntaService) { }
// Hay que añadir el token ala cabecera para autentificar al usuario administrador
//Para que pueda ver los usuarios
  ngOnInit() {
    this.cargar();
  }
  cargar():void{
    this.preguntaService.getAllPreguntas().subscribe(
      data=>{
         this.preguntas=data;
      }
     
    ),err=>{
      console.log(err);
    }
  }
}
