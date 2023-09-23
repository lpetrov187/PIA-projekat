import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.loginService.login(this.username, this.password).subscribe((userFromDB: User)=>{
      if(userFromDB == null) this.message = "Nepostojeci korisnik"
      else {
        if(userFromDB.tip == "menadzer"){
          this.router.navigate(['manager']);
        }
        localStorage.setItem('user', JSON.stringify(userFromDB))
      }
    })
  }

  username: string;
  password: string;
  message: string;
}
