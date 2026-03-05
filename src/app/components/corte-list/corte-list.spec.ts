import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteList } from './corte-list';

describe('CorteList', () => {
  let component: CorteList;
  let fixture: ComponentFixture<CorteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorteList],
    }).compileComponents();

    fixture = TestBed.createComponent(CorteList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
