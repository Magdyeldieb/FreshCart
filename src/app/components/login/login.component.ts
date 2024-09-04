import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../core/Services/auth-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  private readonly _AuthServiceService = inject(AuthServiceService)
  private readonly _FormBuilder =inject(FormBuilder)
  private readonly _Router =inject(Router)


msgSuccess:boolean=false
  msgError:string=""
  isLoading:boolean=false
 loginForm:FormGroup= this._FormBuilder.group({

  email:[null, [Validators.required , Validators.email ]],
  password:[null, [ Validators.required , Validators.pattern(/^\w{6,}$/)]],
 }
 )

 loginSubmit():void{

  if(this.loginForm.valid){
    this.isLoading=true;
    this._AuthServiceService.setloginForm(this.loginForm.value).subscribe({
      next:(res)=>{
        this.isLoading=false
        if(res.message == 'success'){
          this.msgSuccess=true;
          setTimeout(()=>{
            
            localStorage.setItem('userToken', res.token)

            this._AuthServiceService.saveUserData
            
            this._Router.navigate(['/home']),1000})
          
        }
      
      },
      

      error:(err:HttpErrorResponse)=>{
        this.msgError = err.error.message;
        this.isLoading=false;
      }
      
    })
  }
 
    else
    {
      this.loginForm.setErrors({mismatch:true}),
      this.loginForm.markAllAsTouched()
    }
  }
 





}
