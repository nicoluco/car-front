import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroMantencionPage } from './registro-mantencion.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroMantencionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroMantencionPageRoutingModule {}
