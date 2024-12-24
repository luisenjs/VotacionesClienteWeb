import { Component } from '@angular/core';
import { PAGE_FILTERS } from '../../interface/filter';
import { FilterComponent } from '../../component/filter/filter.component';
import { ModalService } from '../../services/modal/modal.service';
import { DataService } from '../../services/data/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FilterComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  filterControl = PAGE_FILTERS["usuariosGeneral"];
  filterCantidad = PAGE_FILTERS["cantidad"];

  usuarios: any = [];

  constructor(private modal: ModalService, private data: DataService) { }

  ngOnInit(): void {
    this.data.getData('assets/data/usuarios.json').subscribe((data) => {
      this.usuarios = data;
    })
  }

}
