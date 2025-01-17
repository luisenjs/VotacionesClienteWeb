import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enviousuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enviousuario.component.html',
  styleUrl: './enviousuario.component.css'
})
export class EnviousuarioComponent {

  @Input() id!: string;
  isVisible = false;

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

}
