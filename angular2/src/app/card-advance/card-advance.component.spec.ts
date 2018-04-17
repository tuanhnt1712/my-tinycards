import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAdvanceComponent } from './card-advance.component';

describe('CardAdvanceComponent', () => {
  let component: CardAdvanceComponent;
  let fixture: ComponentFixture<CardAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
