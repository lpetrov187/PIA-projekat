import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from 'src/models/user';
import { Request } from 'src/models/request';
import { Examination } from 'src/models/examination';
import { ExaminationService } from '../examination.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, private examinationService: ExaminationService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    if(!this.loggedUser || this.loggedUser.tip != 'menadzer'){
      localStorage.clear()
      this.router.navigate(['/'])
    }
    this.getAllUsers();
    this.getAllRequests();
    this.getAllExaminations();
    this.getExaminationRequests();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }
  
  getAllUsers(){
    this.loginService.getAllUsers().subscribe((usersFromDB: User[])=>{
      let n = this.doctors.length;
      let m = this.doctors.length;

      for(let i = 0; i < n; i++){
        this.doctors.pop();
      }

      for(let i = 0; i < m; i++){
        this.customers.pop();
      }

      this.users = usersFromDB;
      for(let user of usersFromDB){
        if(user.tip == "lekar"){
          this.doctors.push(user)
        } else if(user.tip == "pacijent"){
          this.customers.push(user)
        }
      }
    })
  }

  getAllRequests(){
    this.loginService.getAllRequests().subscribe((requestsFromDB: Request[])=>{
      this.requests = requestsFromDB;
    })
  }

  getAllExaminations(){
    this.examinationService.getAllExaminations().subscribe((exams: Examination[])=>{
      let n = this.examinations.length

      for(let i = 0; i < n; i++){
        this.examinations.pop();
      }

      this.examinations = exams;
    })
  }

  acceptRequest(selected: Request){
    this.loginService.acceptRequest(selected).subscribe(()=>{
      window.location.reload();
    })
  }

  denyRequest(selected: Request){
    this.loginService.denyRequest(selected).subscribe(()=>{
      window.location.reload();
    })
  }

  deleteUser(selected: User){
    this.loginService.deleteUser(selected).subscribe(()=>{
      window.location.reload();
    })
  }

  updateExamination(selected: Examination){
    localStorage.setItem('selectedExamination', JSON.stringify(selected))
    
    this.router.navigate(['/update-examination'])
  }

  deleteExamination(selected: Examination){
    this.examinationService.deleteExamination(selected.naziv).subscribe(()=>{
      window.location.reload();
    })
  }

  getExaminationRequests(){
    this.examinationService.getExaminationRequests().subscribe((examReqs: Examination[]) => {
      this.examinationRequests = examReqs;
    })
  }

  acceptExamRequest(selected: Examination){
    this.examinationService.acceptExamRequest(selected.naziv, selected.cena, selected.trajanje, selected.specijalizacija).subscribe(() => {
      window.location.reload()
      this.denyExamRequest(selected)
    })
  }

  denyExamRequest(selected: Examination){
    this.examinationService.denyExamRequest(selected.naziv, selected.cena, selected.trajanje, selected.specijalizacija).subscribe(() => {
      window.location.reload()
    })
  }

  updateUser(selected: User){
    localStorage.setItem('userForUpdate', JSON.stringify(selected))

    this.router.navigate(['update-user'])
  }

  users: User[] = [];
  doctors: User[] = [];
  customers: User[] = [];
  requests: Request[] = [];
  examinations: Examination[] = [];
  examinationRequests: Examination[] = [];
  selectedUser: User;
  loggedUser: User;
}
