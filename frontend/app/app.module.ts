import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { DoctorComponent } from './doctor/doctor.component';
import { CustomerComponent } from './customer/customer.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { CustomerDoctorsComponent } from './customer-doctors/customer-doctors.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CustomerAppointmentsComponent } from './customer-appointments/customer-appointments.component';
import { CustomerNotificationsComponent } from './customer-notifications/customer-notifications.component';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { DoctorOtherComponent } from './doctor-other/doctor-other.component';
import { CustomerDoctorProfileComponent } from './customer-doctor-profile/customer-doctor-profile.component';
import { AddSpecialisationComponent } from './add-specialisation/add-specialisation.component';
import { AddExaminationComponent } from './add-examination/add-examination.component';
import { CustomerAppointmentSchedulingComponent } from './customer-appointment-scheduling/customer-appointment-scheduling.component';
import { DoctorOtherRequestExaminationComponent } from './doctor-other-request-examination/doctor-other-request-examination.component';
import { DoctorCustomerCardComponent } from './doctor-customer-card/doctor-customer-card.component';
import { DoctorReportComponent } from './doctor-report/doctor-report.component'

import { FullCalendarModule } from '@fullcalendar/angular';
import { DoctorCancelAppointmentComponent } from './doctor-cancel-appointment/doctor-cancel-appointment.component';
import { UpdateExaminationComponent } from './update-examination/update-examination.component';
import { AddPromotionComponent } from './add-promotion/add-promotion.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DoctorComponent,
    CustomerComponent,
    ManagerComponent,
    ManagerLoginComponent,
    RegisterCustomerComponent,
    RegisterDoctorComponent,
    CustomerDoctorsComponent,
    ChangePasswordComponent,
    CustomerAppointmentsComponent,
    CustomerNotificationsComponent,
    DoctorAppointmentsComponent,
    DoctorOtherComponent,
    CustomerDoctorProfileComponent,
    AddSpecialisationComponent,
    AddExaminationComponent,
    CustomerAppointmentSchedulingComponent,
    DoctorOtherRequestExaminationComponent,
    DoctorCustomerCardComponent,
    DoctorReportComponent,
    DoctorCancelAppointmentComponent,
    UpdateExaminationComponent,
    AddPromotionComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
