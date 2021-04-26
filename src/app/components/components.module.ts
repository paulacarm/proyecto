import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';


//Importamos  y exportamos los componentes header y menu.
//Después se importa en home.

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent
  ],

  imports: [
    CommonModule,
    IonicModule
  ],exports:[
    HeaderComponent,
    MenuComponent
  ]
})
export class ComponentsModule { }
