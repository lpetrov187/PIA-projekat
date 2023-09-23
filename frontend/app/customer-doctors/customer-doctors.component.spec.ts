import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDoctorsComponent } from './customer-doctors.component';

describe('CustomerDoctorsComponent', () => {
  let component: CustomerDoctorsComponent;
  let fixture: ComponentFixture<CustomerDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDoctorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
