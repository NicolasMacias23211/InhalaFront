import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasajesYBeneficiosContentComponent } from './masajes-ybeneficios-content.component';

describe('MasajesYBeneficiosContentComponent', () => {
  let component: MasajesYBeneficiosContentComponent;
  let fixture: ComponentFixture<MasajesYBeneficiosContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasajesYBeneficiosContentComponent]
    });
    fixture = TestBed.createComponent(MasajesYBeneficiosContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
