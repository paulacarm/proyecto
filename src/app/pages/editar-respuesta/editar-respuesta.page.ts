import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Respuesta } from 'src/app/modelo/respuesta';
import { RespuestaService } from 'src/app/services/respuesta.service';

@Component({
  selector: 'app-editar-respuesta',
  templateUrl: './editar-respuesta.page.html',
  styleUrls: ['./editar-respuesta.page.scss'],
})
export class EditarRespuestaPage implements OnInit {
respuesta:Respuesta;
nuevaRespuesta:string;
  constructor(public router:Router,public respuestaService: RespuestaService,public alertController:AlertController) { 
    this.respuesta= this.router.getCurrentNavigation().extras.state.respuesta;

    console.log(this.respuesta);
  }

  ngOnInit() {
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modificar respuesta de pregunta',
      message: '¿Seguro que desea guardar los cambios?',
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
          
          }
        }
      ]
    });

    await alert.present();
  }
  ModificarRespuesta(){
    let resp :Respuesta=new Respuesta(this.respuesta.id,this.nuevaRespuesta,this.respuesta.esVerdadera,this.respuesta.pregunta);
    this.respuestaService.modificarRespuesta(resp,this.respuesta.id).subscribe(
      data=>{
        console.log(data);
        this.router.navigate(['/detalle']);
      }
    )
  
 // this.presentAlertConfirm();
  }

}
