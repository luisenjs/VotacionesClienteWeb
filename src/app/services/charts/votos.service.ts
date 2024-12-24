import { Injectable } from '@angular/core';

interface ChartData {
  name: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class VotosService {

  private piechart: ChartData[] = [
    {
      "name": "Votos válidos",
      "value": 8940000
    },
    {
      "name": "Votos blancos",
      "value": 5000000
    },
    {
      "name": "Votos nulos",
      "value": 7200000
    }
  ];

  private barrachart: ChartData[] = [
    {
      "name": "YAKU PEREZ",
      "value": 8940000
    },
    {
      "name": "DANIEL NOBOA AZIN",
      "value": 5000000
    },
    {
      "name": "LUISA GONZALEZ",
      "value": 7200000
    },
    {
      "name": "JAN TOPIC",
      "value": 7000000
    },
    {
      "name": "OTTO SONNENHOLZNER",
      "value": 9000000
    },
    {
      "name": "BOLIVAR ARMIJOS",
      "value": 6200000
    },
    {
      "name": "FERNANDO VILLAVICENCIO",
      "value": 6200000
    },
    {
      "name": "XAVIER HERVAS",
      "value": 6200000
    }
  ];

  private lider: number = 0;

  private validos: number = 0;

  private blancos: number = 0;

  private nulos: number = 0;

  liderbinomio() {
    this.lider = Math.random() * 10000000;
  }

  votosvalidos() {
    this.validos = Math.random() * 10000000;
  }

  votosblancos() {
    this.blancos = Math.random() * 1000000;
  }

  votosnulos() {
    this.nulos = Math.random() * 1000000;
  }

  updatePie() {
    this.piechart = [
      {
        "name": "Votos válidos",
        "value": this.validos
      },
      {
        "name": "Votos blancos",
        "value": this.blancos
      },
      {
        "name": "Votos nulos",
        "value": this.nulos
      }
    ];
  }

  updateBarra() {
    this.barrachart = [
      {
        "name": "YAKU PEREZ",
        "value": Math.random() * 1000000
      },
      {
        "name": "DANIEL NOBOA AZIN",
        "value": this.lider
      },
      {
        "name": "LUISA GONZALEZ",
        "value": Math.random() * 10000000
      },
      {
        "name": "JAN TOPIC",
        "value": Math.random() * 10000000
      },
      {
        "name": "	OTTO SONNENHOLZNER",
        "value": Math.random() * 1000000
      },
      {
        "name": "BOLIVAR ARMIJOS",
        "value": Math.random() * 100000
      },
      {
        "name": "FERNANDO VILLAVICENCIO",
        "value": Math.random() * 10000000
      },
      {
        "name": "XAVIER HERVAS",
        "value": Math.random() * 100000
      }
    ];
  }

  get cantidadlider() {
    return this.lider;
  }

  get cantidadvalido() {
    return this.validos;
  }

  get cantidadblanco() {
    return this.blancos;
  }

  get cantidadnulo() {
    return this.nulos;
  }

  get piechartData() {
    return this.piechart;
  }

  get barrachartData() {
    return this.barrachart;
  }
  
}
