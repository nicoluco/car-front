import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroCitasPageRoutingModule } from './registro-citas-routing.module';

import { RegistroCitasPage } from './registro-citas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroCitasPageRoutingModule
  ],
  declarations: [RegistroCitasPage]
})
export class RegistroCitasPageModule {}
