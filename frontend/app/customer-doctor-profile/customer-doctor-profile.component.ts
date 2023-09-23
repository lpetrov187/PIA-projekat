import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { ExaminationService } from '../examination.service';
import { Examination } from 'src/models/examination';
import { ChosenExamination } from 'src/models/chosenExaminations';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Calendar } from '@fullcalendar/core'

@Component({
  selector: 'app-customer-doctor-profile',
  templateUrl: './customer-doctor-profile.component.html',
  styleUrls: ['./customer-doctor-profile.component.css']
})
export class CustomerDoctorProfileComponent implements OnInit {

  constructor(private examinationService: ExaminationService, private router: Router) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    if(!this.loggedUser || this.loggedUser.tip != 'pacijent'){
      localStorage.clear()
      this.router.navigate(['/'])
    }
    this.doctor = JSON.parse(localStorage.getItem('doctor'))
    this.getAllExaminations();
    this.getChosenExaminations();
  }

  getAllExaminations(){
    this.examinationService.getAllExaminations().subscribe((exams: Examination[]) => {
      let n = this.allExaminations.length;

      for(let i = 0; i < n; i++){
        this.allExaminations.pop();
      }

      for(let e of exams){
        if(e.specijalizacija == this.doctor.specijalizacija){
          this.allExaminations.push(e);
        }
      }
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  back(){
    this.router.navigate(['/customerDoctors']);
  }

  getChosenExaminations(){
    this.examinationService.getChosenExaminations(this.doctor.korisnicko_ime).subscribe((chosenExams: ChosenExamination[]) => {
      let n = this.doctorExaminations.length;

      for(let i = 0; i < n; i++){
        this.doctorExaminations.pop();
      }

      for(let ce of chosenExams){
        if(ce.lekar == this.doctor.korisnicko_ime){
          for(let e of this.allExaminations){
            if(e.naziv == ce.pregled){
              this.doctorExaminations.push(e);
              break;
            }
          }
        }
      }
    })
  }

  schedule(selected: Examination){
    localStorage.setItem('examination', JSON.stringify(selected))
    this.router.navigate(['customer-appointment-scheduling'])
  }


  loggedUser: User;
  doctorExaminations: Examination[] = [];
  doctorCExaminations: ChosenExamination[] = [];
  allExaminations: Examination[] = [];
  doctor: User;


  
  // calendar = new Calendar(calendarEl, {
  //   plugins: [timeGridPlugin],
  //   initialView: 'timeGridWeek',
  //   headerToolbar: {
  //     left: 'prev,next',
  //     center: 'title',
  //     right: 'timeGridWeek,timeGridDay' // user can switch between the two
  //   }
  // })

  // document.addEventListener('DOMContentLoaded', function() {
  //   let calendarEl: HTMLElement = document.getElementById('calendar')!;
  
  //   let calendar = new Calendar(calendarEl, {
  //     plugins: [ dayGridPlugin ]
  //     // options here
  //   });
  
  //   calendar.render();
  // });
}
