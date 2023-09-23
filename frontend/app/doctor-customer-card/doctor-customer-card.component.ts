import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { ExaminationService } from '../examination.service';
import { ScheduledAppointment } from 'src/models/scheduledAppointment';
import { ReportService } from '../report.service';
import { Report } from 'src/models/report';

@Component({
  selector: 'app-doctor-customer-card',
  templateUrl: './doctor-customer-card.component.html',
  styleUrls: ['./doctor-customer-card.component.css']
})
export class DoctorCustomerCardComponent implements OnInit {

  constructor(private router: Router, private examinationService: ExaminationService, private reportService: ReportService) { }

  ngOnInit(): void {
    this.customerUsername = JSON.parse(localStorage.getItem('customerUsername'))
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    if(!this.loggedUser || this.loggedUser.tip != 'lekar'){
      localStorage.clear()
      this.router.navigate(['/'])
    }
    this.currYear = this.currDate.getFullYear();
    this.currMonth = this.currDate.getMonth() + 1; 
    this.currDay = this.currDate.getDate();
    this.currHours = this.currDate.getHours();
    this.currMinutes = this.currDate.getMinutes();

    this.currTimeMinutes = this.currHours*60 + this.currMinutes;

    this.getAllReports();
    this.getPastAppointments();
  }

  getAllReports(){
    this.reportService.getAllReports().subscribe((reps: Report[]) => {
      let n = this.customerReports.length;
    
      for(let i = 0; i < n; i++){
        this.customerReports.pop()
      }

      for(let r of reps){
        if(r.pacijent == this.customerUsername){
          this.customerReports.push(r);
        }
      }
    })
  }

  getPastAppointments(){
    this.examinationService.getScheduledAppointments().subscribe((apps: ScheduledAppointment[]) => {
      let n = this.customerScheduledAppointments.length;

      for(let i = 0; i < n; i++){
        this.customerScheduledAppointments.pop();
      }

      for(let a of apps){
        const [appYear, appMonth, appDay] = a.datum.split("-").map(Number)
        const [appHours, appMinutes] = a.vreme.split(":").map(Number)
        let totalMinutesStart = appHours*60 + appMinutes;
        let totalMinutesEnd = totalMinutesStart + parseInt(a.trajanje)

        if(a.pacijent == this.customerUsername && a.lekar == this.loggedUser.korisnicko_ime){
          if(appYear <= this.currYear && appMonth <= this.currMonth && appDay <= this.currDay){
            if(appYear == this.currYear && appMonth == this.currMonth && appDay == this.currDay){
              if(this.currTimeMinutes > totalMinutesStart || this.currTimeMinutes > totalMinutesEnd)
                this.customerScheduledAppointments.push(a);
            } else {
              this.customerScheduledAppointments.push(a);
            }
          }
        }
      }
    })
  }

  writeReport(selected: ScheduledAppointment){
    localStorage.setItem('scheduledAppointment', JSON.stringify(selected))
    
    this.router.navigate(['/doctor-report'])
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  back(){
    this.router.navigate(['/doctorAppointments'])
  }

  currDate: Date = new Date();
  currYear: number;
  currMonth: number;
  currDay: number;
  currHours: number;
  currMinutes: number;
  currTimeMinutes: number;

  customerReports: Report[] = [];
  customerUsername: string;
  customerScheduledAppointments: ScheduledAppointment[] = [];
  loggedUser: User;
}