import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
import { DataService } from '../../services/data/data.service';
import { TablaComponent } from '../../component/tabla/tabla.component';
import { forkJoin } from 'rxjs';

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
  actasfiltro: any = { papeleta: "", provincia: "", circunscripcion: "", canton: "", parroquia: "", zona: "", recinto: "", estado: "" };

  usuarioscampo: any[] = ["nombres", "apellidos", "genero", "rol_id", "canton_id", "parroquia_id", "recinto_id", "estado"];
  usuarios: any[] = [];
  usuariosfiltro: any = { nombre: "", genero: "", rol: "", provincia: "", circunscripcion: "", canton: "", parroquia: "", zona: "", recinto: "", estatus: "" };

  isDataLoaded = false;
  roles: any[] = [];
  cantones: any[] = [];
  parroquias: any[] = [];
  recintos: any[] = [];

  constructor(private modal: ModalService, private data: DataService) { }

  ngOnInit(): void {
    this.data.getData<any[]>('assets/data/actasreal.json').subscribe((data) => {
      this.actas = data;
      this.checkDataLoaded();
    });
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
      this.usuarios = result.usuarios.filter(user => user.rol_id !== 4).map(user => {
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
    if (this.actas.length > 0 && this.usuarios.length > 0) {
      this.isDataLoaded = true;
    }
  }
}
