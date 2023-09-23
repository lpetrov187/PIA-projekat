import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecialisationService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  addSpecialisation(specialisation){
    const data = {
      name: specialisation
    }

    return this.http.post(`${this.uri}/specialisations/addSpecialisation`, data)
  }
  
  getAllSpecialisations(){
    const data = "";

    return this.http.post(`${this.uri}/specialisations/getAllSpecialisations`, data)
  }
}
