import { Component, OnInit } from '@angular/core';
import { SpecialisationService } from '../specialisation.service';
import { Specialisation } from 'src/models/specialisation';
import { ExaminationService } from '../examination.service';
import { Router } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-add-examination',
  templateUrl: './add-examination.component.html',
  styleUrls: ['./add-examination.component.css']
})
export class AddExaminationComponent implements OnInit {

  constructor(private specialisationService: SpecialisationService, private examinationService: ExaminationService, private router: Router) { }

  ngOnInit(): void {
    this.getAllSpecialisations();
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    if(!this.loggedUser || this.loggedUser.tip != 'menadzer'){
      localStorage.clear()
      this.router.navigate(['/'])
    }
  }

  getAllSpecialisations(){
    this.specialisationService.getAllSpecialisations().subscribe((data: Specialisation[]) => {
      this.specialisations = data;
    })
  }

  addExamination(){
    if(this.name == "" || this.price == ""){
      alert("Popunite sva polja!")
    } else {
      if(this.len == "")
        this.len = "30";
      this.examinationService.addExamination(this.name, this.len, this.price, this.spec).subscribe(() => {
        alert("Uspesno dodat pregled.")
        this.router.navigate(['manager']);
      })
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  back(){
    this.router.navigate(['/manager']);
  }

  name: string = "";
  len: string = "";
  price: string = "";
  spec: string = "";
  specialisations: Specialisation[] = [];
  loggedUser: User;
}
