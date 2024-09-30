import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'inicio-sesion',
    pathMatch: 'full'
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'registro-vehiculo',
    loadChildren: () => import('./pages/registro-vehiculo/registro-vehiculo.module').then( m => m.RegistroVehiculoPageModule)
  },
  {
    path: 'lista-citas',
    loadChildren: () => import('./pages/lista-citas/lista-citas.module').then( m => m.ListaCitasPageModule)
  },
  {
    path: 'registro-mantencion',
    loadChildren: () => import('./pages/registro-mantencion/registro-mantencion.module').then( m => m.RegistroMantencionPageModule)
  },
  {
    path: 'registro-citas',
    loadChildren: () => import('./pages/registro-citas/registro-citas.module').then( m => m.RegistroCitasPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./pages/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'modal-imagen',
    loadChildren: () => import('./pages/modal-imagen/modal-imagen.module').then(m => m.ModalImagenPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then(m => m.InicioSesionPageModule)
  },




 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
