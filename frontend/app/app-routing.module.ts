import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CustomerDoctorsComponent } from './customer-doctors/customer-doctors.component';
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
import { DoctorReportComponent } from './doctor-report/doctor-report.component';
import { DoctorCancelAppointmentComponent } from './doctor-cancel-appointment/doctor-cancel-appointment.component';
import { UpdateExaminationComponent } from './update-examination/update-examination.component';
import { AddPromotionComponent } from './add-promotion/add-promotion.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "customer", component: CustomerComponent },
  { path: "doctor", component: DoctorComponent },
  { path: "manager", component: ManagerComponent },
  { path: "managerLogin", component: ManagerLoginComponent },
  { path: "register-customer", component: RegisterCustomerComponent },
  { path: "register-doctor", component: RegisterDoctorComponent },
  { path: "insertDoctor", component: RegisterDoctorComponent },
  { path: "changePassword", component: ChangePasswordComponent },
  { path: "customerDoctors", component: CustomerDoctorsComponent },
  { path: "customerAppointments", component: CustomerAppointmentsComponent },
  { path: "customer-appointment-scheduling", component: CustomerAppointmentSchedulingComponent},
  { path: "customerNotifications", component: CustomerNotificationsComponent },
  { path: "customerDoctorProfile", component: CustomerDoctorProfileComponent },
  { path: "doctorAppointments", component: DoctorAppointmentsComponent },
  { path: "doctor-customer-card", component: DoctorCustomerCardComponent },
  { path: "doctor-report", component: DoctorReportComponent },
  { path: "doctorOther", component: DoctorOtherComponent },
  { path: "doctor-cancel-appointment", component: DoctorCancelAppointmentComponent },
  { path: "doctor-other-request-examination", component: DoctorOtherRequestExaminationComponent },
  { path: "add-specialisation", component: AddSpecialisationComponent },
  { path: "add-examination", component: AddExaminationComponent },
  { path: "update-examination", component: UpdateExaminationComponent },
  { path: "add-promotion", component: AddPromotionComponent },
  { path: "update-user", component: UpdateUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
