import { Component, OnInit } from '@angular/core';
import { ScheduledAppointment } from 'src/models/scheduledAppointment';
import { User } from 'src/models/user';
import { ReportService } from '../report.service';
import { Router } from '@angular/router';
import { ExaminationService } from '../examination.service';

@Component({
  selector: 'app-doctor-report',
  templateUrl: './doctor-report.component.html',
  styleUrls: ['./doctor-report.component.css']
})
export class DoctorReportComponent implements OnInit {

  constructor(private reportService: ReportService, private router: Router, private examinationService: ExaminationService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    if(!this.loggedUser || this.loggedUser.tip != 'lekar'){
      localStorage.clear()
      this.router.navigate(['/'])
    }
    this.selectedAppointment = JSON.parse(localStorage.getItem('scheduledAppointment'))

    this.currYear = this.currDate.getFullYear();
    this.currMonth = this.currDate.getMonth() + 1; 
    this.currDay = this.currDate.getDate();
    this.currHours = this.currDate.getHours();
    this.currMinutes = this.currDate.getMinutes();

    this.currDateString = this.currYear + "-" + this.currMonth + "-" + this.currDay;
    this.currTimeString = String(this.currHours).padStart(2, '0') + ":" + String(this.currMinutes).padStart(2, '0');
  }

  sendReport(){
    const [selectedYear, selectedMonth, selectedDay] = this.checkDate.split("-").map(Number);

    if(selectedYear >= this.currYear && selectedMonth >= this.currMonth && selectedDay > this.currDay){
      this.reportService.addReport(this.selectedAppointment.pacijent, this.currDateString, this.currTimeString, this.loggedUser.korisnicko_ime, this.loggedUser.ime, this.loggedUser.prezime, this.loggedUser.specijalizacija, this.selectedAppointment.pregled, this.diagnosis, this.therapy, this.checkDate).subscribe(() => {
        this.examinationService.cancelAppointment(this.loggedUser.korisnicko_ime, this.selectedAppointment.datum, this.selectedAppointment.vreme).subscribe(() => {
          this.router.navigate(['/doctor-customer-card'])
        })
        
      })
    } else {
      alert("Unesite datum u buducnosti!")
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  back(){
    this.router.navigate(['/doctor-customer-card']);
  }
  

  currDate: Date = new Date();
  currYear: number;
  currMonth: number;
  currDay: number;
  currHours: number;
  currMinutes: number;
  currDateString: string;
  currTimeString: string;

  loggedUser: User;
  selectedAppointment: ScheduledAppointment;

  diagnosis: string;
  therapy: string;
  checkDate: string;
}
