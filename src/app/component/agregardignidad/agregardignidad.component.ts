import { Component, Input, SimpleChanges } from '@angular/core';
import { ConfirmationComponent } from "../confirmation/confirmation.component";
import { ModalService } from '../../services/modal/modal.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { DataService } from '../../services/data/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregardignidad',
  standalone: true,
  imports: [ConfirmationComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './agregardignidad.component.html',
  styleUrl: './agregardignidad.component.css'
})
export class AgregardignidadComponent {

  @Input() id!: any;
  @Input() isNew!: boolean;
  @Input() dignidad: any;

  isVisible = false;
  dignidadForm: FormGroup;

  titulo = "Agregando una nueva dignidad a la lista";

  pendingElement: any;

  constructor(private fb: FormBuilder, private modal: ModalService, private auth: AuthService, private data: DataService) {
    this.dignidadForm = this.fb.group({
      nombre: ['', [Validators.required]],
      lista: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.modal.add(this);
    if (!this.isNew) {
      this.titulo = "Modificando una consulta";
      console.log("Uno", this.isNew);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dignidad'] && this.dignidad) {
      this.dignidadForm.patchValue({
        nombre: this.dignidad.nombre,
        lista: this.dignidad.identificacion,
      });
    }
    console.log("Changes", this.isNew);
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
    if (this.dignidadForm.valid) {
      if (this.isNew) {
        this.modal.open("agregarDignidad");
      } else {
        this.modal.open("modificarDignidad"+this.isNew);
      }
    }
  }

  confirmation(confirmacion: boolean) {
    console.log("Después de submit", this.isNew);
    if (confirmacion) {
      const currentDateTime = new Date().toISOString();
      if (this.isNew) {
        console.log("NUEVO")
        const data = {
          nombre: this.dignidadForm.value.nombre,
          identificacion: this.dignidadForm.value.lista,
          estado: "Activo",
          fecha_ingreso: currentDateTime,
          fecha_modificacion: currentDateTime,
          observacion: "Dignidad creada",
          usuario_ingreso: this.auth.getCurrentUser().id,
          usuario_modificacion: this.auth.getCurrentUser().id
        }
        this.data.createData<any>("https://sistema-electoral-cc1y.onrender.com/api/dignidades", data).subscribe(() => {
          console.log('Nuevo elemento:', data);
        });
      } else {
        console.log("MODIFICO")
        const data = {
          nombre: this.dignidadForm.value.nombre,
          identificacion: this.dignidadForm.value.lista,
          fecha_modificacion: currentDateTime,
          observacion: "Dignidad modificada",
          usuario_modificacion: this.auth.getCurrentUser().id
        }
        this.data.updateDataById<any>("https://sistema-electoral-cc1y.onrender.com/api/dignidades", this.dignidad.id, data).subscribe(() => {
          console.log('Modificar elemento:', data);
        });
        this.close();
      }
    }
    this.dignidadForm.reset();
  }

}

