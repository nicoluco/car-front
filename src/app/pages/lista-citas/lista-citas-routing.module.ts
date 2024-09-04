import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaCitasPage } from './lista-citas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaCitasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaCitasPageRoutingModule {}
