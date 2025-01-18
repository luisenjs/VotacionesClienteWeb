import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
import { DataService } from '../../services/data/data.service';
import { TablaComponent } from "../../component/tabla/tabla.component";
import { ConfirmationComponent } from '../../component/confirmation/confirmation.component';
import { MasinformacionComponent } from '../../component/masinformacion/masinformacion.component';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule, TablaComponent, ConfirmationComponent, MasinformacionComponent],
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.css'
})
export class InscripcionesComponent {

  inscripcioncampo: any[] = ["nombres", "apellidos", "genero", "canton_id", "parroquia_id", "recinto_id", "acciones"];
  inscripcionacciones: any[] = [{ icon: "fa-solid fa-eye", callback: (row: any) => this.verInfo(row) }, { icon: "fa-regular fa-circle-check", callback: (row: any) => this.aceptarInscripcion(row) }, { icon: "fa-regular fa-circle-xmark", callback: (row: any) => this.rechazarInscripcion(row) }];
  inscripcion: any[] = [];
  inscripcionfilter: any = { nombre: "", genero: "", fecha: "", provincia: "", canton: "", parroquia: "", recinto: "" };

  isDataLoaded: boolean = false;

  pendingElement: any = null;

  cantones: any[] = [];
  parroquias: any[] = [];
  recintos: any[] = [];

  constructor(private modal: ModalService, private data: DataService, private auth: AuthService) {
    setInterval(() => {this.ngOnInit()}, 3000)
  }

  ngOnInit(): void {
    forkJoin({
      cantones: this.data.getData<any[]>('https://api-observacion-electoral.frative.com/api/cantones'),
      parroquias: this.data.getData<any[]>('https://api-observacion-electoral.frative.com/api/parroquias'),
      recintos: this.data.getData<any[]>('https://api-observacion-electoral.frative.com/api/recintos-electorales'),
      usuarios: this.data.getData<any[]>('https://api-observacion-electoral.frative.com/api/usuarios')
    }).subscribe((result) => {
      this.cantones = result.cantones;
      this.parroquias = result.parroquias;
      this.recintos = result.recintos;
      this.inscripcion = result.usuarios.filter(user => user.rol_id === 4).map(user => {
        const canton = this.cantones.find(c => c.id === user.canton_id);
        const parroquia = this.parroquias.find(p => p.id === user.parroquia_id);
        const recinto = this.recintos.find(r => r.id === user.recinto_id);
        return {
          ...user,
          canton_id: canton ? canton.nombre : 'Desconocido',
          parroquia_id: parroquia ? parroquia.nombre : 'Desconocido',
          recinto_id: recinto ? recinto.nombre : 'Desconocido'
        };
      }).reverse();
      this.checkDataLoaded();
    });
  }

  checkDataLoaded() {
    this.isDataLoaded = this.inscripcion.length > 0;
  }

  verInfo(row: any) {
    this.pendingElement = row;
    this.modal.open("info");
  }

  aceptarInscripcion(row: any) {
    this.pendingElement = row;
    this.modal.open("agregar");
  }

  rechazarInscripcion(row: any) {
    this.pendingElement = row;
    this.modal.open("rechazar");
  }

  confirmation(confirmacion: boolean) {
    if (confirmacion) {
      console.log(this.pendingElement)
      const currentDateTime = new Date().toISOString();
      const data = {
        rol_id: 3,
        fecha_modificacion: currentDateTime,
        observacion: "Inscripción aceptada",
        usuario_ingreso: this.auth.getCurrentUser().id,
        usuario_modificacion: this.auth.getCurrentUser().id
      };
      console.log(data);
      this.data.updateDataById<any>("https://api-observacion-electoral.frative.com/api/usuarios", this.pendingElement.id, data).subscribe((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    }
    this.pendingElement = null;
  }

  delete(confirmacion: boolean) {
    if (confirmacion) {
      alert("NO API TO CALL\nRECHAZANDO:\n" + JSON.stringify(this.pendingElement, null, 2));
    }
    this.pendingElement = null;
  }

}
