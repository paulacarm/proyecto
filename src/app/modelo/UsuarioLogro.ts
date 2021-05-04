import { LocalNotificationRequest } from "@capacitor/core";
import { LoginPageRoutingModule } from "../pages/login/login-routing.module";
import { Logro } from "./logro";
import { Usuario } from "./usuario";
import { UsuarioLogroId } from "./UsuarioLogroId";

export class UsuarioLogro{
  id:UsuarioLogroId;
  usuario:Usuario;
  logro:Logro;
  puntos:number;

  constructor(  id:UsuarioLogroId,usuario:Usuario,logro:Logro,puntos:number){
      this.id=id;
      this.usuario=usuario;
      this.logro=logro;
      this.puntos=puntos;
  }

}