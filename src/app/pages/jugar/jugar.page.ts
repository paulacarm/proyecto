
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
   onlyExternal:true

  };
  selectedRadioItem: any;

  @ViewChild('mySlider') slides: IonSlides;
  @ViewChild('radioGroup') radioGroup: IonRadioGroup;

  public respuestaCorrecta: String;

  constructor(private rutaActiva: ActivatedRoute, private preguntaService: PreguntaService,
    public alertController: AlertController,
    private respuestaService: RespuestaService,
    public router: Router) {
    this.id = this.rutaActiva.snapshot.params.id;
    console.log("this id"+ this.id)
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


async terminar(){
 const alert=await this.alertController.create({
  header:'Resultado',
  message:'Tu puntuación es ' + this.respuestasVerdaderas.length + ' de ' + this.preguntas.length +'(' + this.respuestasVerdaderas.length *10 +'%)'
  })
  await alert.present();
}
  swipeNext() {
    this.ultimaPregunta = false;
    console.log(this.ultimaPregunta)
    clearInterval(this.intervalo);
    this.slides.getActiveIndex().then(id => {
      console.log('your index', id)
      this.page = id + 1;
      this.cuentaAtras(id);
      this.pregunta = this.preguntas[id];
      this.respuestaService.getRespuestasDePregunta(this.pregunta.id).subscribe(
        data => {
          this.respuestasDePregunta = data;

          for (let respuesta of this.respuestasDePregunta) {
            if (respuesta.respuesta == this.respuestaUsuario) {
              if (respuesta.esVerdadera) {
                console.log("correcto")
                this.respuestasVerdaderas.push(respuesta)
                console.log(this.respuestasVerdaderas);
              } else console.log("incorrecto")
            }
          }
          this.slides.isEnd().then(ultima => {
            console.log(ultima)
            if (ultima) {
              this.ultimaPregunta = true;
            }

          })
        })
    });
    

    this.slides.slideNext();

      
  }

  ngOnInit() {
    this.cargarPreguntas();
    this.cargarRespuestas();


  }

  public pasarTiempo(): void {
    this.count--;
  }

  cargarPreguntas() {
    this.preguntaService.getPreguntasTipoJuego(this.id).subscribe(
      data => {
        this.preguntas = data;
        //Solo para la primera pregunta, se le asignan sus respuestas
        this.pregunta = this.preguntas[0];
        this.respuestaService.getRespuestasDePregunta(this.pregunta.id).subscribe(
          data => {
            this.respuestasDePregunta = data;
          })
      });
  }

  cargarRespuestas() {
    this.respuestaService.getAllRespuestas().subscribe(
      data => {
        this.respuestas = data;
      })
  }

  slidechanged() {
    this.ultimaPregunta = false;
    clearInterval(this.intervalo);
    this.slides.getActiveIndex().then(id => {
      this.page = id + 1;
      this.cuentaAtras(id);
      this.pregunta = this.preguntas[id];
      this.respuestaService.getRespuestasDePregunta(this.pregunta.id).subscribe(
        data => {
          this.respuestasDePregunta = data;
          for (let respuesta of this.respuestasDePregunta) {
            if (respuesta.respuesta == this.respuestaUsuario) {
              if (respuesta.esVerdadera) {
                console.log("correcto")
                this.respuestasVerdaderas.push(respuesta)
                console.log(this.respuestasVerdaderas);
              } else console.log("incorrecto")
            }
          }  
          this.slides.isEnd().then(ultima => {
            console.log(ultima)
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
    this.terminar();
    let navigationExtras: NavigationExtras = {
      state: {
        respuestas: this.respuestasVerdaderas,
        preguntas: this.preguntas
      }
    };
    this.router.navigate(['solucionesqsq'], navigationExtras);
  }


  cuentaAtras(id: number) {
    this.count = 20;
    this.intervalo = setInterval(() => {
      this.pasarTiempo();
      if (this.count == 0 && id != this.NUMERO_PREGUNTAS) {
        clearInterval(this.intervalo);
        this.swipeNext();
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
