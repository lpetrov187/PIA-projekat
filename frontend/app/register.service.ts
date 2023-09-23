import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  sendRequest(user, pass, n, s, addr, p, mail, img){

    let data = {
      username: user,
      password: pass,
      name: n,
      surname: s,
      address: addr,
      phone: p,
      email: mail,
      imageSrc: img
    }
    return this.http.post(`${this.uri}/requests/sendRequest`, data);
  }

  registerDoctor(user, pass, n, s, addr, p, mail, lic, spec, br, img){
    let data = {
      username: user,
      password: pass,
      name: n,
      surname: s,
      address: addr,
      phone: p,
      email: mail,
      licenceNum: lic,
      specialisation: spec,
      branch: br,
      imageSrc: img
    }
    return this.http.post(`${this.uri}/users/registerDoctor`, data);
  }


}
