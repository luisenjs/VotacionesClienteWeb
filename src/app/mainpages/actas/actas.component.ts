import { Component } from '@angular/core';
import { PAGE_FILTERS } from '../../interface/filter';
import { FilterComponent } from '../../component/filter/filter.component';
import { ModalService } from '../../services/modal/modal.service';
import { DataService } from '../../services/data/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actas',
  standalone: true,
  imports: [FilterComponent, CommonModule],
  templateUrl: './actas.component.html',
  styleUrl: './actas.component.css'
})
export class ActasComponent {

  filterControl = PAGE_FILTERS["actasGeneral"];
  filterCantidad = PAGE_FILTERS["cantidad"];

  actas: any = [];

  constructor(private moddal: ModalService, private data: DataService) { }

  ngOnInit(): void {
    this.data.getData('assets/data/actas.json').subscribe((data) => {
      this.actas = data;
    })
  }

}
