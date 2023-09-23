import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { JsonPipe } from '@angular/common';
import { User } from 'src/models/user';
import { Examination } from 'src/models/examination';
import { ExaminationService } from '../examination.service';
import { ChosenExamination } from 'src/models/chosenExaminations';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, private examinationService: ExaminationService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    if(!this.loggedUser || this.loggedUser.tip != 'lekar'){
      localStorage.clear()
      this.router.navigate(['/'])
    }
    this.updatedUser = this.loggedUser
    this.getMyExaminations();
    this.getChosenExaminations();

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

  onSelectChange(event: any) {
    this.navigate();
  }

  getMyExaminations(){
    this.examinationService.getAllExaminations().subscribe((exams: Examination[]) => {
      let n = this.mySpecExaminations.length;

      for(let i = 0; i < n; i++){
        this.mySpecExaminations.pop();
      }

      for(let e of exams){
        if(e.specijalizacija == this.loggedUser.specijalizacija){
          this.mySpecExaminations.push(e);
        }
      }
    })
  }

  getChosenExaminations(){
    this.examinationService.getChosenExaminations(this.loggedUser.korisnicko_ime).subscribe((chosenExams: ChosenExamination[]) => {
      let n = this.chosenExaminations.length;

      for(let i = 0; i < n; i++){
        this.chosenExaminations.pop();
      }

      let m = this.notChosenExaminations.length;

      for(let i = 0; i < n; i++){
        this.notChosenExaminations.pop();
      }

      let chosen = false;
      for(let e of this.mySpecExaminations){
        chosen = false;
        for(let ce of chosenExams){
          if(e.naziv == ce.pregled){
            this.chosenExaminations.push(e);
            chosen = true;
            break;
          }
        }
        if(!chosen){
          this.notChosenExaminations.push(e);
        }
      }
    })
  }

  addExamination(selected: Examination){
    this.examinationService.addChosenExamination(this.loggedUser.korisnicko_ime, selected.naziv).subscribe(()=>{
      window.location.reload();
    })
  }

  removeExamination(selected: Examination){
    this.examinationService.removeChosenExamination(this.loggedUser.korisnicko_ime, selected.naziv).subscribe(()=>{
      window.location.reload();
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          const { width, height } = img;
          if (width >= 100 && width <= 300 && height >= 100 && height <= 300) {
            this.imgError = ""
            this.imageSrc = e.target.result;
          } else {
            this.imgError = "Dimenzije slike nisu odgovarajuce!";
            alert("Prevelika slika");
          }
        };
      img.src = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  updateUser(){
    this.loginService.updateDoctor(this.updatedUser).subscribe(()=>{
      localStorage.setItem('user', JSON.stringify(this.updatedUser))
      this.updating = false;
      window.location.reload()
    })
  }


  updateImg(){
    if(this.imgError == ""){
      this.loginService.updateImg(this.loggedUser.korisnicko_ime, this.imageSrc).subscribe(()=>{
        this.loggedUser.slika = this.imageSrc.toString()
        localStorage.setItem('user', JSON.stringify(this.loggedUser))
        this.updatingImg = false;
        window.location.reload()
      })
    } else {
      alert(this.imgError)
    }
  }

  mySpecExaminations: Examination[] = [];
  chosenExaminations: Examination[] = [];
  notChosenExaminations: Examination[] = [];
  loggedUser: User;
  selectedPage: string = "Profil";

  updatedUser: User;
  updating: boolean = false;
  updatingImg: boolean = false;

  
  imageSrc: string | ArrayBuffer | null = 'data:image/png;base64,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';
  selectedFile: File | undefined;
  imgError: string;
}