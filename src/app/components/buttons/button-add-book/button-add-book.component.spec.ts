import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddBookComponent } from './button-add-book.component';

describe('ButtonAddBookComponent', () => {
  let component: ButtonAddBookComponent;
  let fixture: ComponentFixture<ButtonAddBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAddBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonAddBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
