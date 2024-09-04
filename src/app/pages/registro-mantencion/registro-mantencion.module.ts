import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroMantencionPageRoutingModule } from './registro-mantencion-routing.module';

import { RegistroMantencionPage } from './registro-mantencion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroMantencionPageRoutingModule
  ],
  declarations: [RegistroMantencionPage]
})
export class RegistroMantencionPageModule {}
