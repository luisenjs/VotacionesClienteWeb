import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup
  constructor(private formbuilder: FormBuilder, private route: Router, private auth: AuthService) {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(isAdmin => {
        console.log(this.loginForm.value.username + " " + this.loginForm.value.password)
        if(isAdmin){
          this.route.navigate(['/controlelectoral']);
        }else{
          alert("Acceso denegado. Solo los administradores pueden iniciar sesión.");
          this.loginForm.reset();
        }
      })
    }
  }

  forgotPassword(event: Event) {
    event.preventDefault();
    this.route.navigate(['/forgotpassword']);
  }

  gotoSignup(event: Event){
    event.preventDefault();
    this.route.navigate(['/signup']);
  }

}
