import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddReviewComponent } from './button-add-review.component';

describe('ButtonAddReviewComponent', () => {
  let component: ButtonAddReviewComponent;
  let fixture: ComponentFixture<ButtonAddReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAddReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonAddReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
