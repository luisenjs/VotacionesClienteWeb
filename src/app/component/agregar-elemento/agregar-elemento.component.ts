import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-agregar-elemento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agregar-elemento.component.html',
  styleUrl: './agregar-elemento.component.css'
})
export class AgregarElementoComponent {
  isVisible = false;
  constructor(private modal: ModalService) { }
  ngOnInit(): void {
    this.modal.modalVisible$.subscribe(visible => {
      this.isVisible = visible;
    })
  }
  close() {
    this.modal.closeModal();
  }
}
