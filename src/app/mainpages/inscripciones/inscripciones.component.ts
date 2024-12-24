import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
import { DataService } from '../../services/data/data.service';
import { PAGE_FILTERS } from '../../interface/filter';
import { FilterComponent } from '../../component/filter/filter.component';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule, FilterComponent],
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.css'
})
export class InscripcionesComponent {

  filterControl = PAGE_FILTERS["incripcionesUsuarios"]

  filterCantidad = PAGE_FILTERS["cantidad"];

  inscripcion: any = [];

  constructor(private modal: ModalService, private data: DataService) { }

  ngOnInit(): void {
    this.data.getData('assets/data/inscripciones.json').subscribe((data)=>{
      this.inscripcion = data;
    });
  }

}
