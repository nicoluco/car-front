import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { APIService } from '../api.service'; // Importa tu servicio de autenticación
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private apiService: APIService, private router: Router) {}

  canActivate(): boolean {
    if (this.apiService.isAuthenticatedboo()) {
      return true; // El usuario está autenticado, permite el acceso
    } else {
      this.router.navigate(['/login']); // Redirige a la página de login si no está autenticado
      return false;
    }
  }
}
