import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFoodItemsComponent } from './all-food-items.component';

describe('AllFoodItemsComponent', () => {
  let component: AllFoodItemsComponent;
  let fixture: ComponentFixture<AllFoodItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFoodItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFoodItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
