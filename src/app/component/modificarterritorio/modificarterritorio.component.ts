import { Component, Input, SimpleChanges } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { DataService } from '../../services/data/data.service';
import { AuthService } from '../../services/auth/auth.service';

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

  constructor(private modal: ModalService, private fb: FormBuilder, private data: DataService, private auth: AuthService) {
    this.elementoForm = this.fb.group({
      nombre: ["", Validators.required],
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['elemento'] && this.elemento) {
      this.elementoForm.patchValue({
        nombre: this.elemento.nombre,
      });
    }
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

  close(event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.isVisible = false;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.elementoForm.valid) {
      this.pendingElement = this.elementoForm.value;
      this.modal.open("confirmar"+this.tipoterritorio);
    }
  }

  confirmation(confirmacion: boolean) {
    if (confirmacion) {
      const currentDateTime = new Date().toISOString();
      const data = {
        nombre: this.elementoForm.value.nombre,
        fecha_modificacion: currentDateTime,
        observacion: 'Modificación del nombre',
        usuario_modificacion: this.auth.getCurrentUser().id
      }
      this.data.updateDataById(`https://api-observacion-electoral.frative.com/api/${this.tipoterritorio}`, this.elemento.id, data).subscribe(() => {
        console.log("Modificación del objeto:");
        console.log(data);
      }, (error) => {
        console.log(error);
      });
    }
    this.elementoForm.reset();
    this.pendingElement = null;
    this.close();
  }

}
