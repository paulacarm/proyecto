import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolucuionesquizPageRoutingModule } from './solucuionesquiz-routing.module';

import { SolucuionesquizPage } from './solucuionesquiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolucuionesquizPageRoutingModule
  ],
  declarations: [SolucuionesquizPage]
})
export class SolucuionesquizPageModule {}
