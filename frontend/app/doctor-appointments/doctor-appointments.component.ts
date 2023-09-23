import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { LoginService } from '../login.service';
import { ScheduledAppointment } from 'src/models/scheduledAppointment';
import { ExaminationService } from '../examination.service';

import { CalendarOptions, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Calendar, EventInput } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, private examinationService: ExaminationService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    if(!this.loggedUser || this.loggedUser.tip != 'lekar'){
      localStorage.clear()
      this.router.navigate(['/'])
    }
    this.getScheduledAppointments()

    this.currYear = this.currDate.getFullYear();
    this.currMonth = this.currDate.getMonth() + 1; 
    this.currDay = this.currDate.getDate();
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

  getScheduledAppointments(){
    let n = this.scheduledAppointments.length

    for(let i = 0; i < n; i++){
      this.scheduledAppointments.pop();
    }

    this.examinationService.getScheduledAppointments().subscribe((scheduledApps: ScheduledAppointment[]) => {
      for(let s of scheduledApps){
        const [appointmentYear, appointmentMonth, appointmentDay] = s.datum.split("-").map(Number)

        if(s.lekar == this.loggedUser.korisnicko_ime && appointmentYear >= this.currYear &&  appointmentMonth >= this.currMonth && appointmentDay >= this.currDay){
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
      for(let a of this.scheduledAppointments){
        let tmp = [a.datum, a.vreme]
        let tmpTime = tmp[1].split(":").map(Number)
        let endMins = tmpTime[1] + parseInt(a.trajanje)
        let endHrs = tmpTime[0]
        if(endMins >= 60){
          endHrs = tmpTime[0] + Math.floor(endMins/60)
          endMins %= 60
        }

        let endStr = tmp[0] + "T" + this.formatNum00(endHrs) + ":" + this.formatNum00(endMins)
        if(a.pregled == "Slobodan dan"){
          this.events.push(
            { title: a.pregled, start: a.datum + "T" + a.vreme, end: endStr, eventColor: 'green' }
          )
        } else {
          this.events.push(
            { title: a.pregled, start: a.datum + "T" + a.vreme, end: endStr, eventColor: 'blue' }
          )
        }
        // this.events = [...this.events, {
        //   title: a.pregled,
        //   start: a.datum + "T" + a.vreme,
        //   end: endStr
        // }];
      }
      this.calendarOptions.events = this.events;

      let m = 3;
      for(let i = 0; i < m; i++){
        if(this.scheduledAppointments[i].pregled != "Slobodan dan"){
          this.mostRecentAppointments.push(this.scheduledAppointments[i]);
        } else {
          m++;
        }
      }

    })
  }

  getCustomerCard(selected: ScheduledAppointment){
    
    this.router.navigate(['/doctor-customer-card'])

    localStorage.setItem('customerUsername', JSON.stringify(selected.pacijent))
  }

  onSelectChange(event: any) {
    this.navigate();
  }
  
  formatNum00(num: number){
    let tmp = num.toString()
    if(tmp.length == 1){
      return "0" + tmp
    }
    else{
      return tmp
    }
  }

  handleEventClick(clickInfo: { event: EventApi }){
    const event = clickInfo.event;

    if(this.selectedEvent){
      this.selectedEvent.setProp('backgroundColor', 'blue')
    }
    // Change the color of the clicked event
    if(event.title!="Slobodan dan"){
      event.setProp('backgroundColor', 'red'); // Change to your desired color
      this.selectedEvent = event;
    } else {
      this.selectedEvent = null;
    }

    this.calendarOptions.events = this.events;
  }

  getCustomerCardCal(){

    let saTMP = this.getSelectedAppointment()

    let username = saTMP.pacijent;

    this.router.navigate(['/doctor-customer-card'])

    localStorage.setItem('customerUsername', JSON.stringify(username))
    localStorage.setItem('doctor', JSON.stringify(this.loggedUser))
  }

  getSelectedAppointment(){
    let dateTime = this.selectedEvent.startStr.substring(0, this.selectedEvent.startStr.length - 9)
    let tmp = dateTime.split("T")

    for(let s of this.scheduledAppointments){
      if(s.datum == tmp[0] && s.vreme == tmp[1]){
        return s
      }
    }
    return null
  }

  cancelAppointment(selected: ScheduledAppointment){
    localStorage.setItem('selectedAppointment', JSON.stringify(selected))
    this.router.navigate(['/doctor-cancel-appointment'])
  }

  cancelAppointmentCal(){
    let selected = this.getSelectedAppointment()

    localStorage.setItem('selectedAppointment', JSON.stringify(selected))
    this.router.navigate(['/doctor-cancel-appointment'])
  }

  calendarOptions: CalendarOptions = {
    height: 450,
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay' // user can switch between the two
    },
    allDaySlot: false,
    slotMinTime: '07:00:00',
    slotMaxTime: '21:00:00',
    firstDay: 1,
    eventClick: this.handleEventClick.bind(this),
    eventColor: 'blue',
    displayEventTime: false
  }; 


  events: any[] = [];
  currDate: Date = new Date();
  currYear: number;
  currMonth: number;
  currDay: number;
  selectedDateTime: string;

  scheduledAppointments: ScheduledAppointment[] = [];

  mostRecentAppointments: ScheduledAppointment[] = [];

  loggedUser: User;
  selectedPage: string = "Pregledi";
  displayType: string = "najskoriji pregledi";

  selectedEvent: EventApi;
}
