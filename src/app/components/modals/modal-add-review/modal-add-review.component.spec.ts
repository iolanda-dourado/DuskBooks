import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddReviewComponent } from './modal-add-review.component';

describe('ModalAddReviewComponent', () => {
  let component: ModalAddReviewComponent;
  let fixture: ComponentFixture<ModalAddReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAddReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
