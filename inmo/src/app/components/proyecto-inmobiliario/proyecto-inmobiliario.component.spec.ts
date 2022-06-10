import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoInmobiliarioComponent } from './proyecto-inmobiliario.component';

describe('ProyectoInmobiliarioComponent', () => {
  let component: ProyectoInmobiliarioComponent;
  let fixture: ComponentFixture<ProyectoInmobiliarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoInmobiliarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoInmobiliarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
