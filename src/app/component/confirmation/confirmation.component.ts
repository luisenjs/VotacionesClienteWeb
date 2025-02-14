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
        case "dignidad":
          this.pregunta = "¿Estás seguro que deseas agregar esta dignidad?";
          this.descripcion = "Esta dignidad se presentará en las papeletas corespondientes posteriormente.";
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
        case "papeleta":
          this.pregunta = "¿Estás seguro que desea agregar esta papeleta al la base de datos?";
          this.descripcion = "Esta papeleta se agregará, revise si todo está en orden antes de proceder";
          break;
        case "agregar":
          this.pregunta = "¿Estás seguro que deseas agregar a este usuario al sistema?";
          this.descripcion = "Este usuario se agregará a la base de datos y podrá acceder al sistema.";
          break;
        case "rechazar":
          this.pregunta = "¿Estás seguro que deseas rechazar esta inscripción?";
          this.descripcion = "Esta inscripción será rechazada y no podrá ser recuperada.";
          break;
        case "inhabilitar":
          this.pregunta = "¿Estás seguro que deseas inhabilitar a este usuario?";
          this.descripcion = "Este usuario no podrá acceder al sistema hasta que se habilite nuevamente.";
          break;
        case "habilitar":
          this.pregunta = "¿Estás seguro que deseas habilitar a este usuario?";
          this.descripcion = "Este usuario podrá acceder al sistema nuevamente.";
          break;
        case "archivarPapeleta":
          this.pregunta = "¿Estás seguro que deseas archivar esta papeleta?";
          this.descripcion = "Esta papeleta se archivará y no se presentará para las elecciones.";
          break;
        case "archivarElemento":
          this.pregunta = "¿Estás seguro que deseas archivar este elemento?";
          this.descripcion = "Este elemento se archivará y no se presentará para las elecciones.";
          break;
        case "provincias":
          this.pregunta = "Estás a punto de modificar el nombre de una provincia";
          this.descripcion = "El cambio se realizará inmediatamente, puedes volerlo a cambiar en cualquier momento";
          break;
        case "circunscripciones":
          this.pregunta = "Estás a punto de modificar el nombre de una circunscripción";
          this.descripcion = "El cambio se realizará inmediatamente, puedes volerlo a cambiar en cualquier momento";
          break;
        case "cantones":
          this.pregunta = "Estás a punto de modificar el nombre de un cantón";
          this.descripcion = "El cambio se realizará inmediatamente, puedes volerlo a cambiar en cualquier momento";
          break;
        case "parroquias":
          this.pregunta = "Estás a punto de modificar el nombre de una parroquia";
          this.descripcion = "El cambio se realizará inmediatamente, puedes volerlo a cambiar en cualquier momento";
          break;
        case "recintos-electorales":
          this.pregunta = "Estás a punto de modificar el nombre de una recinto";
          this.descripcion = "El cambio se realizará inmediatamente, puedes volerlo a cambiar en cualquier momento";
          break;
        case "juntas":
          this.pregunta = "Estás a punto de modificar el nombre de una junta";
          this.descripcion = "El cambio se realizará inmediatamente, puedes volerlo a cambiar en cualquier momento";
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
