import { NumericValueAccessor } from "@ionic/angular";

export class UsuarioLogroId{
    id_usuario:number;
    id_logro:number;

    constructor(id_usuario:number,id_logro:number){
        this.id_logro=id_logro;
        this.id_usuario=id_usuario;
    }
}