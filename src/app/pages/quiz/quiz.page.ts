import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonSlides } from '@ionic/angular';
import { Pregunta } from 'src/app/modelo/pregunta';
import { Respuesta } from 'src/app/modelo/respuesta';
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
  NUMERO_PREGUNTAS: number = 8;
  page: number = 1;
  public count: number;
  public tiempo;
  public intervalo;
  pregunta: Pregunta;
  respuestasDePregunta: Respuesta[] = [];
  ultima: boolean
  public respuestaUsuario: String;

  constructor(private preguntaService: PreguntaService,
    public alertController: AlertController, private rutaActiva: ActivatedRoute,
    private respuestaService: RespuestaService) {
    this.id = this.rutaActiva.snapshot.params.id;
    this.presentAlert();
    this.respuestaUsuario = "";
    console.log(this.id);

  }
  ngOnInit() {
    this.ultima = false;
    this.cargarPreguntas();

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Empieza el juego',
      subHeader: 'preparad@?',
      buttons: [

        {
          text: 'Ok',
          handler: () => {
            this.cuentaAtras(this.id);
          }
        }
      ]
    });;

    await alert.present();
  }
  //Temporizador para las preguntas. 
  cuentaAtras(id: number) {
    this.count = 20;
    this.intervalo = setInterval(() => {
      this.pasarTiempo();
      //Si llega a O y no es la última pregunta, pasar a la siguiente pregunta y se reinicia.
      if (this.count == 0 && id != this.NUMERO_PREGUNTAS) {
        clearInterval(this.intervalo);
        this.swipeNext();
        //Si el tiempo se acaba y es la última pregunta se termina el juego.
      } if (this.count == 0 && id == this.NUMERO_PREGUNTAS) {
        clearInterval(this.intervalo);
        this.terminarJuego();
      }
    }, 1000);

  }
  
  public pasarTiempo(): void {
    this.count--;
  }
  random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }
  terminarJuego() {
    //Para almacenar también el resultado de la última pregunta.
    for (let respuesta of this.respuestasDePregunta) {
      if (respuesta.respuesta == this.respuestaUsuario) {
        if (respuesta.esVerdadera) {
          console.log("correcto")
         
        } else console.log("incorrecto")
      }
    }
  }

  slidechanged() {
    this.respuestasDePregunta = [];
    //Comprobar en qué slider/pregunta nos encontramos
    this.slides.getActiveIndex().then(id => {
      this.page = id + 1;
      console.log("ID POSICION " + id)
      this.pregunta = this.preguntas[id];
      console.log(this.pregunta)
      //petición ala API de las respuestas de la pregunta actual
      this.respuestaService.getRespuestasDePregunta(this.pregunta.id).subscribe(
        data => {
          this.respuestasDePregunta = data;
          console.log(this.respuestasDePregunta)
          //Comprueba si es el último slider/pregunta y si lo es pone ultimaPregunta a true. En la vista aparece botón terminar.
          this.slides.isEnd().then(ultima => {
            if (ultima) {
              this.ultima = true
              console.log("ULTIMA PREGUNTA EN SLIDECHANGED")

            }
          })
        })
    });

  }

  cargarPreguntas() {
    this.preguntaService.getPreguntasTipoJuego(this.id).subscribe(
      data => {
        this.preguntas = data;
        console.log(this.preguntas);
        this.slides.getActiveIndex().then(id => {
          console.log("id cargar preguntas " + id)
          this.pregunta = this.preguntas[id];
          this.respuestaService.getRespuestasDePregunta(this.pregunta.id).subscribe(
            data => {
              this.respuestasDePregunta = data;
            })
        });

      }

    )

  }
  swipeNext() {
    for (let respuesta of this.respuestasDePregunta) {
      if (respuesta.respuesta == this.respuestaUsuario) {
        if (respuesta.esVerdadera) {
          console.log("correcto")
        } else console.log("incorrecto")
      }
    }

    this.respuestasDePregunta = [];
    this.slides.slideNext();
  }
  ngOnDestroy() {
    clearInterval(this.intervalo);
  }
}