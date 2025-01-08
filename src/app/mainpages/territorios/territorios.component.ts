import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
import { DataService } from '../../services/data/data.service';
import { TablaComponent } from "../../component/tabla/tabla.component";

@Component({
  selector: 'app-territorios',
  standalone: true,
  imports: [CommonModule, TablaComponent],
  templateUrl: './territorios.component.html',
  styleUrl: './territorios.component.css'
})
export class TerritoriosComponent {

  juntascampo: any[] = ["provincia", "circunscripcion", "canton", "parroquia", "zona", "recinto", "junta", "estado"];
  juntas: any[] = [];
  juntasfilter: any = {provincia: '', circunscripcion: '', canton: '', parroquia: '', zona: '', recinto: '', junta: '', estado: ''};

  isDataLoaded: boolean = false;

  constructor(private modal: ModalService, private data: DataService) { }

  ngOnInit(): void {
    this.data.getData<any[]>('assets/data/juntas.json').subscribe((data) => {
      this.juntas = data;
      this.checkDataLoaded();
    });
  }

  checkDataLoaded() {
    if (this.juntas.length > 0) {
      this.isDataLoaded = true;
    }
  }

}
