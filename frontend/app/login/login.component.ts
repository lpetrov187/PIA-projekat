import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from 'src/models/user';
import { Request } from 'src/models/request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('submitButton') submitButton!: ElementRef;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.getAllDoctors();
    setInterval(() => {
      this.nextImage();
    }, this.autoSwitchInterval);
  }

  onEnterKey(event: any) {
    if (event.target.value && this.submitButton) {
      this.submitButton.nativeElement.click();
    }
  }

  nextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.images.length;
  }

  login() {
    this.loginService.login(this.username, this.password).subscribe((userFromDB: User)=>{
      if(userFromDB == null) this.message = "Nepostojeci korisnik"
      else {
        if(userFromDB.tip == "pacijent"){
          this.router.navigate(['customer']);
        } else if(userFromDB.tip == "lekar"){
          this.router.navigate(['doctor']);
        }
        localStorage.setItem('user', JSON.stringify(userFromDB))
        localStorage.setItem('doctors', JSON.stringify(this.doctors))
      }
    })
  }

  getAllDoctors() {
    this.loginService.getAllDoctors().subscribe((data: User[]) => {
      this.doctors = data;
      for(let a of this.doctors){
        this.filteredDoctors.push(a);
      }
    })
  }

  search() {
    let n = this.filteredDoctors.length;
    let nameFlag = false;
    let surnameFlag = false;
    let specialisationFlag = false;
    
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
      if(nameFlag && surnameFlag && specialisationFlag){
        this.filteredDoctors.push(a);
      }
      nameFlag = surnameFlag = specialisationFlag = false;
    }
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
    }
  }

  images: string[] = [
    'assets/image1.jpg',
    'assets/image2.jpg',
    'assets/image3.jpg',
    'assets/image4.jpg',
    'assets/image5.jpg'
  ];

  currentImageIndex = 0;
  autoSwitchInterval = 3000;

  username: string;
  password: string;
  message: string;

  up: boolean = false;
  down: boolean = false;

  sortingType: string = "neopadajuce";
  sortBy: string = "po imenu";

  nameParam: string = "";
  surnameParam: string = "";
  specialisationParam: string = "";

  filteredDoctors: User[] = [];
  doctors: User[] = [];
}
