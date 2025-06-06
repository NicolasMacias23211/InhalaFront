import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasajesYBeneficiosComponent } from './masajes-ybeneficios.component';

describe('MasajesYBeneficiosComponent', () => {
  let component: MasajesYBeneficiosComponent;
  let fixture: ComponentFixture<MasajesYBeneficiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasajesYBeneficiosComponent]
    });
    fixture = TestBed.createComponent(MasajesYBeneficiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
