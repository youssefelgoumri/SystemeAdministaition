import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formGroup!:FormGroup;
  error!:string;

  UsernameAD="admin";
  PasswordAD="admin";
  constructor(private fb:FormBuilder,private router:Router,private snak:MatSnackBar) {}
  // constructor(private router:Router){}
  ngOnInit(): void {
    this.formGroup=this.fb.group({
      username:this.fb.control(null),
      password:this.fb.control(null)
    })
  }

  submit() {
    console.log(this.formGroup.value)
    let username=this.formGroup.value.username;
    let password=this.formGroup.value.password;
    if(username==this.UsernameAD && password==this.PasswordAD){
    this.router.navigate(['/dashboard']);
    }
    else{
      this.snak.open('Password or Email incorrect', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
    }
  }
}
