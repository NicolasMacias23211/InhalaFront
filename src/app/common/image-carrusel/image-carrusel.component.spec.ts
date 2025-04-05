import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCarruselComponent } from './image-carrusel.component';

describe('ImageCarruselComponent', () => {
  let component: ImageCarruselComponent;
  let fixture: ComponentFixture<ImageCarruselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageCarruselComponent]
    });
    fixture = TestBed.createComponent(ImageCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
