import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from 'src/models/user';
import { ScheduledAppointment } from 'src/models/scheduledAppointment';
import { ExaminationService } from '../examination.service';

@Component({
  selector: 'app-doctor-other',
  templateUrl: './doctor-other.component.html',
  styleUrls: ['./doctor-other.component.css']
})
export class DoctorOtherComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, private examinationService: ExaminationService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    if(!this.loggedUser || this.loggedUser.tip != 'lekar'){
      localStorage.clear()
      this.router.navigate(['/'])
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  navigate(){
    if(this.selectedPage == "Profil"){
      this.router.navigate(['doctor'])
    } else if(this.selectedPage == "Pregledi"){
      this.router.navigate(['doctorAppointments'])
    } else if(this.selectedPage == "Razno"){
      this.router.navigate(['doctorOther'])
    }
  }

  onSelectChange(event: any) {
    this.navigate();
  }
  
  getScheduledAppointments(){
    this.examinationService.getScheduledAppointments().subscribe((SAs: ScheduledAppointment[]) => {
      for(let sa of SAs){
        if(this.loggedUser.korisnicko_ime == sa.lekar){
          this.scheduledAppointments.push(sa);
        }
      }
    })
  }

  requestVacation(){
    let scheduled = false;
    for(let sa of this.scheduledAppointments){
      if(sa.datum == this.date){
        scheduled = true;
        alert("Vec imate zakazane preglede za izabrani datum")
        break;
      }
    }
    if(!scheduled){
      this.examinationService.scheduleAppointment(null, "Slobodan dan", "840", this.date, "07:00", null, this.loggedUser.korisnicko_ime, this.loggedUser.ime, this.loggedUser.prezime).subscribe(()=>{
        alert("Uspesno uzet slobodan dan, dana: " + this.date)
      })
    }
  }

  navigateToRequest(){
    this.router.navigate(['/doctor-other-request-examination'])
  }

  scheduledAppointments: ScheduledAppointment[] = [];

  date: string = "";

  loggedUser: User;
  selectedPage: string = "Razno";
}
