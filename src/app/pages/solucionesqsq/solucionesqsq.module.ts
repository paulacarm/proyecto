import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolucionesqsqPageRoutingModule } from './solucionesqsq-routing.module';

import { SolucionesqsqPage } from './solucionesqsq.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolucionesqsqPageRoutingModule,ComponentsModule
  ],
  declarations: [SolucionesqsqPage]
})
export class SolucionesqsqPageModule {}
