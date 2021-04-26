import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JugarPageRoutingModule } from './jugar-routing.module';

import { JugarPage } from './jugar.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JugarPageRoutingModule,ComponentsModule
  ],
  declarations: [JugarPage]
})
export class JugarPageModule {}
