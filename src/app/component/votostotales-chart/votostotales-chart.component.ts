import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { VotosService } from '../../services/charts/votos.service';

@Component({
  selector: 'app-votostotales-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './votostotales-chart.component.html',
  styleUrl: './votostotales-chart.component.css'
})
export class VotostotalesChartComponent {

  //single = [];

  // options
  view: [number, number] = [800, 250]
  gradient: boolean = true;

  constructor(private chartdata: VotosService) { }

  ngOnInit() {
    this.chartdata.votosvalidos();
    this.chartdata.votosblancos();
    this.chartdata.votosnulos();
    this.chartdata.updatePie();
  }

  get single() {
    return this.chartdata.piechartData;
  }
  
}
