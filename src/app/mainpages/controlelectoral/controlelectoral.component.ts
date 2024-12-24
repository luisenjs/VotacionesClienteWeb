import { Component } from '@angular/core';
import { PAGE_FILTERS } from '../../interface/filter';
import { FilterComponent } from "../../component/filter/filter.component";
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-controlelectoral',
  standalone: true,
  imports: [CommonModule, FilterComponent],
  templateUrl: './controlelectoral.component.html',
  styleUrl: './controlelectoral.component.css'
})
export class ControlelectoralComponent {
  filterIds = PAGE_FILTERS["usuaiosControl"];
  filterControl = PAGE_FILTERS["actasContol"];
  filterCantidad = PAGE_FILTERS["cantidad"];

  actas: any = [];
  usuarios: any = [];

  constructor(private modal: ModalService, private data: DataService) { }

  ngOnInit(): void {
    this.data.getData('assets/data/actasreal.json').subscribe((data) => {
      this.actas = data;
    });
    this.data.getData('assets/data/usuariosreal.json').subscribe((data) => {
      this.usuarios = data;
    })
  }
}
