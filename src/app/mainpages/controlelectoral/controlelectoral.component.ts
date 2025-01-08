import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
import { DataService } from '../../services/data/data.service';
import { TablaComponent } from '../../component/tabla/tabla.component';

@Component({
  selector: 'app-controlelectoral',
  standalone: true,
  imports: [CommonModule, TablaComponent],
  templateUrl: './controlelectoral.component.html',
  styleUrl: './controlelectoral.component.css'
})
export class ControlelectoralComponent {

  actascampo: any = ["papeleta", "provincia", "circunscripcion", "canton", "parroquia", "zona", "recinto", "estado"];
  actas: any[] = [];
  actasfiltro: any = {papeleta: "", provincia: "", circunscripcion: "", canton: "", parroquia: "", zona: "", recinto: "", estado: ""};

  usuarioscampo: any[] = ["nombre", "genero", "rol", "provincia", "circunscripcion", "canton", "parroquia", "zona", "recinto", "estatus"];
  usuarios: any[] = [];
  usuariosfiltro: any = {nombre: "", genero: "", rol: "", provincia: "", circunscripcion: "", canton: "", parroquia: "", zona: "", recinto: "", estatus: ""};

  isDataLoaded = false;

  constructor(private modal: ModalService, private data: DataService) { }

  ngOnInit(): void {
    this.data.getData<any[]>('assets/data/actasreal.json').subscribe((data) => {
      this.actas = data;
      this.checkDataLoaded();
    });
    this.data.getData<any[]>('assets/data/usuariosreal.json').subscribe((data) => {
      this.usuarios = data;
      this.checkDataLoaded();
    })
  }

  checkDataLoaded() {
    if (this.actas.length > 0 && this.usuarios.length > 0) {
      this.isDataLoaded = true;
    }
  }
}
