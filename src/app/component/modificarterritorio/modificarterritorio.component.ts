import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-modificarterritorio',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ConfirmationComponent],
  templateUrl: './modificarterritorio.component.html',
  styleUrl: './modificarterritorio.component.css'
})
export class ModificarterritorioComponent {

  @Input() tipoterritorio: string = "";
  @Input() id!: any;
  @Input() elemento!: any;

  isVisible = false;

  elementoForm: FormGroup;

  pendingElement: any;

  constructor(private modal: ModalService, private fb: FormBuilder, private data: DataService) {
    this.elementoForm = this.fb.group({
      nombre: ["this.elemento.nombre", Validators.required],
    })
  }

  ngOnInit(): void {
    this.modal.add(this);
  }

  ngOnDestroy(): void {
    this.modal.remove(this.id);
  }

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.elementoForm.valid) {
      this.pendingElement = this.elementoForm.value;
      this.modal.open("confirmar");
    }
  }

  confirmation(confirmacion: boolean) {
    if (confirmacion) {
      const currentDateTime = new Date().toISOString();
      const data = {
        id: this.elemento.id,
        nombre: this.elementoForm.value.nombre,
        estado: 'Activo',
        fecha_ingreso: currentDateTime,
        fecha_modificacion: currentDateTime,
        observacion: 'Modificación del nombre',
        usuario_ingreso: 1,
        usuario_modificacion: 1
      }
      this.data.updateDataById("https://api-observacion-electoral.frative.com/api/provincias", this.elemento.id, data).subscribe(() => {
        console.log("Modificación del objeto:");
        console.log(data);
      }, (error) => {
        console.log(error);
      });
    }
    this.elementoForm.reset();
    this.pendingElement = null;
  }

}
