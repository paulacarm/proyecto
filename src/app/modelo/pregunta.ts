import { Cronologia } from "./cronologia";
import { Logro } from "./logro";
import { TiposJuego } from "./tipoJuego";

export class Pregunta{
    id:number;
    pregunta:string;
    saberMas:string;
    imagen:string;
    enlaceArticulo:string;
    cronologia:Cronologia;
    tiposJuego:TiposJuego;
    logro:Logro;



}