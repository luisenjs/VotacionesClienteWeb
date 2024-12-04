import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-doughnutchart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './doughnutchart.component.html',
  styleUrl: './doughnutchart.component.css'
})
export class DoughnutchartComponent {

  public doughnutChartLabels: string[] = ['Category 1', 'Category 2', 'Category 3'];

  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [30, 40, 30], label: 'Votos' }
  ];

  // Opciones del gráfico
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

}
