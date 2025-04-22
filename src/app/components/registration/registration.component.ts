import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      agreeTerms: [false, Validators.required]
    });
  }


  submit() {
    console.log(this.form.getRawValue());
    // console.log(this.form.get());
    if(this.form.get('agreeTerms')?.value == false) {
      // alert('agree the terms');
      // return;
      throw Error('agree the terms')
    }

    if(this.form.get('password')?.value !== this.form.get('confirmPassword')?.value) {
      // alert("passwords don't match");
      throw Error("passwords don't match")
      // return;
    }

    const registerData = {
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };

    this.http.post("http://localhost:3000/api/register", registerData).subscribe(res => {
      console.log(res);
    });
  }


  navigateToSignin(): void {
    this.router.navigateByUrl("/login");
  }
}
