import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainSpecialComponent } from './terrain-special.component';

describe('TerrainSpecialComponent', () => {
  let component: TerrainSpecialComponent;
  let fixture: ComponentFixture<TerrainSpecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerrainSpecialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerrainSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
