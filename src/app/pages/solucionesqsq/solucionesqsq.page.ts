
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { Logro } from 'src/app/modelo/logro';
import { Pregunta } from 'src/app/modelo/pregunta';
import { Respuesta } from 'src/app/modelo/respuesta';
import { Usuario } from 'src/app/modelo/usuario';
import { UsuarioLogro } from 'src/app/modelo/UsuarioLogro';
import { UsuarioLogroId } from 'src/app/modelo/UsuarioLogroId';
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
  respuestasDePregunta: Respuesta[] = [];
  preguntasAcertadas: Pregunta[]=[];
  respuestas: Respuesta[];
  preguntas: Pregunta[];
  respuesta: Respuesta = new Respuesta();
  pregunta: Pregunta;
  totalAciertos: number;
  usuarioLogro:UsuarioLogro;
  //variable para guardar el usuario y asignarle los puntos
  usuario: Usuario;
  //varbiable para guardar el nombre de usuario
  userName: String;
  acertada:boolean;

  ultimapregunta:boolean;
  @ViewChild('mySlider') slides: IonSlides;

  constructor(private route: ActivatedRoute, private router: Router, private respuestaService: RespuestaService,
    public usuarioLogroService: UsuarioLogroService, public tokenService: TokenService, public usuarioService: AuthService) {
   

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.respuestas = this.router.getCurrentNavigation().extras.state.respuestas;
        this.preguntas = this.router.getCurrentNavigation().extras.state.preguntas;
        this.totalAciertos = this.respuestas.length;
        this.pregunta = this.preguntas[0];
        console.log(this.pregunta)
      /*  this.respuestaService.getRespuestaVerdaderaDePregunta(this.pregunta.id).subscribe(
          data=>{
            this.respuesta=data;
          }
        )*/
      

      }
    });

    this.respuestaService.getRespuestasDePregunta(this.pregunta.id).subscribe(
      data => {
        this.respuestasDePregunta = data;
        for (let respuesta of this.respuestasDePregunta) {
          if (respuesta.esVerdadera) {
            this.respuesta = respuesta;
            this.preguntasAcertadas.push(this.pregunta);
        
          }
        }
        if(this.preguntasAcertadas.includes(this.pregunta)){
          this.acertada=true;
        }
      })
    this.userName = this.tokenService.getUsername();
    this.usuarioService.getUsuarioxNombre(this.userName).subscribe(
      data => {
        this.usuario = data;
        console.log(this.usuario);
        this.asignarPuntosUsuario();
      });
   



      
  }

  slidechanged() {
    this.acertada=false;
    this.slides.getActiveIndex().then(id => {
      console.log('your index', id)
      this.pregunta = this.preguntas[id];
      if(this.preguntasAcertadas.includes(this.pregunta)){
        this.acertada=true;
        console.log(true);
      }
     /* this.respuestaService.getRespuestaVerdaderaDePregunta(this.pregunta.id).subscribe(
        data=>{
          this.respuesta=data;
        }
      )*/
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
          console.log(ultima)
          if (ultima) {
            this.ultimapregunta = true;
          }
        })

    });



  }

  asignarPuntosUsuario() {
 
    for(let respuesta of this.respuestas){
      for(let pregunta of this.preguntas){
          if(respuesta.pregunta.id==pregunta.id){
              if(respuesta.esVerdadera){
                this.preguntasAcertadas.push(pregunta);
              }
            }
          }
        
          for(let pregunta of this.preguntasAcertadas){
            let ulId = new UsuarioLogroId(this.usuario.id, pregunta.logro.id_logro);
            this.usuarioLogro = new UsuarioLogro(this.usuario, pregunta.logro ,20);
            
          /*  this.usuarioLogroService.actualizarLogro(this.usuarioLogro,ulId,).subscribe(
              data=>{
                console.log(data)
              }
            )*/
            /*this.usuarioLogroService.postLogro(this.usuarioLogro).subscribe(
              data=>{
                console.log(data)
             }
            )*/
     
          }
    }


  }


  
  swipeNext() {
    this.slides.getActiveIndex().then(id => {
      console.log('your index', id)
    })

   /* for (let respuesta of this.respuestasDePregunta) {
      if (respuesta.esVerdadera) {
        this.respuesta = respuesta;
        console.log(this.respuesta)
      }

      this.respuestasDePregunta = null;
     
    }*/
    this.slides.slideNext();
  }
}
