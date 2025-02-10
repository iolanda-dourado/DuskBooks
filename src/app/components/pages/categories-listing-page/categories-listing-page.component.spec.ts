import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesListingPageComponent } from './categories-listing-page.component';

describe('CategoriesListingPageComponent', () => {
  let component: CategoriesListingPageComponent;
  let fixture: ComponentFixture<CategoriesListingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesListingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
