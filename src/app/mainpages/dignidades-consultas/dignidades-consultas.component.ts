import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalService } from '../../services/modal/modal.service';
import { AgregarElementoComponent } from '../../component/agregar-elemento/agregar-elemento.component';
import { ConfirmationComponent } from '../../component/confirmation/confirmation.component';
import { DataService } from '../../services/data/data.service';
import { Lista, Organizacion, Consulta } from '../../interface/data';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '../../shared/custom-paginator-intl';

@Component({
  selector: 'app-dignidades-consultas',
  standalone: true,
  imports: [CommonModule, RouterModule, AgregarElementoComponent, ConfirmationComponent, MatPaginator],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  templateUrl: './dignidades-consultas.component.html',
  styleUrl: './dignidades-consultas.component.css'
})
export class DignidadesConsultasComponent implements OnInit {

  tipoelemento: string = "";

  listas: Lista[] = [];

  organizaciones: Organizacion[] = [];

  consultas: Consulta[] = [];

  pageSizeL = 5; // Número de elementos por página
  currentPageL = 0; // Página actual
  pagedListas = this.listas.slice(0, this.pageSizeL);

  pageSizeO = 5; // Número de elementos por página
  currentPageO = 0; // Página actual
  pagedOrganizaciones = this.organizaciones.slice(0, this.pageSizeO);
  
  pageSizeC = 5; // Número de elementos por página
  currentPageC = 0; // Página actual
  pagedConsultas = this.consultas.slice(0, this.pageSizeC);

  elemento: any = null;

  constructor(private modal: ModalService, private data: DataService) { }

  ngOnInit(): void {
    this.data.getData<Lista[]>('assets/data/binomio.json').subscribe((data) => {
      this.listas = data;
      this.checkDataLoaded();
    });
    this.data.getData<Organizacion[]>('assets/data/organizacion.json').subscribe((data) => {
      this.organizaciones = data;
      this.checkDataLoaded();
    });
    this.data.getData<Consulta[]>('assets/data/consulta.json').subscribe((data) => {
      this.consultas = data;
      this.checkDataLoaded();
    });
    this.updatePagedData();
  }

  checkDataLoaded() {
    if (this.listas.length > 0 && this.organizaciones.length > 0 && this.consultas.length > 0) {
      this.updatePagedData();
    }
  }

  // Actualiza los datos mostrados según la página seleccionada
  updatePagedData() {
    this.updatePagedListas();
    this.updatePagedOrganizaciones();
    this.updatePagedConsultas();
  }

  updatePagedListas() {
    const startIndex = this.currentPageL * this.pageSizeL;
    const endIndex = startIndex + this.pageSizeL;
    this.pagedListas = this.listas.slice(startIndex, endIndex);
  }

  updatePagedOrganizaciones() {
    const startIndex = this.currentPageO * this.pageSizeO;
    const endIndex = startIndex + this.pageSizeO;
    this.pagedOrganizaciones = this.organizaciones.slice(startIndex, endIndex);
  }

  updatePagedConsultas() {
    const startIndex = this.currentPageC * this.pageSizeC;
    const endIndex = startIndex + this.pageSizeC;
    this.pagedConsultas = this.consultas.slice(startIndex, endIndex);
  }

  // Cambia de página
  onPageChangeL(event: any) {
    this.currentPageL = event.pageIndex;
    this.pageSizeL = event.pageSize;
    this.updatePagedListas();
  }

  onPageChangeO(event: any) {
    this.currentPageO = event.pageIndex;
    this.pageSizeO = event.pageSize;
    this.updatePagedOrganizaciones();
  }

  onPageChangeC(event: any) {
    this.currentPageC = event.pageIndex;
    this.pageSizeC = event.pageSize;
    this.updatePagedConsultas();
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
