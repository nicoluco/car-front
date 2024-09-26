import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class APIService {private apiUrl = 'http://localhost:8000/'; // URL de la API REST

  private token :String;
  constructor(private http: HttpClient) {
    this.token= "";
  }


  // Método para enviar el token FCM al servidor
  sendFCMToken(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()  // Token JWT para autenticación
    });
  
    const body = { fcm_token: token };  // Prepara el cuerpo de la solicitud
  
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
        'Content-Type': 'application/json',
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
}

