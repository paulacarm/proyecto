import { Component, OnInit } from '@angular/core';
import { Logro } from 'src/app/modelo/logro';
import { Usuario } from 'src/app/modelo/usuario';
import { UsuarioLogro } from 'src/app/modelo/UsuarioLogro';
import { AuthService } from 'src/app/services/auth.service';
import { LogroService } from 'src/app/services/logro.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioLogroService } from 'src/app/services/usuario-logro.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  isLogged: boolean;
  isAdmin: boolean;
  UserName: string;
  usuarios: Usuario[] = [];
  usuario: Usuario;
  email: string;
  logros: Logro[] = [];
  logrosusuarios: UsuarioLogro[] = [];
  nombreusuario: string;
  ul: UsuarioLogro;
  constructor(private tokenService: TokenService,
    private usuarioService: AuthService,
    private usuarioLogroService: UsuarioLogroService, private logroService: LogroService) {

  }

  ngOnInit() {
    this.logroService.getAllLogros().subscribe(
      data => {
        this.logros = data;
      }
    )

  }

  ionViewWillEnter() {
    this.testLogged();

  }
  testLogged(): void {

    this.isLogged = this.tokenService.getToken() != null;
    this.UserName = this.tokenService.getUsername();
    this.isAdmin = this.tokenService.getAuthorities().length > 1;
    this.usuarioService.getUsuarioxNombre(this.UserName).subscribe(
      data => {
        this.usuario = data;
        console.log(this.usuario)
        this.usuarioLogroService.getLogrosUsuario(this.usuario.id).subscribe(
          data => {
            this.logrosusuarios = data;

            if (this.logrosusuarios.length == 0) {
              for (let logro of this.logros) {
                this.ul = new UsuarioLogro(this.usuario, logro, 0);
                this.usuarioLogroService.postLogro(this.ul).subscribe(
                  data => { })
              }
            }
          }
        );
      })

  }
}
