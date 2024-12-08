import { Component } from '@angular/core';
import { UndermaintenanceComponent } from "../undermaintenance/undermaintenance.component";
import { PAGE_FILTERS } from '../../interface/filter';
import { FilterComponent } from '../../component/filter/filter.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { PoliciesComponent } from '../../component/policies/policies.component';
import { AgregarElementoComponent } from '../../component/agregar-elemento/agregar-elemento.component';

@Component({
  selector: 'app-dignidades-consultas',
  standalone: true,
  imports: [UndermaintenanceComponent, FilterComponent, CommonModule, RouterModule, PoliciesComponent, PoliciesComponent],
  templateUrl: './dignidades-consultas.component.html',
  styleUrl: './dignidades-consultas.component.css'
})
export class DignidadesConsultasComponent {
  filterCantidad = PAGE_FILTERS["cantidad"];
  items = Array.from({ length: 10 }, (_, i) => ({
    lista: `Lista ${i + 1}`,
    candidato: `Candidato ${i + 1}`,
  }));

  constructor(private modal: ModalService) { }

  agregarBinomio(event: Event) {
    event.preventDefault();
    this.modal.openModal;
  }

  onEdit(item: any) {
    console.log('Editar:', item);
  }

  onDelete(item: any) {
    console.log('Eliminar:', item);
  }
}
