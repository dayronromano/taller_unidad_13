import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInscripcionesComponent } from './listar-inscripciones.component';

describe('ListarInscripcionesComponent', () => {
  let component: ListarInscripcionesComponent;
  let fixture: ComponentFixture<ListarInscripcionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarInscripcionesComponent]
    });
    fixture = TestBed.createComponent(ListarInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
