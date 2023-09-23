import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  addReport(customerFromForm, dateFromForm, timeFromForm, doctorFromForm, docNameFromForm, docSurnameFromForm, specialisationFromForm, examinationFromForm, diagnosisFromForm, therapyFromForm, checkDateFromForm){
    const data = {
      customer: customerFromForm,
      date: dateFromForm,
      time: timeFromForm,
      doctor: doctorFromForm,
      docName: docNameFromForm,
      docSurname: docSurnameFromForm,
      specialisation: specialisationFromForm,
      examination: examinationFromForm,
      diagnosis: diagnosisFromForm,
      therapy: therapyFromForm,
      checkDate: checkDateFromForm
    }
    
    return this.http.post(`${this.uri}/reports/addReport`, data)
  }

  getAllReports(){
    const data = ""

    return this.http.post(`${this.uri}/reports/getAllReports`, data)
  }

  generatePDF(report, emailFF){
    const data = {
      id: report._id,
      customer: report.pacijent,
      date: report.datum,
      time: report.vreme,
      doctorName: report.ime_lekara,
      doctorSurname: report.prezime_lekara,
      specialisation: report.specijalizacija,
      cause: report.razlog,
      diagnosis: report.dijagnoza,
      therapy: report.preporucena_terapija,
      checkDate: report.datum_kontrole,
      email: emailFF
    }

    return this.http.post(`${this.uri}/reports/generatePDF`, data)    
  }
}
