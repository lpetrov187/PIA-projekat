import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduledAppointment } from 'src/models/scheduledAppointment';
import { ExaminationService } from '../examination.service';
import { SubscriptionLoggable } from 'rxjs/internal/testing/SubscriptionLoggable';
import { User } from 'src/models/user';

@Component({
  selector: 'app-doctor-cancel-appointment',
  templateUrl: './doctor-cancel-appointment.component.html',
  styleUrls: ['./doctor-cancel-appointment.component.css']
})
export class DoctorCancelAppointmentComponent implements OnInit {

  constructor(private router: Router, private examinationService: ExaminationService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    if(!this.loggedUser || this.loggedUser.tip != 'lekar'){
      localStorage.clear()
      this.router.navigate(['/'])
    }
    this.selectedAppointment = JSON.parse(localStorage.getItem('selectedAppointment'))
  }

  cancelAppointment(){
    let customer = this.selectedAppointment.pacijent
    let examination = this.selectedAppointment.pregled
    let length = this.selectedAppointment.trajanje
    let date = this.selectedAppointment.datum
    let time = this.selectedAppointment.vreme
    let branch = this.selectedAppointment.ogranak
    let doctor = this.selectedAppointment.lekar
    let name = this.selectedAppointment.ime_lekara
    let surname = this.selectedAppointment.prezime_lekara
    
    this.examinationService.cancelAppointmentDoctor(customer, examination, length, date, time, branch, doctor, name, surname, this.cause).subscribe(()=>{
      this.router.navigate(['doctorAppointments'])
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  back(){
    this.router.navigate(['/doctorAppointments']);
  }

  loggedUser: User;
  selectedAppointment: ScheduledAppointment;
  cause: string;

}
