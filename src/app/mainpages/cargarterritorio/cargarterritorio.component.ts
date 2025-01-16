import { Component, OnInit } from '@angular/core';
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
import { CargarcantonComponent } from '../../component/cargarcanton/cargarcanton.component';
import { CargarcircunscripcionComponent } from "../../component/cargarcircunscripcion/cargarcircunscripcion.component";

@Component({
  selector: 'app-cargarterritorio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, TablaComponent, ConfirmationComponent, CargarcantonComponent, CargarcircunscripcionComponent],
  templateUrl: './cargarterritorio.component.html',
  styleUrl: './cargarterritorio.component.css'
})
export class CargarterritorioComponent implements OnInit {

  provinciascampo: any[] = ["nombre", "acciones"];
  provinciasacciones: any[] = [
    { icon: "fa fa-edit", callback: (row: any) => this.onEdit(row) },
    { icon: "fa fa-trash", callback: (row: any) => this.onDelete(row) },
    { icon: "fa-solid fa-square-plus", callback: (row: any) => this.agregarCanton(row)},
    { icon: "fa-solid fa-square-plus", callback: (row: any) => this.agregarCircunscripcion(row)}
  ];
  provincias: any[] = [];
  provinciasfilter: any = { nombre: '' };
  provinciaForm: FormGroup;

  isDataLoaded: boolean = false;
  showCantones: boolean = false;
  showCircunscripcion: boolean = false;

  pendingElement: any;

  constructor(private router: Router, private data: DataService, private fb: FormBuilder, private modal: ModalService) {
    this.provinciaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\u00C0-\u00FF ]*$/)]]
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.data.readData<any[]>("https://api-observacion-electoral.frative.com/api/provincias").subscribe((data) => {
      this.provincias = data;
      this.checkDataLoaded();
    });
  }

  checkDataLoaded() {
    if (this.provincias.length > 0) {
      this.isDataLoaded = true;
    }
  }

  onEdit(row: any) {

  }

  onDelete(row: any) {
    this.pendingElement = row;
    this.modal.open("eliminar");
  }

  confirmDelete(confirm: boolean) {
    if (confirm) {
      this.data.deleteDataById("https://api-observacion-electoral.frative.com/api/provincias", this.pendingElement.id).subscribe((data) => {
        console.log(this.pendingElement)
        window.location.reload();
      });
    }
  }

  submitProvincias() {
    if (this.provinciaForm.valid) {
      const currentDateTime = new Date().toISOString();
      const data = {
        id: this.provincias.length + 1,
        nombre: this.provinciaForm.value.nombre,
        estado: 'Activo',
        fecha_ingreso: currentDateTime,
        fecha_modificacion: currentDateTime,
        observacion: 'Primer ingreso',
        usuario_ingreso: 1,
        usuario_modificacion: 1
      }
      console.log(data);
      this.data.createData<any>("https://api-observacion-electoral.frative.com/api/provincias", data).subscribe(() => {
        this.provinciaForm.reset();
        window.location.reload();
      }, (error) => {
        console.log(error);
      });
    }
  }

  agregarCanton(provincia: any) {
    this.showCantones = true;
    this.showCircunscripcion = false;
    this.pendingElement = provincia;
  }
  
  agregarCircunscripcion(provincia: any) {
    this.showCircunscripcion = true;
    this.showCantones = false;
    this.pendingElement = provincia;
  }

}
