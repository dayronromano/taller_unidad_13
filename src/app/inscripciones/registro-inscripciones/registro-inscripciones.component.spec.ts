import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroInscripcionesComponent } from './registro-inscripciones.component';

describe('RegistroInscripcionesComponent', () => {
  let component: RegistroInscripcionesComponent;
  let fixture: ComponentFixture<RegistroInscripcionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroInscripcionesComponent]
    });
    fixture = TestBed.createComponent(RegistroInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
