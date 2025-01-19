import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalService } from '../../services/modal/modal.service';
import { AgregarElementoComponent } from '../../component/agregar-elemento/agregar-elemento.component';
import { ConfirmationComponent } from '../../component/confirmation/confirmation.component';
import { DataService } from '../../services/data/data.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '../../shared/custom-paginator-intl';
import { TablaComponent } from "../../component/tabla/tabla.component";
import { AgregarconsultaComponent } from "../../component/agregarconsulta/agregarconsulta.component";

@Component({
  selector: 'app-dignidades-consultas',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmationComponent, TablaComponent, AgregarconsultaComponent],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  templateUrl: './dignidades-consultas.component.html',
  styleUrl: './dignidades-consultas.component.css'
})
export class DignidadesConsultasComponent implements OnInit {

  tipoelemento: string = "";

  consultascampo: any[] = ["pregunta", "acciones"];
  consultasacciones: any[] = [
    { icon: "fa fa-edit", callback: (row: any) => this.onEditConsulta(row) },
    { icon: "fa fa-trash", callback: (row: any) => this.onDeleteConsulta(row) }
  ];
  consultas: any[] = [];
  consultasfilter: any = { pregunta: '' };

  isDataLoaded = false;

  elemento: any = null;

  constructor(private modal: ModalService, private data: DataService) {
    setInterval(() => {this.ngOnInit()}, 5000);
  }

  ngOnInit(): void {
    this.data.readData<any[]>("https://api-observacion-electoral.frative.com/api/preguntas-consulta-popular").subscribe((data) => {
      this.consultas = data;
      this.checkDataLoaded();
    });
  }

  checkDataLoaded() {
    if (this.consultas.length > 0) {
      this.isDataLoaded = true;
    }
  }

  agregarBinomio(event: Event) {
    event.preventDefault();
    this.tipoelemento = "binomio";
    this.modal.open("binomio");
  }

  agregarConsulta(event: Event) {
    event.preventDefault();
    this.modal.open("addConsulta");
  }

  onEditBinomio(item: any) {
    this.elemento = item;
    this.tipoelemento = "modbinomio";
    this.modal.open("modbinomio");
  }

  onEditConsulta(row: any) {
    this.elemento = row;
    //this.modal.open("modConsulta");
  }

  onDeleteConsulta(row: any) {
    this.elemento = row;
  }

  confirmDelete(confirm: boolean) {
    if (confirm) {
      console.log("Eliminando: ", this.elemento);
    }
  }
}
