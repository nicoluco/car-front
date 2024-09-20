import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroCitasPage } from './registro-citas.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroCitasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroCitasPageRoutingModule {}
