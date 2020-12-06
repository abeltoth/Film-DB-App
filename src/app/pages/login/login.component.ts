import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword = true;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private router: Router,
    private matSnackBar: MatSnackBar,
    private spinnerService: SpinnerService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.email.invalid || this.password.invalid) {
      return;
    }

    this.spinnerService.showSpinner();
    this.authenticationService.login(this.email.value, this.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/films']);
        },
        error => {
          this.spinnerService.hideSpinner();
          this.openSnackBar('Error', error);
        });
  }

  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  openSnackBar(message: string, action: string): void {
    this.matSnackBar.open(message, action, {
      duration: 2000,
    });
  }


}
