import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCustomerCardComponent } from './doctor-customer-card.component';

describe('DoctorCustomerCardComponent', () => {
  let component: DoctorCustomerCardComponent;
  let fixture: ComponentFixture<DoctorCustomerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCustomerCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCustomerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
