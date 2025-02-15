import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddCategoryComponent } from './button-add-category.component';

describe('ButtonAddCategoryComponent', () => {
  let component: ButtonAddCategoryComponent;
  let fixture: ComponentFixture<ButtonAddCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAddCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
