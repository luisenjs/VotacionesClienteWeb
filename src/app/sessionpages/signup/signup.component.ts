import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal/modal.service';
import { PoliciesComponent } from '../../component/policies/policies.component';
import { cedulaValidator } from '../../shared/cedula.validator';
import { DataService } from '../../services/data/data.service';
import { EnviousuarioComponent } from '../../component/enviousuario/enviousuario.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PoliciesComponent, EnviousuarioComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {

  signupForm: FormGroup;
  provincias: any[] = [];
  cantones: any[] = [];
  parroquias: any[] = [];
  recintos: any[] = [];

  selectedProvinciaId: number | null = null;

  constructor(private formBuilder: FormBuilder, private route: Router, private modal: ModalService, private data: DataService) {
    this.signupForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/^\d{10}$/), cedulaValidator]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      gender: ['', Validators.required],
      direccion: ['', Validators.required],
      provincia: ['', Validators.required],
      canton: ['', Validators.required],
      parroquia: ['', Validators.required],
      recinto: ['', Validators.required],
      telephone1: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      telephone2: ['', Validators.pattern(/^\d{10}$/)],
      correo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
    this.data.readData<any[]>("https://api-observacion-electoral.frative.com/api/provincias").subscribe(data => {
      this.provincias = data;
    });
    this.data.readData<any[]>("https://api-observacion-electoral.frative.com/api/cantones").subscribe(data => {
      this.cantones = data;
    });
    this.data.readData<any[]>("https://api-observacion-electoral.frative.com/api/parroquias").subscribe(data => {
      this.parroquias = data;
    });
    this.data.readData<any[]>("https://api-observacion-electoral.frative.com/api/recintos-electorales").subscribe(data => {
      this.recintos = data;
    });
  }

  /*onProvinciaChange(event: any): void {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      const provinciaId = Number(target.value);
      this.selectedProvinciaId = provinciaId;
      this.data.readData<any[]>(`https://api-observacion-electoral.frative.com/api/cantones/provincia/${provinciaId}`).subscribe(data => {
        this.cantones = data;
      });
    }
  }*/

  onSubmit() {
    if (this.signupForm.valid) {
      const currentDateTime = new Date().toISOString();
      const data = {

        identificacion: this.signupForm.value.id,
        rol_id: 4,
        nombres: this.signupForm.value.nombres,
        apellidos: this.signupForm.value.apellidos,
        partido_id: 1,
        genero: this.signupForm.value.gender,
        direccion: this.signupForm.value.direccion,
        telefono: this.signupForm.value.telephone1,
        telefono_aux: this.signupForm.value.telephone2,
        correo_electronico: this.signupForm.value.correo,
        canton_id: Number(this.signupForm.value.canton),
        parroquia_id: Number(this.signupForm.value.parroquia),
        recinto_id: Number(this.signupForm.value.recinto),
        estado: "Activo",
        fecha_ingreso: currentDateTime,
        fecha_modificacion: currentDateTime,
        observacion: "Inscripción",
        usuario_ingreso: 1,
        usuario_modificacion: 1
      }
      console.log(data);
      this.data.createData<any>("https://api-observacion-electoral.frative.com/api/usuarios", data).subscribe(() => {
        const email = {
          to: this.signupForm.value.correo,
          subject: "Gracias por postularte",
          html: "<html><body><h1>¡Gracias por postularte al sistema de control electoral!</h1><p>Este correo es para indicale que su solicitud fue aplicada, mantente a tanto a este correo para futuras actualizaciones.<br>Cuando te hayan aceptado o rechazado te lo haremos saber.</p><footer><p>Saludos,<br>Votaciones 2025</br></p></footer></body></html>"
        }
        this.data.sendEmail<any>("https://sistema-electoral-cc1y.onrender.com/api/enviar-correo", email).subscribe(() => {}, (error) => console.log(error))
        this.signupForm.reset();
        this.modal.open("inscripción");
      });
    }
  }

  showPolices(event: Event) {
    event.preventDefault();
    this.modal.open("polices");
  }

  gotoLogin(event: Event){
    event.preventDefault();
    this.route.navigate(['/login']);
  }

}
