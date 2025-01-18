import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-masinformacion',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './masinformacion.component.html',
  styleUrl: './masinformacion.component.css'
})
export class MasinformacionComponent {

  isVisible = false;

  columnTitles: { [key: string]: string } = {
    id: 'Identificación única del sistema',
    identificacion: 'Cédula de identidad',
    nombre: 'Nombre',
    nombres: 'Nombres',
    apellidos: 'Apellidos',
    genero: 'Género',
    rol: 'Rol',
    rol_id: 'Rol',
    provincia: 'Provincia',
    provincia_id: 'Provincia',
    circunscripcion: 'Circunscripción',
    circunscripcion_id: 'Circunscripción',
    canton: 'Canton',
    canton_id: 'Cantón',
    parroquia: 'Parroquia',
    parroquia_id: 'Parroquia',
    recinto: 'Recinto',
    recinto_id: 'Recinto',
    junta: 'Junta',
    junta_id: 'Junta',
    acciones: 'Acciones',
    papeleta: 'Papeleta',
    fecha: 'Fecha',
    zona: 'Zona',
    telefono: 'Teléfono',
    telefono_aux: 'Teléfono auxiliar',
    fecha_ingreso: 'Fecha de ingreso',
    fecha_modificacion: 'Fecha de modificación',
    estado: 'Estado',
    observacion: 'Observaciones',
    direccion: ' Dirección de domicilio',
    partido_id: 'Partido suscrito',
    correo_electronico: 'Correo electrónico',
    usuario_ingreso: 'ID del usuario que lo ingresó',
    usuario_modificacion: 'ID del usuario de lo modificó'
  };

  @Input() id!: string;
  @Input() element!: any;

  constructor(private modal: ModalService) { }

  ngOnInit(): void {
    this.modal.add(this);
  }

  ngOnDestroy(): void {
    this.modal.remove(this.id);
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }

}
