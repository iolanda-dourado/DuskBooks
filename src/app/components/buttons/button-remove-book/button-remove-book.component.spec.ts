import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRemoveBookComponent } from './button-remove-book.component';

describe('ButtonRemoveBookComponent', () => {
  let component: ButtonRemoveBookComponent;
  let fixture: ComponentFixture<ButtonRemoveBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonRemoveBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonRemoveBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
