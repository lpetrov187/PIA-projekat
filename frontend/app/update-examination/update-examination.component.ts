import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExaminationService } from '../examination.service';
import { Examination } from 'src/models/examination';
import { ScheduledAppointment } from 'src/models/scheduledAppointment';
import { NotificationService } from '../notification.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-update-examination',
  templateUrl: './update-examination.component.html',
  styleUrls: ['./update-examination.component.css']
})
export class UpdateExaminationComponent implements OnInit {

  constructor(private router: Router, private examinationService: ExaminationService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    if(!this.loggedUser || this.loggedUser.tip != 'menadzer'){
      localStorage.clear()
      this.router.navigate(['/'])
    }

    this.selectedExamination = JSON.parse(localStorage.getItem('selectedExamination'))
    this.examinationService.getScheduledAppointments().subscribe((SAs: ScheduledAppointment[])=>{
      this.scheduledAppointments = SAs;
    })
  }

  updateExamination(){
    if(this.length == ""){
      this.length = this.selectedExamination.trajanje
    }
    if(this.price == ""){
      this.price = this.selectedExamination.cena
    }
    this.examinationService.updateExamination(this.selectedExamination, this.price, this.length).subscribe(() => {
      for(let sa of this.scheduledAppointments){
        if(sa.pregled == this.selectedExamination.naziv){
          if(!this.usersForNotification.includes(sa.pacijent)){
            this.usersForNotification.push(sa.pacijent)
          }
          this.examinationService.updateAppointment(sa.pregled, this.length).subscribe(()=>{
          })
        }
      }

      for(let p of this.usersForNotification){
        let notifText = "Cena pregleda " + this.selectedExamination.naziv + " je promenjena na " + this.price;
        this.notificationService.addNotification(p, notifText, null, null).subscribe(()=>{})
      }
      this.router.navigate(['/manager'])
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  back(){
    this.router.navigate(['/manager']);
  }

  scheduledAppointments: ScheduledAppointment[];

  selectedExamination: Examination;

  usersForNotification: string[] = [];

  length: string = "";
  price: string = "";

  loggedUser: User;
}
