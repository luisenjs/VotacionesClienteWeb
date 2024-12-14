import { Component, OnInit} from '@angular/core';
import { UndermaintenanceComponent } from "../undermaintenance/undermaintenance.component";
import { PAGE_FILTERS } from '../../interface/filter';
import { FilterComponent } from '../../component/filter/filter.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalService } from '../../services/modal/modal.service';
import { AgregarElementoComponent } from '../../component/agregar-elemento/agregar-elemento.component';
import { DataService } from '../../services/data/data.service';
import { Lista, Organizacion, Consulta } from '../../interface/data';

@Component({
  selector: 'app-dignidades-consultas',
  standalone: true,
  imports: [FilterComponent, CommonModule, RouterModule, AgregarElementoComponent],
  templateUrl: './dignidades-consultas.component.html',
  styleUrl: './dignidades-consultas.component.css'
})
export class DignidadesConsultasComponent implements OnInit{

  filterCantidad = PAGE_FILTERS["cantidad"];

  tipoelemento: string = "";

  listas: Lista[] = [];
  organizaciones: Organizacion[] = [];
  consultas: Consulta[] = [];

  constructor(private modal: ModalService, private data: DataService) { }

  ngOnInit(): void {
    this.data.getData<Lista[]>('assets/data/candidatos.json').subscribe((data) => {
      this.listas = data;
    })
    this.data.getData<Organizacion[]>('assets/data/organizaciones.json').subscribe((data) => {
      this.organizaciones = data;
    })
    this.data.getData<Consulta[]>('assets/data/consultas.json').subscribe((data) => {
      this.consultas = data;
    })
  }

  agregarBinomio(event: Event) {
    event.preventDefault();
    this.tipoelemento = "binomio";
    this.modal.openModal('agregar-elemento');
  }

  agregarOrganizacion(event: Event) {
    event.preventDefault();
    this.tipoelemento = "organizacion";
    this.modal.openModal('agregar-elemento');
  }

  agregarConsulta(event: Event) {
    event.preventDefault();
    this.tipoelemento = "consulta";
    this.modal.openModal('agregar-elemento');
  }

  onEdit(item: any) {
    console.log('Editar:', item);
  }

  onDelete(item: any) {
    console.log('Eliminar:', item);
  }
}
