import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PapeletaComponent } from '../../component/papeleta/papeleta.component';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal/modal.service';
import { SeleccionPapeletaComponent } from '../../component/seleccion-papeleta/seleccion-papeleta.component';
import { CrearPapeletaComponent } from '../../component/crear-papeleta/crear-papeleta.component';

@Component({
  selector: 'app-papeletas',
  standalone: true,
  imports: [CommonModule, PapeletaComponent, SeleccionPapeletaComponent, CrearPapeletaComponent],
  templateUrl: './papeletas.component.html',
  styleUrl: './papeletas.component.css'
})
export class PapeletasComponent {

  papeletas: any[] = [
    { id: 2, nombre: 'Asambleistas Nacionales', lista: ["Candidato 1", "Candidato 2", "Candidato 3"] },
    { id: 3, nombre: 'Asambleistas Provinciales - Guayas', lista: ["Candidato 1", "Candidato 2", "Candidato 3"] },
    { id: 4, nombre: 'Consulta Popular', lista: ["Opción 1", "Opción 2", "Opción 3"] },
  ];

  tipo = "";

  constructor(private modal: ModalService, private router: Router) { }

  seleccionarPapeleta(event: Event): void {
    event.preventDefault();
    this.modal.open("seleccion");
  }

  crearPapeleta(tipo: string) {
    this.tipo = tipo;
    this.modal.open("creacion");
  }

}
