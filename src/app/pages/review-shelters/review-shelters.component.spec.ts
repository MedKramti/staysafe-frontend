import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSheltersComponent } from './review-shelters.component';

describe('ReviewSheltersComponent', () => {
  let component: ReviewSheltersComponent;
  let fixture: ComponentFixture<ReviewSheltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewSheltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSheltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
