import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
private readonly authService=inject(AuthService);
 private readonly router=inject(Router);
loginForm:FormGroup = new FormGroup({
  email: new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)])
})

onSubmit()
{
  if(this.loginForm.valid)
  {
  this.authService.signIn(this.loginForm.value).subscribe({
   next:(res) => { 
    localStorage.setItem('token',res.token);
     this.router.navigate(['/home'])
   }
  })
}
else{
  this.loginForm.markAllAsTouched();
}
}
} 
