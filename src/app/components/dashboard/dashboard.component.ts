import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  message = 'You are not logged in';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/user', {withCredentials: true}).subscribe(
      (resp: any) => {
        console.log('resp ', resp);
        if(resp.email) {
          this.message = `Welcome ${resp.name}` 
        }
      },
      (err) => {
        console.log('error ', err);
      }
    );
  }
}
