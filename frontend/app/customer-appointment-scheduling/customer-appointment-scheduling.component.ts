import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Examination } from 'src/models/examination';
import { User } from 'src/models/user';
import { ExaminationService } from '../examination.service';
import { ScheduledAppointment } from 'src/models/scheduledAppointment';
import { Router } from '@angular/router';
import { CalendarOptions, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Calendar, EventInput } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-customer-appointment-scheduling',
  templateUrl: './customer-appointment-scheduling.component.html',
  styleUrls: ['./customer-appointment-scheduling.component.css']
})
export class CustomerAppointmentSchedulingComponent implements OnInit {

  constructor(private examinationService: ExaminationService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.doctor = JSON.parse(localStorage.getItem('doctor'))
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    this.examination = JSON.parse(localStorage.getItem('examination'))
    this.currYear = this.currDate.getFullYear();
    this.currMonth = this.currDate.getMonth() + 1; 
    this.currDay = this.currDate.getDate();

    if(!this.loggedUser || this.loggedUser.tip != 'pacijent'){
      localStorage.clear()
      this.router.navigate(['/'])
    }

    this.getScheduledAppointments();
  }

  schedule(){
    const [selectedYear, selectedMonth, selectedDay] = this.date.split("-").map(Number);

    if(selectedYear < this.currYear || (selectedYear == this.currYear && selectedMonth < this.currMonth) || (selectedYear == this.currYear && selectedMonth == this.currMonth && selectedDay < this.currDay)){
      alert("Izaberite validan datum");
    } else if(!this.isValidTime){
      alert("Izaberite validno vreme!")
    } else {
      if(this.selected == "forma"){
        let occupied = false;

        const [selectedHours, selectedMinutes] = this.time.split(":").map(Number);

        let selectedMinutesStart = selectedMinutes + selectedHours * 60;
        let selectedMinutesEnd = selectedMinutesStart + parseInt(this.examination.trajanje);

        for(let sa of this.scheduledAppointments){
          
          const [scheduledHours, scheduledMinutes] = sa.vreme.split(":").map(Number);
          let scheduledMinutesStart = scheduledHours*60 + scheduledMinutes;
          let scheduledMinutesEnd = scheduledMinutesStart + parseInt(sa.trajanje);

          if(sa.datum == this.date && ((selectedMinutesStart > scheduledMinutesStart && selectedMinutesStart < scheduledMinutesEnd) || (selectedMinutesEnd > scheduledMinutesStart && selectedMinutesEnd < scheduledMinutesEnd))){
            alert("Zauzet termin!")
            occupied = true;
          }
        }

        if(!occupied){
        let dayBefore = this.calculateDayBefore(this.date);
        this.examinationService.scheduleAppointment(this.loggedUser.korisnicko_ime, this.examination.naziv, this.examination.trajanje,  this.date, this.time, this.doctor.ogranak_ordinacije, this.doctor.korisnicko_ime, this.doctor.ime, this.doctor.prezime).subscribe(() => {
            this.notificationService.addNotification(this.loggedUser.korisnicko_ime, "Podsetnik da imate pregled zakazan za " + this.date + " u " + this.time + "h.", dayBefore, this.time).subscribe(()=>{
              alert("Uspesno zakazan pregled")
              this.router.navigate(['/customerDoctors'])
            })
          })
        }
      } else if (this.selected == "kalendar") {
        let dayBefore = this.calculateDayBefore(this.date);
        this.examinationService.scheduleAppointment(this.loggedUser.korisnicko_ime, this.examination.naziv, this.examination.trajanje,  this.date, this.time, this.doctor.ogranak_ordinacije, this.doctor.korisnicko_ime, this.doctor.ime, this.doctor.prezime).subscribe(() => {
          this.notificationService.addNotification(this.loggedUser.korisnicko_ime, "Podsetnik da imate pregled zakazan za " + this.date + " u " + this.time + "h.", dayBefore, this.time).subscribe(()=>{
            alert("Uspesno zakazan pregled")
            this.router.navigate(['/customerDoctors'])
          })
        })
      }
    }
  }

  getScheduledAppointments(){
    let n = this.scheduledAppointments.length

    for(let i = 0; i < n; i++){
      this.scheduledAppointments.pop();
    }

    let m = this.events.length

    for(let i = 0; i < m; i++){
      this.events.pop();
    }

    this.examinationService.getScheduledAppointments().subscribe((scheduledApps: ScheduledAppointment[]) => {

      for(let s of scheduledApps){
        const [appointmentYear, appointmentMonth, appointmentDay] = s.datum.split("-").map(Number)
        if(s.lekar == this.doctor.korisnicko_ime && appointmentYear >= this.currYear &&  appointmentMonth >= this.currMonth && appointmentDay >= this.currDay){
          this.scheduledAppointments.push(s);
        }
      }
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
        this.events.push(
          { title: a.pregled, start: a.datum + "T" + a.vreme, end: endStr }
        )
        // this.events = [...this.events, {
        //   title: a.pregled,
        //   start: a.datum + "T" + a.vreme,
        //   end: endStr
        // }];
      }

      this.calendarOptions.events = this.events;
    })
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

  validateTime() {
    const pattern = /^(0[7-9]|1[0-9]|20):[03][0]$/; // Matches times from 07:00 to 20:59
    this.isValidTime = pattern.test(this.time);
  }

  handleDateClick(info) { 
    if(!this.clicked){
      this.clicked = true;
      let startStr = info.dateStr.substring(0, info.dateStr.length - 9)
      let tmp =  startStr.split("T")

      this.date = tmp[0]
      this.time = tmp[1]

      let tmpTime = tmp[1].split(":").map(Number)
      let endMins = tmpTime[1] + parseInt(this.examination.trajanje)
      let endHrs = tmpTime[0]
      if(endMins >= 60){
        endHrs = tmpTime[0] + Math.floor(endMins/60)
        endMins %= 60
      }

      this.selectedDate = tmp[0] + " " + tmp[1]

      let endStr = tmp[0] + "T" + this.formatNum00(endHrs) + ":" + this.formatNum00(endMins)

      this.events = [...this.events, {
        title: this.examination.naziv,
        start: startStr,
        end: endStr,
        color: 'red',
        editable: true
      }];

      this.calendarOptions.events = this.events;
    }
  }

  handleEventDrop(eventDropInfo: { event: EventApi }) {
    const updatedEvent = eventDropInfo.event;

    let startStr = updatedEvent.startStr.substring(0, updatedEvent.startStr.length - 9)
    let tmp = startStr.split("T")

    this.date = tmp[0]
    this.time = tmp[1]
  }


  calculateDayBefore(inputDateString: string): string {
    // Parse the input date string
    const parts = inputDateString.split('-');
    if (parts.length !== 3) {
      throw new Error('Invalid date format. Please use "yyyy-mm-dd".');
    }

    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based (0 - 11)
    const day = parseInt(parts[2], 10);

    // Create a Date object with the parsed values
    const date = new Date(year, month, day);

    // Subtract one day (in milliseconds)
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000 / 2;
    const dayBefore = new Date(date.getTime() - oneDayInMilliseconds);

    // Format the result as "yyyy-mm-dd"
    const formattedDayBefore = dayBefore.toISOString().slice(0, 10);

    return formattedDayBefore;
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
    selectOverlap: false,
    dateClick: this.handleDateClick.bind(this),
    eventDrop: this.handleEventDrop.bind(this),
    eventOverlap: false,
    displayEventTime: false
  }; 

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  back(){
    this.router.navigate(['/customerDoctorProfile']);
  }
  
  onSelectChange(event: any) {
    this.navigate();
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

  selectedPage: string = "Lekari";  

  events: any[] = [];
  isValidTime: boolean = true;
  clicked: boolean = false;

  date: string = "2023-09-15";
  time: string = "07:00";
  currDate: Date = new Date();
  currYear: number;
  currMonth: number;
  currDay: number;
  selectedDate: string = "";

  calendar: Calendar;

  examination: Examination;
  doctor: User;
  loggedUser: User;

  scheduledAppointments: ScheduledAppointment[] = [];

  selected: string = "forma";

}
