import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCancelAppointmentComponent } from './doctor-cancel-appointment.component';

describe('DoctorCancelAppointmentComponent', () => {
  let component: DoctorCancelAppointmentComponent;
  let fixture: ComponentFixture<DoctorCancelAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCancelAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCancelAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
