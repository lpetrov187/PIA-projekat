import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDoctorProfileComponent } from './customer-doctor-profile.component';

describe('CustomerDoctorProfileComponent', () => {
  let component: CustomerDoctorProfileComponent;
  let fixture: ComponentFixture<CustomerDoctorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDoctorProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDoctorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
