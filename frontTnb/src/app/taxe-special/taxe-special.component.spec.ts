import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxeSpecialComponent } from './taxe-special.component';

describe('TaxeSpecialComponent', () => {
  let component: TaxeSpecialComponent;
  let fixture: ComponentFixture<TaxeSpecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxeSpecialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxeSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
