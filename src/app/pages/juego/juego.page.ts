import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/modelo/pregunta';
import { TiposJuego } from 'src/app/modelo/tipoJuego';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { TipoJuegoService } from 'src/app/services/tipo-juego.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
})
export class JuegoPage implements OnInit {
 
 tiposjuego:TiposJuego[]=[];
 
  constructor( private tpService:TipoJuegoService,public router:Router) { }
 
  ngOnInit() {
    this.cargar();
  }
  cargar():void{
    this.tpService.getAlltiposJuego().subscribe(
      data=>{
         this.tiposjuego=data;
         console.log(data)
       
      }
     
    ),err=>{
      console.log(err);
    }
  }
  enviarJuego(id:number){
    if(id==1){
      this.router.navigate(['jugar/'+id])
    }
    if(id==2){
      this.router.navigate(['quiz/'+id])
    }
    
  }
}
