import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../core/Services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {

  step:number=1;
  private readonly _FormBuilder =inject(FormBuilder)
  private readonly _AuthServiceService = inject(AuthServiceService)
  private readonly _Router= inject(Router)
VerifyEmail:FormGroup= this._FormBuilder.group({

  email:[null, [Validators.required , Validators.email ]],})

  VerifyCode:FormGroup= this._FormBuilder.group({

    resetCode:[null, [Validators.required , Validators.pattern(/^\w{6}$/) ]],})

    resetpassword:FormGroup= this._FormBuilder.group({

      email:[null, [Validators.required , Validators.email ]],
      newPassword:[null, [ Validators.required , Validators.pattern(/^\w{6,}$/)]],
    })

    EmailSubmit():void {
let emailValue = this.VerifyEmail.get('email')?.value

this.resetpassword.get('email')?.patchValue(emailValue)

    this._AuthServiceService.setEmailApi(this.VerifyEmail.value).subscribe({
      next:(res)=>{
if (res.statusMsg==='success') {
  this.step = 2;
  console.log(res);
  
}
      },
      error:(err)=>{

      }
    })
    }


    CodeSubmit():void {
      this._AuthServiceService.setCodeApi(this.VerifyCode.value).subscribe({
        next:(res)=>{
  if (res.status==='Success') {
    this.step = 3;
  }
        },
        error:(err)=>{
  
        }
      })
      }



      ResetSubmit():void {
        this._AuthServiceService.setResetPassApi(this.resetpassword.value).subscribe({
          next:(res)=>{
   localStorage.setItem('userToken', res.token)
this._AuthServiceService.saveUserData()
   this._Router.navigate(['/home'])
          },
          error:(err)=>{
    
          }
        })
        }



}
