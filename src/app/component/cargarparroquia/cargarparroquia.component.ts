import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data/data.service';
import { TablaComponent } from '../../component/tabla/tabla.component';
import { ModalService } from '../../services/modal/modal.service';
import { ConfirmationComponent } from '../../component/confirmation/confirmation.component';
import { CargarrecintoComponent } from '../cargarrecinto/cargarrecinto.component';
import { ModificarterritorioComponent } from "../modificarterritorio/modificarterritorio.component";

@Component({
  selector: 'app-cargarparroquia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, TablaComponent, ConfirmationComponent, CargarrecintoComponent, ModificarterritorioComponent],
  templateUrl: './cargarparroquia.component.html',
  styleUrl: './cargarparroquia.component.css'
})
export class CargarparroquiaComponent {

  parroquiascampo: any[] = ["nombre", "acciones"];
  parroquiasacciones: any[] = [
    { icon: "fa fa-edit", callback: (row: any) => this.onEdit(row) },
    { icon: "fa fa-trash", callback: (row: any) => this.onDelete(row) },
    { icon: "fa-solid fa-square-plus", callback: (row: any) => this.agregarRecinto(row) }
  ];
  parroquias: any[] = [];
  parroquiasfilter: any = { nombre: '' };
  parroquiaForm: FormGroup;

  isDataLoaded: boolean = false;
  showRecinto: boolean = false;

  @Input() canton: any;

  pendingElement: any;

  constructor(private router: Router, private data: DataService, private fb: FormBuilder, private modal: ModalService) {
    this.parroquiaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\u00C0-\u00FF ]*$/)]]
    });
    setInterval(() => { this.loadData() }, 5000);
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.data.readData<any[]>("https://api-observacion-electoral.frative.com/api/parroquias/canton/" + this.canton.id).subscribe((data) => {
      this.parroquias = data;
      this.checkDataLoaded();
    });
  }

  checkDataLoaded() {
    if (this.parroquias.length > 0) {
      this.isDataLoaded = true;
    }
  }

  onEdit(row: any) {
    this.pendingElement = row;
    this.modal.open("modificarParroquia");
  }

  onDelete(row: any) {
    this.pendingElement = row;
    this.modal.open("eliminarParroquia");
  }

  confirmDelete(confirm: boolean) {
    if (confirm) {
      this.data.deleteDataById("https://api-observacion-electoral.frative.com/api/parroquias", this.pendingElement.id).subscribe((data) => {
        console.log(this.pendingElement);
      });
    }
  }

  submitParroquias() {
    if (this.parroquiaForm.valid) {
      const currentDateTime = new Date().toISOString();
      const data = {
        id: this.parroquias.length + 1,
        nombre: this.parroquiaForm.value.nombre,
        canton_id: this.canton.id,
        estado: 'Activo',
        fecha_ingreso: currentDateTime,
        fecha_modificacion: currentDateTime,
        observacion: 'Primer ingreso',
        usuario_ingreso: 1,
        usuario_modificacion: 1
      }
      console.log(data);
      this.data.createData<any>("https://api-observacion-electoral.frative.com/api/parroquias", data).subscribe(() => {
        this.parroquiaForm.reset();
      }, (error) => {
        console.log(error);
      });
    }
  }

  agregarRecinto(parroquia: any) {
    this.showRecinto = true;
    this.pendingElement = parroquia;
  }

}
