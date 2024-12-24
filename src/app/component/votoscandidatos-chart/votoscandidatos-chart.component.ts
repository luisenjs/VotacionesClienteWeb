import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { VotosService } from '../../services/charts/votos.service';

@Component({
  selector: 'app-votoscandidatos-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './votoscandidatos-chart.component.html',
  styleUrl: './votoscandidatos-chart.component.css'
})
export class VotoscandidatosChartComponent {

  // options
  view: [number, number] = [1400, 400]
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Candidato';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Votos';

  constructor(private chartdata: VotosService) { }

  ngOnInit() {
    this.chartdata.liderbinomio();
    this.chartdata.updateBarra();
  }

  get single() {
    return this.chartdata.barrachartData;
  }
}
