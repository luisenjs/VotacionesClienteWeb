import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.css'
})
export class PoliciesComponent implements OnInit{
  isVisible = false;
  constructor(private modal: ModalService){}
  ngOnInit(): void {
      this.modal.modalVisible$.subscribe(visible=>{
        this.isVisible = visible;
      })
  }

  close(){
    this.modal.closeModal();
  }
}
