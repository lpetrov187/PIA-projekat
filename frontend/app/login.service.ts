import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  login(usernameFromForm, passwordFromForm){
    let data = {
      username: usernameFromForm,
      password: passwordFromForm
    }

    return this.http.post(`${this.uri}/users/login`, data)
  }

  getAllDoctors(){
    const data = "";

    return this.http.post(`${this.uri}/users/getAllDoctors`, data)
  }

  getAllUsers(){
    const data = "";

    return this.http.post(`${this.uri}/users/getAllUsers`, data)
  }

  getAllRequests(){
    const data = "";

    return this.http.post(`${this.uri}/users/getAllRequests`, data)
  }

  changePass(newPassword, user){
    const data = {
      username: user,
      password: newPassword
    }

    return this.http.post(`${this.uri}/users/changePassword`, data)
  }

  acceptRequest(request){
    const data = {
      username: request.korisnicko_ime,
      password: request.lozinka,
      name: request.ime,
      surname: request.prezime,
      address: request.adresa,
      phone: request.telefon,
      email: request.mejl,
      img: request.slika
    }

    return this.http.post(`${this.uri}/requests/acceptRequest`, data)
  }

  denyRequest(request){
    const data = {
      username: request.korisnicko_ime
    }

    return this.http.post(`${this.uri}/requests/denyRequest`, data)
  }

  deleteUser(user){
    const data = {
      username: user.korisnicko_ime,
      mail: user.mejl
    }
    
    return this.http.post(`${this.uri}/users/deleteUser`, data)
  }

  updateUser(user){
    const data = {
      username: user.korisnicko_ime,
      name: user.ime,
      surname: user.prezime,
      address: user.adresa,
      phone: user.telefon,
      email: user.mejl
    }

    return this.http.post(`${this.uri}/users/updateUser`, data)
  }
  
  updateDoctor(user){
    const data = {
      username: user.korisnicko_ime,
      name: user.ime,
      surname: user.prezime,
      address: user.adresa,
      phone: user.telefon,
      licenceNum: user.broj_licence,
      specialisation: user.specijalizacija
    }

    return this.http.post(`${this.uri}/users/updateDoctor`, data)
  }

  updateDoctorManager(user){
    const data = {
      username: user.korisnicko_ime,
      name: user.ime,
      surname: user.prezime,
      address: user.adresa,
      phone: user.telefon,
      mail: user.mejl,
      licenceNum: user.broj_licence,
      specialisation: user.specijalizacija,
      branch: user.ogranak_ordinacije
    }

    return this.http.post(`${this.uri}/users/updateDoctorManager`, data)
  }

  updateImg(usernameFF, imageFF){
    const data = {
      username: usernameFF,
      image: imageFF
    }

    return this.http.post(`${this.uri}/users/updateImg`, data)
  }
}
