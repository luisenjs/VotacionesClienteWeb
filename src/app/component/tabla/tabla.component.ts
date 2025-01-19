import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { getSpanishPaginatorIntl } from '../../shared/custom-paginator-intl';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule, MatOptionModule, MatSelectModule, CommonModule],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  @Input() displayedColumns: any[] = [];
  @Input() originalData: any[] = [];
  @Input() filters: any = {};
  @Input() isFilterable = true;
  @Input() actions: any[] = [];

  columnTitles: { [key: string]: string } = {
    nombre: 'Nombre',
    nombres: 'Nombres',
    apellidos: 'Apellidos',
    genero: 'Género',
    rol: 'Rol',
    rol_id: 'Rol',
    provincia: 'Provincia',
    provincia_id: 'Provincia',
    circunscripcion: 'Circunscripción',
    circunscripcion_id: 'Circunscripción',
    canton: 'Canton',
    canton_id: 'Cantón',
    parroquia: 'Parroquia',
    parroquia_id: 'Parroquia',
    recinto: 'Recinto',
    recinto_id: 'Recinto',
    junta: 'Junta',
    junta_id: 'Junta',
    acciones: 'Acciones',
    papeleta: 'Papeleta',
    fecha: 'Fecha',
    zona: 'Zona',
    pregunta: 'Pregunta'
  };
  

  filteredData = [...this.originalData];
  pagedData: any[] = []; // Datos mostrados en la tabla paginada

  pageSize = 5; // Tamaño inicial de la página
  currentPage = 0; // Página actual
  selectedField: string = "nombres";

  ngOnInit() {
    this.applyFilters();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['originalData']){
      this.applyFilters();
    }
  }

  applyFilters() {
    // Aplica los filtros y actualiza la tabla
    const filtered = this.originalData.filter((item) => {
      if (this.selectedField && this.filters[this.selectedField]) {
        return item[this.selectedField]?.toString().toLowerCase().includes(this.filters[this.selectedField].toLowerCase());
      }
      return true;
    });
    this.filteredData = filtered;
    this.currentPage = 0; // Reinicia la página actual
    this.updateTable();
  }

  updateTable() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.filteredData.slice(startIndex, endIndex); // Actualiza los datos paginados
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateTable();
  }

  onFieldChange() {
    if (this.selectedField) {
      this.filters[this.selectedField] = ''; // Reinicia el filtro
    }
  }

}
