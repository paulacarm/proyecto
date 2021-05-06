
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { AlertController, IonRadioGroup, IonSlides } from '@ionic/angular';
import { Pregunta } from 'src/app/modelo/pregunta';
import { Respuesta } from 'src/app/modelo/respuesta';
import { Usuario } from 'src/app/modelo/usuario';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { RespuestaService } from 'src/app/services/respuesta.service';

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.page.html',
  styleUrls: ['./jugar.page.scss'],
})
export class JugarPage implements OnInit {
  NUMERO_PREGUNTAS: number = 9;
  //variable para saber si es la ultima pregunta del juego
  ultimaPregunta: boolean;
  //variable para guardar el usuario y asignarle los puntos
  usuario: Usuario;
  //varbiable para guardar el nombre de usuario
  userName: String;
  //Variable para
  id: number;
  preguntas: Pregunta[] = [];
  preguntasDesordenadas: Pregunta[] = [];
  respuestas: Respuesta[] = [];
  respuestasVerdaderas: Respuesta[] = [];
  respuestasDePregunta: Respuesta[] = [];
  pregunta: Pregunta = new Pregunta();
  public count: number;
  public tiempo;
  public intervalo;
  public respuestaUsuario: String;
  public page: number = 1;

  respuesta: Respuesta;
  slideOptsOne = {
    onlyExternal: true

  };
  selectedRadioItem: any;

  @ViewChild('mySlider') slides: IonSlides;
  @ViewChild('radioGroup') radioGroup: IonRadioGroup;

  public respuestaCorrecta: String;
  respuestasCargadas: boolean;

  constructor(private rutaActiva: ActivatedRoute, private preguntaService: PreguntaService,
    public alertController: AlertController,
    private respuestaService: RespuestaService,
    public router: Router) {
    this.id = this.rutaActiva.snapshot.params.id;
    this.presentAlert();
    this.respuestaUsuario = "";
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


  swipeNext() {
    for (let respuesta of this.respuestasDePregunta) {
      if (respuesta.respuesta == this.respuestaUsuario) {
        if (respuesta.esVerdadera) {
          console.log("correcto")
          this.respuestasVerdaderas.push(respuesta)
          console.log(this.respuestasVerdaderas);
        } else console.log("incorrecto")
      }
    }
    this.respuestasDePregunta=[];
    this.slides.slideNext();
  }

  ngOnInit() {
    this.ultimaPregunta = false;
    this.respuestasDePregunta = [];
    this.respuestasVerdaderas = [];
    this.cargarPreguntas();
  }

  public pasarTiempo(): void {
    this.count--;
  }
  random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }
  cargarPreguntas() {
    //Petición a la API de todas las preguntas del tipo de juego
    this.preguntaService.getPreguntasTipoJuego(this.id).subscribe(
      data => {
        this.preguntas = data;
        do {
          //Se introducen 10 preguntas aleatorias en el array sin que se repitan
          let indice = this.random(0, this.preguntas.length - 1);
          if (!this.preguntasDesordenadas.includes(this.preguntas[indice])) {
            this.preguntasDesordenadas.push(this.preguntas[indice]);
          }
        } while (this.preguntasDesordenadas.length != this.NUMERO_PREGUNTAS + 1)
        //Solo para la primera pregunta, se le asignan sus respuestas
        this.pregunta = this.preguntasDesordenadas[0];
        console.log("pimera pregunta")
        console.log(this.pregunta)
        this.respuestaService.getRespuestasDePregunta(this.pregunta.id).subscribe(
          data => {
            this.respuestasDePregunta = data;

          })
      });
  }

  //Este método asigna las respuestas a la pregunta y comprueba si es la última 
  slidechanged() {
   this.respuestasDePregunta=[];
    //Reinicio de cuenta atrás. 20 segundos por pregunta.
    clearInterval(this.intervalo);
    //Comprobar en qué slider/pregunta nos encontramos
    this.slides.getActiveIndex().then(id => {
      this.page = id + 1;
      this.cuentaAtras(id);
      this.pregunta = this.preguntasDesordenadas[id];
      //petición ala API de las respuestas de la pregunta actual
      this.respuestaService.getRespuestasDePregunta(this.pregunta.id).subscribe(
        data => {
          this.respuestasDePregunta = data;
          this.respuestasCargadas=true;
          console.log(this.respuestasCargadas);
          //Comprueba si es el último slider/pregunta y si lo es pone ultimaPregunta a true. En la vista aparece botón terminar.
          this.slides.isEnd().then(ultima => {
            if (ultima) {
              this.ultimaPregunta = true;
            }
          })
        })
    });

  }

  terminarJuego() {
    //Para almacenar también el resultado de la última pregunta.
    for (let respuesta of this.respuestasDePregunta) {
      if (respuesta.respuesta == this.respuestaUsuario) {
        if (respuesta.esVerdadera) {
          console.log("correcto")
          this.respuestasVerdaderas.push(respuesta)
          console.log(this.respuestasVerdaderas);
        } else console.log("incorrecto")
      }
    }
    //Se mandan las respuestas acertadas y las preguntas a la página de soluciones
    let navigationExtras: NavigationExtras = {
      state: {
        respuestas: this.respuestasVerdaderas,
        preguntas: this.preguntasDesordenadas
      }
    };
    this.router.navigate(['solucionesqsq'], navigationExtras);
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
  ngOnDestroy() {
    clearInterval(this.intervalo);

  }

}
