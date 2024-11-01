import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { PoliciesComponent } from '../policies/policies.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,PoliciesComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  signupForm: FormGroup;
  provincias = [
    {
      nombre: 'Provincia 1',
      cantones: [
        {
          nombre: 'Cantón 1-1',
          ciudades: [
            {
              nombre: 'Ciudad 1-1-1',
              recintos: ['Recinto A', 'Recinto B']
            },
            {
              nombre: 'Ciudad 1-1-2',
              recintos: ['Recinto C', 'Recinto D']
            }
          ]
        },
        {
          nombre: 'Cantón 1-2',
          ciudades: [
            {
              nombre: 'Ciudad 1-2-1',
              recintos: ['Recinto E', 'Recinto F']
            }
          ]
        }
      ]
    },
    {
      nombre: 'Provincia 2',
      cantones: [
        {
          nombre: 'Cantón 2-1',
          ciudades: [
            {
              nombre: 'Ciudad 2-1-1',
              recintos: ['Recinto G', 'Recinto H']
            }
          ]
        }
      ]
    }
  ];
  cantones: any[] = [];
  ciudades: any[] = [];
  recintos: string[] = [];
  constructor(private formBuilder: FormBuilder, private route: Router, private modal: ModalService) {
    this.signupForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      fullname: ['', Validators.required],
      gender: ['', Validators.required],
      provincia: ['', Validators.required],
      canton: ['', Validators.required],
      ciudad: ['', Validators.required],
      recinto: ['', Validators.required],
      telephone1: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      telephone2: ['', Validators.pattern(/^\d{10}$/)],
      acceptTerms: [false, Validators.requiredTrue]
    });

    this.signupForm.get('provincia')?.valueChanges.subscribe(value => {
      this.cantones = this.provincias.find(p => p.nombre === value)?.cantones || [];
      this.signupForm.get('canton')?.setValue('');
      this.ciudades = [];
      this.recintos = [];
    });

    this.signupForm.get('canton')?.valueChanges.subscribe(value => {
      this.ciudades = this.cantones.find(c => c.nombre === value)?.ciudades || [];
      this.signupForm.get('ciudad')?.setValue('');
      this.recintos = [];
    });

    this.signupForm.get('ciudad')?.valueChanges.subscribe(value => {
      this.recintos = this.ciudades.find(c => c.nombre === value)?.recintos || [];
      this.signupForm.get('recinto')?.setValue('');
    });
  }

  onSubmit() {
    //Se envía el formulario, si no hay problema:
    alert("Se presenta una ventana modal indicando que se envió la solicitud")
    //Si no, otra ventana modal indicando el problema.
    this.signupForm.reset();
    this.route.navigate(['/'])
  }

  showPolices(event: Event) {
    event.preventDefault();
    this.modal.openModal();
  }
}
