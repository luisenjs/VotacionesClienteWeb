import { Component } from '@angular/core';
import { UndermaintenanceComponent } from "../undermaintenance/undermaintenance.component";
import { PAGE_FILTERS } from '../../interface/filter';
import { FilterComponent } from '../../component/filter/filter.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dignidades-consultas',
  standalone: true,
  imports: [UndermaintenanceComponent, FilterComponent, CommonModule, RouterModule],
  templateUrl: './dignidades-consultas.component.html',
  styleUrl: './dignidades-consultas.component.css'
})
export class DignidadesConsultasComponent {
  filterCantidad = PAGE_FILTERS["cantidad"];
  items = Array.from({ length: 10 }, (_, i) => ({
    lista: `Lista ${i + 1}`,
    candidato: `Candidato ${i + 1}`,
  }));
  onEdit(item: any) {
    console.log('Editar:', item);
  }

  onDelete(item: any) {
    console.log('Eliminar:', item);
  }
}
