import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userList: any[] = [];
  loginForm: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder, private router:Router) {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.dataService.getAllData().subscribe((data) => {
      this.userList = data.userMaster;
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    console.log(this.loginForm.value);
    localStorage.setItem('userRole', this.loginForm.value.username);
    this.router.navigate(['/menu']);
  }
}
