import { Component, OnInit } from '@angular/core';
import { Logro } from 'src/app/modelo/logro';
import { LogroService } from 'src/app/services/logro.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  logros:Logro[]=[];
  constructor(private logroService:LogroService) { }
// Hay que añadir el token ala cabecera para autentificar al usuario administrador
//Para que pueda ver los usuarios
  ngOnInit() {
    this.cargar();
  }
  cargar():void{
    this.logroService.getAllLogros().subscribe(
      data=>{
         this.logros=data;
      }
     
    ),err=>{
      console.log(err);
    }
  }
}
