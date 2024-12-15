import { Component, OnInit } from '@angular/core';
import { PAGE_FILTERS } from '../../interface/filter';
import { FilterComponent } from '../../component/filter/filter.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalService } from '../../services/modal/modal.service';
import { AgregarElementoComponent } from '../../component/agregar-elemento/agregar-elemento.component';
import { ConfirmationComponent } from '../../component/confirmation/confirmation.component';
import { DataService } from '../../services/data/data.service';
import { Lista, Organizacion, Consulta } from '../../interface/data';

@Component({
  selector: 'app-dignidades-consultas',
  standalone: true,
  imports: [FilterComponent, CommonModule, RouterModule, AgregarElementoComponent, ConfirmationComponent],
  templateUrl: './dignidades-consultas.component.html',
  styleUrl: './dignidades-consultas.component.css'
})
export class DignidadesConsultasComponent implements OnInit {

  filterCantidad = PAGE_FILTERS["cantidad"];

  tipoelemento: string = "";

  listas: Lista[] = [];
  organizaciones: Organizacion[] = [];
  consultas: Consulta[] = [];

  elemento: any = null;

  constructor(private modal: ModalService, private data: DataService) { }

  ngOnInit(): void {
    this.data.getData<Lista[]>('assets/data/binomio.json').subscribe((data) => {
      this.listas = data;
    });
    this.data.getData<Organizacion[]>('assets/data/organizacion.json').subscribe((data) => {
      this.organizaciones = data;
    });
    this.data.getData<Consulta[]>('assets/data/consulta.json').subscribe((data) => {
      this.consultas = data;
    });
  }

  agregarBinomio(event: Event) {
    event.preventDefault();
    this.tipoelemento = "binomio";
    this.modal.open("binomio");
  }

  agregarOrganizacion(event: Event) {
    event.preventDefault();
    this.tipoelemento = "organizacion";
    this.modal.open("organizacion");
  }

  agregarConsulta(event: Event) {
    event.preventDefault();
    this.tipoelemento = "consulta";
    this.modal.open("consulta");
  }

  onEdit(item: any) {
    console.log('Editar:', item);
  }

  onDelete(item: any) {
    this.elemento = item;
    this.tipoelemento = "eliminar";
    this.modal.open("eliminar");
  }

  confirmDelete(confirm: boolean) {
    if (confirm) {
      console.log("Eliminando: ", this.elemento);
    }
  }
}
