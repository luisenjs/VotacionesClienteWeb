import { Component, Input, SimpleChanges } from '@angular/core';
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
import { CargarparroquiaComponent } from '../cargarparroquia/cargarparroquia.component';

@Component({
  selector: 'app-cargarcanton',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, TablaComponent, ConfirmationComponent, CargarparroquiaComponent],
  templateUrl: './cargarcanton.component.html',
  styleUrl: './cargarcanton.component.css'
})
export class CargarcantonComponent {

  cantonescampo: any[] = ["nombre", "acciones"];
  cantonesacciones: any[] = [
    { icon: "fa fa-edit", callback: (row: any) => this.onEdit(row) },
    { icon: "fa fa-trash", callback: (row: any) => this.onDelete(row) },
    { icon: "fa-solid fa-square-plus", callback: (row: any) => this.agregarParroquia(row) }
  ];
  cantones: any[] = [];
  cantonesfilter: any = { nombre: '' };
  cantonForm: FormGroup;

  isDataLoaded: boolean = false;
  showParroquia: boolean = false;

  @Input() provincia!: any;
  @Input() circunscripcion: any;

  pendingElement: any;

  constructor(private router: Router, private data: DataService, private fb: FormBuilder, private modal: ModalService) {
    this.cantonForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\u00C0-\u00FF ]*$/)]]
    });
  }

  ngOnInit() {
    this.loadData();
  }

  /*ngOnChanges(changes: SimpleChanges): void {
    if (changes.['provincia'] && changes.['provincia'].currentValue) {
      this.loadData();
    }
  }*/

  //TODO: Replace our link with the product owner's link
  loadData() {
    this.data.readData<any[]>("https://api-observacion-electoral.frative.com/api/cantones/provincia/" + this.provincia.id).subscribe((data) => {
      this.cantones = data;
      this.checkDataLoaded();
    });
  }

  checkDataLoaded() {
    if (this.cantones.length > 0) {
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
      this.data.deleteDataById("https://api-observacion-electoral.frative.com/api/cantones", this.pendingElement.id).subscribe((data) => {
        console.log(this.pendingElement)
        window.location.reload();
      });
    }
  }

  submitCantones() {
    if (this.cantonForm.valid) {
      const currentDateTime = new Date().toISOString();
      const data = {
        id: this.cantones.length + 1,
        nombre: this.cantonForm.value.nombre,
        circunscripcion_id: (this.circunscripcion == null ? 1 : this.circunscripcion.id),
        provincia_id: this.provincia.id,
        estado: 'Activo',
        fecha_ingreso: currentDateTime,
        fecha_modificacion: currentDateTime,
        observacion: 'Primer ingreso',
        usuario_ingreso: 1,
        usuario_modificacion: 1
      }
      console.log(data);
      this.data.createData<any>("https://api-observacion-electoral.frative.com/api/cantones", data).subscribe(() => {
        this.cantonForm.reset();
        window.location.reload();
      }, (error) => {
        console.log(error);
      });
    }
  }

  agregarParroquia(padre: any) {
    this.showParroquia = true;
    this.pendingElement = padre
  }

}
