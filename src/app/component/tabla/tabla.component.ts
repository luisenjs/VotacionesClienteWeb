import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { getSpanishPaginatorIntl } from './custom-paginator-intl';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatSelectModule, MatFormFieldModule, FormsModule, MatOptionModule, MatSelectModule, CommonModule],
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

  filteredData = [...this.originalData];
  pagedData: any[] = []; // Datos mostrados en la tabla paginada

  pageSize = 5; // Tamaño inicial de la página
  currentPage = 0; // Página actual

  ngOnInit() {
    this.applyFilters(); // Inicializa la tabla con los filtros por defecto
    console.log(this.displayedColumns);
    console.log(this.originalData);
    console.log(this.filters);
  }

  applyFilters() {
    // Aplica los filtros y actualiza la tabla
    const filtered = this.originalData.filter((item) => {
      for (const key in this.filters) {
        if (this.filters[key] && item[key] !== this.filters[key]) {
          return false;
        }
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

  uniqueOptions(column: string): string[] {
    return [...new Set(this.originalData.map((item) => item[column]))];
  }

}
