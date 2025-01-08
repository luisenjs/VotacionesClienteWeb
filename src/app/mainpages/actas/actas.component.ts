import { Component } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { DataService } from '../../services/data/data.service';
import { CommonModule } from '@angular/common';
import { TablaComponent } from "../../component/tabla/tabla.component";

@Component({
  selector: 'app-actas',
  standalone: true,
  imports: [CommonModule, TablaComponent],
  templateUrl: './actas.component.html',
  styleUrl: './actas.component.css'
})
export class ActasComponent {

  actascampo: any[] = ["fecha", "provincia", "canton", "parroquia", "zona", "recinto", "papeleta"];
  actas: any[] = [];
  actasfilter: any = {fecha: "", provincia: "", canton: "", parroquia: "", zona: "", recinto: "", papeleta: ""};

  isDataLoaded: boolean = false;

  constructor(private moddal: ModalService, private data: DataService) { }

  ngOnInit(): void {
    this.data.getData<any[]>('assets/data/actas.json').subscribe((data) => {
      this.actas = data;
      this.checkDataLoaded();
    })
  }

  checkDataLoaded() {
    if(this.actas.length > 0) {
      this.isDataLoaded = true;
    }
  }

}
