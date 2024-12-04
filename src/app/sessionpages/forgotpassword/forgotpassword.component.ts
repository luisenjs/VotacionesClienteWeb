import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  forgorpswdForm: FormGroup;
  constructor(private formbuider: FormBuilder, private router: Router) {
    this.forgorpswdForm = this.formbuider.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  onSubmit() {
    const email = this.forgorpswdForm.get('email')?.value;
    console.log(email);
    //Enviar el correo y eso
    this.router.navigate(['/recoverycode'])
  }

  goback() {
    this.router.navigate(['/login'])
  }
}
