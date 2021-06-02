import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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
  private NUMERO_PREGUNTAS: number = 8;
  private page: number = 1;
  public count: number;
  public tiempo;
  public intervalo;
  private pregunta: Pregunta;
  private respuestasDePregunta: Respuesta[] = [];
  private ultima: boolean
  public respuestaUsuario: String;
  private numAciertos: number
  private respuestas:Respuesta[] =[]
  private respuestasCorrectas: Respuesta[] = []


  constructor(private preguntaService: PreguntaService,
    public alertController: AlertController, private rutaActiva: ActivatedRoute,
    private respuestaService: RespuestaService, private router: Router) {
    this.id = this.rutaActiva.snapshot.params.id;
    this.presentAlert();
    this.respuestaUsuario = ""
    this.numAciertos = 0
    this.respuestaService.getAllRespuestas().subscribe(
      data=>{
        this.respuestas=data
        console.log(this.respuestas)
        for(let respuesta of this.respuestas){
            if(respuesta.esVerdadera &&  respuesta.pregunta.tipoJuego.id==2){
                this.respuestasCorrectas.push(respuesta)
                console.log(this.respuestasCorrectas)
            }
        }
      }
    )

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

  terminarJuego() {
    //Para almacenar también el resultado de la última pregunta.
    for (let respuesta of this.respuestasDePregunta) {
      if (respuesta.respuesta == this.respuestaUsuario) {
        if (respuesta.esVerdadera) {
          console.log("correcto")
          this.numAciertos++

        } else console.log("incorrecto")
      }
    }
    console.log(this.numAciertos)
      //Se mandan las respuestas acertadas y las preguntas a la página de soluciones
      let navigationExtras: NavigationExtras = {
        state: {
          respuestas: this.respuestasCorrectas,
          totalAciertos: this.numAciertos
        
        }
      };
    
    this.router.navigate(['solucuionesquiz'],navigationExtras);

  }

  slidechanged() {
    this.respuestasDePregunta = [];
    //Reinicio de cuenta atrás. 20 segundos por pregunta.
    clearInterval(this.intervalo);
    //Comprobar en qué slider/pregunta nos encontramos
    this.slides.getActiveIndex().then(id => {
      this.page = id + 1;
      this.cuentaAtras(id);
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
          this.numAciertos++
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