import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    if(!this.loggedUser){
      localStorage.clear()
      this.router.navigate(['/'])
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  back(){
    this.router.navigate(['/customer'])
  }

  changePass(){
    if(this.oldPass == this.loggedUser.lozinka){
      if(this.newPass == this.confPass){
        if(!this.checkPass()){
          alert("Lozinka nije u trazenom formatu.")
        } else {
        this.loginService.changePass(this.newPass, this.loggedUser.korisnicko_ime).subscribe(() => {
          this.logout();
        })
        }
      } else {
        this.message = "Nove lozinke se ne poklapaju";
        this.oldPass = this.newPass = this.confPass = "";
      }
    } else {
      this.message = "Netacna lozinka zadatog korisnika"
      this.oldPass = this.newPass = this.confPass = "";
    }
  }

  checkPass(){
    let capitalLetter = false;
    let number = false;
    let specialCharacter = false;
    let neighborChars = true;

    if(this.newPass.length < 8 || this.newPass.length > 14){
      return false;
    }
    
    let firstCode = this.newPass.charCodeAt(0);
    if((firstCode > 64 && firstCode < 91) || (firstCode > 96 && firstCode < 123)){
      for(let i = 0; i < this.newPass.length; i++){
        let code = this.newPass.charCodeAt(i);
        if(code > 47 && code < 58){
          number = true;
        } else if(code > 64 && code < 91){
          capitalLetter = true;
        } else if((code > 32 && code < 48) || (code > 57 && code < 65) || (code > 90 && code < 97) || (code > 122 && code < 127)){
          specialCharacter = true;
        }
        if(code > 96 && code < 123){
          if(i != this.newPass.length - 1){
            let codeNext = this.newPass.charCodeAt(i+1);
            if(code == codeNext){
              neighborChars = false;
            }
          }
        }
      }
      return capitalLetter && number && specialCharacter && neighborChars;
    }
    return false;
  }

  oldPass: string;
  newPass: string;
  confPass: string;
  message: string;
  loggedUser: User;
}
