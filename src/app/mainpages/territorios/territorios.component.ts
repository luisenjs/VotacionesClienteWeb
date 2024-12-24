import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGE_FILTERS } from '../../interface/filter';
import { FilterComponent } from '../../component/filter/filter.component';
import { ModalService } from '../../services/modal/modal.service';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-territorios',
  standalone: true,
  imports: [FilterComponent, CommonModule],
  templateUrl: './territorios.component.html',
  styleUrl: './territorios.component.css'
})
export class TerritoriosComponent {

  filterCantidad = PAGE_FILTERS['cantidad'];

  filterTerritorio = PAGE_FILTERS["territorio"];

  juntas: any = [];

  constructor(private modal: ModalService, private data: DataService) { }

  ngOnInit(): void {
    this.data.getData('assets/data/juntas.json').subscribe((data) => {
      this.juntas = data;
    });
  }

}
