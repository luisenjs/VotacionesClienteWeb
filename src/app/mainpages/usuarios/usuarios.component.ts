import { Component } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { DataService } from '../../services/data/data.service';
import { CommonModule } from '@angular/common';
import { TablaComponent } from "../../component/tabla/tabla.component";
import { ConfirmationComponent } from '../../component/confirmation/confirmation.component';
import { MasinformacionComponent } from '../../component/masinformacion/masinformacion.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, TablaComponent, ConfirmationComponent, MasinformacionComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  usuarioscampo: any[] = ["nombre", "genero", "rol", "provincia", "canton", "parroquia", "recinto", "acciones"];
  usuariosacciones: any[] = [{icon: "fa-solid fa-eye", callback:(row: any)=>this.verInfo(row)}, {icon: "fa-solid fa-ban", callback:(row: any)=>this.inhabilitarUsuario(row)}];
  usuarios: any[] = [];
  usuariosfilter: any = {nombre: "", genero: "", rol: "", provincia: "", canton: "", parroquia: "", recinto: ""};

  isDataLoaded: boolean = false;

  pendingElement: any = null;

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

  verInfo(row: any) {
    this.pendingElement = row;
    this.modal.open("info");
  }

  inhabilitarUsuario(row: any) {
    this.pendingElement = row;
    this.modal.open("inhabilitar");
  }

  inhabilitar(confirmacion: boolean) {
    if (confirmacion) {
      alert("NO API TO CALL\nINHABILITANDO:\n" + JSON.stringify(this.pendingElement, null, 2));
    }
    this.pendingElement = null;
  }

}
