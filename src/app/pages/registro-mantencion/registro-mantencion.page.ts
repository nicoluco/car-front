import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-mantencion',
  templateUrl: './registro-mantencion.page.html',
  styleUrls: ['./registro-mantencion.page.scss'],
})
export class RegistroMantencionPage implements OnInit {
  tipoMantencion!:string;
  fechaMantencion!:string;
  comentarios!:string;
  evidencia!:File;


  constructor() { }

  ngOnInit() {
  }

  onFileSelected(event:any) {
    const file: File = event.target.files[0];
    if (file) {
      this.evidencia = file;
      console.log('Archivo seleccionado:', this.evidencia.name);
    }
  }

  onSubmit() {
    if (this.tipoMantencion && this.fechaMantencion && this.evidencia) {
      const formData: FormData= new FormData();
      formData.append ('evidencia', this.evidencia, this.evidencia.name)
    } else {
      console.log('Es necesario completar los campos con *')
    }
  }

}
