import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AlertController, IonSlides } from '@ionic/angular';
import { Pregunta } from 'src/app/modelo/pregunta';
import { PreguntaService } from 'src/app/services/pregunta.service';

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.page.html',
  styleUrls: ['./jugar.page.scss'],
})
export class JugarPage implements OnInit {
  id: number;
  preguntas: Pregunta[] = [];
  public count: number;
  public tiempo;
  public intervalo;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: 2000
  };
  @ViewChild('mySlider') slides: IonSlides;


  constructor(private rutaActiva: ActivatedRoute, private preguntaService: PreguntaService,public alertController: AlertController) {
    this.id = this.rutaActiva.snapshot.params.id;
    console.log(this.id)
   this.presentAlert();   

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
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
    this.slides.slideNext();
  }

  ngOnInit() {
    this.cargarPreguntas();
  }
  public pasarTiempo(): void {
    this.count--;
    console.log(this.count);

  }

  
  cargarPreguntas() {
    this.preguntaService.getPreguntasTipoJuego(this.id).subscribe(
      data => {
        this.preguntas = data;
        console.log(this.preguntas)
      })
  }
  slidechanged() {
    clearInterval(this.intervalo);
    this.cuentaAtras();

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
