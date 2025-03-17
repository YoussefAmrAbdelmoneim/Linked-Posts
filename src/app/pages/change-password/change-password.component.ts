import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent { 
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router); 
  changePasswordForm:FormGroup=new FormGroup({
    password: new FormControl(null,[Validators.required,Validators.minLength(8)]),
    newPassword: new FormControl(null,[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]),
  })
  onSubmit()
  {
    if(this.changePasswordForm.valid)
    {
      this.authService.changePassword(this.changePasswordForm.value).subscribe({
        next:(res) => {
          console.log(res);
          if(res.message ==='success')
          {
                  this.router.navigate(['/login'])
          }
        }
      })
    }
    else{
      this.changePasswordForm.markAllAsTouched();
    }
  }
}
