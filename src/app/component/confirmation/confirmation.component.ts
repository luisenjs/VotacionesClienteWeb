import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit, OnChanges {

  isVisible = false;

  @Input() tipo: string = "";
  @Input() id!: string;
  @Output() confirm = new EventEmitter<boolean>();

  pregunta = "";
  descripcion = "";

  constructor(private modal: ModalService) { }

  ngOnInit(): void {
    this.modal.add(this);
  }

  ngOnDestroy(): void {
    this.modal.remove(this.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tipo'] && changes['tipo'].currentValue) {
      switch (this.tipo) {
        case "binomio":
          this.pregunta = "¿Estás seguro que deseas agregar este binomio?";
          this.descripcion = "Este binomio se presentará en las papeletas para la selección del binomio presidencial.";
          break;
        case "organizacion":
          this.pregunta = "¿Estás seguro que deseas agregar esta organización política?";
          this.descripcion = "Esta organización se presentará en las papeletas para la selección de asambleístas nacionales y/o provinciales.";
          break;
        case "consulta":
          this.pregunta = "¿Estás seguro que deseas agregar esta consulta?";
          this.descripcion = "Esta pregunta se presentará en las papeletas para la selección de la consulta popular y referéndum.";
          break;
        case "eliminar":
          this.pregunta = "¿Estás seguro que deseas eliminar este elemento?";
          this.descripcion = "Este elemento no se eliminará completamenete sino que se archivará por si lo desea recuperar luego.";
          break;
        case "modificar":
          this.pregunta = "¿Estás seguro que deseas modificar este elemento?";
          this.descripcion = "Este elemento se modificará y el cambio se verá reflejado en todas las papeletas.";
          break;
      }
    }
  }

  open() {
    this.isVisible = true;
  }

  close() {
    this.confirm.emit(false);
    this.isVisible = false;
  }

  onConfirm() {
    this.confirm.emit(true);
    this.isVisible = false;
  }

}
