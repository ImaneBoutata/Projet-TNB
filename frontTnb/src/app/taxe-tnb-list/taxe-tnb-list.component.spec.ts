import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxeTnbListComponent } from './taxe-tnb-list.component';

describe('TaxeTnbListComponent', () => {
  let component: TaxeTnbListComponent;
  let fixture: ComponentFixture<TaxeTnbListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxeTnbListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxeTnbListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
