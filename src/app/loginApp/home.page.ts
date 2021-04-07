import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { Router } from '@angular/router';
import { RegistroPage } from '../registro/registro.page';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user :  SocialUser ;
  loggedIn  :  boolean ;
  registrar: boolean;
  authState: any = null;
  email:any;


  constructor(private authService: SocialAuthService,public router:Router) {
    this.registrar=false;

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
 
  }
 
  signOut(): void {
    this.authService.signOut();
  }

  registro():void{
    this.router.navigate(['/registro']);
    this.registrar=true;
  }


}
