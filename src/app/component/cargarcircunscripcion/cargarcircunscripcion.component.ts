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
import { CargarcantonComponent } from '../cargarcanton/cargarcanton.component';

@Component({
  selector: 'app-cargarcircunscripcion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, TablaComponent, ConfirmationComponent, CargarcantonComponent],
  templateUrl: './cargarcircunscripcion.component.html',
  styleUrl: './cargarcircunscripcion.component.css'
})
export class CargarcircunscripcionComponent {

  circunscripcioncampo: any[] = ["nombre", "acciones"];
  circunscripcionacciones: any[] = [
    { icon: "fa fa-edit", callback: (row: any) => this.onEdit(row) },
    { icon: "fa fa-trash", callback: (row: any) => this.onDelete(row) },
    { icon: "fa-solid fa-square-plus", callback: (row: any) => this.agregarCanton(row) }
  ];
  circunscripcion: any[] = [];
  circunscripcionfilter: any = { nombre: '' };
  cantonForm: FormGroup;

  isDataLoaded: boolean = false;
  showCanton: boolean = false;

  @Input() provincia: any;

  pendingElement: any;

  constructor(private router: Router, private data: DataService, private fb: FormBuilder, private modal: ModalService) {
    this.cantonForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^Circunscripción [1-9](?: - [\w\s]+)?(?: - [\w\s-]+)?$/)]]
    });
  }

  ngOnInit() {
    this.loadData();
  }

  //TODO: Replace our link with the product owner's link
  loadData() {
    this.data.readData<any[]>("https://api-observacion-electoral.frative.com/api/circunscripciones/provincia/"+this.provincia.id).subscribe((data) => {
      this.circunscripcion = data;
      this.checkDataLoaded();
    });
  }

  checkDataLoaded() {
    if (this.circunscripcion.length > 0) {
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
      this.data.deleteDataById("https://api-observacion-electoral.frative.com/api/circunscripciones", this.pendingElement.id).subscribe((data) => {
        console.log(this.pendingElement)
        window.location.reload();
      });
    }
  }

  submitCircunscripcion() {
    if (this.cantonForm.valid) {
      const currentDateTime = new Date().toISOString();
      const data = {
        id: this.circunscripcion.length + 1,
        nombre: this.cantonForm.value.nombre,
        provincia_id: this.provincia.id,
        estado: 'Activo',
        fecha_ingreso: currentDateTime,
        fecha_modificacion: currentDateTime,
        observacion: 'Primer ingreso',
        usuario_ingreso: 1,
        usuario_modificacion: 1
      }
      console.log(data);
      this.data.createData<any>("https://sistema-electoral-cc1y.onrender.com/api/circunscripciones", data).subscribe(() => {
        this.cantonForm.reset();
        window.location.reload();
      }, (error) => {
        console.log(error);
      });
    }
  }

  agregarCanton(padre: any) {
    this.showCanton = true;
    this.pendingElement = padre
  }

}
