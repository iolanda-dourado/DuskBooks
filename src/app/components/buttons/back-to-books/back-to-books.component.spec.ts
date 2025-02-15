import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToBooksComponent } from './back-to-books.component';

describe('BackToBooksComponent', () => {
  let component: BackToBooksComponent;
  let fixture: ComponentFixture<BackToBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackToBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackToBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
