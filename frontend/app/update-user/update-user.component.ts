import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.userForUpdate = JSON.parse(localStorage.getItem('userForUpdate'))
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    if(!this.loggedUser || this.loggedUser.tip != 'menadzer'){
      localStorage.clear()
      this.router.navigate(['/'])
    }
  }

  updateUser(){
    if(this.userForUpdate.tip == "pacijent"){
      this.loginService.updateUser(this.userForUpdate).subscribe(() => {
        this.router.navigate(['manager'])
      })
    } else {
      this.loginService.updateDoctorManager(this.userForUpdate).subscribe(() => {
        this.router.navigate(['manager'])
      })
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  back(){
    this.router.navigate(['/manager']);
  }

  loggedUser: User;
  userForUpdate: User;
}
