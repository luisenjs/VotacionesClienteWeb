import { Component } from '@angular/core';
import { TotalvotosComponent } from '../../component/totalvotos/totalvotos.component';
import { VotostotalesChartComponent } from '../../component/votostotales-chart/votostotales-chart.component';
import { VotoscandidatosChartComponent } from '../../component/votoscandidatos-chart/votoscandidatos-chart.component';
import { VotosService } from '../../services/charts/votos.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TotalvotosComponent, VotostotalesChartComponent, VotoscandidatosChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  cantidadlider: number = 0;
  cantidadvalido: number = 0;
  cantidadblanco: number = 0;
  cantidadnulo: number = 0;

  constructor(private chartdata: VotosService) { }

  ngOnInit(){
    this.chartdata.liderbinomio();
    this.chartdata.votosvalidos();
    this.chartdata.votosblancos();
    this.chartdata.votosnulos();
    this.cantidadlider = Math.floor(this.chartdata.cantidadlider);
    this.cantidadvalido = Math.floor(this.chartdata.cantidadvalido);
    this.cantidadblanco = Math.floor(this.chartdata.cantidadblanco);
    this.cantidadnulo = Math.floor(this.chartdata.cantidadnulo);
  }
  
}
