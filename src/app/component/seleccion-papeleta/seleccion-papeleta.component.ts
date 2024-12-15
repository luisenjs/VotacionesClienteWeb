import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seleccion-papeleta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seleccion-papeleta.component.html',
  styleUrl: './seleccion-papeleta.component.css'
})
export class SeleccionPapeletaComponent {

  isVisible = false;

  @Input() id!: string;
  @Output() tipo = new EventEmitter<string>();

  constructor(private modal: ModalService) { }

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

  setBinomio() {
    this.tipo.emit("binomio");
    this.close();
  }

  setOrganizacion() {
    this.tipo.emit("organizacion");
    this.close();
  }

  setConsulta() {
    this.tipo.emit("consulta");
    this.close();
  }

}
