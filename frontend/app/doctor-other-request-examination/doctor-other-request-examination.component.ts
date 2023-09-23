import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { ExaminationService } from '../examination.service';

@Component({
  selector: 'app-doctor-other-request-examination',
  templateUrl: './doctor-other-request-examination.component.html',
  styleUrls: ['./doctor-other-request-examination.component.css']
})
export class DoctorOtherRequestExaminationComponent implements OnInit {

  constructor(private router: Router, private examinationService: ExaminationService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    if(!this.loggedUser || this.loggedUser.tip != 'lekar'){
      localStorage.clear()
      this.router.navigate(['/'])
    }
    this.specialisation = this.loggedUser.specijalizacija
  }

  sendRequest(){
    this.examinationService.sendNewExaminationRequest(this.name, this.price, this.length, this.specialisation).subscribe(() => {
      this.router.navigate(['/doctorOther'])
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  back(){
    this.router.navigate(['/doctorOther']);
  }


  name: string;
  price: string;
  length: string;
  specialisation: string;

  loggedUser: User;

}
