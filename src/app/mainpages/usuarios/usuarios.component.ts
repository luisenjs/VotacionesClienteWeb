import { Component } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { DataService } from '../../services/data/data.service';
import { CommonModule } from '@angular/common';
import { TablaComponent } from "../../component/tabla/tabla.component";

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, TablaComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  usuarioscampo: any[] = ["nombre", "genero", "rol", "provincia", "canton", "parroquia", "recinto"];
  usuarios: any[] = [];
  usuariosfilter: any = {nombre: "", genero: "", rol: "", provincia: "", canton: "", parroquia: "", recinto: ""};

  isDataLoaded: boolean = false;

  constructor(private modal: ModalService, private data: DataService) { }

  ngOnInit(): void {
    this.data.getData<any[]>('assets/data/usuarios.json').subscribe((data) => {
      this.usuarios = data;
      this.checkDataLoaded();
    })
  }

  checkDataLoaded() {
    if (this.usuarios.length > 0) {
      this.isDataLoaded = true;
    }
  }
}
