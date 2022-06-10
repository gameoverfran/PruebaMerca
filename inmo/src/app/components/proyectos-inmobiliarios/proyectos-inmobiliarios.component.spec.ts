import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosInmobiliariosComponent } from './proyectos-inmobiliarios.component';

describe('ProyectosInmobiliariosComponent', () => {
  let component: ProyectosInmobiliariosComponent;
  let fixture: ComponentFixture<ProyectosInmobiliariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectosInmobiliariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosInmobiliariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
