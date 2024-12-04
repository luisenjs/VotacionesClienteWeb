import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup
  constructor(private formbuilder: FormBuilder, private route: Router) {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(12)]]
    });
  }

  onSubmit() {
    this.loginForm.reset();
    this.route.navigate(['/controlelectoral'])
  }

  forgotPassword(event: Event) {
    event.preventDefault();
    this.route.navigate(['/forgotpassword'])
  }
}
