import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonUpdateAvailabilityComponent } from './button-update-availability.component';

describe('ButtonUpdateAvailabilityComponent', () => {
  let component: ButtonUpdateAvailabilityComponent;
  let fixture: ComponentFixture<ButtonUpdateAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonUpdateAvailabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonUpdateAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
