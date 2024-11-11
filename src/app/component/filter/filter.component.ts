import { Component, Input } from '@angular/core';
import { Filter, ALL_FILTER } from '../../interface/filter';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  @Input() filterIds: string[] = [];
  availableFilters: Filter[] = [];

  filterOptions: { [key: string]: string[] } = {
    "ordenar": ["Acsendente A-Z", "Descendente Z-A"],
    "género": ["Femenino", "Masculino", "Otros"],
    "rol": ["1", "2"],
    "papeleta": ["Presidente y Vicepresidente", "Asambleistas Nacionales", "Asambleistas Provinciales", "Consulta Popular", "Referendum"],
    "provincia": ["1", "2"],
    "circunscripción": ["1.1", "1.2"],
    "cantón": ["1", "2"],
    "parroquia": ["A", "D"],
    "zona": ["A1", "A2"],
    "recinto": ["R1", "R2"],
    "estatus": ["Presente", "Inactivo"],
    "estadoActa": ["Entregado", "Pendiente", "Inconsistente"],
    "estadoJunta": ["Controlado", "Faltante"],
    "mostrar": ["5", "10", "15", "20", "25", "30"],
  }

  ngOnChanges() {
    this.availableFilters = ALL_FILTER.filter(filter => this.filterIds.includes(filter.id));
  }

  getOptionsForFilter(filterId: string): string[] {
    return this.filterOptions[filterId] || [];
  }

}
