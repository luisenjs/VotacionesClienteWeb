import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { ConfirmationComponent } from "../confirmation/confirmation.component";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
import { AuthService } from '../../services/auth/auth.service';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-agregarconsulta',
  standalone: true,
  imports: [ConfirmationComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './agregarconsulta.component.html',
  styleUrl: './agregarconsulta.component.css'
})
export class AgregarconsultaComponent {

  @Input() id!: any;
  @Input() isNew: boolean = true;
  @Input() consulta: any;

  isVisible = false;
  consultaForm: FormGroup;

  titulo = "Agregando una nueva consulta a la lista";

  pendingElement: any;

  constructor(private fb: FormBuilder, private modal: ModalService, private auth: AuthService, private data: DataService) {
    this.consultaForm = this.fb.group({
      pregunta: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.modal.add(this);
    if (!this.isNew) {
      this.titulo = "Modificando una consulta";
    }
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['consulta'] && this.consulta){
      this.consultaForm.patchValue({
        pregunta: this.consulta.pregunta
      });
    }
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
    if (this.consultaForm.valid) {
      if (this.isNew) {
        this.modal.open("agregarConsulta");
      } else {
        this.modal.open("modificarConsulta");
      }
    }
  }

  confirmation(confirmacion: boolean) {
    if (confirmacion) {
      const currentDateTime = new Date().toISOString();
      if (this.isNew) {
        console.log("NUEVO")
        const data = {
          pregunta: this.consultaForm.value.pregunta,
          estado: "Activo",
          fecha_ingreso: currentDateTime,
          fecha_modificacion: currentDateTime,
          observacion: "Consulta agregada",
          usuario_ingreso: this.auth.getCurrentUser().id,
          usuario_modificacion: this.auth.getCurrentUser().id
        }
        this.data.createData<any>("https://api-observacion-electoral.frative.com/api/preguntas-consulta-popular", data).subscribe(() => {
          console.log('Nuevo elemento:', data);
        });
      } else {
        console.log("MODIFICO")
        const data = {
          pregunta: this.consultaForm.value.pregunta,
          fecha_modificacion: currentDateTime,
          observacion: "Consulta modificada",
          usuario_modificacion: this.auth.getCurrentUser().id
        }
        this.data.updateDataById<any>("https://api-observacion-electoral.frative.com/api/preguntas-consulta-popular", this.consulta.id, data).subscribe(() => {
          console.log('Modificar elemento:', data);
        });
        this.close();
      }
    }
    this.consultaForm.reset();
  }

}
