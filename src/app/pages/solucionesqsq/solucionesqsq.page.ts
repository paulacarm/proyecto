import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonSlides } from '@ionic/angular';
import { Pregunta } from 'src/app/modelo/pregunta';
import { Respuesta } from 'src/app/modelo/respuesta';
import { Usuario } from 'src/app/modelo/usuario';
import { UsuarioLogro } from 'src/app/modelo/UsuarioLogro';
import { AuthService } from 'src/app/services/auth.service';
import { RespuestaService } from 'src/app/services/respuesta.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioLogroService } from 'src/app/services/usuario-logro.service';

@Component({
  selector: 'app-solucionesqsq',
  templateUrl: './solucionesqsq.page.html',
  styleUrls: ['./solucionesqsq.page.scss'],
})
export class SolucionesqsqPage implements OnInit {
  //variable para almacenar el objeto Usuario Logro y asignar los puntos
  ul: UsuarioLogro;
  //variable para almacenar las respuestas de cada pregunta y poder mostrarlar
  public respuestasDePregunta: Respuesta[] = [];
  //variable para almacenar las preguntas acertadas
  preguntasAcertadas: Pregunta[] = [];
  //variable para almacenar las respuestas del usuario
  respuestas: Respuesta[];
  //variable para almacenar las preguntas del juego(cada vez que se juega las preguntas son distintas)
  preguntas: Pregunta[];
  respuesta: Respuesta = new Respuesta(null, null, null, null);
  pregunta: Pregunta;
  //variable para guardar el numero de aciertos del usuario
  totalAciertos: number;
  //variable para guardar el usuario y asignarle los puntos
  usuario: Usuario;
  //varbiable para guardar el nombre de usuario
  userName: String;
  //varbiable para saber si la pregunta que muestra el slider ha sido acertada o no (se muetra en la vista)
  acertada: boolean;
  //Variable para guardar los puntos que se asginarán a cada logro según la dificultad
  PUNTOS: number = 0;

  ultimapregunta: boolean;
  @ViewChild('mySlider') slides: IonSlides;

  constructor(private route: ActivatedRoute, private router: Router, private respuestaService: RespuestaService,
    public usuarioLogroService: UsuarioLogroService, public tokenService: TokenService, public usuarioService: AuthService, public alertController: AlertController) {
    // Se reciben las preguntas del juego y las respuestas acertadas del usuario
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.respuestas = this.router.getCurrentNavigation().extras.state.respuestas;
        this.preguntas = this.router.getCurrentNavigation().extras.state.preguntas;
        this.totalAciertos = this.respuestas.length;
      }
    });

  }
  ngOnInit(): void {
    this.guardarPreguntasAcertadas()
    this.asignarPuntos();
    //Se asigna a la variable pregunta la primera pregunta del slide 
    this.pregunta = this.preguntas[0];
    //Se asignan las respuestas a la 1 pregunta.
    this.respuestaService.getRespuestasDePregunta(this.pregunta.id).subscribe(
      data => {
        this.respuestasDePregunta = data;
        for (let respuesta of this.respuestasDePregunta) {
          if (respuesta.esVerdadera) {
            this.respuesta = respuesta;
          }
        }
      })
    if (this.preguntasAcertadas.includes(this.pregunta)) {
      this.acertada = true;
    }
  }

  asignarPuntos() {
    this.userName = this.tokenService.getUsername();
    this.usuarioService.getUsuarioxNombre(this.userName).subscribe(
      data => {
        this.usuario = data;
        this.asignarPuntosUsuario();
      });
  }
  guardarPreguntasAcertadas() {
    for (let respuesta of this.respuestas) {
      for (let pregunta of this.preguntas) {
        if (respuesta.pregunta.id == pregunta.id) {
          if (respuesta.esVerdadera) {
            this.preguntasAcertadas.push(pregunta);
            console.log(this.preguntasAcertadas)
          }
        }
      }
    }
  }


  slidechanged() {
    //cada vez que se cambia de slider se le guarda la pregunta y se asigna la respuesta correcta
    this.acertada = false;
    this.slides.getActiveIndex().then(id => {
      console.log('your index', id)
      this.pregunta = this.preguntas[id];
      if (this.preguntasAcertadas.includes(this.pregunta)) {
        console.log("pregnta acertada", this.pregunta)
        this.acertada = true;
      }
      this.respuestaService.getRespuestasDePregunta(this.pregunta.id).subscribe(
        data => {
          this.respuestasDePregunta = data;
          for (let respuesta of this.respuestasDePregunta) {
            if (respuesta.esVerdadera) {
              this.respuesta = respuesta;

            }
          }
        })
      this.slides.isEnd().then(ultima => {
        if (ultima) {
          //si es la ultima pregunta nos aparece el botón de terminar
          this.ultimapregunta = true;
        }
      })
    });
  }

  asignarPuntosUsuario() {
    //se asignan unos puntos según el nivel de dificultad de la pregunta y se guarda en la base de datos(donde se suma alos puntos que ya tenía)
    for (let pregunta of this.preguntasAcertadas) {
      switch (pregunta.dificultad.nombre) {
        case 'Fácil': {
          this.PUNTOS = 20
          break;
        }
        case 'Medio': {
          this.PUNTOS = 30
          break;
        }
        case 'Difícil': {
          this.PUNTOS = 40
          break;
        }
        default: {
          console.log("no tiene dificultad")
          break;
        }
      }

      console.log("PUNTOS. :", this.PUNTOS)
      this.ul = new UsuarioLogro(this.usuario, pregunta.logro, this.PUNTOS);
      this.usuarioLogroService.actualizarLogro(this.ul, this.usuario.id, pregunta.logro.id_logro).subscribe(
        data => {
        }
      )

    }

    this.PUNTOS = 0
  }

  saltar() {
    this.abandonarAlert();
  }
  async abandonarAlert() {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: '¿Está seguro?',
      subHeader: 'Se perderá información interesante',
      buttons: [

        {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['home/perfil']);
          }
        }
      ]
    });;

    await alert.present();
  }

  swipeNext() {
    this.slides.slideNext();
  }
}
