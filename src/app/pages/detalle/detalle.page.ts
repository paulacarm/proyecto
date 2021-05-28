
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Cronologia } from 'src/app/modelo/cronologia';
import { Dificultad } from 'src/app/modelo/Dificultad';
import { Logro } from 'src/app/modelo/logro';
import { Pregunta } from 'src/app/modelo/pregunta';
import { Respuesta } from 'src/app/modelo/respuesta';
import { CronologiaService } from 'src/app/services/cronologia.service';
import { DificultadService } from 'src/app/services/dificultad.service';
import { LogroService } from 'src/app/services/logro.service';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { RespuestaService } from 'src/app/services/respuesta.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  pregunta:Pregunta;
  respuestas:Respuesta[]=[];
  id:number;
  editar:boolean;
  logros:Logro[]=[];
  dificultades:Dificultad[]=[];
  cronologias:Cronologia[]=[];
  logroSeleccionado:Logro;
  respuestaNueva:string;
  preguntaNueva:string;
  dificultadSeleccionada:Dificultad;
  cronologiaSeleccionada: Cronologia;
  constructor(private preguntaService:PreguntaService,public ruta: ActivatedRoute,
    private respuestaService:RespuestaService,public router:Router,
    private logroService:LogroService,
    private dificultadService:DificultadService,
    private cronologiaService: CronologiaService,
    public alertController: AlertController) {
    //this.id = this.ruta.snapshot.params.id;
   // console.log(this.id)
    this.pregunta = this.router.getCurrentNavigation().extras.state.pregunta;
    console.log("pregunta que recibo:")
    console.log(this.pregunta);
    this.logroService.getAllLogros().subscribe(
      data=>{
        this.logros=data;
        console.log(this.logros);
      }
    )

    this.dificultadService.getAllDificultades().subscribe(
      data=>{
        this.dificultades=data;
        console.log(this.dificultades);

      }
    )

      this.cronologiaService.getAllCronologias().subscribe(
        data=>{
          this.cronologias=data;
          console.log(this.cronologias);
        }
      )

   }
   async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modificar pregunta',
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
            let pregunta:Pregunta=new Pregunta(
              this.pregunta.id,
              this.preguntaNueva,
              this.pregunta.saberMas,
              this.pregunta.imagen,
              this.dificultadSeleccionada,
              this.cronologiaSeleccionada,
              this.pregunta.tipoJuego,
              this.logroSeleccionado
            )
            this.preguntaService.modificarPregunta(pregunta,pregunta.id).subscribe(
              data=>{
                console.log(data);
                console.log(pregunta)
              }
            )
            console.log(pregunta)
            this.router.navigate(['/home/admin']);
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.cargarPregunta();
  }
  ionViewWillEnter(){
    this.respuestaService.getRespuestasDePregunta(this.pregunta.id).subscribe(
      data=>{
        this.respuestas=data;
      }
    )
  }
  guardarCambios(){
    if(this.logroSeleccionado==null){
      this.logroSeleccionado=this.pregunta.logro;
      console.log(this.logroSeleccionado)
      console.log("no has seleccionado ningun logro")
    }
    if(this.preguntaNueva==null){
      this.preguntaNueva=this.pregunta.pregunta;
      console.log(this.preguntaNueva)
      console.log("no has escrito ninguna pregunta")
    }

    if(this.dificultadSeleccionada==null){
      this.dificultadSeleccionada=this.pregunta.dificultad;
      console.log(this.dificultadSeleccionada)
      console.log("no has seleccionado ninguna dificultad")
    }
    
    if(this.cronologiaSeleccionada==null){
      this.cronologiaSeleccionada=this.pregunta.cronologia;
      console.log(this.cronologiaSeleccionada)
      console.log("no has seleccionado ninguna cronologia")
    }
this.presentAlertConfirm();
    
  }
  ModificarRespuesta(respuesta:Respuesta){
    let navigationExtras: NavigationExtras = {
      state: {
       respuesta:respuesta
      }
    };

 this.router.navigate(['editar-respuesta'],navigationExtras);
  
  }

  cargarPregunta(){
    this.respuestaService.getRespuestasDePregunta(this.pregunta.id).subscribe(
      data=>{
        this.respuestas=data;
      }
    )
  }

}
