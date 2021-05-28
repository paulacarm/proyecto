
import { Cronologia } from "./cronologia";
import { Dificultad } from "./Dificultad";
import { Logro } from "./logro";
import { TiposJuego } from "./tipoJuego";

export class Pregunta{
    id:number;
    pregunta:string;
    saberMas:string;
    imagen:string;
    dificultad:Dificultad;
    cronologia:Cronologia;
    tipoJuego:TiposJuego;
    logro:Logro;

   
 constructor(id:number,pregunta:string,saberMas:string,imagen:string,dificultad:Dificultad,cronologia:Cronologia,tipoJuego:TiposJuego,logro:Logro){
     this.id=id;
     this.pregunta=pregunta;
     this.saberMas=saberMas;
     this.imagen=imagen;
     this.dificultad=dificultad;
     this.cronologia=cronologia;
     this.tipoJuego=tipoJuego;
     this.logro=logro;


 }

}