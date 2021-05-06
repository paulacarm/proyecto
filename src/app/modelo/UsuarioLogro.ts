
import { Logro } from "./logro";
import { Usuario } from "./usuario";
import { UsuarioLogroId } from "./UsuarioLogroId";

export class UsuarioLogro{
 //id:UsuarioLogroId;
  usuario:Usuario;
  logro:Logro;
  puntos:number;

  constructor(usuario:Usuario,logro:Logro,puntos:number){
     // this.id=id;
      this.usuario=usuario;
      this.logro=logro;
      this.puntos=puntos;
  }

}