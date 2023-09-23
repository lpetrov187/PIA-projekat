import { Component, OnInit } from '@angular/core';
import { SpecialisationService } from '../specialisation.service';
import { Router } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-add-specialisation',
  templateUrl: './add-specialisation.component.html',
  styleUrls: ['./add-specialisation.component.css']
})
export class AddSpecialisationComponent implements OnInit {

  constructor(private specialisationService: SpecialisationService, private router: Router) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    if(!this.loggedUser || this.loggedUser.tip != 'menadzer'){
      localStorage.clear()
      this.router.navigate(['/'])
    }
  }


  addSpecialisation(){
    this.specialisationService.addSpecialisation(this.name).subscribe(()=>{
      this.router.navigate(['manager']);
    })
  }
  
  name: string;
  loggedUser: User;
}
