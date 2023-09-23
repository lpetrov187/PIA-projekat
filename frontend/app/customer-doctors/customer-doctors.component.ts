import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-customer-doctors',
  templateUrl: './customer-doctors.component.html',
  styleUrls: ['./customer-doctors.component.css']
})
export class CustomerDoctorsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    if(!this.loggedUser || this.loggedUser.tip != 'pacijent'){
      localStorage.clear()
      this.router.navigate(['/'])
    }
    this.doctors = JSON.parse(localStorage.getItem('doctors'))
    this.filteredDoctors = JSON.parse(localStorage.getItem('doctors'))
  }

  search() {
    let n = this.filteredDoctors.length;
    let nameFlag = false;
    let surnameFlag = false;
    let specialisationFlag = false;
    let branchFlag = false;
    
    for(let i = 0; i < n; i++){
      this.filteredDoctors.pop();
    }
    
    for(let a of this.doctors){
      if(a.ime.toLowerCase().includes(this.nameParam.toLowerCase()) || this.nameParam == ""){
        nameFlag = true;
      }
      if(a.prezime.toLowerCase().includes(this.surnameParam.toLowerCase()) || this.surnameParam == ""){
        surnameFlag = true;
      }
      if(a.specijalizacija.toLowerCase().includes(this.specialisationParam.toLowerCase()) || this.specialisationParam == ""){
        specialisationFlag = true;
      }
      if(a.ogranak_ordinacije.toLowerCase().includes(this.branchParam.toLowerCase()) || this.branchParam == ""){
        branchFlag = true;
      }
      if(nameFlag && surnameFlag && specialisationFlag && branchFlag){
        this.filteredDoctors.push(a);
      }
      nameFlag = surnameFlag = specialisationFlag = branchFlag = false;
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  sort(){
    if(this.sortingType == "neopadajuce"){
      if(this.sortBy == "po imenu"){
        this.filteredDoctors.sort((a, b)=>{
          if(a.ime.toLowerCase() > b.ime.toLowerCase()){
            return 1;
          } else if(a.ime.toLowerCase() < b.ime.toLowerCase()){
            return -1;
          } else {
            return 0;
          }
        })
      }
      if(this.sortBy == "po prezimenu"){
        this.filteredDoctors.sort((a, b)=>{
          if(a.prezime.toLowerCase() > b.prezime.toLowerCase()){
            return 1;
          } else if(a.prezime.toLowerCase() < b.prezime.toLowerCase()){
            return -1;
          } else {
            return 0;
          }
        })
      }
      if(this.sortBy == "po specijalizaciji"){
        this.filteredDoctors.sort((a, b)=>{
          if(a.specijalizacija.toLowerCase() > b.specijalizacija.toLowerCase()){
            return 1;
          } else if(a.specijalizacija.toLowerCase() < b.specijalizacija.toLowerCase()){
            return -1;
          } else {
            return 0;
          }
        })
      }
      if(this.sortBy == "po ogranku"){
        this.filteredDoctors.sort((a, b)=>{
          if(a.ogranak_ordinacije.toLowerCase() > b.ogranak_ordinacije.toLowerCase()){
            return 1;
          } else if (a.ogranak_ordinacije.toLowerCase() < b.ogranak_ordinacije.toLowerCase()) {
            return -1;
          } else {
            return 0;
          }
        })
      }
    }

    if(this.sortingType == "nerastuce"){
      if(this.sortBy == "po imenu"){
        this.filteredDoctors.sort((a, b)=>{
          if(a.ime.toLowerCase() < b.ime.toLowerCase()){
            return 1;
          } else if(a.ime.toLowerCase() > b.ime.toLowerCase()){
            return -1;
          } else {
            return 0;
          }
        })
      }
      if(this.sortBy == "po prezimenu"){
        this.filteredDoctors.sort((a, b)=>{
          if(a.prezime.toLowerCase() < b.prezime.toLowerCase()){
            return 1;
          } else if (a.prezime.toLowerCase() > b.prezime.toLowerCase()){
            return -1;
          } else {
            return 0;
          }
        })
      }
      if(this.sortBy == "po specijalizaciji"){
        this.filteredDoctors.sort((a, b)=>{
          if(a.specijalizacija.toLowerCase() < b.specijalizacija.toLowerCase()){
            return 1;
          } else if (a.specijalizacija.toLowerCase() > b.specijalizacija.toLowerCase()) {
            return -1;
          } else {
            return 0;
          }
        })
      }
      if(this.sortBy == "po ogranku"){
        this.filteredDoctors.sort((a, b)=>{
          if(a.ogranak_ordinacije.toLowerCase() < b.ogranak_ordinacije.toLowerCase()){
            return 1;
          } else if (a.ogranak_ordinacije.toLowerCase() > b.ogranak_ordinacije.toLowerCase()) {
            return -1;
          } else {
            return 0;
          }
        })
      }
    }
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

  showProfile(selected: User) {
    localStorage.setItem('doctor', JSON.stringify(selected));
    this.router.navigate(['customerDoctorProfile'])
  }

  sortingType: string = "neopadajuce";
  sortBy: string = "po imenu";

  nameParam: string = "";
  surnameParam: string = "";
  specialisationParam: string = "";
  branchParam: string = "";

  selectedPage: string = "Lekari";
  loggedUser: User;
  doctors: User[];
  filteredDoctors: User[];
}
