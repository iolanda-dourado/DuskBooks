import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnavailableBooksListingComponent } from './unavailable-books-listing.component';

describe('UnavailableBooksListingComponent', () => {
  let component: UnavailableBooksListingComponent;
  let fixture: ComponentFixture<UnavailableBooksListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnavailableBooksListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnavailableBooksListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
