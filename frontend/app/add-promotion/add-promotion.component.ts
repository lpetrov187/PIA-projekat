import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExaminationService } from '../examination.service';
import { User } from 'src/models/user';
import { LoginService } from '../login.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent implements OnInit {

  constructor(private router: Router, private examinationService: ExaminationService, private loginService: LoginService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    if(!this.loggedUser || this.loggedUser.tip != 'menadzer'){
      localStorage.clear()
      this.router.navigate(['/'])
    }
    this.getAllUsers();
  }

  addPromotion(){
    for(let u of this.users){
      this.notificationService.addNotification(u.korisnicko_ime, this.text, null, null).subscribe(()=>{
        this.router.navigate(['manager'])
      })
    }
  }

  getAllUsers(){
    this.loginService.getAllUsers().subscribe((usersFDB: User[]) => {
      let m = this.users.length;

      for(let i = 0; i < m; i++){
        this.users.pop()
      }

      for(let u of usersFDB){
        if(u.tip == 'pacijent'){
          this.users.push(u);
        }
      }
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  back(){
    this.router.navigate(['/manager']);
  }

  users: User[] = [];
  text: string;
  loggedUser: User;
}
