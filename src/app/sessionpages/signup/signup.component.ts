import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal/modal.service';
import { PoliciesComponent } from '../../component/policies/policies.component';
import { Provincia, Canton, Ciudad } from '../../interface/location';
import { cedulaValidator } from '../../shared/cedula.validator';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PoliciesComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {

  signupForm: FormGroup;
  provincias: any[] = [];
  cantones: any[] = [];
  parroquias: any[] = [];
  recintos: any[] = [];

  constructor(private formBuilder: FormBuilder, private route: Router, private modal: ModalService, private data: DataService) {
    this.signupForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/^\d{10}$/), cedulaValidator]],
      fullname: ['', Validators.required],
      gender: ['', Validators.required],
      provincia: ['', Validators.required],
      canton: ['', Validators.required],
      parroquia: ['', Validators.required],
      recinto: ['', Validators.required],
      telephone1: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      telephone2: ['', Validators.pattern(/^\d{10}$/)],
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
  }

  onSubmit() {
    //Se envía el formulario, si no hay problema:
    alert("Se presenta una ventana modal indicando que se envió la solicitud")
    //Si no, otra ventana modal indicando el problema.
    console.log(this.signupForm.value)
    this.signupForm.reset();
    //this.route.navigate(['/'])
  }

  showPolices(event: Event) {
    event.preventDefault();
    this.modal.open("polices");
  }
}
