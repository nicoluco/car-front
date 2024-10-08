import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class APIService {private apiUrl = 'http://localhost:8000/'; // URL de la API REST

  private token :String;
  constructor(private router: Router, private http: HttpClient) {
    this.token= "";
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null && token !== '';  // Verifica que el token exista y no esté vacío
  }
  isAuthenticatedboo(): boolean {
    // Aquí se verifica si el usuario tiene un token válido
    const token = localStorage.getItem('authToken');
    return !!token; // Retorna true si el token existe
  }

  // Método para enviar el token FCM al servidor
  sendFCMToken(token: string): Observable<any> {
  const jwtToken = this.getToken();
  if (!jwtToken) {
    console.error('Error: Usuario no autenticado, no se puede enviar el token FCM');
    return new Observable(observer => {
      observer.error('Usuario no autenticado');
    });
  }

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + jwtToken
  });

  const body = { fcm_token: token };

  return this.http.post(`${this.apiUrl}api/fcm-token/`, body, { headers });
}

  

  getData(tipo: String,usaAuth: Boolean= false ): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (usaAuth ){

      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.getToken()
      });
    }
    return this.http.get(this.apiUrl+tipo,{headers});
  }

  
  postData(tipo: String, data: any,usaAuth: Boolean= false): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (usaAuth ){

      headers = new HttpHeaders({
/*         'Content-Type': (data instanceof FormData)?"multipart/form-data": 'application/json', */
        
        'Authorization': 'Bearer '+this.getToken()
      });
    }
    return this.http.post(this.apiUrl+tipo, data,{headers});
  }

  getToken(){
    return localStorage.getItem('token')
  }
  setToken(value: string){
    localStorage.removeItem('token')
    localStorage.setItem('token',value)
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Elimina el token al hacer logout
    this.router.navigate(['inicio-sesion']);
  }
}

