import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment} from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';

//Modulos para inicio de sesión de redes sociales
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
//Importar el interceptor
import { interceptorProvider } from './interceptors/user-interceptor.service';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,IonicModule.forRoot(),AngularFireAuthModule, AppRoutingModule, SocialLoginModule,HttpClientModule,ComponentsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
   
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            //id app de google https://console.developers.google.com/apis/credentials?project=ignotocracia
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('858592685337-jflksm1e9hbg0qdoonc28i0clj1kcqph.apps.googleusercontent.com')
          },
          {
            //id de la app facebook https://developers.facebook.com/
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('705588407033705')
          }
        ] 
      } as SocialAuthServiceConfig,
    } , interceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
