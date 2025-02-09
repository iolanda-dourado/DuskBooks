import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGetAllBooksComponent } from './button-get-all-books.component';

describe('ButtonGetAllBooksComponent', () => {
  let component: ButtonGetAllBooksComponent;
  let fixture: ComponentFixture<ButtonGetAllBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonGetAllBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonGetAllBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
