import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalService } from '../../services/modal/modal.service';
import { ConfirmationComponent } from '../../component/confirmation/confirmation.component';
import { DataService } from '../../services/data/data.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '../../shared/custom-paginator-intl';
import { TablaComponent } from "../../component/tabla/tabla.component";
import { AgregarconsultaComponent } from "../../component/agregarconsulta/agregarconsulta.component";
import { forkJoin } from 'rxjs';
import { AgregardignidadComponent } from "../../component/agregardignidad/agregardignidad.component";

@Component({
  selector: 'app-dignidades-consultas',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmationComponent, TablaComponent, AgregarconsultaComponent, AgregardignidadComponent],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  templateUrl: './dignidades-consultas.component.html',
  styleUrl: './dignidades-consultas.component.css'
})
export class DignidadesConsultasComponent implements OnInit {

  tipoelemento: string = "";

  dignidadescampo: any[] = ["nombre", "identificacion", "acciones"];
  dignidadesacciones: any[] = [
    { icon: "fa fa-edit", callback: (row: any) => this.onEditDignidad(row) },
    { icon: "fa fa-trash", callback: (row: any) => this.onDeleteDignidad(row) }
  ];
  dignidades: any[] = [];
  dignidadesfilter: any = { nombre: '', identificacion: ''};

  consultascampo: any[] = ["pregunta", "acciones"];
  consultasacciones: any[] = [
    { icon: "fa fa-edit", callback: (row: any) => this.onEditConsulta(row) },
    { icon: "fa fa-trash", callback: (row: any) => this.onDeleteConsulta(row) }
  ];
  consultas: any[] = [];
  consultasfilter: any = { pregunta: '' };

  isDataLoaded = false;

  elemento: any;

  id: any;

  constructor(private modal: ModalService, private data: DataService) {
    setInterval(() => { this.ngOnInit() }, 5000);
  }

  ngOnInit(): void {
    forkJoin({
      dignidades: this.data.readData<any[]>("https://sistema-electoral-cc1y.onrender.com/api/dignidades"),
      consultas: this.data.readData<any[]>("https://api-observacion-electoral.frative.com/api/preguntas-consulta-popular"),
    }).subscribe((result) => {
      this.dignidades = result.dignidades.reverse();
      this.consultas = result.consultas.reverse();
      this.checkDataLoaded();
    });
  }

  checkDataLoaded() {
    if (this.consultas.length > 0) {
      this.isDataLoaded = true;
    }
  }

//////////////////////////////////////////////////////////////

  agregarDignidad(event: Event) {
    event.preventDefault();
    this.modal.open("addDignidad");
  }

  agregarConsulta(event: Event) {
    event.preventDefault();
    this.modal.open("addConsulta");
  }

//////////////////////////////////////////////////////////////

  onEditDignidad(row: any) {
    this.elemento = row;
    this.modal.open("modDignidad");
  }

  onEditConsulta(row: any) {
    this.elemento = row;
    this.modal.open("modConsulta");
  }

//////////////////////////////////////////////////////////////

  onDeleteDignidad(row: any) {
    this.elemento = row;
    this.modal.open("eliminarDignidad");
  }

  confirmDeleteDignidad(confirm: boolean) {
    if (confirm) {
      console.log("Eliminando: ", this.elemento);
      this.data.deleteDataById("https://sistema-electoral-cc1y.onrender.com/api/dignidades", this.elemento.id).subscribe(() => {});
    }
  }

//////////////////////////////////////////////////////////////

  onDeleteConsulta(row: any) {
    this.elemento = row;
    this.modal.open("eliminarConsulta");
  }

  confirmDeleteConsulta(confirm: boolean) {
    if (confirm) {
      console.log("Eliminando: ", this.elemento);
      this.data.deleteDataById("https://api-observacion-electoral.frative.com/api/preguntas-consulta-popular", this.elemento.id).subscribe(() => {});
    }
  }
}
