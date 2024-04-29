import { CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, LoginComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  loggedIn: boolean = false;
  showLoginModal: boolean = false;
  email: string = '';
  password: string = '';

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef = this.dialog.open(LoginComponent, {
      data: {logged:false},
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {this.loggedIn = result.logged})
  }

  constructor(private router: Router, public dialog: MatDialog) {}
  ngOnInit(): void {
  }

  openRegistration(type: string) {
    this.router.navigate(['inscription-'+type]);
  }

}