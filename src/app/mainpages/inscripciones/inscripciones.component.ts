import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
import { DataService } from '../../services/data/data.service';
import { TablaComponent } from "../../component/tabla/tabla.component";
import { ConfirmationComponent } from '../../component/confirmation/confirmation.component';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule, TablaComponent, ConfirmationComponent],
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.css'
})
export class InscripcionesComponent {

  inscripcioncampo: any[] = ["nombre", "genero", "fecha", "provincia", "canton", "parroquia", "recinto", "acciones"];
  inscripcionacciones: any[] = [{icon: "fa-regular fa-circle-check", callback:(row: any)=>this.aceptarInscripcion(row)}, {icon: "fa-regular fa-circle-xmark", callback:(row: any)=>this.rechazarInscripcion(row)}];
  inscripcion: any[] = [];
  inscripcionfilter: any = {nombre: "", genero: "", fecha: "", provincia: "", canton: "", parroquia: "", recinto: ""};
  
  isDataLoaded: boolean = false;

  pendingElement: any = null;

  constructor(private modal: ModalService, private data: DataService) { }

  ngOnInit(): void {
    this.data.getData<any[]>('assets/data/inscripciones.json').subscribe((data)=>{
      this.inscripcion = data;
      this.checkDataLoaded();
    });
  }

  checkDataLoaded() {
    this.isDataLoaded = this.inscripcion.length > 0;
  }

  aceptarInscripcion(row: any) {
    this.pendingElement = row;
    this.modal.open("agregar");
  }

  rechazarInscripcion(row: any) {
    this.pendingElement = row;
    this.modal.open("rechazar");
  }

  confirmation(confirmacion: boolean) {
    if (confirmacion) {
      console.log('Nuevo elemento:', this.pendingElement);
    }
    this.pendingElement = null;
  }

  delete(confirmacion: boolean) {
    if (confirmacion) {
      console.log('Elemento eliminado:', this.pendingElement);
    }
    this.pendingElement = null;
  }

}
