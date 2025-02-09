import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonEditBookComponent } from './button-edit-book.component';

describe('ButtonEditBookComponent', () => {
  let component: ButtonEditBookComponent;
  let fixture: ComponentFixture<ButtonEditBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonEditBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonEditBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
