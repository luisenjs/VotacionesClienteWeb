import { Component } from '@angular/core';
import { DoughnutchartComponent } from '../component/doughnutchart/doughnutchart.component';
import { BarchartComponent } from '../component/barchart/barchart.component';
import { PAGE_FILTERS } from '../interface/filter';
import { FilterComponent } from "../component/filter/filter.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DoughnutchartComponent, BarchartComponent, FilterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  filterIds = PAGE_FILTERS["actasGeneral"]
}
