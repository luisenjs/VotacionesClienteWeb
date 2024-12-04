import { Component } from '@angular/core';
import { PAGE_FILTERS } from '../../interface/filter';
import { FilterComponent } from "../../component/filter/filter.component";
import { TotalvotosComponent } from '../../component/totalvotos/totalvotos.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FilterComponent, TotalvotosComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  filterIds = PAGE_FILTERS["actasGeneral"]
}
