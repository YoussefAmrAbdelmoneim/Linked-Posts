import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
@Component({
  selector: 'app-register',
  imports: [RouterLink ,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 private readonly authService=inject(AuthService);
 private readonly router=inject(Router);
 signUp:FormGroup =new FormGroup(
  {name:new FormControl(null,[Validators.required,Validators.minLength(3)]),
  email :new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]),
  rePassword: new FormControl(null, [
    Validators.required
  ]), 
  dateOfBirth: new FormControl(null, [
        Validators.required
      ]),
      gender: new FormControl(null, [
        Validators.required])
    }, { validators: this.passwordMatchValidator })
 
    passwordMatchValidator(form:AbstractControl)
    {
      const password = form.get('password')?.value;
      const rePassword = form.get('rePassword')?.value;
      return password === rePassword ? null : { mismatch: true };
    }
    onSubmit() {
      if (this.signUp.valid) { 
       this.authService.signUp(this.signUp.value).subscribe({
        next:(res) => {     
          this.router.navigate(['/login'])          
        }
       })
      }
       else {
        this.signUp.setErrors({mismatch:true}); 
        this.signUp.markAllAsTouched();
      }
    }
}

