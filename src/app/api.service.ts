import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {private apiUrl = 'http://localhost:8000/'; // URL de la API REST

  private token :String;
  constructor(private http: HttpClient) {
    this.token= "";
  }

  getData(tipo: String): Observable<any> {
    return this.http.get(this.apiUrl+tipo);
  }
  postData(tipo: String, data: any): Observable<any> {
    return this.http.post(this.apiUrl+tipo, data);
  }
  getToken(){
    return this.token
  }
  setToken(value: String){
    this.token=value
  }
}

