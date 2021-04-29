import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pregunta } from 'src/app/modelo/pregunta';
import { PreguntaService } from 'src/app/services/pregunta.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  id:number;
  pregunta:Pregunta;
  constructor(public ruta: ActivatedRoute,public preguntaService:PreguntaService) { 
    this.id = this.ruta.snapshot.params.id;
    console.log(this.id)
 
  }

  ngOnInit() {
  }

}
