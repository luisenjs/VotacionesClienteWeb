import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validator, ReactiveFormsModule, Form, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recoverycode',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recoverycode.component.html',
  styleUrl: './recoverycode.component.css'
})
export class RecoverycodeComponent {
  recoverycodeForm : FormGroup;
  constructor(private formbuider: FormBuilder, private router: Router){
    this.recoverycodeForm = this.formbuider.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    })
  }

  onSubmit(){
    const code = this.recoverycodeForm.get("code")?.value;
    //lógica de verificación
    this.router.navigate(['/changepassword'])
  }

  goback(){
    this.router.navigate(['/forgotpassword'])
  }
}
