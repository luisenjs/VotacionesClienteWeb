import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css'
})
export class ChangepasswordComponent {
  newpasswordForm : FormGroup;
  constructor(private formbuider: FormBuilder, private router: Router){
    this.newpasswordForm = this.formbuider.group({
      newpassword: ['', [Validators.required, Validators.minLength(12)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(12)]]
    })
  }

  onSubmit(){
    const newpassword = this.newpasswordForm.get("newpassword")?.value;
    const confirmpassword = this.newpasswordForm.get("confirmpassword")?.value
    if (newpassword === confirmpassword){
      //cambio en la bd y eso
      alert("Contraseña actualizada")
      this.router.navigate(["/login"])
    }else{
      alert("Las contraseñas no coinciden")
      this.newpasswordForm.reset();
    }
  }

  goback(){
    this.router.navigate(['/recoverycode'])
  }
}
