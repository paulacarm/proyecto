import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Pregunta } from 'src/app/modelo/pregunta';
import { Respuesta } from 'src/app/modelo/respuesta';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { RespuestaService } from 'src/app/services/respuesta.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {


  preguntas: Pregunta[] = [];
  id: number;
  pregunta: Pregunta;
  respuestas: Respuesta[] = [];
  ver: boolean;

  constructor(public ruta: ActivatedRoute, public preguntaService: PreguntaService,
    public respuestaService: RespuestaService, public router: Router,
    public alertController: AlertController) {
    this.id = this.ruta.snapshot.params.id;
    this.ver = false;
    this.preguntaService.getPreguntasLogro(this.id).subscribe(
      data => {
        this.preguntas = data;
        console.log(this.preguntas);
      }
    )
    console.log(this.id)

  }

  eliminarPregunta(pregunta: Pregunta) {
    this.presentAlertConfirm(pregunta);
  }
  enviarPregunta(pregunta: Pregunta) {
    console.log("pregunta que mando" + pregunta.logro.nombre);
    let navigationExtras: NavigationExtras = {
      state: {
        pregunta: pregunta
      }
    };

    this.router.navigate(['detalle'], navigationExtras);

  }
  async presentAlertConfirm(pregunta: Pregunta) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar pregunta',
      message: '¿Seguro que desea eliminar la pregunta?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.preguntaService.eliminarPregunta(pregunta.id).subscribe(
              data => {
                console.log(data);
                this.confirmacion();
               this.router.navigate(['home/admin']);
              }
            )



          }
        }
      ]
    });

    await alert.present();
  }


  async confirmacion() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar pregunta',
      message: '¡Pregunta Eliminada!',
    });
    await alert.present();
  }

  verRespuestas(p: Pregunta) {
    this.ver = !this.ver;
    this.respuestaService.getRespuestasDePregunta(p.id).subscribe(
      data => {
        this.respuestas = data;
        console.log(data);
      }
    )
  }

  ngOnInit() {

  }

}
