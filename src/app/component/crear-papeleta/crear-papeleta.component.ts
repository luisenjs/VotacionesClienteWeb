import { Component, Input, SimpleChanges } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data/data.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-crear-papeleta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, ConfirmationComponent],
  templateUrl: './crear-papeleta.component.html',
  styleUrl: './crear-papeleta.component.css'
})
export class CrearPapeletaComponent {

  @Input() id!: string;
  @Input() tipo!: string;

  isVisible = false;

  papeletaform: FormGroup;

  papeleta = "";

  nombreelementos = "";

  elementos: any = [];

  pendingElement: any = null;

  constructor(private modal: ModalService, private fb: FormBuilder, private data: DataService) {
    this.papeletaform = this.fb.group({
      elemento1: ['', Validators.required],
      selectors: this.fb.array([])
    })
  }

  get selectors() {
    return this.papeletaform.get('selectors') as FormArray;
  }

  loadElementos() {
    this.data.getElementos(this.tipo).subscribe(element => {
      this.elementos = element;
      switch (this.tipo) {
        case "binomio":
          this.papeleta = "Creación de papeleta sobre binomio presidencial"
          this.nombreelementos = "Candidatos";
          break;
        case "organizacion":
          this.papeleta = "Creación de papeleta sobre organizaciones públicas";
          this.nombreelementos = "Organizaciones";

          break;
        case "consulta":
          this.papeleta = "Creación de papeleta sobre consultas";
          this.nombreelementos = "Consultas";
          break;
      }
      this.initArray();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tipo'] && changes['tipo'].currentValue) {
      this.loadElementos();
    }
  }

  ngOnInit(): void {
    this.modal.add(this);
    this.loadElementos();
  }

  ngOnDestroy(): void {
    this.modal.remove(this.id);
  }

  open() {
    this.isVisible = true;
    this.initArray();
  }

  close() {
    this.isVisible = false;
    this.papeletaform.reset();
    this.selectors.clear();
  }

  initArray() {
    this.selectors.clear();
    if (this.tipo === 'binomio') {
      for (let i = 0; i < this.elementos.length; i++) {
        const selector = this.fb.group({
          option: [this.elementos[i].candidato, Validators.required]
        });
        this.selectors.push(selector);
      }
    } else {
      this.addSelector();
      this.addSelector();
    }
  }

  addSelector() {
    const selector = this.fb.group({
      option: ['', Validators.required]
    });
    this.selectors.push(selector);
  }

  removeSelector(index: number) {
    if (this.selectors.length > 2) {
      this.selectors.removeAt(index);
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.papeletaform.valid) {
      this.pendingElement = this.papeletaform.value;
      this.modal.open("agregar");
    }
  }

  confirmation(confirmacion: boolean) {
    if (confirmacion) {
      console.log('Nuevo elemento:', this.pendingElement);
      this.close();
    }
    this.papeletaform.reset();
    this.selectors.clear();
    this.initArray();
    this.pendingElement = null;
  }

}
