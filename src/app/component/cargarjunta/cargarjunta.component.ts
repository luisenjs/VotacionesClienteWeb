import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data/data.service';
import { TablaComponent } from '../../component/tabla/tabla.component';
import { ModalService } from '../../services/modal/modal.service';
import { ConfirmationComponent } from '../../component/confirmation/confirmation.component';
import { ModificarterritorioComponent } from "../modificarterritorio/modificarterritorio.component";

@Component({
  selector: 'app-cargarjunta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, TablaComponent, ConfirmationComponent, ModificarterritorioComponent],
  templateUrl: './cargarjunta.component.html',
  styleUrl: './cargarjunta.component.css'
})
export class CargarjuntaComponent {

  juntascampo: any[] = ["nombre", "acciones"];
  juntasacciones: any[] = [
    { icon: "fa fa-edit", callback: (row: any) => this.onEdit(row) },
    { icon: "fa fa-trash", callback: (row: any) => this.onDelete(row) }
  ];
  juntas: any[] = [];
  juntasfilter: any = { nombre: '' };

  juntaForm: FormGroup;

  isDataLoaded: boolean = false;

  @Input() recinto: any;

  pendingElement: any;

  constructor(private modal: ModalService, private data: DataService, private fb: FormBuilder) {
    this.juntaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\u00C0-\u00FF ]*$/)]]
    });
    setInterval(() => { this.loadData() }, 5000);
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.data.readData<any[]>("https://api-observacion-electoral.frative.com/api/juntas/recinto/" + this.recinto.id).subscribe((data) => {
      this.juntas = data;
      this.checkDataLoaded();
    });
  }

  checkDataLoaded() {
    if (this.juntas.length > 0) {
      this.isDataLoaded = true;
    }
  }

  onEdit(row: any) {
    this.pendingElement = row;
    this.modal.open("modificarJunta");
  }

  onDelete(row: any) {
    this.pendingElement = row;
    this.modal.open("eliminarJunta");
  }

  confirmDelete(confirm: boolean) {
    if (confirm) {
      console.log(this.pendingElement)
      this.data.deleteDataById("https://api-observacion-electoral.frative.com/api/juntas", this.pendingElement.id).subscribe((data) => {
        console.log(this.pendingElement);
      });
    }
  }

  submitRecintos() {
    if (this.juntaForm.valid) {
      const currentDateTime = new Date().toISOString();
      const data = {
        id: this.juntas.length + 1,
        nombre: this.juntaForm.value.nombre,
        recinto_id: this.recinto.id,
        estado: 'Activo',
        fecha_ingreso: currentDateTime,
        fecha_modificacion: currentDateTime,
        observacion: 'Primer ingreso',
        usuario_ingreso: 1,
        usuario_modificacion: 1
      }
      console.log(data);
      this.data.createData<any>("https://api-observacion-electoral.frative.com/api/juntas", data).subscribe(() => {
        this.juntaForm.reset();
      }, (error) => {
        console.log(error);
      });
    }
  }

}
