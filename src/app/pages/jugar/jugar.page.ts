import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AlertController, IonRadioGroup, IonSlides } from '@ionic/angular';
import { Pregunta } from 'src/app/modelo/pregunta';
import { Respuesta } from 'src/app/modelo/respuesta';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { RespuestaService } from 'src/app/services/respuesta.service';

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.page.html',
  styleUrls: ['./jugar.page.scss'],
})
export class JugarPage implements OnInit {
  id: number;
  preguntas: Pregunta[] = [];
  respuestas:Respuesta[]=[];
  respuestasDePregunta:Respuesta[]=[];
  pregunta:Pregunta=new Pregunta();
  public count: number;
  public tiempo;
  public intervalo;
  public respuestaUsuario:String;
  respuesta:Respuesta;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: 2000
  };
  selectedRadioItem:any;

  @ViewChild('mySlider') slides: IonSlides ;
  @ViewChild('radioGroup') radioGroup: IonRadioGroup;

  

  constructor(private rutaActiva: ActivatedRoute, private preguntaService: PreguntaService,
    public alertController: AlertController,private respuestaService: RespuestaService) {
    this.id = this.rutaActiva.snapshot.params.id;
    console.log(this.id)
  
   this.presentAlert();   
      this.respuestaUsuario="";
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
            this.cuentaAtras();
          }
        }
      ]
    });;
      
    await alert.present();
  }

  swipeNext() {
    this.respuestasDePregunta=null;
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
        this.pregunta=this.preguntas[0];
        this.respuestaService.getRespuestasDePregunta(this.pregunta.id).subscribe(
     data=>{
       this.respuestasDePregunta=data;
     })
      });   
  }

  recibirRespuestas(pregunta:Pregunta){
    this.respuestaService.getRespuestasDePregunta(pregunta.id).subscribe(
      data=>{
        this.respuestasDePregunta=data;
      })
  }

  cargarRespuestas(){
    this.respuestaService.getAllRespuestas().subscribe(
      data=>{
        this.respuestas=data;
      })
  }
 public marcarRespuesta(){
   console.log(this.respuestaUsuario);
   this.radioGroup.allowEmptySelection;
 }


  slidechanged() {
    clearInterval(this.intervalo);
    this.cuentaAtras();
    this.slides.getActiveIndex().then(id => { console.log('your index', id) 
    this.pregunta=this.preguntas[id];
    this.respuestaService.getRespuestasDePregunta(this.pregunta.id).subscribe(
      data=>{
        this.respuestasDePregunta=data;
        })   
     });
  
  }


  cuentaAtras() {
    this.count = 20;
    this.intervalo = setInterval(() => {
      this.pasarTiempo();
      if (this.count == 0) {
        clearInterval(this.intervalo);
        this.swipeNext();
      }
    }, 1000);

  }

  ngOnDestroy(){
    clearInterval(this.intervalo);
  }

}
