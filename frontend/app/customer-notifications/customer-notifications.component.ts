import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { NotificationService } from '../notification.service';
import { Notification } from 'src/models/notification';

@Component({
  selector: 'app-customer-notifications',
  templateUrl: './customer-notifications.component.html',
  styleUrls: ['./customer-notifications.component.css']
})
export class CustomerNotificationsComponent implements OnInit {

  constructor(private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    if(!this.loggedUser || this.loggedUser.tip != 'pacijent'){
      localStorage.clear()
      this.router.navigate(['/'])
    }
    this.getAllNotifications()
  }

  navigate(){
    if(this.selectedPage == "Profil"){
      this.router.navigate(['customer'])
    } else if(this.selectedPage == "Lekari"){
      this.router.navigate(['customerDoctors'])
    } else if(this.selectedPage == "Pregledi"){
      this.router.navigate(['customerAppointments'])
    } else if(this.selectedPage == "Obavestenja"){
      this.router.navigate(['customerNotifications'])
    }
  }

  onSelectChange(event: any) {
    this.navigate();
  }

  getAllNotifications(){
    this.notificationService.getAllNotifications().subscribe((notifs: Notification[]) => {
      let m = this.myNotifications.length;

      for(let i = 0; i < m; i++){
        this.myNotifications.pop()
      }

      let date = new Date()
      let dateStr = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0')
      let timeStr = String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0');

      for(let n of notifs){
        if(n.pacijent == this.loggedUser.korisnicko_ime){
          if((dateStr == n.datum && timeStr >= n.vreme) || dateStr > n.datum){
            this.myNotifications.push(n);
          } else if(n.datum == null){
            this.myNotifications.push(n);
          }
        }
      }
    })
  }
  
  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  markAllAsRead(){
    for(let n of this.myNotifications){
      this.notificationService.markAsRead(this.loggedUser.korisnicko_ime, n.tekst).subscribe(()=>{
        window.location.reload()})
    }
  }

  myNotifications: Notification[] = []
  selectedPage: string = "Obavestenja";
  loggedUser: User;
}
