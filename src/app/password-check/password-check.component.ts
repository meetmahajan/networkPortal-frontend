import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-password-check',
  templateUrl: './password-check.component.html',
  styleUrls: ['./password-check.component.css']
})
export class PasswordCheckComponent implements OnInit {

  passwordForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }
  get f() { return this.passwordForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.passwordForm.invalid) {
      return;
    }

    this.loading = true;
    console.log('Data');
    this.authenticationService.passwordValidate(JSON.parse(localStorage.accessToken), this.f.password.value)
      .subscribe(
        (data: any) => {
          this.toastr.success('Welcome', data.firstName);
          // localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
          console.log(data);
          this.router.navigate(['/']);
          localStorage.clear();
        },
        error => {
          console.log(JSON.parse(localStorage.accessToken));
          this.loading = false;
          this.toastr.error('Please enter valid password');
        });
  }
}
