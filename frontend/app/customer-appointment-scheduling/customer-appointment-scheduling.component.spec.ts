import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAppointmentSchedulingComponent } from './customer-appointment-scheduling.component';

describe('CustomerAppointmentSchedulingComponent', () => {
  let component: CustomerAppointmentSchedulingComponent;
  let fixture: ComponentFixture<CustomerAppointmentSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAppointmentSchedulingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAppointmentSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
