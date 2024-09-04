import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombre: string = "Nicole"
  edad: number = 0;

  eliminar!: string;

  listas: any = [
    {
      edad: 4,
      apellido: "Luco"

    }
  ];
  apellido: any;
  
  constructor() { }
  

  sumar() {
    this.apellido;
    console.log("Hola mundo");
  }

  restar(numero:number) {
    
  }



}
