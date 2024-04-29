import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import {HttpClient} from "@angular/common/http";
import {Etab} from "../../models/etabModel/etab";// Import jQuery as a module
import { Router } from '@angular/router';
import {Professeur} from "../../models/ProfModel/professeur";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Etablissement } from 'src/app/models/ProfModel/etablissement';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Declare variables
  loginprof: any;
  loginAdmin: any;
  userForms: any;
  etab: Etab = new Etab();
  prof:Professeur = new Professeur();
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router,private snackBar:MatSnackBar) { }
  ngOnInit(): void {
    this.loginprof = jQuery('#signup-button');
    this.loginAdmin = jQuery('#login-button');
    this.userForms = jQuery('#user_options-forms');

    this.loginprof.on('click', () => {
      this.userForms.removeClass('bounceRight').addClass('bounceLeft');
      if (!jQuery('.user_forms-login').is(':visible')) {
        setTimeout(() => {
          jQuery('.user_forms-login').show();
        }, 1000);
      }
    });

    this.loginAdmin.on('click', () => {
      this.userForms.removeClass('bounceLeft').addClass('bounceRight');
      if (!jQuery('.user_forms-signup').is(':visible')) {
        setTimeout(() => {
          jQuery('.user_forms-signup').show();
        }, 1000);
      }
    });
  }

  onSubmitAdmin(): void {
    this.http.post<any>('http://localhost:2222/ETABLISSEMENT-SERVICE/etablissements/login', {
      adminUsername: this.etab.adminUsername,
      adminPassword: this.etab.adminPassword
    }).subscribe(
      (response) => {
        this.etab=response;
        console.log('Response:', response.message); // Log the response
        if (this.etab === null) {
          this.errorMessage = response;
          this.etab=new Etab();
          this.snackBar.open('Email or Password incorect', 'Close', {
            duration: 3000,
          });
        } else {
          this.router.navigate(['/dashboard']); // Redirect to dashboard for admin
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


  //for prof
  onSubmitProf(): void {
    this.http.post<any>('http://localhost:2222/PROFESSEUR-SERVICE/professeurs/login', {
      email: this.prof.email,
      password: this.prof.password
    }).subscribe(
      (response) => {
        // console.log(this.prof.email);
        // console.log(this.prof.password);
        this.prof=response
        console.log('Response:', response); // Log the response
        if (this.prof=== null) {
          this.errorMessage = response;
          this.prof=new Professeur();
          this.snackBar.open('Email or Password incorect', 'Close', {
            duration: 3000,
          });
        } else {
          this.router.navigate(['/profile/'+this.prof.id]);
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
