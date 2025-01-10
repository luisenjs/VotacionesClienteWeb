import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { VerpapeletaComponent } from "../verpapeleta/verpapeleta.component";

@Component({
  selector: 'app-papeleta',
  standalone: true,
  imports: [ConfirmationComponent, VerpapeletaComponent],
  templateUrl: './papeleta.component.html',
  styleUrl: './papeleta.component.css'
})
export class PapeletaComponent {

  @Input() elemento!: any;

  constructor(private modal: ModalService) { }

  verPapeleta(event: Event): void {
    event.preventDefault();
    console.log(this.elemento);
    this.modal.open("ver");
  }

  archivarPapeleta(event: Event): void {
    event.preventDefault();
    this.modal.open("archivar");
  }

  confirmarArchivado(confirmacion: boolean) {
    if (confirmacion) {
      console.log("Papeleta archivada");
    }
  }

}
