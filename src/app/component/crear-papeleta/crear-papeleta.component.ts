import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data/data.service';
import { Lista } from '../../interface/data';

@Component({
  selector: 'app-crear-papeleta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './crear-papeleta.component.html',
  styleUrl: './crear-papeleta.component.css'
})
export class CrearPapeletaComponent {

  @Input() id!: string;
  @Input() tipo!: string;

  isVisible = false;

  papeletaform: FormGroup;
  listas: Lista[] = [];
  selectors: { id: string | null }[] = [{ id: null }];

  constructor(private modal: ModalService, private fb: FormBuilder, private data: DataService) {
    this.papeletaform = this.fb.group({
      elemento1: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.modal.add(this);

    this.data.getData<Lista[]>('assets/data/binomio.json').subscribe((data) => {
      this.listas = data;
    });

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

  addSelector(): void {
    this.selectors.push({ id: null });
  }

  removeSelector(index: number): void {
    this.selectors.splice(index, 1);
  }

  getFilteredOptions(selectedIndex: number): any[] {
    const selectedIds = this.selectors
      .map((selector) => selector.id)
      .filter((id) => id !== null);

    return this.listas.filter(
      (option) =>
        !selectedIds.includes(option.id) || 
        this.selectors[selectedIndex].id === option.id
    );
  }

  onSubmit(event: Event) {
    event.preventDefault();
  }

}
