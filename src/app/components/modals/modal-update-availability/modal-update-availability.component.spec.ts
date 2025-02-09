import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateAvailabilityComponent } from './modal-update-availability.component';

describe('ModalUpdateAvailabilityComponent', () => {
  let component: ModalUpdateAvailabilityComponent;
  let fixture: ComponentFixture<ModalUpdateAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUpdateAvailabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUpdateAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
