import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteForm } from './corte-form';

describe('CorteForm', () => {
  let component: CorteForm;
  let fixture: ComponentFixture<CorteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorteForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CorteForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
