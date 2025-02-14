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
import { CargarjuntaComponent } from "../cargarjunta/cargarjunta.component";
import { ModificarterritorioComponent } from "../modificarterritorio/modificarterritorio.component";

@Component({
  selector: 'app-cargarrecinto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, TablaComponent, ConfirmationComponent, CargarjuntaComponent, ModificarterritorioComponent],
  templateUrl: './cargarrecinto.component.html',
  styleUrl: './cargarrecinto.component.css'
})
export class CargarrecintoComponent {

  recintoscampo: any[] = ["nombre", "acciones"];
  recintosacciones: any[] = [
    { icon: "fa fa-edit", callback: (row: any) => this.onEdit(row) },
    { icon: "fa fa-trash", callback: (row: any) => this.onDelete(row) },
    { icon: "fa fa-square-plus", callback: (row: any) => this.agregarJunta(row) }
  ];
  recintos: any[] = [];
  recintosfilter: any = { nombre: '' };
  recintoForm: FormGroup;

  isDataLoaded: boolean = false;

  showJunta = false;

  @Input() parroquia: any;

  pendingElement: any;

  constructor(private router: Router, private data: DataService, private fb: FormBuilder, private modal: ModalService) {
    this.recintoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\u00C0-\u00FF ]*$/)]]
    });
    setInterval(() => { this.loadData() }, 5000);
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.data.readData<any[]>("https://api-observacion-electoral.frative.com/api/recintos-electorales/parroquia/" + this.parroquia.id).subscribe((data) => {
      this.recintos = data;
      this.checkDataLoaded();
    });
  }

  checkDataLoaded() {
    if (this.recintos.length > 0) {
      this.isDataLoaded = true;
    }
  }

  onEdit(row: any) {
    this.pendingElement = row;
    this.modal.open("modificarRecinto");
  }

  onDelete(row: any) {
    this.pendingElement = row;
    this.modal.open("eliminarRecinto");
  }

  confirmDelete(confirm: boolean) {
    if (confirm) {
      this.data.deleteDataById("https://api-observacion-electoral.frative.com/api/recintos-electorales", this.pendingElement.id).subscribe((data) => {
        console.log(this.pendingElement);
      });
    }
  }

  submitRecintos() {
    if (this.recintoForm.valid) {
      const currentDateTime = new Date().toISOString();
      const data = {
        id: this.recintos.length + 1,
        nombre: this.recintoForm.value.nombre,
        parroquia_id: this.parroquia.id,
        estado: 'Activo',
        fecha_ingreso: currentDateTime,
        fecha_modificacion: currentDateTime,
        observacion: 'Primer ingreso',
        usuario_ingreso: 1,
        usuario_modificacion: 1
      }
      console.log(data);
      this.data.createData<any>("https://api-observacion-electoral.frative.com/api/recintos-electorales", data).subscribe(() => {
        this.recintoForm.reset();
      }, (error) => {
        console.log(error);
      });
    }
  }

  agregarJunta(row: any) {
    this.showJunta = true;
    this.pendingElement = row;
  }

}
