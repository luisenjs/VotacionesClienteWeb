import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-totalvotos',
  standalone: true,
  imports: [],
  templateUrl: './totalvotos.component.html',
  styleUrl: './totalvotos.component.css'
})
export class TotalvotosComponent {

  @Input() tipo!: string;
  @Input() cantidad!: number;

  voto = "";
  nombre = "Total Votos";

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tipo'] && changes['tipo'].currentValue) {
      switch (this.tipo) {
        case "lider":
          this.nombre = "Candidato Líder";
          this.voto = "DANIEL NOBOA AZIN";
          this.cantidad = this.cantidad;
          break;
        case "valido":
          this.voto = "Votos Validos";
          this.cantidad = this.cantidad;
          break;
        case "blanco":
          this.voto = "Votos Blancos";
          this.cantidad = this.cantidad;
          break;
        case "nulo":
          this.voto = "Votos Nulos";
          this.cantidad = this.cantidad;
          break;
      }
    }
  }
}
