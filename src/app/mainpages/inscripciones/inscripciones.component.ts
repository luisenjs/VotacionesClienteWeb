import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
import { DataService } from '../../services/data/data.service';
import { TablaComponent } from "../../component/tabla/tabla.component";

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule, TablaComponent],
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.css'
})
export class InscripcionesComponent {

  inscripcioncampo: any[] = ["nombre", "genero", "fecha", "provincia", "canton", "parroquia", "recinto"];
  inscripcion: any[] = [];
  inscripcionfilter: any = {nombre: "", genero: "", fecha: "", provincia: "", canton: "", parroquia: "", recinto: ""};
  
  isDataLoaded: boolean = false;

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

}
