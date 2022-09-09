import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceManagerSignupComponent } from './service-manager-signup.component';

describe('ServiceManagerSignupComponent', () => {
  let component: ServiceManagerSignupComponent;
  let fixture: ComponentFixture<ServiceManagerSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceManagerSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceManagerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
