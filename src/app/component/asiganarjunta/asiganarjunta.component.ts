import { Component, Input, SimpleChanges } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data/data.service';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-asiganarjunta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './asiganarjunta.component.html',
  styleUrl: './asiganarjunta.component.css'
})
export class AsiganarjuntaComponent {

  @Input() id!: any;
  @Input() element!: any;

  juntasForm: FormGroup;
  juntas: any[] = [];

  isVisible = false;

  constructor(private modal: ModalService, private data: DataService, private fb: FormBuilder, private auth: AuthService) {
    this.juntasForm = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['element'] && this.element) {
      this.loadJuntas();
    }
  }

  ngOnInit(): void {
    this.modal.add(this);
  }

  loadJuntas() {
    this.data.readData<any[]>("https://sistema-electoral-cc1y.onrender.com/api/juntas/recinto/" + this.element.recintoID).subscribe((data) => {
      this.juntas = data;
      console.log(this.juntas);
      this.juntas.forEach(junta => {
        this.juntasForm.addControl(junta.id.toString(), new FormControl(false));
      });
    });
  }

  ngOnDestroy(): void {
    this.modal.remove(this.id);
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }

  asignarJuntas() {
    const selectedJuntas = Object.keys(this.juntasForm.value).filter(key => this.juntasForm.value[key]).map(key => +key);
    console.log(selectedJuntas);
    selectedJuntas.forEach(junta => {
      const currentDetaTime = new Date().toISOString();
      const payload = {
        junta_id: junta,
        usuario_id: this.element.id,
        estado: "Activo",
        fecha_ingreso: currentDetaTime,
        fecha_modificacion: currentDetaTime,
        observacion: "Relación agregada",
        usuario_ingreso: this.auth.getCurrentUser().id,
        usuario_modificacion: this.auth.getCurrentUser().id
      }
      this.data.createData<any>("https://sistema-electoral-cc1y.onrender.com/api/juntas-usuario", payload).subscribe(() => {
        alert("Se asignó la junta correspondiente");
      }, (error) => {
        alert("No se aregó la junta");
      });
    });
    this.juntasForm.reset();
    this.close();
  }
}
