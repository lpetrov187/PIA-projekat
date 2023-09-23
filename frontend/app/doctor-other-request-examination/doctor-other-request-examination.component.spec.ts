import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorOtherRequestExaminationComponent } from './doctor-other-request-examination.component';

describe('DoctorOtherRequestExaminationComponent', () => {
  let component: DoctorOtherRequestExaminationComponent;
  let fixture: ComponentFixture<DoctorOtherRequestExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorOtherRequestExaminationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorOtherRequestExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
