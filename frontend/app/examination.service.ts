import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  constructor(private http: HttpClient, private router: Router) { }

  uri = 'http://localhost:4000'

  addExamination(nameFromForm, lenFromForm, priceFromForm, specFromForm){
    const data = {
      name: nameFromForm,
      len: lenFromForm,
      price: priceFromForm,
      spec: specFromForm
    }

    return this.http.post(`${this.uri}/examinations/addExamination`, data)
  }

  getAllExaminations(){
    const data = "";

    return this.http.post(`${this.uri}/examinations/getAllExaminations`, data)
  }

  updateExamination(examinationFromForm, newPrice, newLength){
    const data = {
      name: examinationFromForm.naziv,
      price: newPrice,
      length: newLength
    }

    return this.http.post(`${this.uri}/examinations/updateExamination`, data)    
  }

  deleteExamination(nameFromForm){
    const data = {
      name: nameFromForm
    }

    return this.http.post(`${this.uri}/examinations/deleteExamination`, data)
  }

  getChosenExaminations(doctorFromForm){
    const data = {
      doctor: doctorFromForm
    }

    return this.http.post(`${this.uri}/examinations/getChosenExaminations`, data)
  }

  addChosenExamination(doctorFromForm, examinationFromForm){
    const data = {
      doctor: doctorFromForm,
      examination: examinationFromForm
    }

    return this.http.post(`${this.uri}/examinations/addChosenExamination`, data)
  }

  removeChosenExamination(doctorFromForm, examinationFromForm){
    const data = {
      doctor: doctorFromForm,
      examination: examinationFromForm
    }

    return this.http.post(`${this.uri}/examinations/removeChosenExamination`, data)
  }

  scheduleAppointment(customerFromForm, examinationFromForm, lengthFromForm, dateFromForm, timeFromForm, branchFromForm, doctorFromForm, nameFromForm, surnameFromForm){
    const data = {
      customer: customerFromForm,
      examination: examinationFromForm,
      length: lengthFromForm,
      date: dateFromForm,
      time: timeFromForm,
      branch: branchFromForm,
      doctor: doctorFromForm,
      name: nameFromForm,
      surname: surnameFromForm
    }

    return this.http.post(`${this.uri}/examinations/scheduleAppointment`, data)
  }

  getScheduledAppointments(){
    const data = ""
    
    return this.http.post(`${this.uri}/examinations/getScheduledAppointments`, data)
  }

  updateAppointment(nameFF, lengthFF){
    const data = {
      name: nameFF,
      length: lengthFF
    }
    
    return this.http.post(`${this.uri}/examinations/updateAppointment`, data)
  }

  cancelAppointment(doctorFromForm, dateFromForm, timeFromForm){
    const data = {
      doctor: doctorFromForm,
      date: dateFromForm,
      time: timeFromForm
    }
    
    return this.http.post(`${this.uri}/examinations/cancelAppointment`, data)
  }

  sendNewExaminationRequest(nameFromForm, priceFromForm, lengthFromForm, specialisationFromForm){
    const data = {
      name: nameFromForm,
      price: priceFromForm,
      length: lengthFromForm,
      specialisation: specialisationFromForm
    }

    return this.http.post(`${this.uri}/examinations/sendNewExaminationRequest`, data)
  }

  getExaminationRequests(){
    const data = ""

    return this.http.post(`${this.uri}/examinations/getExaminationRequests`, data)
  }

  acceptExamRequest(nameFromForm, priceFromForm, lengthFromForm, specialisationFromForm){
    const data = {
      name: nameFromForm,
      price: priceFromForm,
      length: lengthFromForm,
      specialisation: specialisationFromForm
    }

    return this.http.post(`${this.uri}/examinations/addExamination`, data)
  }

  denyExamRequest(nameFromForm, priceFromForm, lengthFromForm, specialisationFromForm){
    const data = {
      name: nameFromForm,
      price: priceFromForm,
      length: lengthFromForm,
      specialisation: specialisationFromForm
    }

    return this.http.post(`${this.uri}/examinations/removeExaminationRequest`, data)
  }

  cancelAppointmentDoctor(customerFromForm, examinationFromForm, lengthFromForm, dateFromForm, timeFromForm, branchFromForm, doctorFromForm, nameFromForm, surnameFromForm, causeFromForm){
    const data = {
      customer: customerFromForm,
      examination: examinationFromForm,
      length: lengthFromForm,
      date: dateFromForm,
      time: timeFromForm,
      branch: branchFromForm,
      doctor: doctorFromForm,
      name: nameFromForm,
      surname: surnameFromForm,
      cause: causeFromForm
    }

    return this.http.post(`${this.uri}/examinations/cancelAppointmentDoctor`, data)
  }

  addPromotion(textFF){
    const data = {
      text: textFF
    }

    return this.http.post(`${this.uri}/examinations/addPromotion`, data)
  }
}
