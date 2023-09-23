import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  addNotification(user, text, dateFF, timeFF){
    const data = {
      username: user,
      text: text,
      date: dateFF,
      time: timeFF,
      read: false
    }

    return this.http.post(`${this.uri}/notifications/addNotification`, data)
  }

  getAllNotifications(){
    const data = ""

    return this.http.post(`${this.uri}/notifications/getAllNotifications`, data)
  }

  markAsRead(userFF, textFF){
    const data = {
      user: userFF,
      text: textFF
    }

    return this.http.post(`${this.uri}/notifications/markAsRead`, data)
  }
}
