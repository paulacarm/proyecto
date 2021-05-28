import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonSlides } from '@ionic/angular';
import { Pregunta } from 'src/app/modelo/pregunta';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { RespuestaService } from 'src/app/services/respuesta.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
  id: number;
  preguntas: Pregunta[] = [];
  @ViewChild('mySlider') slides: IonSlides;
  page: number=0;

  constructor( private preguntaService: PreguntaService,
    public alertController: AlertController,private rutaActiva: ActivatedRoute,
    private respuestaService: RespuestaService) {
      this.id = this.rutaActiva.snapshot.params.id;
      console.log(this.id);

     }

  ngOnInit() {
    this.cargarPreguntas();
  }

  cargarPreguntas(){
    this.preguntaService.getPreguntasTipoJuego(this.id).subscribe(
      data=>{
        this.preguntas=data;
        console.log(this.preguntas);
        this.slides.getActiveIndex().then(id => {
          this.page = id;
        });
      
      }
      
    )
  
  }
}
