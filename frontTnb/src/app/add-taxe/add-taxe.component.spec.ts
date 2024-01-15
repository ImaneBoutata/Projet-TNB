import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxeComponent } from './add-taxe.component';

describe('AddTaxeComponent', () => {
  let component: AddTaxeComponent;
  let fixture: ComponentFixture<AddTaxeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaxeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
