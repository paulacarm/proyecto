import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
/*El interceptor intercepta cada petición,la bloquea y comprueba si hay un token y si lo hay
se lo asigna y se lo manda al servidor que comprueba que sea válido.En caso de que todo esté
correcto devuelve la petición si no devuelve un error
Implementa la interfaz HttpInterceptor*/
export class UserInterceptorService implements HttpInterceptor{

  constructor(private tokenService:TokenService,private router:Router,public toast:ToastController) { 
    
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReg=req;
    const token=this.tokenService.getToken();
    //Comprueba si hay token
    if(token!=null){
      //clona el token y se lo pasa a authReg
      authReg=req.clone({headers:req.headers.set('Authorization','Bearer '+token)})
console.log(authReg)
console.log(req)
     
    
    }
    return next.handle(authReg);
 
}

}
export const interceptorProvider =[{provide:HTTP_INTERCEPTORS, useClass:UserInterceptorService,multi:true}];