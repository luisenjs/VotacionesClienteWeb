import { Component } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { DataService } from '../../services/data/data.service';
import { CommonModule } from '@angular/common';
import { TablaComponent } from "../../component/tabla/tabla.component";
import { ConfirmationComponent } from '../../component/confirmation/confirmation.component';
import { MasinformacionComponent } from '../../component/masinformacion/masinformacion.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, TablaComponent, ConfirmationComponent, MasinformacionComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  usuarioscampo: any[] = ["nombres", "apellidos", "genero", "rol_id", "canton_id", "parroquia_id", "recinto_id", "acciones"];
  usuariosacciones: any[] = [{ icon: "fa-solid fa-eye", callback: (row: any) => this.verInfo(row) }, { icon: "fa-solid fa-ban", callback: (row: any) => this.inhabilitarUsuario(row) }];
  usuarios: any[] = [];
  usuariosfilter: any = { nombre: "", genero: "", rol: "", provincia: "", canton: "", parroquia: "", recinto: "" };

  isDataLoaded: boolean = false;

  pendingElement: any = null;
  roles: any[] = [];
  cantones: any[] = [];
  parroquias: any[] = [];
  recintos: any[] = [];

  constructor(private modal: ModalService, private data: DataService) { }

  ngOnInit(): void {
    forkJoin({
      roles: this.data.getData<any[]>('https://sistema-electoral-cc1y.onrender.com/api/roles'),
      cantones: this.data.getData<any[]>('https://api-observacion-electoral.frative.com/api/cantones'),
      parroquias: this.data.getData<any[]>('https://api-observacion-electoral.frative.com/api/parroquias'),
      recintos: this.data.getData<any[]>('https://api-observacion-electoral.frative.com/api/recintos-electorales'),
      usuarios: this.data.getData<any[]>('https://api-observacion-electoral.frative.com/api/usuarios')
    }).subscribe((result) => {
      this.roles = result.roles;
      this.cantones = result.cantones;
      this.parroquias = result.parroquias;
      this.recintos = result.recintos;
      this.usuarios = result.usuarios.map(user => {
        const role = this.roles.find(r => r.id === user.rol_id);
        const canton = this.cantones.find(c => c.id === user.canton_id);
        const parroquia = this.parroquias.find(p => p.id === user.parroquia_id);
        const recinto = this.recintos.find(r => r.id === user.recinto_id);
        return {
          ...user,
          rol_id: role ? role.descripcion : 'Desconocido',
          canton_id: canton ? canton.nombre : 'Desconocido',
          parroquia_id: parroquia ? parroquia.nombre : 'Desconocido',
          recinto_id: recinto ? recinto.nombre : 'Desconocido'
        };
      });
      this.checkDataLoaded();
    });
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
