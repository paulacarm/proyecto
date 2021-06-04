import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/modelo/login-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ToastController } from '@ionic/angular';
import { NuevoUsuario } from 'src/app/modelo/nuevo-usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: SocialUser;
  loggedIn: boolean;
  registrar: boolean;
  authState: any = null;
  email: any;
  errMsj = ''
  LoginUsuario: LoginUsuario;
  nombreUsuario = '';
  password = '';
  isLogged = false;

  //Variables para crear nuevo usuario
  nuevoUsuario: NuevoUsuario;
  nuevoUsuarioNombre='';
  nuevoUsuarioNombreUsuario='';
  nuevoUsuarioEmail='';
  nuevoUsuariopassword='';



  constructor(
    private SocialauthService: SocialAuthService,
    private authService: AuthService,
    public router: Router,
    private tokenService: TokenService,
    private toastController: ToastController
  ) {
    this.registrar = false;

    this.SocialauthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      console.log(this.user);
      console.log(this.user.authToken)
    });
  }
  ngOnInit() {
    this.testLogged();
  }
  ionViewWillEnter() {
    this.testLogged();
    this.vaciarCampos();
    this.nombreUsuario = '';
    this.password = '';

  }
  onLogin() {
    this.LoginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    console.log(this.LoginUsuario);
    this.authService.login(this.LoginUsuario).subscribe(
      //Los valores que nos devuelve(Objeto jwtDto)se los pasamos a tokenService
      data => {
        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.isLogged = true;
        this.router.navigate(['/home/perfil']);
        console.log("nombre usuario en login "+ this.nombreUsuario);
      },
      err => {
        this.presentToast("Datos erróneos o fallo conexión internet");


      }

    )
  }
  vaciarCampos():void{
    this.nuevoUsuarioNombre='';
    this.nuevoUsuarioNombreUsuario='';
    this.nuevoUsuariopassword='';
    this.nuevoUsuarioEmail='';
    this.nombreUsuario='';
    this.password='';
  }
  onRegistrer() {

    this.nuevoUsuario = new NuevoUsuario
    (this.nuevoUsuarioNombre, 
      this.nuevoUsuarioNombreUsuario,
       this.nuevoUsuarioEmail, 
       this.nuevoUsuariopassword
    );

   
    this.authService.registro(this.nuevoUsuario).subscribe(
      data => {
        console.log(data)
        this.presentToast("registro correcto")
       this.registrar=false;
       this.vaciarCampos();
     
      },
      err => {
        this.presentToast(err.error.mensaje);
      }
    );
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail);
    if (ev.detail.value == 'registro') {
      this.registrar = true;
      console.log(this.registrar);
    }
    if (ev.detail.value == 'Iniciar') {
      this.registrar = false;
      console.log(this.registrar);
    }

  }
  signInWithGoogle(): void {
    this.SocialauthService.signIn(GoogleLoginProvider.PROVIDER_ID);


    this.isLogged = true;
    this.router.navigate(['/home/perfil']);


  }

  signInWithFB(): void {
    this.SocialauthService.signIn(FacebookLoginProvider.PROVIDER_ID);

  }

  signOut(): void {
    this.SocialauthService.signOut();
  }

  registro(): void {
    this.router.navigate(['/registro']);
    this.registrar = true;
  }

  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogged = false;

  }
  testLogged(): void {
    this.isLogged = this.tokenService.getToken() != null;
  }



}