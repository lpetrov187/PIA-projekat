import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduledAppointment } from 'src/models/scheduledAppointment';
import { User } from 'src/models/user';
import { ExaminationService } from '../examination.service';
import { Report } from 'src/models/report';
import { ReportService } from '../report.service';
import { PdfGeneratorService } from '../pdf-generator.service';

@Component({
  selector: 'app-customer-appointments',
  templateUrl: './customer-appointments.component.html',
  styleUrls: ['./customer-appointments.component.css']
})
export class CustomerAppointmentsComponent implements OnInit {

  constructor(private router: Router, private examinationService: ExaminationService, private reportService: ReportService, private pdfGeneratorService: PdfGeneratorService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    if(!this.loggedUser || this.loggedUser.tip != 'pacijent'){
      localStorage.clear()
      this.router.navigate(['/'])
    }
    this.getScheduledAppointments()
    this.getAllReports()

    this.currYear = this.currDate.getFullYear();
    this.currMonth = this.currDate.getMonth() + 1; 
    this.currDay = this.currDate.getDate();
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

  getScheduledAppointments(){
    let n = this.scheduledAppointments.length

    for(let i = 0; i < n; i++){
      this.scheduledAppointments.pop();
    }

    this.examinationService.getScheduledAppointments().subscribe((scheduledApps: ScheduledAppointment[]) => {
      for(let s of scheduledApps){
        const [appointmentYear, appointmentMonth, appointmentDay] = s.datum.split("-").map(Number)

        if(s.pacijent == this.loggedUser.korisnicko_ime && appointmentYear >= this.currYear &&  appointmentMonth >= this.currMonth && appointmentDay >= this.currDay){
          this.scheduledAppointments.push(s);
        }
      }

      this.scheduledAppointments.sort((a, b) => {
        if(a.datum > b.datum){
          return 1;
        } else if(a.datum < b.datum){
          return -1;
        } else {
          if(a.vreme > b.vreme){
            return 1;
          } else if(a.vreme < b.vreme){
            return -1;
          } else {
            return 0;
          }
        }
      })
    })
  }
  
  cancelAppointment(selected: ScheduledAppointment){
    this.examinationService.cancelAppointment(selected.lekar, selected.datum, selected.vreme).subscribe(() => {
      window.location.reload();
    })
  }

  getAllReports(){
    this.reportService.getAllReports().subscribe((reps: Report[]) => {
      let n = this.customerReports.length;
    
      for(let i = 0; i < n; i++){
        this.customerReports.pop()
      }

      for(let r of reps){
        if(r.pacijent == this.loggedUser.korisnicko_ime){
          this.customerReports.push(r);
        }
      }
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }
  
  generatePDF(selected: Report){
    this.reportService.generatePDF(selected, this.loggedUser.mejl).subscribe(()=>{
      alert("Link do PDF fajla je poslat na mejl.")
    })
  }

  currDate: Date = new Date();
  currYear: number;
  currMonth: number;
  currDay: number;

  scheduledAppointments: ScheduledAppointment[] = [];
  selectedPage: string = "Pregledi";
  loggedUser: User;

  customerReports: Report[] = [];
}
