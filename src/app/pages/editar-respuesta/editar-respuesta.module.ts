import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarRespuestaPageRoutingModule } from './editar-respuesta-routing.module';

import { EditarRespuestaPage } from './editar-respuesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarRespuestaPageRoutingModule
  ],
  declarations: [EditarRespuestaPage]
})
export class EditarRespuestaPageModule {}
