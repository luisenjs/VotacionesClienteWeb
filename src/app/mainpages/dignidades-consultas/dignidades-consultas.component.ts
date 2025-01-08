import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalService } from '../../services/modal/modal.service';
import { AgregarElementoComponent } from '../../component/agregar-elemento/agregar-elemento.component';
import { ConfirmationComponent } from '../../component/confirmation/confirmation.component';
import { DataService } from '../../services/data/data.service';
import { Lista, Organizacion, Consulta } from '../../interface/data';
import { TablaComponent } from "../../component/tabla/tabla.component";

@Component({
  selector: 'app-dignidades-consultas',
  standalone: true,
  imports: [CommonModule, RouterModule, AgregarElementoComponent, ConfirmationComponent, TablaComponent],
  templateUrl: './dignidades-consultas.component.html',
  styleUrl: './dignidades-consultas.component.css'
})
export class DignidadesConsultasComponent implements OnInit {

  tipoelemento: string = "";

  listascampo: any[] = ["lista", "candidato"];
  listas: Lista[] = [];
  listasfilter: any = {lista: "", candidato: ""};

  organizacionescampo: any[] = ["lista", "organizacion"];
  organizaciones: Organizacion[] = [];
  organizacionesfilter: any = {lista: "", organizaciones: ""};

  consultascampo: any[] = ["nombre", "pregunta"];
  consultas: Consulta[] = [];
  consultasfilter: any = {nombre: "", pregunta: ""};

  isDataLoaded: boolean = false;

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
  }

  checkDataLoaded() {
    if (this.listas.length > 0 && this.organizaciones.length > 0 && this.consultas.length > 0) {
      this.isDataLoaded = true;
    }
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
