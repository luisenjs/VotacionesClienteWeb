import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
import { DataService } from '../../services/data/data.service';
import { TablaComponent } from "../../component/tabla/tabla.component";
import { ConfirmationComponent } from '../../component/confirmation/confirmation.component';
import { MasinformacionComponent } from '../../component/masinformacion/masinformacion.component';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule, TablaComponent, ConfirmationComponent, MasinformacionComponent],
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.css'
})
export class InscripcionesComponent {

  inscripcioncampo: any[] = ["nombre", "genero", "fecha", "provincia", "canton", "parroquia", "recinto", "acciones"];
  inscripcionacciones: any[] = [{icon: "fa-solid fa-eye", callback:(row: any)=>this.verInfo(row)}, {icon: "fa-regular fa-circle-check", callback:(row: any)=>this.aceptarInscripcion(row)}, {icon: "fa-regular fa-circle-xmark", callback:(row: any)=>this.rechazarInscripcion(row)}];
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

  verInfo(row: any) {
    this.pendingElement = row;
    this.modal.open("info");
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
      alert("NO API TO CALL\nACEPTANDO:\n" + JSON.stringify(this.pendingElement, null, 2));
    }
    this.pendingElement = null;
  }
  
  delete(confirmacion: boolean) {
    if (confirmacion) {
      alert("NO API TO CALL\nRECHAZANDO:\n" + JSON.stringify(this.pendingElement, null, 2));
    }
    this.pendingElement = null;
  }

}
