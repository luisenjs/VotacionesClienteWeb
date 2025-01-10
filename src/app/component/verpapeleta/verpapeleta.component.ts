import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-verpapeleta',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './verpapeleta.component.html',
  styleUrl: './verpapeleta.component.css'
})
export class VerpapeletaComponent {

  isVisible = false;

  @Input() id!: string;
  @Input() element!: any;

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

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

}
