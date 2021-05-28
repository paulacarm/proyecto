import { Pregunta } from "./pregunta";

export class Respuesta{
    id:number;
    respuesta:string;
    esVerdadera:boolean;
    pregunta:Pregunta;
   
    constructor(id:number,respuesta:string,esVerdadera:boolean,pregunta:Pregunta){
        this.id=id;
        this.respuesta=respuesta;
        this.esVerdadera=esVerdadera;
        this.pregunta=pregunta;
    }


}