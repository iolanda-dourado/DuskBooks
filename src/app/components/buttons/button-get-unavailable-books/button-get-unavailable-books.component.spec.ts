import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGetUnavailableBooksComponent } from './button-get-unavailable-books.component';

describe('ButtonGetUnavailableBooksComponent', () => {
  let component: ButtonGetUnavailableBooksComponent;
  let fixture: ComponentFixture<ButtonGetUnavailableBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonGetUnavailableBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonGetUnavailableBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
