import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationComponent } from "../confirmation/confirmation.component";

@Component({
  selector: 'app-agregar-elemento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConfirmationComponent],
  templateUrl: './agregar-elemento.component.html',
  styleUrl: './agregar-elemento.component.css'
})
export class AgregarElementoComponent implements OnChanges, OnInit {

  isVisible = false;
  elemetform: FormGroup;

  @Input() tipoElemento: string = "";
  @Input() id!: string;
  @Input() mod: boolean = false;
  @Input() elemento: any = null;

  titulo = "";
  campo1 = "";
  campo2 = "";

  pendingElement: any = null;

  constructor(private modal: ModalService, private fb: FormBuilder) {
    if (this.mod) {
      this.elemetform = this.fb.group({
        elemento1: [this.elemento.nombre, Validators.required],
        elemento2: [this.elemento.candidato, Validators.required]
      });
    } else {
      this.elemetform = this.fb.group({
        elemento1: ['', Validators.required],
        elemento2: ['', Validators.required]
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tipoElemento'] && changes['tipoElemento'].currentValue) {
      this.setModalType();
    }
  }

  setModalType(): void {
    switch (this.tipoElemento) {
      case "binomio":
        this.titulo = "CREANDO BINOMIO PRESIDENCIAL";
        this.campo1 = "Nombre de la lista";
        this.campo2 = "Nombre del candidato";
        break;
      case "organizacion":
        this.titulo = "CREANDO ORGANIZACION POLÍTICA";
        this.campo1 = "Nombre de la lista";
        this.campo2 = "Nombre de la organización";
        break;
      case "consulta":
        this.titulo = "CREANDO CONSULTAS";
        this.campo1 = "Nombre de la consulta";
        this.campo2 = "Pregunta";
        break;
      case "modbinomio":
        this.titulo = "MODIFICANDO BINOMIO PRESIDENCIAL";
        this.campo1 = "Nombre de la lista";
        this.campo2 = "Nombre del candidato";
        break;
      case "modorganizacion":
        this.titulo = "MODIFICANDO ORGANIZACION POLÍTICA";
        this.campo1 = "Nombre de la lista";
        this.campo2 = "Nombre de la organización";
        break;
      case "modconsulta":
        this.titulo = "MODIFICANDO CONSULTAS";
        this.campo1 = "Nombre de la consulta";
        this.campo2 = "Pregunta";
        break;
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

  close() {
    this.isVisible = false;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.elemetform.valid) {
      this.pendingElement = this.elemetform.value;
      this.modal.open("agregar");
    }
  }

  confirmation(confirmacion: boolean) {
    if (confirmacion) {
      console.log('Nuevo elemento:', this.pendingElement);
    }
    this.elemetform.reset();
    this.pendingElement = null;
  }

}
