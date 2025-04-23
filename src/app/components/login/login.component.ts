import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss'
  ]
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  submitLogin() {
    //
    this.http
      .post('http://localhost:3000/api/login', this.form.getRawValue())
      .subscribe((resp: any) => {
        console.log('login resp ', resp.message);
        localStorage.setItem('at', resp.token);
        this.router.navigate(['/dashboard']);
      });
    // this.router.navigateByUrl('/dashboard');
  }
}
