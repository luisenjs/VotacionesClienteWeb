import { Component } from '@angular/core';
import { UndermaintenanceComponent } from '../undermaintenance/undermaintenance.component';
import { PAGE_FILTERS } from '../interface/filter';
import { FilterComponent } from "../component/filter/filter.component";

@Component({
  selector: 'app-controlelectoral',
  standalone: true,
  imports: [UndermaintenanceComponent, FilterComponent],
  templateUrl: './controlelectoral.component.html',
  styleUrl: './controlelectoral.component.css'
})
export class ControlelectoralComponent {
  filterIds = PAGE_FILTERS["usuaiosControl"];
  filterControl = PAGE_FILTERS["actasContol"];
  filterCantidad = PAGE_FILTERS["cantidad"];
}
